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

// Check if user is logged in and fetch details from Firestore
onAuthStateChanged(auth, async (user) => {
    if (user) {
        try {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                
                // 1. Dashboard එකේ උඩ තියෙන Cards වලට ඩේටා පිරවීම
                const userNameEl = document.getElementById('userName');
                const userEmailEl = document.getElementById('userEmail');
                const userUidEl = document.getElementById('userUid');

                if (userNameEl) userNameEl.textContent = userData.gamerName;
                if (userEmailEl) userEmailEl.textContent = userData.email;
                if (userUidEl) userUidEl.textContent = userData.ffUid;

                // 2. වම්පස "My Account Details" එකට ඩේටා පිරවීම
                const accGamerName = document.getElementById('accGamerName');
                const accUid = document.getElementById('accUid');
                const accPhone = document.getElementById('accPhone');
                const accEmail = document.getElementById('accEmail');

                if (accGamerName) accGamerName.textContent = userData.gamerName;
                if (accUid) accUid.textContent = userData.ffUid;
                if (accPhone) accPhone.textContent = userData.phone;
                if (accEmail) accEmail.textContent = userData.email;

            } else {
                console.log("No such user data found!");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    } else {
        // ලොග් වී නැත්නම් Login/Register පිටුවට යැවීම
        window.location.href = "register.html";
    }
});

// My Account Button Toggle Functionality (අවශ්‍ය නම් පමණි)
const myAccountBtn = document.getElementById('myAccountBtn');
const accountSection = document.getElementById('accountSection');

if (myAccountBtn && accountSection) {
    myAccountBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (accountSection.style.display === "none" || accountSection.style.display === "") {
            accountSection.style.display = "block";
            accountSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            accountSection.style.display = "none";
        }
    });
}

// Logout Functionality
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        signOut(auth).then(() => {
            alert("Logged out successfully!");
            window.location.href = "register.html";
        }).catch((error) => {
            console.error("Logout Error: ", error);
        });
    });
}