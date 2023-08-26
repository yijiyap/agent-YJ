import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js';
import { app } from './firebase.js';

export function handleSignUp(event) {
    event.preventDefault(); // Prevent form submission
    let auth = getAuth();
    let email = document.getElementById("signUpE").value;
    let password = document.getElementById("signUpP").value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            alert("Sign up successful!")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            alert(error.message);
            // ..
        });
}

export function handleSignIn(event) {
    event.preventDefault();
    let auth = getAuth();
    let email = document.getElementById("signInE").value;
    let password = document.getElementById("signInP").value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            alert("Sign In successful!")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(error.message);
        });
}