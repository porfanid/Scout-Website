import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { doc, collection, onSnapshot, setDoc } from "firebase/firestore";
import { auth, db, functions } from "../firebase.js";
import ChoresColumn from "./ChoresColumn.jsx";
import Department from "./Department.jsx";
import Grid2 from "@mui/material/Grid2";
import { fetchUserRole } from "../auth/check_permission.js";
import { useNavigate } from "react-router-dom";
import { httpsCallable } from "firebase/functions";
import { Button } from "@mui/material";
import ResetChoresButton from "./ResetChoresButton.jsx";

const ChoresAdmin = () => {
    const [chores, setChores] = useState({});
    const [departments, setDepartments] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(0); // Tracks the current month (0 = January, 1 = February, etc.)

    const navigate = useNavigate();

    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            fetchUserRole(user, ["admin", "cleaning"], (test) => test, (test) => test, navigate, (test) => test).then();
        });
    }, []);

    useEffect(() => {
        const unsubscribeChores = onSnapshot(
                doc(collection(db, "cleaning"), "chores"),
                (choresDoc) => {
                    const choresData = choresDoc.data();
                    setChores(choresData);
                },
                (error) => {
                    console.error("Error fetching chores: ", error);
                }
        );

        const unsubscribeDepartments = onSnapshot(
                doc(collection(db, "cleaning"), "departents"),
                (depDoc) => {
                    const departmentsData = depDoc.data();
                    const departmentsList = Object.keys(departmentsData || {}).map((id) => {
                        // If chores is undefined, initialize it as an object with 12 empty arrays (one for each month)
                        const choresObj = {};
                        for (let i = 0; i < 12; i++) {
                            choresObj[i] = departmentsData[id].chores?.[i] || [];
                        }

                        return {
                            ...departmentsData[id],
                            chores: choresObj,
                        };
                    });
                    setDepartments(departmentsList);
                },
                (error) => {
                    console.error("Error fetching departments: ", error);
                }
        );

        return () => {
            unsubscribeChores();
            unsubscribeDepartments();
        };
    }, []);

    const syncDepartmentsToFirestore = async (updatedDepartments) => {
        const depDoc = doc(collection(db, "cleaning"), "departents");
        const departmentsData = updatedDepartments.reduce((acc, dep) => {
            acc[dep.id] = dep;
            return acc;
        }, {});
        console.log(departmentsData);
        await setDoc(depDoc, departmentsData);
    };

    useEffect(() => {
        if (departments.length > 0) {
            syncDepartmentsToFirestore(departments).catch(console.error);
        }
    }, [departments]);

    const getUnassignedChores = () => {
        const assignedChores = new Set(
                departments.flatMap((department) => department.chores[currentMonth] || [])
        );
        return Object.keys(chores).filter((choreId) => !assignedChores.has(choreId));
    };

    const updatePhoneNumbers = (departmentId, updatedPhoneNumbers) => {
        setDepartments((prevDepartments) =>
                prevDepartments.map((dept) =>
                        dept.id === departmentId
                                ? { ...dept, phone: updatedPhoneNumbers }
                                : dept
                )
        );
    };

    const handleDrop = (departmentId, choreId) => {
        if (!choreId) return;

        console.log("departmentId", departmentId);
        console.log("choreId", choreId);

        // Update departments
        setDepartments((prevDepartments) =>
                prevDepartments.map((dep) =>
                        dep.id === departmentId
                                ? {
                                    ...dep,
                                    chores: {
                                        ...dep.chores,
                                        [currentMonth]: [
                                            ...(dep.chores[currentMonth] || []),
                                            choreId
                                        ],
                                    },
                                }
                                : {
                                    ...dep,
                                    chores: {
                                        ...dep.chores,
                                        [currentMonth]: dep.chores[currentMonth]?.filter(
                                                (chore) => chore !== choreId
                                        ),
                                    },
                                }
                )
        );

        // Optionally, sync to Firestore if necessary
        syncDepartmentsToFirestore(departments).catch(console.error);
    };

    const changeMonth = (direction) => {
        setCurrentMonth((prevMonth) =>
                (prevMonth + direction + 12) % 12 // Ensures circular navigation through months
        );
    };

    return (
            <DndProvider backend={HTML5Backend}>
                <div
                        style={{
                            paddingTop: "90px",
                            paddingLeft: "16px",
                            paddingRight: "16px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                            gap: "32px",
                            width: "100%",
                            maxWidth: "1200px",
                            margin: "0 auto",
                        }}
                        className="chores-admin"
                >
                    <ResetChoresButton />
                    <Button
                            onClick={async () => {
                                const testChores = httpsCallable(functions, "testChores");
                                await testChores(); // Pass any data as the payload if needed
                                console.log("Function has been run");
                            }}
                    >
                        Test Button
                    </Button>

                    <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
                        <Button onClick={() => changeMonth(-1)}>{"<"}</Button>
                        <h2 style={{ textAlign: "center", color: "white" }}>
                            {new Date(0, currentMonth).toLocaleString("el-GR", {
                                month: "long",
                            })}
                        </h2>
                        <Button onClick={() => changeMonth(1)}>{">"}</Button>
                    </div>

                    <Grid2
                            container
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                            spacing={3}
                            justifyContent="flex-center"
                            wrap="wrap"
                    >
                        <Grid2
                                item
                                size={{
                                    xs: 12,
                                    sm: 12,
                                    md: 4,
                                    lg: 3,
                                }}
                        >
                            <ChoresColumn
                                    getUnassignedChores={getUnassignedChores}
                                    choresData={chores}
                                    onDrop={handleDrop} // Ensure handleDrop is passed here
                            />
                        </Grid2>

                        <Grid2
                                item
                                size={{
                                    xs: 12,
                                    sm: 12,
                                    md: 8,
                                    lg: 8,
                                }}
                        >
                            <h2 style={{ textAlign: "center", color: "white" }}>
                                Departments
                            </h2>
                            <Grid2 size={12} container spacing={3}>
                                {departments.map((department) => (
                                        <Grid2
                                                item
                                                size={{
                                                    xs: 12,
                                                    sm: 6,
                                                    md: 6,
                                                    lg: 6,
                                                }}
                                                key={department.id}
                                        >
                                            <Department
                                                    department={department}
                                                    currentMonth={currentMonth}
                                                    onDrop={handleDrop} // Ensure handleDrop is passed here
                                                    choresData={chores}
                                                    onUpdatePhone={updatePhoneNumbers}
                                            />
                                        </Grid2>
                                ))}
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </div>
            </DndProvider>
    );
};

export default ChoresAdmin;
