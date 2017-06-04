// JavaScript Document
/***
Fecha: 			Octubre 21 de 2015
Decripcion:		Script para conectarse a una webservice enviandoles como parametros unos datos en JSON y generando una 		respuesta que sera retornada en la funcion que hace la conexion

**/
/*
	Funcion para realizar la conexion al webservice, sirve como modelo para realizar la conexion a distintos webservice
*/
function EnviarDatos(ArrayDatos, url, operacion){
	
	//localStorage.removeItem("Resultado");
	
	$.ajax({
		url:url,
		async:"false",
		type:"POST",
		data:ArrayDatos,
		beforeSend: function(jqXHR, settings){
			//spinnerplugin.show();
		},
		success: function(data){
			//spinnerplugin.hide();
			//Guarda el resultado en una localstorage
			localStorage.setItem("Resultado",data);
			
			//Llama a la funcion para validar el resultado
			ValidarResultado(operacion);
		},
		error: function ( jqXHR, textStatus, errorThrown ){
			console.log(errorThrown);
		}
	});	
}

/***
Fecha: 			Octubre 21 de 2015
Decripcion:		Script para subir una foto a un servidor

**/

/*
	Funcion para realizar la conexion al webservice, sirve como modelo para realizar la conexion a distintos webservice
*/
function SubirFoto(ArrayDatos, url, operacion){
	
	localStorage.removeItem("Resultado");
	
	$.ajax({
		url:url,
		async:"false",
		type:"POST",
		data:ArrayDatos,
		contentType:false,
		processData:false,
		success: function(data){
			//Guarda el resultado en una localstorage
			localStorage.setItem("Resultado",data);
			
			//Llama a la funcion para validar el resultado
			ValidarResultado(operacion);
		},
		error: function ( jqXHR, textStatus, errorThrown ){
			console.log(errorThrown);
		}
	});
	
}


//Funcion para validar las acciones con respecto al resultado que dio la conexion al webserive dependiendo de la operacion que se este realizando
function ValidarResultado(operacion){
	
	switch(operacion){
		case "CREARREGISTRO": 
			var resultado = localStorage.getItem("Resultado"); 
			console.log(resultado + " - " + operacion); 
			
			var jsonUsuario = JSON.parse(resultado);
			if($.trim(resultado) != "[]"){
				if(jsonUsuario[0].TipoRegistro == "ENTRADA"){
					//alertify.success("Bienvenido(a) " + jsonUsuario[0].primerNombre + " " + jsonUsuario[0].segundoNombre + " " + jsonUsuario[0].primerApellido + " " + jsonUsuario[0].segundoApellido);	
					//setTimeout(Escanear(), 10000);				
					//alert("Bienvenido(a) " + jsonUsuario[0].primerNombre + " " + jsonUsuario[0].segundoNombre + " " + jsonUsuario[0].primerApellido + " " + jsonUsuario[0].segundoApellido);
					$("#pMensaje").html("Bienvenido(a) " + jsonUsuario[0].primerNombre + " " + jsonUsuario[0].segundoNombre + " " + jsonUsuario[0].primerApellido + " " + jsonUsuario[0].segundoApellido);
					$('#popup').fadeIn('slow');
					window.setTimeout(function() {
						$('#popup').fadeOut('slow');	
						Escanear();
					}, 3000);
				}else{
					if(jsonUsuario[0].CodigoConfirmacion == "1"){
						//alertify.success("Adios " + jsonUsuario[0].primerNombre + " " + jsonUsuario[0].segundoNombre + " " + jsonUsuario[0].primerApellido + " " + jsonUsuario[0].segundoApellido);
						//setTimeout(Escanear(), 10000);			
						//alert("Adios " + jsonUsuario[0].primerNombre + " " + jsonUsuario[0].segundoNombre + " " + jsonUsuario[0].primerApellido + " " + jsonUsuario[0].segundoApellido);
						$("#pMensaje").html("Adios " + jsonUsuario[0].primerNombre + " " + jsonUsuario[0].segundoNombre + " " + jsonUsuario[0].primerApellido + " " + jsonUsuario[0].segundoApellido);
						$('#popup').fadeIn('slow');
						window.setTimeout(function() {
							$('#popup').fadeOut('slow');	
							Escanear();
						}, 3000);
					}else{
						//alertify.error(jsonUsuario[0].primerNombre + " " + jsonUsuario[0].segundoNombre + " " + jsonUsuario[0].primerApellido + " " + jsonUsuario[0].segundoApellido + " no tiene permiso para salir a esta hora.<br>Si tiene permiso falta tiempo para poder salir");
						//setTimeout(Escanear(), 10000);
						//alert(jsonUsuario[0].primerNombre + " " + jsonUsuario[0].segundoNombre + " " + jsonUsuario[0].primerApellido + " " + jsonUsuario[0].segundoApellido + " no tiene permiso para salir a esta hora. Si tiene permiso falta tiempo para poder salir");
						$("#pMensaje").html(jsonUsuario[0].primerNombre + " " + jsonUsuario[0].segundoNombre + " " + jsonUsuario[0].primerApellido + " " + jsonUsuario[0].segundoApellido + " no tiene permiso para salir a esta hora. Si tiene permiso falta tiempo para poder salir");
						$('#popup').fadeIn('slow');
						window.setTimeout(function() {
							$('#popup').fadeOut('slow');								
							Escanear();
						}, 3000);
						
					}
				}
			}else{
				//alertify.error("Credencial no existe o esta actualmente inactiva");	
				//setTimeout(Escanear(), 10000);
				//alert("Credencial no existe o esta actualmente inactiva");
				$("#pMensaje").html("Credencial no existe o esta actualmente inactiva");
				$('#popup').fadeIn('slow');
				window.setTimeout(function() {	
					$('#popup').fadeOut('slow');							
					Escanear();
				}, 3000);
			}
			
			
		break;
		
	}
	
}
// alert dialog dismissed
function alertDismissed() {
	// do something
	Escanear();
}