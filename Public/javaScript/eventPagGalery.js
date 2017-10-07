

$(document).ready(function(){

	var i = 1;
	
	var Link = "#linkpag" + i 
	var maxLink;
	var actualLink;
	while($(Link)[0] != undefined){
		if($(Link)[0].attributes[1].value == "active"){
			actualLink = i;
			console.log("actualLink", actualLink);
			
		}
		$(Link).click(function(event){
			var j = 1;
			var link = "#linkpag" + j;


			if(this.attributes[1].nodeValue == "active")
				return;
			while($(link)[0] != undefined){
				if($(link)[0].attributes[1].nodeValue == "active"){

					$(link)[0].attributes[1].nodeValue = " ";
					document.getElementById("pag" + j).style.display = "none";
				}
				j++;
				var link = "#linkpag" + j;	
			}
			actualLink = this.id[7];
			console.log("actualLink", actualLink);
			this.attributes[1].nodeValue = "active"
			$(("#pag" + this.id[7]))[0].style.display= "block";
		
			
		})
		maxLink =  i;
		console.log("maxLink", maxLink);
		
		i++
		Link  = "#linkpag" + i ;
	}
	$('#pagLeft').click(function(ev){
		if(actualLink == 1)
			return;
		$(("#linkpag" + actualLink))[0].attributes[1].nodeValue = " ";
		document.getElementById("pag" + actualLink).style.display = "none";
		actualLink--;
		$(("#linkpag" + actualLink))[0].attributes[1].nodeValue = "active";
		document.getElementById("pag" + actualLink).style.display = "block";
	});
	$('#pagRight').click(function(event) {
		if(actualLink == maxLink)return;
		$(("#linkpag" + actualLink))[0].attributes[1].nodeValue = " ";
		document.getElementById("pag" + actualLink).style.display = "none";
		actualLink++;
		$(("#linkpag" + actualLink))[0].attributes[1].nodeValue = "active";
		document.getElementById("pag" + actualLink).style.display = "block";
	});

	console.log("maxLink", maxLink);
	i = 0;
	var modals = "#addCartModal" + i;
	while($(modals)[0]){
		$(modals).modal({
		    startingTop: '15%',
		    endingTop:'5%',
	     complete: function() { $('span').css('display', ''); }
		});
		i++;
		var modals = "#addCartModal" + i;
	}

	
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
	i= 0
	var buttons = "#addCart" + i;
	while($(buttons)[0]){
	
		$(buttons).click(function(event){
			var flavorCake = $(('#flavorCake' + this.id.substr(7)))[0].value;
			var flavorCream = $(('#flavorCream' + this.id.substr(7)))[0].value;
			if(flavorCake.length !=0 && flavorCream.length !=0 ){
				$('.progress').css('display', 'block'); 
				$.ajax({
	 		    type: "POST",
	 		    url: "/app/addprepedidos",
	 		    data: JSON.stringify({ flavorCake : flavorCake, flavorCream : flavorCream,  id: this.attributes[2].nodeValue, price: $(("#" + flavorCake + flavorCream + this.id.substr(7)))[0].innerHTML.split(" ")[1]}),
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
				console.log("entre en el else")
				$($(('#flavorCake' + this.id.substr(7)))[0].attributes[2].value)[0].innerHTML = `<div id="date-error" class="error">Por favor selecione los sabores de su pedidos</div>`

			}
			

		})
		i++;
		buttons = "#addCart" + i;
	}
	
	i= 0
	var buttons = "#buttonModalGalery" + i;
	while($(buttons)[0]){
		$(buttons).click(function(event){
			$('.price').css({display:'none'});
			$('.prices').css({display:'block'});
			$('select').prop('selectedIndex', 0); //Sets the first option as selected
    		$('select').material_select();			
			$(this.attributes[0].nodeValue).modal('open');

		})
		i++;
		buttons = "#buttonModalGalery" + i;
	}
	$.validator.setDefaults({
       ignore: []
    });	
	$('select').material_select();

	

});