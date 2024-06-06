import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

const formIniciarSesion=document.getElementById("IniciarSesionForm")

//configuramos la escucha del evento submit, para que se ejecute el siguiente código
formIniciarSesion.addEventListener("submit",async (e)=>{
    e.preventDefault();
    const email=formIniciarSesion['txtEmail'].value;
    const password=formIniciarSesion['txtPassword'].value;
    try {
        //inicio de sesion del usuario
        var credencialesUsuario=await signInWithEmailAndPassword(auth, email, password);
        
        //tomamos la referencia de la ventana modal
        const ventanaIniciarSesion=document.getElementById('iniciarSesionModal');
        const modal=bootstrap.Modal.getInstance(ventanaIniciarSesion);
        
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