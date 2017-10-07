


$(document).ready(function() {
    $('#hasAccount').click(function(event) {
        $('.modal1').modal('open')
    });
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        today: 'hoy',
        clear: 'Limpiar',
        close: 'Ok',
        closeOnSelect: false // Close upon selecting a date,
    });
    
   

    $('#form').submit(function(event){
        if($('#form').valid()){
          

             var formData = new FormData(this);

            $.ajax({
                url: '/register',
                type: 'POST',
                data: formData,
                success: function (data) {
                    window.location = data.url;
                },
                cache: false,
                contentType: false,
                processData: false,
                error: function(err) {
                    console.log('eror')
                    Materialize.toast('Correo ya registrado!', 2500, "center");
                    $('#toast-container').css({'bottom': '20%', 'left':($(window).width() - 206)/2  +'px'});
                }
            });

        }
        event.preventDefault();
    })
    $('select').material_select();
    $('select').change(function(evemt){
        $(this.attributes[2].value)[0].innerHTML="";
    })
    $('#date').change(function(evemt){
        $(this.attributes[3].value)[0].innerHTML="";
    })
    $.validator.setDefaults({
       ignore: []
    });
	 $("#form").validate({
        rules: {
        	name: {
                required: true
            },
        	lastName: {
                required: true
            },
            username: {
                required: true
            },
            email: {
                required: true,
                email:true
            },
            password: {
				required: true,
				minlength: 5
			},
			passwordC: {
				required: true,
				equalTo: "#password1"
			},
            gender:{required:true},
            date:{required:true},
            phoneNumber:{required:true}
        },
        //For custom messages
        messages: {
            name:{required: "Por favor introduzca un nombre"},
            lastName:{required:"Por favor introduzca su apellido"},
            username:{required:"Por favor introduzca un nombre de usuario"},
            email:{required:"Por favor introduzca su correo",email:"no es un email valido"},
            password:{required:"Por favor introduzca una contraseña",minlength:"muy corta"},
            passwordC:{required:"Por favor Repita su contraseña",equalTo:"No coinciden"},
            gender:{required:'Por favor indiquenos su genero'},
            date:{required:'Por favor indiquenos su fecha de nacimiento' },
            phoneNumber:{required:'Por favor indiquenos un numero de contacto' }    
        },
        errorElement : 'div',
        errorPlacement: function(error, element) {
          var placement = $(element).data('error');
          if (placement) {
            $(placement).append(error)
          } else {
            error.insertAfter(element);
          }
        }
     });	 	


});