import React, { useState, useEffect } from "react";
import {
    Grid2 as Grid, Card, CardContent, CardActions, Typography, Chip, TextField,
    Button, Dialog, DialogActions, DialogContent, DialogTitle, Box, CircularProgress,
    MenuItem, Select, FormControl, InputLabel
} from "@mui/material";
import { collection, getDocs, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth, db } from "../firebase";
import { fetchUserRole } from "../auth/check_permission.js";
import { useNavigate } from "react-router-dom";

const AdminUserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const roles = {
        admin: "Διαχειρηστής",
        cleaning: "Καθαριότητες",
        viewer: "Απλός χρήστης",
    };

    const navigate = useNavigate();

    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            fetchUserRole(
                    user,
                    ["admin"],
                    setLoading,
                    setError,
                    navigate,
                    (role) => console.log(role)
            );
        });
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError("");

            try {
                const usersSnapshot = await getDocs(collection(db, "users"));
                const usersData = usersSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setUsers(usersData);
            } catch (err) {
                setError("Failed to fetch users.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleAddRole = async () => {
        if (!selectedRole) return;

        if (selectedUser.role && selectedUser.role.includes(selectedRole)) {
            setError("Role already exists.");
            setIsDialogOpen(false);
            return;
        }

        try {
            const userDocRef = doc(db, "users", selectedUser.id);
            await updateDoc(userDocRef, {
                role: arrayUnion(selectedRole),
            });

            setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                            user.id === selectedUser.id
                                    ? {
                                        ...user,
                                        role: user.role ? [...user.role, selectedRole] : [selectedRole],
                                    }
                                    : user
                    )
            );

            setIsDialogOpen(false);
            setError("");
            setSelectedRole("");
        } catch (err) {
            setError("Failed to add role.");
            console.log(err);
        }
    };

    const handleRemoveRole = async (selectedUser, role) => {
        try {
            const userDocRef = doc(db, "users", selectedUser.id);

            await updateDoc(userDocRef, {
                role: arrayRemove(role),
            });

            setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                            user.id === selectedUser.id
                                    ? {
                                        ...user,
                                        role: user.role.filter((r) => r !== role),
                                    }
                                    : user
                    )
            );
        } catch (err) {
            setError("Failed to remove role.");
            console.log(err);
        }
    };

    const openDialog = (user) => {
        setSelectedUser(user);
        setIsDialogOpen(true);
    };

    const filteredUsers = users.filter((user) =>
            user.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
            <Box sx={{ paddingTop: "10vh" }} p={4}>
                <Typography variant="h4" mb={3}>
                    Admin - User Management
                </Typography>

                {error && <Typography color="error">{error}</Typography>}

                <TextField
                        label="Search by email"
                        variant="outlined"
                        fullWidth
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{ mb: 3 }}
                />

                {loading ? (
                        <Box display="flex" justifyContent="center" mt={4}>
                            <CircularProgress />
                        </Box>
                ) : (
                        <Grid container spacing={4}>
                            {filteredUsers.map((user) => (
                                    <Grid
                                            size={{ xs: 12, sm: 6, md: 4, lg: 3}}
                                            key={user.id}
                                    >
                                        <Card elevation={3}>
                                            <CardContent>
                                                <Typography variant="h6">{user.email}</Typography>
                                                <Box mt={2}>
                                                    {user.role &&
                                                            user.role.map((role, index) => (
                                                                    <Chip
                                                                            key={index}
                                                                            label={roles[role]}
                                                                            color="primary"
                                                                            size="small"
                                                                            sx={{ mr: 1, mb: 1 }}
                                                                            onDelete={() => handleRemoveRole(user, role)}
                                                                    />
                                                            ))}
                                                </Box>
                                            </CardContent>
                                            <CardActions>
                                                <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => openDialog(user)}
                                                >
                                                    Add Role
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                            ))}
                        </Grid>
                )}

                <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                    <DialogTitle>Add Role</DialogTitle>
                    <DialogContent>
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="role-select-label">Select Role</InputLabel>
                            <Select
                                    labelId="role-select-label"
                                    value={selectedRole}
                                    onChange={(e) => setSelectedRole(e.target.value)}
                            >
                                {Object.entries(roles).map(([role, description]) => (
                                        <MenuItem key={role} value={role}>
                                            {description}
                                        </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setIsDialogOpen(false)} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleAddRole} color="primary">
                            Add Role
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
    );
};

export default AdminUserManagement;
