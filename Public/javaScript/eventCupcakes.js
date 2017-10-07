 
$(document).ready(function() {
	 $('select').material_select();
	 $('#type1').on("click",function(event){

	 		if($('#size')[0].value == "Seleciona las unidades"){
	 	 		document.getElementById('Alert').firstChild.innerHTML = "Seleciona las unidades"
	 	 		document.getElementById('Alert').style.display = 'inline-block';
	 	 		event.preventDefault();
	 	 		return;

	 	 	}
	 	 	if($('#flavorCake')[0].value == "Seleciona el Sabor del ponqué"){
	 	 		document.getElementById('Alert').firstChild.innerHTML = "Seleciona el Sabor del ponqué"
	 	 		document.getElementById('Alert').style.display = 'inline-block';
	 	 		event.preventDefault();
	 	 		return;

	 	 	}
	 	 	if($('#flavorCream')[0].value == "Seleciona el Sabor de Relleno"){
	 	 		document.getElementById('Alert').firstChild.innerHTML = "Seleciona el Sabor de Relleno"
	 	 		document.getElementById('Alert').style.display = 'inline-block';
	 	 		event.preventDefault();
	 	 		return;

	 	 	}
	 	 	console.log("entre en el click")
	 	 	$.ajax({
	 		    type: "POST",
	 		    url: "/app/pedidos/new",
	 		    data: JSON.stringify({type:"cupcakes", case:"one" ,size:$('#taste')[0].value}),
	 		    contentType: "application/json; charset=utf-8",
	 		    dataType: "json",
	 		    success: function(data) {
	 		     console.log(data)
	 		    },
	 		    error: function(err) {
	 		      var msg = 'Status: ' + err.status + ': ' + err.responseText;
	 		      console.log(msg);
	 		    }
	 	 	 });
	 	 	
	 });

	 $('#type2').click(function(event){

	 		if($('#size')[0].value == "Seleciona las unidades"){
	 	 		document.getElementById('Alert').firstChild.innerHTML = "Seleciona las unidades"
	 	 		document.getElementById('Alert').style.display = 'inline-block';
	 	 		event.preventDefault();
	 	 		return;

	 	 	}
	 	 	if($('#flavorCake')[0].value == "Seleciona el Sabor del ponqué"){
	 	 		document.getElementById('Alert').firstChild.innerHTML = "Seleciona el Sabor del ponqué"
	 	 		document.getElementById('Alert').style.display = 'inline-block';
	 	 		event.preventDefault();
	 	 		return;

	 	 	}
	 	 	if($('#flavorCream')[0].value == "Seleciona el Sabor de Relleno"){
	 	 		document.getElementById('Alert').firstChild.innerHTML = "Seleciona el Sabor de Relleno"
	 	 		document.getElementById('Alert').style.display = 'inline-block';
	 	 		event.preventDefault();
	 	 		return;

	 	 	}
	 	 	console.log("entre en el click")
	 	 	$.ajax({
	 		    type: "POST",
	 		    url: "/app/pedidos/new",
	 		    data: JSON.stringify({type:"cupcakes", case:"two",size:$('#taste')[0].value}),
	 		    contentType: "application/json; charset=utf-8",
	 		    dataType: "json",
	 		    success: function(data) {
	 		     console.log(data)
	 		    },
	 		    error: function(err) {
	 		      var msg = 'Status: ' + err.status + ': ' + err.responseText;
	 		      console.log(msg);
	 		    }
	 	 	 });
	 	 	
	 });


	
	$('#size').change(function(event){

	 	 document.getElementById('Alert').style.display = 'none';
	 	 
	 });

	$('#flavorCake').change(function(event){

	 	 document.getElementById('Alert').style.display = 'none';
	 	 
	 });

	$('#flavorCream').change(function(event){

	 	 document.getElementById('Alert').style.display = 'none';
	 	 
	 });
});
