import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.js";

export const fetchUserRole = async (
    user,
    acceptedRoles,
    setLoading,
    setError,
    navigate,
    setUserRole
) => {
    setLoading(true);
    try {
        if (user) {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const userData = userDoc.data();

            // Check if the user has any of the accepted roles
            if (userData && userData.role && userData.role.some(role => acceptedRoles.includes(role))) {
                // Set the role if user has any accepted role
                console.log(userData.role);
                setUserRole(userData.role); // You can modify this depending on how you want to handle multiple roles
            } else {
                console.log(user.uid);
                navigate("/"); // Redirect if the user doesn't have an accepted role
            }
        } else {
            navigate("/login"); // Redirect to login page
        }
    } catch (err) {
        console.error("Error fetching user role:", err);
        setError("Failed to verify user access.");
    } finally {
        setLoading(false);
    }
};