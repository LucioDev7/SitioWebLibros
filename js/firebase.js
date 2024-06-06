import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCpQtjSE-LJPhTH8hFG1QmOVMwK0YxjQ_Y",
    authDomain: "bibliotecalucio2023.firebaseapp.com",
    projectId: "bibliotecalucio2023",
    storageBucket: "bibliotecalucio2023.appspot.com",
    messagingSenderId: "751451779959",
    appId: "1:751451779959:web:81693b5928ee48996b6772"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
console.log(app);
console.log(auth);