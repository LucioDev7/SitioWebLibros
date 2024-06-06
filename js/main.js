import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import { auth } from "./firebase.js";

import "./formIniciarSesion.js"
import "./formRegistro.js"

onAuthStateChanged (auth, async (user)=>{
    alert(user);
})