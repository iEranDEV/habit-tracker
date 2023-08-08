import { UserContext } from "@/context/UserContext";
import firebase_app from "@/firebase/config";
import { getAuth } from "firebase/auth";
import { useContext } from 'react';

export default function AccountTab() {

    const { user } = useContext(UserContext);

    return (
        <div className="overflow-hidden">
            <div>
                {JSON.stringify(user)}
            </div>
        </div>
    )
}