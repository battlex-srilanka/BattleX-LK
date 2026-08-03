import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAX2J06ECLdS3W4CFgHqFSCX0QaIEhhrJQ",
    authDomain: "battex-lk.firebaseapp.com",
    projectId: "battex-lk",
    storageBucket: "battex-lk.firebasestorage.app",
    messagingSenderId: "195276583693",
    appId: "1:195276583693:web:77d4c02caeec8d5a2e3644",
    measurementId: "G-1V4TDQLEE3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Check Authentication & Fetch Data
onAuthStateChanged(auth, async (user) => {
    if (user) {
        try {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                
                document.getElementById('accGamerName').textContent = userData.gamerName || "N/A";
                document.getElementById('accUid').textContent = userData.ffUid || "N/A";
                document.getElementById('accPhone').textContent = userData.phone || "N/A";
                document.getElementById('accEmail').textContent = userData.email || "N/A";
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    } else {
        window.location.href = "register.html";
    }
});

// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
    const menuToggleBtn = document.getElementById("menuToggleBtn");
    const navMenu = document.getElementById("navMenu");

    if (menuToggleBtn && navMenu) {
        menuToggleBtn.addEventListener("click", function () {
            if (navMenu.style.display === "none" || navMenu.style.display === "") {
                navMenu.style.display = "flex";
            } else {
                navMenu.style.display = "none";
            }
        });
    }
});

// Logout Functionality
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        signOut(auth).then(() => {
            window.location.href = "register.html";
        }).catch((error) => {
            console.error("Logout Error: ", error);
        });
    });
}