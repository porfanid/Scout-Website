import { useDrop } from "react-dnd";
import Chore from "./Chore.jsx";
import "./ChoresAdmin.css";
import { Grid, TextField, Button, IconButton, Collapse } from "@mui/material";
import React, { useState } from "react";
import Grid2 from "@mui/material/Grid2";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Department = ({ department, onDrop, choresData, onUpdatePhone }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "chore",
        drop: (item) => {
            onDrop(department.id, item?.choreId); // Dropped into this department
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    // State to handle phone numbers for each week of the month
    const [phoneNumbers, setPhoneNumbers] = useState(department.phone || {});
    const [isPhoneListOpen, setIsPhoneListOpen] = useState(false); // State for collapsing all phone numbers

    // Handle change of phone number for a particular week
    const handlePhoneChange = (week, index, value) => {
        const updatedPhones = { ...phoneNumbers };
        if (!updatedPhones[week]) {
            updatedPhones[week] = [];
        }
        updatedPhones[week][index] = value;
        setPhoneNumbers(updatedPhones);
    };

    // Add a new phone number field for a specific week
    const addPhoneNumber = (week) => {
        const updatedPhones = { ...phoneNumbers };
        if (!updatedPhones[week]) {
            updatedPhones[week] = [];
        }
        updatedPhones[week].push('');
        setPhoneNumbers(updatedPhones);
    };

    // Remove a phone number field for a specific week
    const removePhoneNumber = (week, index) => {
        const updatedPhones = { ...phoneNumbers };
        updatedPhones[week].splice(index, 1);
        setPhoneNumbers(updatedPhones);
    };

    // Save the phone numbers to the parent component or database
    const handleSavePhoneNumbers = () => {
        onUpdatePhone(department.id, phoneNumbers); // Assuming you pass down a function to update
    };

    // Toggle the collapse for all phone numbers
    const togglePhoneNumbers = () => {
        setIsPhoneListOpen((prev) => !prev); // Toggle open/close state
    };

    return (
            <div ref={drop} className={"department-box"}>
                <h4>{department.name}</h4>

                {/* Display and edit phone numbers */}
                <div>
                    <h5>
                        Τηλέφωνα για το τμήμα
                        <IconButton onClick={togglePhoneNumbers} style={{ marginBottom: 10 }}>
                            {isPhoneListOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                    </h5>


                    <Collapse in={isPhoneListOpen}>
                        {Array.from({ length: 4 }).map((_, weekIndex) => {
                            const week = weekIndex; // 1 to 4 for weeks
                            return (
                                    <Grid2 container key={week} spacing={3}>
                                        <Grid2 item xs={12} sm={3}>
                                            <h6>Week {week+1}</h6>
                                            {phoneNumbers[week]?.map((phone, index) => (
                                                    <div key={index} style={{ display: "flex", alignItems: "center" }}>
                                                        <TextField
                                                                label={`Phone #${index + 1}`}
                                                                value={phone}
                                                                onChange={(e) => handlePhoneChange(week, index, e.target.value)}
                                                                fullWidth
                                                                margin="normal"
                                                        />
                                                        <IconButton
                                                                onClick={() => removePhoneNumber(week, index)}
                                                                color="secondary"
                                                                style={{ marginLeft: "10px" }}
                                                        >
                                                            <RemoveIcon />
                                                        </IconButton>
                                                    </div>
                                            ))}
                                            <IconButton
                                                    onClick={() => addPhoneNumber(week)}
                                                    color="primary"
                                                    style={{ marginTop: "10px" }}
                                            >
                                                <AddIcon />
                                            </IconButton>
                                        </Grid2>
                                    </Grid2>
                            );
                        })}
                        <Button onClick={handleSavePhoneNumbers} variant="contained" color="primary">
                            Save Phone Numbers
                        </Button>
                    </Collapse>
                </div>

                {/* Display chores */}
                {department.chores.map((chore) => (
                        <Grid2 container xs={12} md={2} spacing={3} key={chore}>
                            <Chore chores={choresData} choreId={chore} />
                        </Grid2>
                ))}
            </div>
    );
};

export default Department;
