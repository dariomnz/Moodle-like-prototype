
// Para poner las cookies
function _setCookie(cname,cvalue,exdays=365,has_exdays=true) {
	//si no ha expirado poner los valores del formulario
	if (has_exdays) {
		var d = new Date();
		//tiempo tiene la cookie
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires=" + d.toGMTString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	//si ha expirado
	} else {
		var expires = "expires=";
		//quitar los valores
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
}
//sguardar la cookie
function setCookie(name,dict_value,exdays=30){
    var myJSON = JSON.stringify(dict_value);
    _setCookie(name,myJSON,exdays);
}
 //obtener datos de la coolie 
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
	//recorrer la cookie
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		//bucle mientras haya espacios
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
		}
		//si es lo que queremos, lo devolvemos
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}
//comprobar si hay cookies
function hasCookie(name){
    if (getCookie(name) == ""){
        return false;
    }
    return true;
}
//obtener documento de la cookie
function getDictCookie(cname){
    var myJSON = getCookie(cname);
    if (myJSON == ""){
        return "";
    }
    return JSON.parse(myJSON);
}





var user_email = "";

// Para cambiar la columna central
var actual_center = "nav_subjects";
//Cambiar la columna central
function change_center_to(name){
	//ocutal la existente
	$("#menu_mov").hide();
    //mostrar la nueva
	$("#"+actual_center).toggle();
	$("#"+name).toggle();
	actual_center = name;
};

//Para la animaciond de los botones en el login
function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}
//Para terminar las animaciones del los botones de login
function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}



//Botones del login
function btn_login(){
	var can_login = false;
	//obtener valores introducidos
	var login_email = $("#login_email").val();
	var login_password = $("#login_password").val();
	//variables de control
	var is_valid_email = true;
	var is_valid_password = true;

	// Check if the email is already register
	//ver si no tengo el email en la cookie
	if (! hasCookie(login_email)) {
		
		var input = document.getElementById("login_email");
		//si no hay email manda mensaje de error
		input.setCustomValidity('El email no esta registrado.');
		input.reportValidity();
		is_valid_email = false;
		
	}
	//Comprobar que el email no esta vacio
	if (login_email == "") {
		var input = document.getElementById("login_email");
		//Mensaje de error al no haber email
		input.setCustomValidity('Introduce un email.');
		input.reportValidity();
		is_valid_email = false;
	}
	//Obtener la contraseña
	var user_dict = getDictCookie(login_email)
	//ver si la contraseña no esta vacia
	if (login_password == "") {
		var input = document.getElementById("login_password");
		//Mensaje de error al no haber
		input.setCustomValidity('Introduce una contraseña.');
		input.reportValidity();
		is_valid_password = false;
	}
	//comprobar si la contraseña introducida es la de la cookie
	if (login_email == user_dict["register_email"]){
		
		
		if (login_password == user_dict["register_password"]) {
			can_login = true;
		}
		//Si no es correcta mandar mensaje de eror
		else{
			var input = document.getElementById("login_password");
		
			input.setCustomValidity('La contraseña es incorrecta.');
			input.reportValidity();
			is_valid_password = false;
		}
	}
	//conprobar el email era valido
	if (is_valid_email) {
		$("#login_email").parent().parent().removeClass("wrong_var");
	} else {
		$("#login_email").parent().parent().addClass("wrong_var focus");
	}
    //comprobar la contraseña era valida
	if (is_valid_password) {
		$("#login_password").parent().parent().removeClass("wrong_var");
	} else {
		$("#login_password").parent().parent().addClass("wrong_var focus");
	}
    //ver si puedo iniciar sesion
	if (can_login) {
		user_email = user_dict["register_email"]
		// Animacion para quitar el formulario
		$(".login_container").removeClass("animate_zoom_in");
		$(".login_container").addClass("animate_zoom_out");
		$(".login_container").animate([{}],300, function(){
			$("#login_screen").hide();
			$("#web_screen").show();
			
			$(".login_container").removeClass("animate_zoom_out");
			$(".login_container").addClass("animate_zoom_in");
		});
		//Fin de la animacion

		on_login();

		// Reiniciar los valores de la pantalla
		$("#login_email").val("");
		$("#login_email").parent().parent().removeClass("focus");
		$("#login_password").val("");
		$("#login_password").parent().parent().removeClass("focus");

		// Poner valores a la cookie de login
		_setCookie("auto_login",user_email,0,false);
	}
}
//Boton para cerrar sesion
function btn_logout(){
	$("#logout_screen").css("display","flex");
	
	$("#menu_mov").hide();
}
//Boton para confirmar quiero cerrar sesion
function btn_confirm_logout(){
	$("#web_screen").hide();
	$("#home_screen").show();
	$("#logout_screen").hide();
	
	// quitar la cookie de auto_login
	_setCookie("auto_login","false",0);
}
//Boton para ir a login
function btn_go_login(){
	$("#web_screen").hide();
	$("#home_screen").hide();
	$("#register_screen").hide();
	$("#logout_screen").hide();
	$("#login_screen").css("display","flex");
}
//Boton para cancelar el cerrado de sesion
function btn_cancel_logout(){
	$("#logout_screen").hide();
}
//Boton para registrarse, muestra formulario registro
function btn_register_page(){
	$("#login_screen").hide();
	$("#register_screen").css("display","flex");
	$(".login_container").addClass("animate_zoom_in");
}

