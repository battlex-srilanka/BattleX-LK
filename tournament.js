import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAX2J06ECLdS3W4CFgHqFSCX0QaIEhhrJQ",
    authDomain: "battex-lk.firebaseapp.com",
    projectId: "battex-lk",
    storageBucket: "battex-lk.firebasestorage.app",
    messagingSenderId: "195276583693",
    appId: "1:195276583693:web:77d4c02caeec8d5a2e3644",
    measurementId: "G-1V4TDQLEE3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let currentUser = null;

onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
    } else {
        window.location.href = "register.html";
    }
});

// Modal Open Function (የትኛውን tournament එකක් ක්ලික් කළත් එහි නම මෝඩල් එකට යෑම)
window.openModal = function(tournamentName) {
    document.getElementById('tName').value = tournamentName;
    document.getElementById('tournamentModal').style.display = 'flex';
}

// Modal Close Button
document.getElementById('closeModalBtn').addEventListener('click', () => {
    document.getElementById('tournamentModal').style.display = 'none';
});

// Submit Registration to Firestore
document.getElementById('submitTournamentBtn').addEventListener('click', async () => {
    const tournamentName = document.getElementById('tName').value;
    const teamName = document.getElementById('tTeamName').value.trim();

    if (!teamName) {
        alert("කරුණාකර Team Name එක ඇතුළත් කරන්න!");
        return;
    }

    if (!currentUser) {
        alert("කරුණාකර ප්‍රථමයෙන් Sign In වන්න!");
        window.location.href = "register.html";
        return;
    }

    try {
        await addDoc(collection(db, "tournaments"), {
            userId: currentUser.uid,
            tournamentName: tournamentName,
            teamName: teamName,
            registeredAt: new Date().toISOString()
        });

        alert("Tournament Registration Successful!");
        document.getElementById('tournamentModal').style.display = 'none';
        window.location.href = "dashboard.html";

    } catch (error) {
        console.error("Error adding tournament: ", error);
        alert("Registration Failed: " + error.message);
    }
});