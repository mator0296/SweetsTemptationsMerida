$(document).ready(function(){


	$("#form").validate({
        rules: {
        	bankFrom: {
                required: true
            },
        	nroReference: {
                required: true
            },
            bankTo: {
                required: true
            },
            img:{required:true}
        },
        //For custom messages
        messages: {
            bankFrom:{required: "Por favor introduzca el nombre del banco del que hizo la tranferencia"},
            nroReference:{required:"Por favor introduzca el numero de referencia de la tranferencia"},
            bankTo:{required:"Por favor introduzca el nombre del banco al que hizo la tranferencia"},
            img:{required:"Por favor proporicionenos una captura de la tranferencia"}
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

	$('#submit').click(function(event) {
		if($('#form').valid()){

			var formData = new FormData($('#form')[0]);

            $.ajax({
                url: '/app/pedidos/valide',
                type: 'POST',
                data: formData,
                async: false,
                success: function (data) {
                   window.location = data.url;
                },
                cache: false,
                contentType: false,
                processData: false,
                error: function(err) {
                
                }
            });
		}
	});
})