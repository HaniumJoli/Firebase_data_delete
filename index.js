// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJNjAZbscs2bQkuomNzcf36nL63QQZgwc",
  authDomain: "jollypdf-23277.firebaseapp.com",
  databaseURL: "https://jollypdf-23277-default-rtdb.firebaseio.com",
  projectId: "jollypdf-23277",
  storageBucket: "jollypdf-23277.appspot.com",
  messagingSenderId: "642935073639",
  appId: "1:642935073639:web:36244730ac72fe16b79dc2",
  measurementId: "G-CSKE3YDC8S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);
const auth = getAuth(app);

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const deleteUser = async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        await auth.signInWithEmailAndPassword(email, password);
        await deleteAccount();
        await auth.signOut();
        alert('User deleted');
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}

function deleteAccount() {
    const user = auth.currentUser;
    const uid = user.uid;
    const profilePicRef = storage.ref(`profilepics/${uid}.jpg`);

    return Promise.all([
        profilePicRef.delete().then(() => console.log('Profile pic deleted')).catch(console.error),
        db.ref(`users/${uid}`).remove().then(() => console.log('User data deleted')).catch(console.error),
        user.delete().then(() => console.log('User deleted')).catch(console.error)
    ]);
}

document.getElementById('delete').addEventListener('click', deleteUser);
