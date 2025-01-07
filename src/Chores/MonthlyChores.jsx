import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    CircularProgress,
    Alert,
    Checkbox
} from "@mui/material";
import {fetchUserRole} from "../auth/check_permission.js";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {lighten} from "@mui/material";


export const MonthlyChores = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [user, setUser] = useState(null); // Logged-in user
    const [chores, setChores] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isChief, setIsChief] = useState(false); // Tracks if user is a chief

    useEffect(() => {
        const fetchChoresForUser = async (userId) => {
            try {
                // Step 1: Get user data
                const userDoc = await getDoc(doc(db, "users", userId));
                if (!userDoc.exists()) {
                    throw new Error("User not found");
                }
                const userData = userDoc.data();
                setIsChief(userData.role.includes("chief")); // Check if user is a chief
                const userDepartmentId = userData.department;

                // Step 2: Get department data
                const departmentDoc = await getDoc(doc(db, "cleaning", "departents"));
                if (!departmentDoc.exists()) {
                    throw new Error("Department not found");
                }
                const departmentData = departmentDoc.data();
                const choreIds = departmentData[userDepartmentId].chores["0"]; // Assuming weekly chores for month 0

                // Step 3: Listen for real-time changes to the chores data
                const choreDocRef = doc(db, "cleaning", "chores");
                const unsubscribe = onSnapshot(choreDocRef, (choreDoc) => {
                    if (choreDoc.exists()) {
                        const choresDatabase = choreDoc.data();
                        const choresData = {};
                        for (const choreId of choreIds) {
                            choresData[choreId] = choresDatabase[choreId];
                        }
                        setChores(choresData);
                    }
                });

                // Cleanup the subscription when the component unmounts
                return () => unsubscribe();
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        // Listen to auth state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchUserRole(
                        user,
                        ["chief"],
                        (test) => test,
                        (test) => test,
                        navigate,
                        (test) => test
                ).then();
                setUser(user);
                fetchChoresForUser(user.uid);
            } else {
                setUser(null);
                setChores({});
            }
        });

        // Cleanup on unmount
        return () => unsubscribe();
    }, []);

    const markChoreAsCompleted = async (choreId, index, value) => {
        try {
            const choreDocRef = doc(db, "cleaning", "chores");
            const choreDoc = await getDoc(choreDocRef);

            if (!choreDoc.exists()) {
                throw new Error("Chore document not found");
            }

            const updatedChores = { ...choreDoc.data() };
            updatedChores[choreId][index].completed = value;

            // Update Firestore document
            await updateDoc(choreDocRef, updatedChores);
        } catch (err) {
            console.error("Error marking chore as completed:", err);
            setError("Failed to update chore status");
        }
    };

    if (!user) {
        return (
                <Alert severity="info" sx={{ marginTop: 2 }}>
                    Παρακαλώ συνδεθείτε για να δείτε τις δουλειές σας.
                </Alert>
        );
    }

    if (loading) {
        return (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                    <CircularProgress />
                    <Typography variant="body1" sx={{ marginLeft: 2 }}>
                        Φορτώνει τις δουλειές...
                    </Typography>
                </Box>
        );
    }

    if (error) {
        return (
                <Alert severity="error" sx={{ marginTop: 2 }}>
                    Σφάλμα: {error}
                </Alert>
        );
    }

    return (
            <Box
                    sx={{
                        marginTop: 60,
                        maxWidth: 686,
                        margin: "20px auto",
                        padding: 10,
                        borderRadius: 2,
                    }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    Οι καθαριότητες της εβδομάδας:
                </Typography>
                <List>
                    {Object.entries(chores).map(([choreId, chore]) => (
                            chore.map((chore, index) => (
                                    <ListItem
                                            key={choreId + index}
                                            sx={{
                                                backgroundColor: chore.completed ? lighten(theme.palette.background.default, 0.1) : theme.palette.background.default,
                                                marginBottom: 1,
                                                borderRadius: 1,
                                            }}
                                    >
                                        <ListItemText
                                                primary={chore.name}
                                                secondary={chore.completed ? "Ολοκληρώθηκε" : "Σε εκκρεμότητα"}
                                                primaryTypographyProps={{
                                                    style: chore.completed ? { textDecoration: "line-through" } : {},
                                                }}
                                        />
                                        {isChief && (
                                                <Checkbox
                                                        checked={chore.completed}
                                                        onChange={() => markChoreAsCompleted(choreId, index, !chore.completed)}
                                                />
                                        )}
                                    </ListItem>
                            ))
                    ))}
                </List>
            </Box>
    );
};
