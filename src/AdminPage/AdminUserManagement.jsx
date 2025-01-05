import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Chip,
    Typography,
    Box,
    CircularProgress,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from "@mui/material";
import { collection, getDocs, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import {auth, db} from "../firebase";
import {fetchUserRole} from "../auth/check_permission.js";
import {useNavigate} from "react-router-dom"; // Replace with your Firebase config

const AdminUserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Role options (Greek -> English)
    const roles = {
        "admin": "Διαχειρηστής",
        "cleaning": "Καθαριότητες",
        "viewer": "Απλός χρήστης",
    };

    const navigate = useNavigate();

    useEffect(() => {
        return auth.onAuthStateChanged((user)=>{
            fetchUserRole(user, ["admin"], setLoading, setError, navigate, (role)=>{}).then();
        });
    }, []);

    // Fetch users from Firestore
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

        fetchUsers().then();
    }, []);

    // Add a new role to the selected user
    const handleAddRole = async () => {
        if (!selectedRole) return;

        if(selectedUser.role && selectedUser.role.includes(selectedRole)) {
            setError("Role already exists.");
            setIsDialogOpen(false);
            return;
        }

        try {
            const userDocRef = doc(db, "users", selectedUser.id);

            // Update Firestore with arrayUnion
            await updateDoc(userDocRef, {
                role: arrayUnion(selectedRole),
            });

            // Update local state
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
            setError(""); // Clear error
            setSelectedRole("");
        } catch (err) {
            setError("Failed to add role.");
            console.log(err);
        }
    };

    // Remove a role from the selected user
    const handleRemoveRole = async (selectedUser, role) => {
        try {
            const userDocRef = doc(db, "users", selectedUser.id);

            // Update Firestore with arrayRemove
            await updateDoc(userDocRef, {
                role: arrayRemove(role),
            });

            // Update local state
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

    // Open dialog for adding a role
    const openDialog = (user) => {
        setSelectedUser(user);
        setIsDialogOpen(true);
    };

    // Filter users by search input
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
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Roles</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredUsers.map((user) => (
                                            <TableRow key={user.id}>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>
                                                    {user.role &&
                                                            user.role.map((role, index) => (
                                                                    <Chip
                                                                            key={index}
                                                                            label={roles[role]}
                                                                            color="primary"
                                                                            size="small"
                                                                            sx={{ mr: 1 }}
                                                                            onDelete={() => handleRemoveRole(user, role)}
                                                                    />
                                                            ))}
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={() => openDialog(user)}
                                                    >
                                                        Add Role
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                )}

                {/* Dialog for adding a new role */}
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
