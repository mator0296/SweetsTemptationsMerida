

$(document).ready(function() {

  $('.progress').css('display', 'none');
  $("#formValidate").submit(function(event) {
    if($("#formValidate").valid()){
      $('.progress').css('display', 'block'); 
      $.ajax({
            type: "POST",
            url: "/login",
            data: JSON.stringify({email:$('#email')[0].value, password:$('#password')[0].value}),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) {
             window.location.reload();
             
            },
            error: function(err) {
              $('.progress').css('display', 'none');
              Materialize.toast('Contraseña y correo no coinciden!', 2500, "center");
               $('#toast-container').css({'bottom': '20%', 'left':($(window).width() - 303.3)/2  +'px'});
            }
         })
      
    }
    event.preventDefault();  
  });

	if($(".button-collapse").sideNav())
 	$(".button-collapse").sideNav();

  $('.modal1').modal({
    startingTop: '15%',
    endingTop:'5%'
  });

 
  $(".dropdown-button").dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    });

 window.fbAsyncInit = function() {	
    	FB.init({
			      appId      : '464702023886100',
			      cookie     : true,
			      xfbml      : true,
			      version    : 'v2.8'
    			});
    	FB.AppEvents.logPageView();   
  	};

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[1];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/es_ES/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));



  $("#formValidate").validate({
        rules: {
            email: {
                required: true,
                email:true
            },
            password: {
            required: true
            }
        },
        //For custom messages
        messages: {
            email:{required:"Por favor introduzca su correo",email:"no es un email valido"},
            password:{required:"Por favor introduzca una contraseña"}
            
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