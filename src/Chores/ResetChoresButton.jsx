import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase"; // Import your Firebase functions instance

const ResetChoresButton = () => {
    // States for the dialog and loading state for the reset action
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);

    // Function to trigger the dialog
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    // Function to close the dialog (cancel action)
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // Function to handle the confirmation of resetting chores
    const handleResetChores = async () => {
        setLoading(true); // Start loading state to disable button during async operation

        try {
            const resetChores = httpsCallable(functions, "manualResetChores");
            const response = await resetChores(); // Call the Firebase function to reset chores
            console.log(response.data);
            setOpenDialog(false); // Close the dialog after successful reset
        } catch (error) {
            console.error("Error resetting chores:", error);
            // Handle error as needed (e.g., show an alert)
        } finally {
            setLoading(false); // Stop loading state
        }
    };

    return (
            <div>
                {/* Danger Button */}
                <Button
                        variant="contained"
                        color="error" // Red color indicating danger
                        onClick={handleOpenDialog}
                        disabled={loading} // Disable while the async action is ongoing
                        style={{
                            backgroundColor: "#d32f2f", // Slightly darker red for danger
                            color: "white", // White text for better contrast
                            fontWeight: "bold", // Bold text to emphasize danger
                            textTransform: "none", // Keep text as-is, no uppercasing
                        }}
                >
                    Reset Chores
                </Button>

                {/* Confirmation Dialog with Danger Styling */}
                <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs">
                    <DialogTitle style={{ backgroundColor: "#f44336", color: "white" }}>Danger</DialogTitle>
                    <DialogContent>
                        <Typography variant="body1" color="textSecondary">
                            Είστε σίγουροι ότι θέλετε να επαναφέρετε όλες τις καθαριότητες; Δεν υπάρχει τρόπος να αναιρέσετε αυτήν την ενέργεια.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        {/* Cancel Button */}
                        <Button onClick={handleCloseDialog} color="secondary" style={{ fontWeight: "bold" }}>
                            Ακύρωση
                        </Button>
                        {/* Confirm Button with Danger Styling */}
                        <Button
                                onClick={handleResetChores}
                                color="error"
                                variant="contained"
                                disabled={loading} // Disable while loading
                                style={{
                                    backgroundColor: "#d32f2f", // Red for danger
                                    fontWeight: "bold", // Bold text for emphasis
                                }}
                        >
                            {loading ? "Γίνεται επαναφορά..." : "Επιβεβαίωση"}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
    );
};

export default ResetChoresButton;
