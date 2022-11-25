// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuY4hbqPOUT_TMsZBoKC9tf47qnPGmbL4",
  authDomain: "slider-171b9.firebaseapp.com",
  projectId: "slider-171b9",
  storageBucket: "slider-171b9.appspot.com",
  messagingSenderId: "988157160800",
  appId: "1:988157160800:web:1453741888fb4baf2a4205",
  measurementId: "G-TPGN2ZNPCG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

var email = document.getElementById("email");
var password = document.getElementById("password");
window.login = function (e) {
  e.preventDefault();
  var obj = {
    email: email.value,
    password: password.value,
  };

  signInWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function (success) {
      console.log(success.user.uid);
      window.location.replace('todo.html')
      alert("You Successfully Login ")
    })
    .catch(function (err) {
      alert(err);
    });

  console.log(obj);
}