import { Database } from "../.firebase/firebaseMain"
import {
  doc,
  updateDoc
} from "firebase/firestore"



function pushRecentPlayedToDB() {
    console.log(localStorage.getItem("userID"));
    let userID = localStorage.getItem("userID")
    if(!userID) return;
    const docRef = doc(Database, "userData", userID)
    updateDoc(docRef, {
        recentPlays : JSON.parse(localStorage.getItem("recent-played") || '[]')
    })
}

export { pushRecentPlayedToDB }
