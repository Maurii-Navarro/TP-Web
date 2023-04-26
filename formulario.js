//Mostrar el modal 
$(document).ready(function() {
    $("#contact-btn").click(function() {
      $("#contact-modal").modal("show");
    });
  });

  

  $(document).ready(function() {
    $("#cotizacion-btn").click(function() {
      $("#cotizacion-modal").modal("show");
    });
  });


  function generarPDF() {
    // Obtener los valores del formulario
    var nombre = document.getElementById('nombreProceso').value;
    var email = document.getElementById('emailProceso').value;
    var cantidad = document.getElementById('cantidad').value;
    var provincia = document.getElementById('provinciaProceso');
            var provinciaSelected = this.options[provincia.selectedIndex].text;
            var serviciosAdicionales = 0;

            if(document.getElementById("transporte").checked==true){
                serviciosAdicionales += 5000;
            }
            else{
              serviciosAdicionales = 0;
            }
              if(document.getElementById("excursiones").checked==true){
                serviciosAdicionales = serviciosAdicionales + 3500;
              }
              else{
                serviciosAdicionales = serviciosAdicionales ;
              }
            console.log(serviciosAdicionales);
      

            // Realizar cálculos para la cotización
            var subtotal = 20000 * cantidad + serviciosAdicionales;
            var impuesto = subtotal * 0.21; // Se asume un impuesto del 21%
            var total = subtotal + impuesto;


    // Crear un nuevo documento PDF
    var doc = new jsPDF();

    // Agregar contenido al PDF
    doc.text(20, 20, 'Formulario de ejemplo');
    doc.text(20, 30, 'Nombre: ' + nombre);
    doc.text(20, 40, 'Email: ' + email);
    doc.text(20, 50, 'Provincia a viajar: ' + provinciaSelected);
    doc.text(20, 60, 'Cantidad de personas: ' + cantidad);
    doc.text(20, 70, 'Subtotal: ' + subtotal);
    doc.text(20, 80, 'Impuesto: ' + impuesto);
    doc.text(20, 90, 'Total a pagar: ' + total);
    // Guardar el PDF como un archivo
    doc.save('formulario.pdf');
  } 
   