//Boton par registrarse
function btn_register(){
	var is_complete = true;
	//Variable con valores
	var var_dict = {"register_name":0,"register_nia":0,"register_password":0,
	"register_name_surnames":0,"register_email":0,"register_bdate":0,"register_dni":0,
	"register_rol":0,"register_grade":0,"register_university":0,"register_language":0};
	//Rellenar valores del usuario
	Object.keys(var_dict).forEach(element => {
		var_dict[element] = $("#"+element).val()
	});
	//Datos necesita el formulario
	var var_required = [
		"register_name","register_nia","register_password","register_name_surnames",
		"register_email","register_bdate","register_dni","register_rol",
		"register_grade","register_university"
	];

	// Comprobar que los atributos son conrrectos
	var_required.forEach(element => {
		var is_valid = true;
		var input = document.getElementById(element);
		// Para el valor del Nia
		if (element == "register_nia"){
			var num = parseInt(var_dict[element]);
			//Ver si el numero no es correcto
			if (num < 100000000 || num > 100999999){
				input.setCustomValidity('El numero tiene que empezar por 100 y tener 9 digitos.');
				is_complete = false;
				is_valid = false;
			}
			else {
				input.setCustomValidity('');
				
			}
		}
		// Para el valor de la contraseña
		else if (element == "register_password"){
			var password = var_dict[element];
			//comprobar longitud de la contrasela
			if (password.length > 8){
				input.setCustomValidity('La contraseña solo puede tener 8 caracteres o menos.');
  				
				is_complete = false;
				is_valid = false;
				//ver si la contraseña cumple formato de letras y numeros
			}else if (! /^[a-z0-9]+$/.test(password)){
				input.setCustomValidity('La contraseña solo puede tener letras minusculas o numeros.');
  				
				is_complete = false;
				is_valid = false;
			}
			else {
				input.setCustomValidity('');
				
			}
		}
		// Para el valor del email
		else if (element == "register_email"){
			var email = var_dict[element];
			//ver que el formato es el correcto
			if (! /\S+@\S+\.\S+/.test(email)){
				input.setCustomValidity('El correo electronico tiene que tener la estructura: nombre@dominio.extensión');
  				 
				is_complete = false;
				is_valid = false;
				//comprobar que no este registrado todavia
			}else if (hasCookie(email)) {
				input.setCustomValidity('El correo electronico ya esta registrado.');
  				 
				is_complete = false;
				is_valid = false;
			}
			else {
				input.setCustomValidity('');
				 
			}
		}
		//Valor de la fecha de nacimiento
		else if (element == "register_bdate"){
			var bdate = Date.parse(var_dict[element]);
			var today = new Date();
			//ver que la fecha es correcta
			if (bdate>=today.getTime()){
				input.setCustomValidity('La fecha tiene que ser menor al dia actual.');
  				 
				is_complete = false;
				is_valid = false;
			}
			else {
				input.setCustomValidity('');
				 
			}
		}
		// Para el valor del DNI
		else if (element == "register_dni"){
			var dni = var_dict[element];
			//comprobar son 8 numeros seguidos de una letra
			if (! /^([0-9]{8})*[a-zA-Z]+$/.test(dni)){
				input.setCustomValidity('El DNI no es valido.');
  				 
				is_complete = false;
				is_valid = false;
			}
			//si el formato es correcto, comprobar que la letra es correcta
			else {
				var numero = dni.substr(0,dni.length-1);
				var leter = dni.substr(dni.length-1,1).toUpperCase();
				numero = numero % 23;
				var letra='TRWAGMYFPDXBNJZSQVHLCKET';
				letra = letra.substring(numero,numero+1);
				//si la letra no coincide mandar mensaje de error
				if (letra!=leter){
					input.setCustomValidity('La letra del DNI no concuerda.');
					 
					is_complete = false;
					is_valid = false;
				}else {
					input.setCustomValidity('');
					 
				}
			}
		}

		//Si el rol es un estudiante, ver si ha puesto el grado
		if (! (element == "register_grade" && var_dict["register_rol"] != "Estudiante")) {
			// Ver si faltan elementos
			if (var_dict[element] == ""){
				input.setCustomValidity('Este campo tiene que estar completo.');

				is_complete = false;
				is_valid = false;
			}else{
				if (is_valid) {
					input.setCustomValidity("");
				}
			}
		}
		
		//ver si el formulario es valido
		if (is_valid) {
			$("#"+element).parent().parent().removeClass("wrong_var");
		} else {
			$("#"+element).parent().parent().addClass("wrong_var focus");
		}


	});

	// Comprobar se ha marcado la aceptacion de condiciones
	if (! $("#register_conditions").prop("checked")) {
		is_complete = false;
					
		$("#register_conditions").parent().parent().addClass("wrong_var focus");
	} else {
		$("#register_conditions").parent().parent().removeClass("wrong_var");
	}

	
//si esta completo el formulario, registrar al usuario
	if (is_complete){
		setCookie(var_dict["register_email"],var_dict);

		on_login(var_dict);

		// Rellenar cookie auto_login
		_setCookie("auto_login",var_dict["register_email"],0,false);
		
		//pcultar pagina registro y mostrar web
		$("#register_screen").hide();
		$("#web_screen").show();

		clear_register();
	}
}
//Vaciar el formulario
function clear_register(){
	var register_vars = ["register_name","register_nia","register_password",
	"register_name_surnames","register_email","register_bdate","register_dni",
	"register_rol","register_grade","register_university","register_language"];
	
	// Borrar los valores escritos
	register_vars.forEach(element => {
		if (element != "register_university") {
			$("#"+element).val("");
			$("#"+element).parent().parent().removeClass("focus");
		}
	});
	//reiniciar variables
	$("#register_conditions").prop("checked",false);
	$("#register_conditions").parent().parent().removeClass("focus");
	$("#register_grade").parent().parent().hide();
}
//funcion para poner la pagina web con datos usuario
function on_login(user_data = ""){
	// Poner los datos del usuaro

	// Si no tenemos valor, cogerlos de la cookie
	if (user_data == "") {
		var user_data = getDictCookie(user_email);
	}

	// Poner la columna central por defecto
	change_center_to("nav_subjects");


	// Poner el nombre del usuario
	var user_name = user_data["register_name_surnames"];
	$("#user_name").html(user_name);
	console.log(user_name)

	// Comprobar si es alumno o profesor
	var user_rol = user_data["register_rol"];
	if (user_rol=="Estudiante") {
		$(".for_profesor").hide();
		$(".for_student").show();
	}else{
		$(".for_student").hide();
		$(".for_profesor").show();
	}
}

