import React from "react";
import { useDrag } from "react-dnd";
import {Box, Card, CardContent, Typography} from "@mui/material";

const Chore = ({ choreId, chores }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "chore",
        item: { choreId },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    console.log(chores);
    console.log(choreId);

    return (
            <Box
                    key={choreId}
                    ref={drag}
                    style={{
                        opacity: isDragging ? 0.5 : 1,
                        padding: "10px"
                    }}
            >
                <Card sx={{display: "flex", flexDirection: "column", padding: 2, boxShadow: 3}}>
                    <CardContent>
                        {chores[choreId].map((task, index) => (
                                <div key={index} style={{marginBottom: "10px"}}>
                                    <Typography variant="h6" component="div" gutterBottom>
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
