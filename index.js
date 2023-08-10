
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { createToast, removeToast } from './toast/script.js';


const appSettings = {
    databaseURL:"https://gdscgmitcore-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const coreapplicationdb = ref(database, "coreapplications")

const name = document.getElementById("name");
const email = document.getElementById("email");
const usn = document.getElementById("usn");
const phone = document.getElementById("phone");

const q1 = document.getElementById("q1");
const q2 = document.getElementById("q2");
const q3 = document.getElementById("q3");
const q4 = document.getElementById("q4");
const q5 = document.getElementById("q5");

const tnc = document.getElementById("tnc");
const submit = document.getElementById("submit");

onValue(coreapplicationdb, function(snapshot) {
    if(snapshot.exists()) {
        let items = Object.entries(snapshot.val());
        console.log(items)
        console.log(items.length)
    } 
});

submit.addEventListener("click", function(e) {
    e.preventDefault();
    if(notempty(name.value) && notempty(email.value) && notempty(usn.value) && notempty(phone.value) && notempty(q1.value) && notempty(q2.value) && notempty(q3.value) && notempty(q4.value) && notempty(q5.value) && checked()) {
        if(ValidateEmail(email) && ValidatePhone(phone) && ValidateName(name) && ValidateUSN(usn)) {
            let a = usn.value.toUpperCase();
            let b = email.value.toLowerCase();
            push(coreapplicationdb, {Name: name.value, USN: a, Email: b, Phone: phone.value, Q1: q1.value, Q2: q2.value, Q3: q3.value, Q4: q4.value, Q5: q5.value});
            createToast("success", "Hurray!!! You've submitted");
            clearVal();
        }
    } else createToast("error", "Enter something 😤😤");
})

function checked() {
    if (!tnc.checked) {
        createToast("warning", "Check the checkbox!!!");
        return false; 
    } else return true;
}

function notempty(str){
    if(/^\s*$/.test(str)) return false;
    else return true;
}

function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value)) {
        return (true)
    }
    createToast("warning", "Enter valid email")
    return (false)
}
function ValidatePhone(phone) {
    if (/^(0|91)?[6-9][0-9]{9}$/.test(phone.value)) {
        return (true)
    }
    createToast("warning", "Enter valid phone")
    return (false)
}

function ValidateName(name) {   
    if (/^[A-Za-z\s]*$/.test(name.value)) {
        return (true)
    }
    createToast("warning", "Enter valid name")
    return (false)
}

function ValidateUSN(usn) {
    
    if (usn.value.length===10 && /^4(GM|gm|Gm|gM)[0-9]{2}[A-Za-z]{2}[0-9]{3}$/.test(usn.value)) {
        return (true)
    }
    createToast("warning", "Enter valid USN (Only GMITians)")
    return (false)
}


function clearVal() {
    name.value=''
    email.value=''
    usn.value=''
    phone.value=''
    q1.value=''
    q2.value=''
    q3.value=''
    q4.value=''
    q5.value=''
}
