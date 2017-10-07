$(document).ready(function() {
	var Post = function(Type){
		$.ajax({
	 		    type: "POST",
	 		    url: "/galery/new",
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

	
	$('#torta').on("click",function(event){
	 	Post({type:"cakes"});
	 	 	
	 });


	$('#Cupcake').on("click",function(event){
	 	 Post({type:"cupcakes"});
	 	 	
	});

});