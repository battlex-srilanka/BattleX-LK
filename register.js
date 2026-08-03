import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

// Switch Forms Function
window.switchForm = function(formType) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabBtns = document.querySelectorAll('.tab-btn');

    if (!loginForm || !registerForm) return;

    tabBtns.forEach(btn => btn.classList.remove('active'));

    if (formType === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        event.currentTarget.classList.add('active');
    } else {
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
        event.currentTarget.classList.add('active');
    }
}

// Sign Up Function (නිවැරදි කරන ලද Async/Await ක්‍රමය)
window.handleSignUp = async function() {
    const gamerName = document.getElementById('regName').value.trim();
    const ffUid = document.getElementById('regUid').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;

    if (!gamerName || !ffUid || !phone || !email || !password) {
        alert("කරුණාකර සියලුම විස්තර නිවැරදිව පුරවන්න!");
        return;
    }

    try {
        // 1. පරිශීලකයා Firebase Authentication මඟින් සාදා ගැනීම
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 2. Firestore Database එකේ ඩේටා Save වනතුරු සම්පූර්ණයෙන්ම රැඳී සිටීම (Await)
        await setDoc(doc(db, "users", user.uid), {
            gamerName: gamerName,
            ffUid: ffUid,
            phone: phone,
            email: email,
            createdAt: new Date().toISOString()
        });

        // 3. සාර්ථක වූ බවට පණිවිඩය පෙන්වීම
        alert("Account Created Successfully! Welcome, " + gamerName);
        
        // 4. ඩෑෂ්බෝඩ් එකට යැවීම
        window.location.href = "dashboard.html";

    } catch (error) {
        console.error("Registration Error: ", error);
        
        if (error.code === 'auth/email-already-in-use') {
            alert("මෙම ඊමේල් ලිපිනය දැනටමත් භාවිතයේ ඇත. කරුණාකර වෙනත් ඊමේල් ලිපිනයක් භාවිතා කරන්න හෝ Sign In වන්න.");
        } else if (error.code === 'auth/weak-password') {
            alert("මුරපදය ඉතා කෙටි වැඩියි. අක්ෂර 6කට වඩා වැඩි මුරපදයක් යොදන්න.");
        } else {
            alert("Registration Failed: " + error.message);
        }
    }
}

// Login Function
window.handleLogin = function() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        alert("කරුණාකර ඊමේල් ලිපිනය සහ මුරපදය ඇතුළත් කරන්න!");
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Logged in Successfully!");
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            console.error("Login Error: ", error);
            alert("Login Failed: වැරදි ඊමේල් ලිපිනයක් හෝ මුරපදයකි.");
        });
}