$(document).ready(function(){
 $('select').material_select();
	$('#addCartAside').click(function(event){


			var flavorCake = $('#flavorCake')[0].value;
			var flavorCream = $('#flavorCream')[0].value;
			if(flavorCake.length !=0 && flavorCream.length !=0 ){ 
				$.ajax({
	 		    type: "POST",
	 		    url: "/app/addprepedidos",
	 		    data: JSON.stringify({ flavorCake : flavorCake, flavorCream : flavorCream,  id: this.attributes[2].nodeValue, price: $(("#" + flavorCake + flavorCream ))[0].innerHTML.split(" ")[1]}),
	 		    contentType: "application/json; charset=utf-8",
	 		    dataType: "json",
	 		    success: function(data) {
	 		    	window.location = "/app/pedidos"
	 		    },
	 		    error: function(err) {
	 		     
	 		     window.location = '/login'
	 		    }
	 	 	 })
			}else{
				$($(('#flavorCake' + this.id.substr(12)))[0].attributes[2].value)[0].innerHTML = `<div id="date-error" class="error">Por favor selecione los sabores de su pedidos</div>`

			}
			

		})

	$('select').change(function(evemt){
		 console.log('entre', this.name)
        $(this.attributes[2].value)[0].innerHTML="";
        $('.price').css({display:'none'});

        if(this.name.includes('Cake')){
        	//console.log('cakes',this.value.replace(" " , "") + $(('#flavorCream' + this.name.substr(10)))[0].value.replace(" " , ""))
        	if($(('#' + this.value.replace(" ", "") + $(('#flavorCream'))[0].value.replace(" ", "") + this.name.substr(10)))[0]){
        		$('.prices').css({display:'none'});
        		$(('#' + this.value.replace(" ", "") + $(('#flavorCream'))[0].value.replace(" ", "") + this.name.substr(10)))[0].style.display ='block'; 
        	}
        }else{
        	//console.log('cream' ,$(('#flavorCake' + this.name.substr(11)))[0].value.replace(" " , "")  +this.value.replace(" " , ""))
        	if($(('#' + $(('#flavorCake' + this.name.substr(11)))[0].value.replace(" ", "")  +this.value.replace(" ", "")))[0]){
        		$('.prices').css({display:'none'});
        		$(('#' + $(('#flavorCake' + this.name.substr(11)))[0].value.replace(" ", "")  +this.value.replace(" ", "") ))[0].style.display ='block' ;
        	}
        }
        
    })
});
	