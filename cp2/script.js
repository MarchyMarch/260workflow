$(document).ready(function(){
	$("#quoteNumSubmit").click(function(e){
		e.preventDefault();
		var quoteNumber = $("#quote-number").find(":selected").text();

		console.log(quoteNumber);
		var myURL = "";
		if(quoteNumber == 1){
			myURL = "http://ron-swanson-quotes.herokuapp.com/v2/quotes";
		} else{
			myURL = "http://ron-swanson-quotes.herokuapp.com/v2/quotes/" + quoteNumber;
		}

		$.ajax({
			url : myURL,
			dataType : "json",
			success : function(json){
				console.log(json);
				console.log("test");
				var results = "";
				for(var i = 0; i < json.length; i++){
					console.log("for loop");
					results += '<div class="quote-div">';
					results += '<article class="quote-article">';
					results += '<div class="img-container">'
					results += '<img src="./images/swanson-point.png">';
					results += '</div><div class="quote-container">';
					results += '<p>' + json[i]; + '</p>';
					results += '</div></article></div>';
				}
				console.log("Results: " + results);
				$("#returned-quotes").html(results);
			},
			error : function(){
				var errorMessage = "";
				errorMessage +=  '<h2>Error in getting Quotes</h2>';
				$("#returned-quotes").html(errorMessage);
			}
		})
	});
});