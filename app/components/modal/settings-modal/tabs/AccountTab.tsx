import { UserContext } from "@/context/UserContext";
import firebase_app from "@/firebase/config";
import { getAuth } from "firebase/auth";
import { useContext } from 'react';

export default function AccountTab() {

    const { user } = useContext(UserContext);

    return (
        <div>
            <div className="bg-red-200 w-full">
                {getAuth(firebase_app).currentUser?.toJSON() && JSON.stringify(getAuth(firebase_app).currentUser?.toJSON())}
            </div>
            <div>
                {JSON.stringify(user)}
            </div>
        </div>
    )
}