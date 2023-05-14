window.onload = function(){
var botonRegistrarse = document.querySelector("#botonRegistrarse");

    emailjs.init('hH-x72tqJt99VuMK3');
    botonRegistrarse.addEventListener('click', enviarFormulario, false);
}


function enviarFormulario(evento){
    var nombre = document.querySelector("#nombre").value;
    var appellido = document.querySelector("#apellido").value;
    var correoElectronico = document.querySelector("#email").value;
    var contraseña = document.querySelector("#contraseña").value;
    var confirmarContraseña = document.querySelector("#confirmarContraseña").value;
    var fechaNacimiento = document.querySelector("#fechaNacimiento").value;

    var errorCamposVacios = validarCamposVacios(nombre, appellido, correoElectronico, contraseña, confirmarContraseña,fechaNacimiento);
    var errorCorreo = validarCorreo(correoElectronico);
    var errorContraseña = validarContraseña(contraseña,confirmarContraseña);
    var errorFechaNaciemiento = validarFechaNacimiento(fechaNacimiento);

    evento.preventDefault();
    botonRegistrarse.value = 'Enviando...';

   const serviceID = 'service_odza8ec';
   const templateID = 'template_lsdbl8d';

   if(errorCamposVacios){
        alert('Por favor completa los campos vacios');
    }else if(errorCorreo){
       alert('El correo electronico no es valido');
    }else if(errorContraseña){
       alert('Las contraseñas no son iguales');
    }else if(errorFechaNaciemiento){
       alert('La fecha de nacimiento no es valida');
    }else{
       emailjs.send(serviceID, templateID,{
        nombreDestinatario: nombre,
        apellidoDestinatario: appellido,
        correoElectronicoDestinatario: correoElectronico
       })
        .then(() => {
            botonRegistrarse.value = 'Registrarse';
          alert('Email de confirmacion enviado!');
        }, (err) => {
            botonRegistrarse.value = 'Registrarse';
          alert(JSON.stringify(err));
        });

        emailjs.send("service_odza8ec","template_in8p4yg",{
            nombreUsuario: nombre,
            apellidoUsuario: apellido,
            emailUsuario: correoElectronico,
        });
   }
}

function validarContraseña(contraseña, confirmarContraseña){
    if(contraseña != confirmarContraseña){
        return true;
    }
    return false;
}
function validarCamposVacios(nombre, appellido, correoElectronico, contraseña, confirmarContraseña, fechaNacimiento){
    console.log(nombre, appellido, correoElectronico, contraseña, confirmarContraseña, fechaNacimiento);
    if(nombre === "" || appellido === "" || correoElectronico === "" || contraseña === "" || confirmarContraseña === "" || fechaNacimiento == undefined){
        return true;
    }
    return false;

}

function  validarCorreo(correo){
    var emailValido =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if( !emailValido.test(correo) ){
		return true;
	}
    return false
}

function  validarFechaNacimiento(fechaNacimiento){
    var fecha = new Date()
    fechaNacimiento = new Date(fechaNacimiento);
    var fechaActual = fecha.getTime();
    if(fechaNacimiento.getTime() > fechaActual){
		return true;
	}
    return false
}



