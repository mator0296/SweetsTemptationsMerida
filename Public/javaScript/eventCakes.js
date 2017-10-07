 
$(document).ready(function() {

	var Post = function(Type){
		$.ajax({
	 		    type: "POST",
	 		    url: "/app/pedidos/new",
	 		    data: JSON.stringify(Type),
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
	}

	
	$('#type1').on("click",function(event){
	 	Post({type:"cakes", cases:"one"});
	 	 	
	 });


	$('#type2').on("click",function(event){
	 	 Post({type:"cakes", cases:"two"});
	 	 	
	});

	$('#type3').on("click",function(event){
	 	document.getElementById('typeCakes').style.display = 'none';
		document.getElementById('cake-buttercream').style.display = 'block';
		event.preventDefault(); 	 	
	});
	$('#type3-one').on("click",function(event){
	 	 Post({type:"cakes", cases:"3-one"});
	 	 	
	});
	$('#type3-two').on("click",function(event){
	 	 Post({type:"cakes", cases:"3-two"});
	 	 	
	});
	$('#type3-three').on("click",function(event){
	 	 Post({type:"cakes", cases:"3-three"});	 	 	
	});


	/*$('#size').change(function(event){

	
	 	document.getElementById('Alert').style.display = 'none';

	 	if($('#flavorCake')[0].value.length == 0 || $('#flavorCream')[0].value.length == 0)
	 	 	return;

	 	$.get( "/galery/askCakes",{size:this.value,flavorCream:$('#flavorCream')[0].value,flavorCake: $('#flavorCake')[0].value})
			.done(function( data ) {;
		  		console.log(data.map[1])
		  		$("#priceCakesone")[0].textContent= ""+data.map[1];
	 			$("#priceCakestwo")[0].textContent= "Pronto";
	 			$("#priceCakes3")[0].textContent= "--->";
	 			$("#priceCakes3-one")[0].textContent= ""+data.map[2];
	 			$("#priceCakes3-two")[0].textContent= ""+data.map[1];
	 			$("#priceCakes3-three")[0].textContent= ""+data.map[0]
			});


	 			
	 });

	$('#flavorCake').change(function(event){

	 	 document.getElementById('Alert').style.display = 'none';

	 	if($('#size')[0].value.length == 0 || $('#flavorCream')[0].value.length == 0)
	 	 	return;

	 	$.get( "/galery/askCakes",{flavorCake:this.value,flavorCream:$('#flavorCream')[0].value,size: $('#size')[0].value})
			.done(function( data ) {;
		  		console.log(data.map[1])
		  		$("#priceCakesone")[0].textContent= ""+data.map[1];
	 			$("#priceCakestwo")[0].textContent= "Pronto";
	 			$("#priceCakes3")[0].textContent= "--->";
	 			$("#priceCakes3-one")[0].textContent= ""+data.map[2];
	 			$("#priceCakes3-two")[0].textContent= ""+data.map[1];
	 			$("#priceCakes3-three")[0].textContent= ""+data.map[0]
			});
	 	 
	 });

	$('#flavorCream').change(function(event){

		document.getElementById('Alert').style.display = 'none';

	 	if($('#flavorCake')[0].value.length == 0 || $('#size')[0].value.length == 0)
	 	 	return;

	 	$.get( "/galery/askCakes",{flavorCream:this.value,size:$('#size')[0].value,flavorCake: $('#flavorCake')[0].value})
			.done(function( data ) {;
		  		console.log(data.map[1])
		  		$("#priceCakesone")[0].textContent= ""+data.map[1];
	 			$("#priceCakestwo")[0].textContent= "Pronto";
	 			$("#priceCakes3")[0].textContent= "--->";
	 			$("#priceCakes3-one")[0].textContent= ""+data.map[2];
	 			$("#priceCakes3-two")[0].textContent= ""+data.map[1];
	 			$("#priceCakes3-three")[0].textContent= ""+data.map[0]
			});
	 	 
	 });*/

});