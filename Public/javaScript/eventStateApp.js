$(document).ready(function(){

	$('.datepicker').pickadate({
		    selectMonths: true, // Creates a dropdown to control month
		    selectYears: 15, // Creates a dropdown of 15 years to control year,
		    today: 'hoy',
		    clear: 'Limpiar',
		    close: 'Ok',
		    closeOnSelect: false // Close upon selecting a date,
 	});
 	 $('.timepicker').pickatime({
    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
    twelvehour: true, // Use AM/PM or 24-hour format
    donetext: 'Listo', // text for done-button
    cleartext: 'Limpiar', // text for clear-button
    canceltext: 'Cancelar', // Text for cancel-button
    autoclose: false, // automatic close timepicker
    ampmclickable: true, // make AM PM clickable
    aftershow: function(){} //Function for after opening timepicker
  });
 	 $('.modal2').modal({
		    startingTop: '15%',
		    endingTop:'5%'
		});
	$('select').material_select();
	var i = 0;
	var modals = "#showPedidoModal" + i;
	while($(modals)[0]){
		$(modals).modal({
		    startingTop: '15%',
		    endingTop:'5%'
		});
		i++;
		var modals = "#showPedidoModal" + i;
	}
	
	i= 0
	var buttons = "#openShowPedido" + i;
	while($(buttons)[0]){
		$(buttons).click(function(event){

			$(this.attributes[0].nodeValue).modal('open');
		})
		i++;
		buttons = "#openShowPedido" + i;
	}



	var _MS_PER_DAY = 1000 * 60 * 60 * 24;
    function dateDiffInDays(a, b) {
      // Discard the time and time-zone information.
      var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

      return Math.floor((utc1 - utc2) / _MS_PER_DAY);
    }

	jQuery.validator.addMethod("dateInvalid", function(value, element) {
			console.log(dateDiffInDays(new Date(value), new Date))
		    return !(dateDiffInDays(new Date(value), new Date) < 0);
		}, "Por favor introduzca una fecha posterior al dia de hoy");
	jQuery.validator.addMethod("dateInvalidMin", function(value, element) {
		var dif = dateDiffInDays(new Date(value), new Date);
		    return !(dif < 3  && dif>=0 );
		}, "Lo siento nuestro pedidos se hacen con una anticipacion de tres dia minimo");
	jQuery.validator.addMethod("dateInvalidMax", function(value, element) {
		    return !(dateDiffInDays(new Date(value), new Date) > 10);
		}, "Disculpe aceptamos pedidos con un plazo de 10 dias maximo");
	$.validator.setDefaults({
       ignore: []
    });
	$("#form").submit(function(event) {
		
		if(!$("#form").valid())
			event.preventDefault();
		
	});


	$("#form").validate({
        rules: {
        	from: {
                required: true
            },
        	to: {
                required: true
            },
            addres: {
                required: true
            },
            pay: {
                required: true 
            },
            date: {
				required: true,
				dateInvalid:true,
				dateInvalidMin:true,
				dateInvalidMax:true
			},
            phoneNumber:{required:true}
        },
        //For custom messages
        messages: {
            from:{required: "Por favor indiquenos de quien es el pedido"},
            to:{required:"Por favor indiquenos para quien es el pedido"},
            addres:{required:"Por favor indiquenos a donde entregar el pedido"},
            pay:{required:"Por idiquenos el metodo de pago"},
            date:{required:"Por favor diganos el dia de entrega"},
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
     $('select').change(function(evemt){
        $(this.attributes[2].value)[0].innerHTML="";
    })
    $('#date').change(function(evemt){
        $(this.attributes[3].value)[0].innerHTML="";
    })	 	
});