import { Database } from "../.firebase/firebaseMain"
import {
  doc,
  updateDoc
} from "firebase/firestore"



function pushRecentPlayedToDB() {
    let userID = localStorage.getItem("userID")
    if(!userID) return;
    const docRef = doc(Database, "userData", userID)
    updateDoc(docRef, {
        recentPlays : JSON.parse(localStorage.getItem("recent-played") || '[]')
    })
}

function pushFavSongToDB() {
  let userID = localStorage.getItem("userID")
  if(!userID) return;
  const docRef = doc(Database, "userData", userID)
  updateDoc(docRef, {
      favSongs : JSON.parse(localStorage.getItem("Fav-Arr") || '[]')
  })
}

export { pushRecentPlayedToDB, pushFavSongToDB }
