import { useDrop } from "react-dnd";
import Chore from "./Chore.jsx";
import "./ChoresAdmin.css";
import {useEffect, useRef} from "react";

const ChoresColumn = ({ getUnassignedChores, choresData, onDrop, currentMonth }) => {
    const chores = getUnassignedChores(); // Pool of unassigned chores

    const currentMonthRef = useRef(currentMonth);

    useEffect(() => {
        currentMonthRef.current = currentMonth; // Update ref whenever currentMonth changes
    }, [currentMonth]);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "chore",
        drop: (item) => {
            onDrop(null, item?.choreId, currentMonthRef.current); // Dropped back to chores column
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
            <div
                    ref={drop}
                    className="department-box"
                    style={{
                        backgroundColor: isOver ? "#555555" : "#333333",
                    }}
            >
                <h3>Unassigned Chores</h3>
                <div className="chores-list">
                    {chores.map((chore) => (
                            <Chore key={chore} chores={choresData} choreId={chore} />
                    ))}
                </div>
            </div>
    );
};

export default ChoresColumn;
