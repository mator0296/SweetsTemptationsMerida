$(document).ready(function(){
	$('.carousel').carousel({indicators:true});	
    $.validator.setDefaults({
       ignore: []
    });
    $('select').change(function(evemt){
        $(this.attributes[2].value)[0].innerHTML="";
    })
     $('.file-path').change(function(event) {
           $('.errorTxt4')[0].innerHTML = ''
        });  
	$('#form').submit(function(event){
        if(fileType == false ){
            if($(("[id=" + $('#type')[0].value +  "] "+  ".carousel-item.active"))[0]){
                $('#img')[0].value = $(("[id=" + $('#type')[0].value +  "] "+  ".carousel-item.active"))[0].firstChild.attributes[0].nodeValue;
            }
        }else if(fileType  == true){
            $('#img')[0].value = $('.file-path')[0].value;
            

        }
        if($('#img')[0].value == undefined){
            $('#img')[0].value = ' '
        }
       

          

        if($('#form').valid()){
            $('.progress').css('display', 'block');

             var formData = new FormData(this);

            $.ajax({
                url: '/app/pedidos',
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
                    $('.progress').css('display', 'none'); 
                 $('.modal1').modal('open');
                }
            });
        }

       event.preventDefault();
	
	});
    $("#form").validate({
        rules: {
            type: {
                required: true
            },
            img: {
                required: true
            },
            size: {
                required: true
            },
            flavorCake: {
                required: true
            },
            flavorCream: {
                required: true
            },
            content: {
                required: true
            }
        },
        //For custom messages
        messages: {
            type:{required: "Por favor selecione el producto"},
            img:{required:"Por favor proporcionenos una img"},
            size:{required:"Por favor seleciones el tamaño del pedido"},
            flavorCake:{required:"Por favor selecione el sabor del ponque"},
            flavorCream:{required:"Por favor selecione el sabor del relleno"},
            content:{required:"Por favor cuentenos mas detalles sobre su pedido"}     
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
	$('select').material_select();
	
	var justOneTime = false;
 	$('#type').change(function(event) {
 		if(!justOneTime){
 			$(".mesageimg")[0].attributes[0].nodeValue = "display:block";
 			justOneTime = true;
 		}
 		if($("#3-three")[0])
 			$(("#3-three"))[0].attributes[1].nodeValue = "display:none;";
        if($("#3-four")[0])
            $(("#3-four"))[0].attributes[1].nodeValue = "display:none;";
 		if($("#3-two")[0])
 			$(("#3-two"))[0].attributes[1].nodeValue = "display:none;";
 		if($("#3-one")[0])
 			$(("#3-one"))[0].attributes[1].nodeValue = "display:none;";
 		if($("#twocakes")[0])
 			$(("#twocakes"))[0].attributes[1].nodeValue = "display:none;";
 		if($("#onecakes")[0])
 			$(("#onecakes"))[0].attributes[1].nodeValue = "display:none;";
 		if($("#onecupcakes")[0])
 			$(("#onecupcakes"))[0].attributes[1].nodeValue = "display:none;";
 		if($("#twocupcakes")[0])
 			$(("#twocupcakes"))[0].attributes[1].nodeValue = "display:none;";
 		$('.carousel').carousel();
 		$(("#" + this.value))[0].attributes[1].nodeValue = "display:block;";
 		
 		
 	});
    var fileType= undefined;
 	$(".carouselOpen").click(function(event){
 		$(".file-path")[0].value = " "
 		$("#refere")[0].value = "";
 		$("#imagebrowser")[0].attributes[1].nodeValue = "display:none";
 		$(".mesageimg")[0].attributes[0].nodeValue = "display:none";
 		$(".carousel-container")[0].attributes[0].nodeValue = "display:block";
 		$('.carousel').carousel();
 		 if($(".filePreview").children()[0]){
        	$(".filePreview").children().remove();
        }
        fileType = false;
        $('.errorTxt4')[0].innerHTML = ''

 	})
 	$(".imageBrowserOpen").click(function(event){
 		$(".mesageimg")[0].attributes[0].nodeValue = "display:none";
 		$("#imagebrowser")[0].attributes[1].nodeValue = "display:block";
 		$(".carousel-container")[0].attributes[0].nodeValue = "display:none";

        fileType = true;
        $('.errorTxt4')[0].innerHTML = ''
 	})

    // Multiple images preview in browser
    var imagesPreview = function(input, placeToInsertImagePreview) {

        if (input.files) {
            var filesAmount = input.files.length;

            for (i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = function(event) {
                    $($.parseHTML('<img>')).attr('src', event.target.result).appendTo(placeToInsertImagePreview);
                }

                reader.readAsDataURL(input.files[i]);
            }
        }

    };

    $('#refere').on('change', function() {
 		if($(".filePreview").children()[0]){
        	$(".filePreview").children().remove();
        }
        imagesPreview(this, 'div.filePreview');
       
    });
});