import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

const formRegistro=document.getElementById("registroform")

//configuramos la escucha del evento submit, para que se ejecute el siguiente código
formRegistro.addEventListener("submit",async (e)=>{
    e.preventDefault();
    const email=formRegistro['txtEmail'].value;
    const password=formRegistro['txtPassword'].value;
    try {
        //creamos el usuario
        await createUserWithEmailAndPassword(auth, email, password);
        
        //tomamos la referencia de la ventana modal
        const ventanaRegistro=document.getElementById('registrarseModal');
        const modal=bootstrap.Modal.getInstance(ventanaRegistro);
        
        //ocultamos la ventana
        modal.hide(); 
    } catch (error) {
        console.log(error.code);
        
        Toastify({
            text: "Ocurrió un error:"+error.code,
            duration: 3000,
            gravity: 'bottom',
            position: 'right',
            style: {
                background: '#FF4136'
            }
            }).showToast();
    }
    

})