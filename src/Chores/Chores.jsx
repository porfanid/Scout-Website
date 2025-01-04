import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { doc, collection, onSnapshot, setDoc } from "firebase/firestore";
import {auth, db, functions} from "../firebase.js";
import ChoresColumn from "./ChoresColumn.jsx";
import Department from "./Department.jsx";
import Grid2 from "@mui/material/Grid2";
import {fetchUserRole} from "../auth/check_permission.js";
import {useNavigate} from "react-router-dom";
import {httpsCallable} from "firebase/functions";
import {Button} from "@mui/material";
import ResetChoresButton from "./ResetChoresButton.jsx";

const ChoresAdmin = () => {
    const [chores, setChores] = useState({});
    const [departments, setDepartments] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        return auth.onAuthStateChanged((user)=>{
            fetchUserRole(user, ['admin', 'cleaning'], (test)=>{return test}, (test)=>{return test}, navigate, (test)=>{return test}).then();
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
                    const departmentsList = Object.keys(departmentsData || {}).map((id) => ({
                        chores: departmentsData[id].chores || [],
                        ...departmentsData[id],
                    }));
                    setDepartments(departmentsList);
                },
                (error) => {
                    console.error("Error fetching departments: ", error);
                }
        );

        // Cleanup listeners on component unmount
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
        await setDoc(depDoc, departmentsData);
    };

    useEffect(() => {
        if (departments.length > 0) {
            syncDepartmentsToFirestore(departments).catch(console.error);
        }
    }, [departments]);

    const getUnassignedChores = () => {
        const assignedChores = new Set(
                departments.flatMap((department) => department.chores)
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

        setDepartments((prevDepartments) =>
                prevDepartments.map((dep) => ({
                    ...dep,
                    chores: dep.chores.filter((chore) => chore !== choreId),
                }))
        );

        if (departmentId !== null) {
            setDepartments((prevDepartments) =>
                    prevDepartments.map((dep) =>
                            dep.id === departmentId
                                    ? { ...dep, chores: [...dep.chores, choreId] }
                                    : dep
                    )
            );
        }
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
                            maxWidth: "1200px",  // Add a max-width constraint
                            margin: "0 auto",  // Center the container
                        }}
                        className="chores-admin"
                >
                    <ResetChoresButton/>
                    <Button onClick={async ()=>{
                        const testChores = httpsCallable(functions, 'testChores');
                        await testChores(); // Pass any data as the payload if needed
                        console.log("Function has been run");
                    }}>Test Button</Button>

                    <Grid2 container
                           style={{
                               display:"flex",
                               justifyContent:"center",
                           }}
                           spacing={3} justifyContent="flex-center" wrap="wrap">
                        {/* Chores Column on the left */}
                        <Grid2 item size={{
                            xs: 12,
                            sm: 12,
                            md: 4,
                            lg: 3,
                        }}>
                            <ChoresColumn
                                    getUnassignedChores={getUnassignedChores}
                                    choresData={chores}
                                    onDrop={handleDrop}
                            />
                        </Grid2>

                        {/* Departments Column on the right */}
                        <Grid2 item size={{
                            xs: 12,
                            sm: 12,
                            md: 8,
                            lg: 8,
                        }}>
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
                                                    onDrop={handleDrop}
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
