
$(document).ready(function(){
	var i = 1;
	while($("#validar" + i)[0]){
		var Stringid = "#validar" + i;
		$(Stringid). on("click", function(event){

			inputs = $(('input[name=' + this.id[7] + ']'));

			var prices = [];
			for (var i = inputs.length - 1; i >= 0; i--) {
				if(inputs[i].value == 0){
					Materialize.toast('Faltan por llenar datos!', 2500, "center");
               		$('#toast-container').css({'bottom': '20%', 'left':($(window).width() - 303.3)/2  +'px'});
               		event.stopPropagation();
               		return;
				}else{
					prices.push(inputs[i].value)
				}
			}
			$.ajax({
	 		    type: "POST",
	 		    url: "/admin/pedidos/valide",
	 		    data: JSON.stringify({ id: this.name, prices:prices}),
	 		    contentType: "application/json; charset=utf-8",
	 		    dataType: "json",
	 		    success: function(data) {

	 		   		$(location)[0].reload(true);
	 		    },
	 		    error: function(err) {
	 		      var msg = 'Status: ' + err.status + ': ' + err.responseText;
	 		      console.log(msg);
	 		    }
	 	 	 })


			//
			event.stopPropagation();

		});
		i++;
	}
	var i = 1;
	while($("#notValidar" + i)[0]){
		var Stringid = "#notValidar" + i;
		$(Stringid). on("click", function(event){

			inputs = $(('input[name=msj' + this.id[10] + ']'))[0];

	
			
				if(inputs.value.length == 0){
					Materialize.toast('Faltan por llenar datos!', 2500, "center");
               		$('#toast-container').css({'bottom': '20%', 'left':($(window).width() - 303.3)/2  +'px'});
               		event.stopPropagation();
               		return;
				}
			
			$.ajax({
	 		    type: "POST",
	 		    url: "/admin/pedidos/notvalide",
	 		    data: JSON.stringify({ id: this.name, msj: inputs.value}),
	 		    contentType: "application/json; charset=utf-8",
	 		    dataType: "json",
	 		    success: function(data) {

	 		   		$(location)[0].reload(true);
	 		    },
	 		    error: function(err) {
	 		      var msg = 'Status: ' + err.status + ': ' + err.responseText;
	 		      console.log(msg);
	 		    }
	 	 	 })


			//
			event.stopPropagation();

		});
		i++;
	}
	$('ul.tabs').tabs();

	var i = 1;
	var modals = "#showPedidoModal" + i;
	while($(modals)[0]){
		$(modals).modal({
		    startingTop: '15%',
		    endingTop:'5%'
		});
		i++;
		var modals = "#showPedidoModal" + i;
	}
	
	i=1;
	var buttons = "#openShowPedido" + i;
	while($(buttons)[0]){
		$(buttons).click(function(event){

			$(this.attributes[0].nodeValue).modal('open');
		})
		i++;
		buttons = "#openShowPedido" + i;
	}

	var i = 1;
	var modals = "#showPedidoPay" + i;
	while($(modals)[0]){
		$(modals).modal({
		    startingTop: '15%',
		    endingTop:'5%'
		});
		i++;
		var modals = "#showPedidoPay" + i;
	}
	
	i=1;
	var buttons = "#openShowPay" + i;
	while($(buttons)[0]){
		$(buttons).click(function(event){

			$(this.attributes[0].nodeValue).modal('open');
		})
		i++;
		buttons = "#openShowPay" + i;
	}

});