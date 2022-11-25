


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  push,
  onChildAdded,
  onValue,
  onChildRemoved,
  remove


} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js"
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
const database = getDatabase();


var arr = [];
var todoInp = document.getElementById("todoInp");
var parent = document.getElementById("parent");
var editid;


window.addTask = function (e) {
  e.preventDefault();
  var obj = {
    task: todoInp.value,
    time: `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()} T ${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}`,
    userName: "ABC",
  };

  arr.push(obj);
  renderUL();
};

window.logout = function () {
  signOut(auth)
    .then(function () {
      console.log("Logout Successfully");
      window.location.href = "login.html";
    })
    .catch(function (err) {
      console.log(err);
    });
};

function checkAuthentication() {
  onAuthStateChanged(auth, function (user) {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log(uid);
      // ...
    } else {
      // User is signed out
      // ...
      window.location.href = "login.html";
      alert("Successfully you Logout")
    }
  });
}
checkAuthentication();




var inp = document.getElementById("task")

window.sendtodo = function () {
  var obj = {
    task: inp.value,
    date: JSON.stringify(new Date()),

  };
  const keyRef = ref(database, 'todotask')
  obj.id = push(keyRef).key;
  const refrences = ref(database, `todotask/${obj.id}/`);

  set(refrences, obj)
  alert("your Todo send successfully")
  console.log(obj.id)
  console.log(obj)


}
var list = []


function renderData() {
  const refrences = ref(database, `todotask/`);
  var parent = document.getElementById('parent')

  parent.innerHTML = "";
  for (var i = 0; i < list.length; i++) {
    
    parent.innerHTML += `<li>${list[i].task}</br><span class='chip'>${list[i].date}</span><button onclick="deltask()">Del</button><button onclick="editask(${list[i].task} , ${list[i].id})">Edit</button></li>`

  }

}



window.getdata = function () {

  const taskRef = ref(database, 'todotask/');
  onChildAdded(taskRef, function (data) {
    list.push(data.val());
    console.log(data.val());
    renderData();
  });

}

window.delall = function () {
  const refrences = ref(database, `todotask/`)
  var parent = document.getElementById('parent')
  var li = document.getElementById('li')
  console.log(refrences)


}


window.deltask = function () {
  remove(ref(database, "todotask/"))
    .then(() => {
    })
    .catch((error) => {
      alert("error" + error)
    })
  event.target.parentNode.remove()
}




window.editask = function(y){
    let Value = prompt("Please Enter Change Value",y.parentElement.value)
    let UID = y.parentElement.getAttribute("id")
  const REF = ref(database, `todotask/${UID}`);
  update(REF,{
    task: Value,
  })
  .then(()=>{
    alert("data Update successfully ")
    var parent = document.getElementById('parent')
    parent.innerHTML=""
    // delTask();
    // getdata()
  })
  .catch((error)=>{
     alert("error"+error)
  })
// console.log()
  
}

// the Second method of value
// onValue(ref(database, '/QUIZ/'), (snapshot) => {
//   console.log(snapshot.val())
// });