$(document).ready(function(){
	// Para la cookie de auto_login
	user_email = getCookie("auto_login");
	if (user_email != "") {
		on_login();

		$("#home_screen").hide();
		$("#web_screen").show();
	}else{
		$("#home_screen").show();
	}
	

//mostrar los datos de la pagina
	$(".input").on("focus",addcl);
	$(".input").on("blur",remcl);
	$(".input").on("input", function(){
		this.setCustomValidity("");
		this.parentElement.parentElement.classList.remove("wrong_var");
	});

	$("#btn_login").click(function (e) {
		btn_login();
	});
	$("#btn_register_page").click(function (e) {
		btn_register_page();
	});
	$("#btn_register").click(function (e) {
		btn_register();
	});

	$("#btn_errase_register").click(function (e) {
		clear_register();
	});

	$("#btn_back_register").click(function (e) {
		btn_go_login();
	});

	$("#btn_back_home").click(function (e) {
		btn_confirm_logout();
	});
	

	$("#register_rol").on("change", function(){
		if($("#register_rol").val() == "Estudiante"){
			$("#register_grade").parent().parent().slideDown();
			$("#register_grade").parent().parent().css("display","grid");
		}else{
			$("#register_grade").parent().parent().slideUp();
		}
	});

	$(".btn_logout").click(function (e) {
		btn_logout();
	});

	$("#btn_confirn_logout").click(function (e) {
		btn_confirm_logout();
	});

	$("#btn_cancel_logout").click(function (e) {
		btn_cancel_logout();
	});

	//En la pagina home para entrar
	$("#btn_go_login").click(function (e) {
		btn_go_login();
	});

	// Para el cambio de columna central

	//columna de los mensajes
	$(".nav_messages").click(function (e) {
		change_center_to("nav_messages");
	});
	//columna de los ejercicios entregados
	$(".nav_uploader").click(function (e) {
		change_center_to("nav_uploader");
	});
	$(".nav_uploader_edit").click(function (e) {
		change_center_to("nav_uploader_edit");
	});
	//columna de las asignaturas
	$(".nav_subjects").click(function (e) {
		change_center_to("nav_subjects");
	});
	//columna de la asigntarua
	$(".nav_subject").click(function (e) {
		change_center_to("nav_subject");
	});
	//columna del formulario de la asignatura
	$(".nav_form_subject").click(function (e) {
		change_center_to("nav_form_subject");
	});
	//columna de los grupos
	$(".nav_groups").click(function (e) {
		change_center_to("nav_groups");
	});
	//columna del foro
	$(".nav_forum").click(function (e) {
		change_center_to("nav_forum");
	});
	//columna de cada foro
	$(".nav_forum_1").click(function (e) {
		change_center_to("nav_forum_1");
	});
	$(".nav_forum_2").click(function (e) {
		change_center_to("nav_forum_2");
	});
	$(".nav_forum_3").click(function (e) {
		change_center_to("nav_forum_3");
	});
	$(".nav_forum_4").click(function (e) {
		change_center_to("nav_forum_4");
	});
	$(".nav_forum_5").click(function (e) {
		change_center_to("nav_forum_5");
	});
	//columna de las notas
	$(".nav_grades").click(function (e) {
		change_center_to("nav_grades");
	});




	// Para descargar un excel con las notas
    $(".btn_download").click(function (e){
		//tablas necesarias
		var download_table;
        var table1 = $(this).prev();
		var table2 = $(this).prev().prev();
		var user_data = getDictCookie(user_email);
		//comprobar rol del usuario para dar la tabla adecuada
        if (user_data["register_rol"] == "Estudiante") {
            download_table = table1;
		}else if (user_data["register_rol"] == "Profesor") {
			download_table = table2;
		}
		//descarga de la tabla
        download_table.tableExport({
            filename:'notas.xls',
            escape:'false',
            htmlContent:'true'
        });
    });
});
