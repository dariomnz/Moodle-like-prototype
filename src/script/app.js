$(document).ready(function(){

    // Para el menu desplegable en el movil
    $("#menu_mov").slideUp();
    $(".menu_icon_mov").click(function(e) {
        $("#menu_mov").slideToggle();
    });
    $(".slide_menu_btn").click(function(e) {
        $("#menu_mov").slideToggle();
    });

    // El pop-up del calendario
    $(".pop_up_calendar").click(function( e ) {
        $("#calendar_screen").fadeToggle();
        $("#calendar_container").toggleClass("animate_zoom_in");
        if ($("#calendar_screen").css("display")=="block"){
            $("#calendar_screen").css("display","flex");
        }
        $("#calendar").simpleCalendar({
            
        // datos de los eventos
        events: [
            {
            //fecha de inicio
            startDate: new Date(2020,8,20),
            //fecha fin
            endDate: new Date(2020,8,20),
            //titulo
            summary: 'Fecha limite de tarea'
            },
            //evento 2
            {
            startDate: new Date(2020,8,15),
            endDate: new Date(2020,8,15),
            summary: 'Reunion de grupo'
            },
            //evento 3
            {
            startDate: new Date(2020,9,10),
            endDate: new Date(2020,9,10),
            summary: 'Nuevos videos subidos'
            },
            //evento 4
            {
            startDate: new Date(2020,9,9),
            endDate: new Date(2020,9,9),
            summary: 'Nuevo topico añadido'
            },
            //evento 5
            {
            startDate: new Date(2020,9,9),
            endDate: new Date(2020,9,9),
            summary: 'Nuevos mensajes en el foro'
            },
            //evento 6
            {
            startDate: new Date(2020,10,12),
            endDate: new Date(2020,10,12),
            summary: 'Examen tema 1'
            },
            
        ],
        //meses validos
        months: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
       //dias validos
        days: ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado']
        
        });
    });


    // Para mandar un mensaje por email
    $(".email_message").click(function(e){
        var email = $(this).parent().prev().html();
        var email_start = email.search("<strong>")+8;
        var email_end = email.search("</strong>");
        email = email.substring(email_start,email_end);
        window.location.href = "mailto:"+email;
    });

    //Para el boton de enviar mensajes en el foro
    $(".btn_send_message").click(function(e){
        var text = $(this).prev().val();
        if (text != "") {
            var date = new Date();
            $(this).prev().val("");
            //el mensaje  que se sube al foro con la foto de perfil y la hora
            $(this).prev().prev().prev().find("tbody").append(
                "<tr>"+
                "<td><img src=\"images/profile2.png\" alt=\"icon_profile2\" class=\"icon_student\"></td>"+
                "<td>"+$("#user_name").html()+"</td>"+
                "<td>"+date.getHours()+":"+date.getMinutes()+"<br>"+date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+"</td>"+
                "<td>"+text+"</td>"+
                "</tr>"
            );
        }
    });

    // Para el boton de enviar mensajes en la pagina de mensajes
    $("#btn_message").click(function(e){
        var text = $(this).prev().val();
        if (text != "") {
            var date = new Date();
            $(this).prev().val("");
            //cuerpo del mensaje  con el texto y la fecha
            $("#message_table").find("tbody").append(
                "<tr class=\"text_right\">"+
                    "<td>"+
                    "<div>"+
                    "<p>"+text+"</p>"+
                    "<p class=\"message_date\">"+date.getHours()+":"+date.getMinutes()+" - "+date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+"</p>"+
                    "</div>"+
                    "</td>"+
                    "</tr>"
            );
        }
    });

    //Para la grafica de grados

    //Tabla de estudiantes
    var ctx = $('#grades_grafic_student')[0].getContext('2d');
    var chart = new Chart(ctx, {
    //El tipo de chart queremos crear
    type: 'bar',

    //Grafica de las notas del alumno
    data: {
        //actividades calificadas
        labels: ['Examen 1', 'Quiz 1', 'Examen 2', 'Ejercicios'],
        datasets: [{
            label: 'Notas',
            backgroundColor: 'rgb(0, 223, 230)',
            borderColor: 'rgb(255, 99, 132)',
            data: [80, 60, 77, 58]
        }]
    },
    // Configuracion de las opciones 
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    min : 0,
                    max : 100
                }
            }]
        }
    }
    });

    //Grafica de las notas de los alumnos del profesor
    var ctx = $('#grades_grafic_profesor')[0].getContext('2d');
    var chart = new Chart(ctx, {
    // El tipo de  chart que queremos crear
    type: 'bar',

    //Los datos de la clase
    data: {
        //alumnos
        labels: ['ENRIQUE GALLEGOS', 'MARCOS BUZON','MARTIN PEDROSA', 'TOMAS DOMENECH','FRANCISCO CASAS','AGUSTIN ARRIETA','MARIA CRISTINA MILLAN','ROSA MARIA', 'GLORIA LUCENA','RICARDO FERRO'],
        datasets: [{
            label: 'Notas',
            backgroundColor: 'rgb(0, 223, 230)',
            borderColor: 'rgb(255, 99, 132)',
            //notas
            data: [90, 77, 20, 93, 81, 30, 20, 80, 70, 90]
        }]
    },
    // Configuracion de las opcines
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    min : 0,
                    max : 100
                }
            }]
        }
    }
    });
});