// Envio de formulario de proceso y contacto 

  document.addEventListener('DOMContentLoaded', function() {
    // Configurar reglas de validación y mensajes de error usando jQuery validation
    $('#formularioProceso').validate({
        rules: {
            nombreProceso: 'required',
            emailProceso: 'required',
            provinciaProceso: 'required',
            cantidad: 'required'
        },
        messages: {
            nombreProceso: 'Por favor ingrese su nombre',
            emailProceso: 'Por favor ingrese el precio',
            provinciaProceso:'Por favor seleccione la provincia a viajar',
            cantidad: 'Por favor ingrese la cantidad'
        },
        submitHandler: function(form) {
            // Obtener los valores de los campos del formulario
            var nombre = document.getElementById('nombreProceso').value;
            var email = document.getElementById('emailProceso').value;
            var cantidad = document.getElementById('cantidad').value;
            var provincia = document.getElementById('provinciaProceso');
            var provinciaSelected = this.options[provincia.selectedIndex].text;
            var serviciosAdicionales = 0;

            if(document.getElementById("transporte").checked==true){
                serviciosAdicionales += 5000;
            }
            else{
              serviciosAdicionales = 0;
            }
              if(document.getElementById("excursiones").checked==true){
                serviciosAdicionales = serviciosAdicionales + 3500;
              }
              else{
                serviciosAdicionales = serviciosAdicionales ;
              }
            console.log(serviciosAdicionales);
      

            // Realizar cálculos para la cotización
            var subtotal = 20000 * cantidad + serviciosAdicionales;
            var impuesto = subtotal * 0.21; // Se asume un impuesto del 21%
            var total = subtotal + impuesto;

            // Generar el resumen de la cotización
            var cotizacion = 'Cotización:\n\n' +
                'Nombre: ' + nombre + '\n' +
                'email: ' + email + '\n' +
                'Cantidad de personas: ' + cantidad + '\n' +
                'Provincia a viajar: ' + provinciaSelected + '\n' +
                'Subtotal: $' + subtotal + '\n' +
                'Impuesto (21%): $' + impuesto + '\n' +
                'Total: $' + total;

            // Mostrar la cotización en un cuadro de diálogo
            alert(cotizacion);

            // Continuar con el resto del código de generación del PDF y descarga del archivo, si es necesario
            // ...
            // Crear un nuevo objeto jsPDF
            var pdf = new jsPDF();

            // Agregar el resumen al documento PDF
            pdf.text(cotizacion, 10, 10);

            // Generar el archivo PDF como Blob
            var pdfBlob = pdf.output('blob');

            // Crear un enlace de descarga
            var downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(pdfBlob);
            downloadLink.download = 'resumen_proceso.pdf';
            downloadLink.click();

            // Liberar el objeto Blob
            URL.revokeObjectURL(pdfBlob);
        
        }
    });
    $('#formularioContacto').validate({
      rules:{
        nombre:{
          required: true,
          minlenght: 4,
        },
        email: {
          required: true,
          email: true,
        },
        provincia:{
          required: true,
        },
        ciudad:{
          required: true,
          minlenght: 3,
        },
        
        mensaje: 'required'
      },
      messages: {

        nombre:{
          required: "Por favor, introduzca un nombre",
          minlenght:"el nombre es muy corto"
        },
  
        email:{
        required: "Por favor, introduzca un email",
        email:"Por favor, introduce una dirección de correo electrónico válida"
      },

      mensaje:'Por favor ingrese el motivo del contacto'
      
      },
      submitHandler: function(form) {

        // Obtener los valores de los campos del formulario
        var nombre = $('#nombre').val();
        var email = $('#email').val();
        var provincia = $('#provincia').val();
        var mensaje = $('#mensaje').val();

        // Hacer la petición AJAX para enviar los datos al servidor
        $.ajax({
            url: 'https://reqres.in/api/users', // URL de regres.in para la petición de contacto
            method: 'POST', // Método HTTP POST
            data: {
                nombre: nombre,
                email: email,
                provincia: provincia,
                mensaje: mensaje
            },
            success: function(response) {
                // Aquí puedes manejar la respuesta del servidor si es necesario
                console.log('Éxito:', response);
                // Puedes mostrar un mensaje de éxito al usuario
                alert('¡Mensaje enviado con éxito!');
            },
            error: function(xhr, status, error) {
                // Aquí puedes manejar los errores de la petición AJAX si es necesario
                console.error('Error:', error);
                // Puedes mostrar un mensaje de error al usuario
                alert('Error al enviar el mensaje. Por favor inténtelo nuevamente.');
            }
        });
  
      }
  
    });
  
  });

   function generarPDF() {
    // Obtener los valores del formulario
    var nombre = document.getElementById('nombreProceso').value;
    var email = document.getElementById('emailProceso').value;
    var cantidad = document.getElementById('cantidad').value;
    var provincia = document.getElementById('provinciaProceso');
            var provinciaSelected = this.options[provincia.selectedIndex].text;
            var serviciosAdicionales = 0;

            if(document.getElementById("transporte").checked==true){
                serviciosAdicionales += 5000;
            }
            else{
              serviciosAdicionales = 0;
            }
              if(document.getElementById("excursiones").checked==true){
                serviciosAdicionales = serviciosAdicionales + 3500;
              }
              else{
                serviciosAdicionales = serviciosAdicionales ;
              }
            console.log(serviciosAdicionales);
      

            // Realizar cálculos para la cotización
            var subtotal = 20000 * cantidad + serviciosAdicionales;
            var impuesto = subtotal * 0.21; // Se asume un impuesto del 21%
            var total = subtotal + impuesto;


    // Crear un nuevo documento PDF
    var doc = new jsPDF();

    // Agregar contenido al PDF
    doc.text(20, 20, 'Formulario de ejemplo');
    doc.text(20, 30, 'Nombre: ' + nombre);
    doc.text(20, 40, 'Email: ' + email);
    doc.text(20, 50, 'Provincia a viajar: ' + provinciaSelected);
    doc.text(20, 60, 'Cantidad de personas: ' + cantidad);
    doc.text(20, 70, 'Subtotal: ' + subtotal);
    doc.text(20, 80, 'Impuesto: ' + impuesto);
    doc.text(20, 90, 'Total a pagar: ' + total);
    // Guardar el PDF como un archivo
    doc.save('formulario.pdf');
  } 