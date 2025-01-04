import React from "react";
import { useDrag } from "react-dnd";
import { Box, Card, CardContent, Typography, Checkbox } from "@mui/material";
import { useTheme } from "@mui/styles";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase"; // Adjust the path as necessary

const Chore = ({ choreId, chores }) => {
    const theme = useTheme();

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "chore",
        item: { choreId },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    // Handle checkbox toggle
    const handleCheckboxChange = async (taskIndex) => {
        const updatedChores = [...chores[choreId]];
        updatedChores[taskIndex] = {
            ...updatedChores[taskIndex],
            completed: !updatedChores[taskIndex].completed,
        };

        try {
            // Update Firestore
            const choresDocRef = doc(db, "cleaning", "chores");
            await updateDoc(choresDocRef, {
                [choreId]: updatedChores,
            });
        } catch (error) {
            console.error("Error updating chores:", error);
        }
    };

    return (
            <Box
                    key={choreId}
                    ref={drag}
                    style={{
                        opacity: isDragging ? 0.5 : 1,
                        padding: "10px",
                    }}
            >
                <Card
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            padding: 2,
                            boxShadow: 3,
                        }}
                >
                    <CardContent>
                        {chores[choreId].map((task, index) => (
                                <div key={index} style={{ marginBottom: "10px" }}>
                                    <Typography
                                            color={
                                                task.completed
                                                        ? theme.palette.primary.main
                                                        : theme.palette.fancy.main
                                            }
                                            variant="h6"
                                            component="span"
                                            gutterBottom
                                    >
                                        <Checkbox
                                                checked={task.completed}
                                                onChange={() => handleCheckboxChange(index)}
                                                color="primary"
                                        />
                                        {task.name}
                                    </Typography>

                                </div>
                        ))}
                    </CardContent>
                </Card>
            </Box>
    );
};

export default Chore;
