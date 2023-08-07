import firebase_app from "@/firebase/config";
import { getAuth } from "firebase/auth";

export default function AccountTab() {

    return (
        <div>
            {getAuth(firebase_app).currentUser?.toJSON() && JSON.stringify(getAuth(firebase_app).currentUser?.toJSON())}
        </div>
    )
}