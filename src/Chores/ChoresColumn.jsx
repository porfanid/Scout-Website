import { useDrop } from "react-dnd";
import Chore from "./Chore.jsx";
import "./ChoresAdmin.css";

const ChoresColumn = ({ getUnassignedChores, choresData, onDrop }) => {
    const chores = getUnassignedChores(); // Pool of unassigned chores

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "chore",
        drop: (item) => {
            onDrop(null, item?.choreId); // Dropped back to chores column
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
