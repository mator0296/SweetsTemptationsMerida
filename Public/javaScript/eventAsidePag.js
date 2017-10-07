$(document).ready(function(){


	$('.asideAddCartModal').modal({
	    startingTop: '15%',
	    endingTop:'5%',
	     complete: function() { $('span').css('display', ''); }
	});
	
	$('.clickModalAside').click(function(event) {
		$('.price').css({display:'none'});
		$('.prices').css({display:'block'});
		$('select').prop('selectedIndex', 0); //Sets the first option as selected
		$('select').material_select();			
		$(this.attributes[0].value).modal('open')
		
		
	});
	$('select').change(function(evemt){
        $(this.attributes[2].value)[0].innerHTML="";
        $('.price').css({display:'none'});
        if(this.name.includes('Cake')){
        	//console.log('cakes',this.value.replace(" " , "") + $(('#flavorCream' + this.name.substr(10)))[0].value.replace(" " , ""))
        	if($(('#' + this.value.replace(" ", "") + $(('#flavorCream' + this.name.substr(10)))[0].value.replace(" ", "") + this.name.substr(10)))[0]){
        		$('.prices').css({display:'none'});
        		$(('#' + this.value.replace(" ", "") + $(('#flavorCream' + this.name.substr(10)))[0].value.replace(" ", "") + this.name.substr(10)))[0].style.display ='block'; 
        	}
        }else{
        	//console.log('cream' ,$(('#flavorCake' + this.name.substr(11)))[0].value.replace(" " , "")  +this.value.replace(" " , ""))
        	if($(('#' + $(('#flavorCake' + this.name.substr(11)))[0].value.replace(" ", "")  +this.value.replace(" ", "") + this.name.substr(11)))[0]){
        		$('.prices').css({display:'none'});
        		$(('#' + $(('#flavorCake' + this.name.substr(11)))[0].value.replace(" ", "")  +this.value.replace(" ", "") + this.name.substr(11)))[0].style.display ='block' ;
        	}
        }
        
    })

    
	var i= 0
	var buttons = "#addCartAside" + i;
	while($(buttons)[0]){
	
		$(buttons).click(function(event){
			var flavorCake = $(('#flavorCake' + this.id.substr(12)))[0].value;
			var flavorCream = $(('#flavorCream' + this.id.substr(12)))[0].value;
			if(flavorCake.length !=0 && flavorCream.length !=0 ){
				$('.progress').css('display', 'block'); 
				$.ajax({
	 		    type: "POST",
	 		    url: "/app/addprepedidos",
	 		    data: JSON.stringify({ flavorCake : flavorCake, flavorCream : flavorCream,  id: this.attributes[2].nodeValue, price: $(("#" + flavorCake + flavorCream + this.id.substr(12)))[0].innerHTML.split(" ")[1]}),
	 		    contentType: "application/json; charset=utf-8",
	 		    dataType: "json",
	 		    success: function(data) {
	 		    	window.location = "/app/pedidos"
	 		    },
	 		    error: function(err) {
	 		    $('.progress').css('display', 'none'); 
	 		      if($('.modal.open')[0])
	 		      	$('.modal.open').modal('close')
	 		      $('.modal1').modal('open');
	 		    }
	 	 	 })
			}else{
				$($(('#flavorCake' + this.id.substr(12)))[0].attributes[2].value)[0].innerHTML = `<div id="date-error" class="error">Por favor selecione los sabores de su pedidos</div>`

			}
			

		})
		i++;
		buttons = "#addCartAside" + i;
	}

	    $('.collapsible').collapsible();

});