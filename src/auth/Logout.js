import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import {useEffect} from "react"; // Make sure to import your Firebase auth object

export default function Logout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);  // Logs out the user
            navigate('/');  // Redirect to home page
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    useEffect(() => {
        handleLogout().then();
    }, []);

    return null; // No need to render anything
}
