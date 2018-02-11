// Open Weather API key {bcce3604735757529911af1cc5e3fea1}
// Google API key {AIzaSyAQj8hcbw6_hDQatOrJrcSUXvsUxNMcmkQ}
// Stack exchange API key {sAB0tzvvLBQOomlGrmahQw((}

$(document).ready(function(){
	//onclick for submit button
	$("#weatherSubmit").click(function(e){
		e.preventDefault();
		var city = $("#weatherInput").val();
		console.log("City is: " + city);

		var myurl= "http://api.openweathermap.org/data/2.5/weather?q=" + city + ",US&units=imperial" + "&APPID=b0bba4e7464433d0a4b297141e676ac5";
		$.ajax({
			url : myurl,
			dataType : "json",
			success : function(json){
				console.log(json);
				// this gives the results to parse and output
				// also call google map info

				var results = "";
				results += "<h2>Weather for " + json.name + "</h2>";
				for(var i = 0; i < json.weather.length; i++){
					results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
				}

				results += '<h2>' + json.main.temp + " &deg;F</h2>";
				results += "<p>";
				for(var i = 0; i < json.weather.length; i++){
					results += json.weather[i].description;
					if(i != json.weather.length -1) results += ", ";
				}
				results += "</p>";

				results += '<ol class="weather-details">';
				results += '<li>Low: ' + json.main.temp_min + '&deg;F</li>'
				results += '<li>High: ' + json.main.temp_max + '&deg;F</li>'
				results += '</ol>';
				$("#weatherResults").html(results);
			}
		})
	});	

	$("#questionSubmit").click(function(e){
		e.preventDefault();
		var question = $("#questionInput").val();
		console.log("The question is: " + question);

		var stackurl = "https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=relevance&q=";
		stackurl += question + "&site=stackoverflow";

		$.ajax({
			url : stackurl,
			dataType : "json",
			success : function(json){
				console.log(json);

				var results = "";
				results += "<h2>Showing results for \"" + question + "\"</h2>"
				for(var i = 0; i < json.items.length; i++){
					results += '<div class="stack-items-div">'
					results += '<a href="' + json.items[i].link + '" target="_blank">'
					results += json.items[i].title + '</a>'
					if(i != json.items.length - 1) results += "<br>";
					results += "</div>";
				}

				$("#stackResults").html(results);
			},
			error : function(){
				console.log("ajax error");
			}
		})
	})
});

/*function openTab(e, tabName){
		var tabcontent = document.getElementByClassName("tab-content");
		for(var i = 0; i < tabcontent.length; i++){
			tabcontent[i].style.display = "none";
		}

		tablinks = document.getElementByClassName("tablinks");
		for(var i = 0; i < tablinks.length; i++){
			tablinks[i].className = tablinks[i].className.replace(" active", "");
		}

		document.getElementById(tabName).style.display = "block";
		e.currentTarget.className += " active";
	}
*/
/*function initMap(lon lat){
	// add google map info here 
}*/

/*var results = "";
results += '<h2>Weather in ' + json.name + "</h2>";
for (var i=0; i<json.weather.length; i++) {
    results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
}
results += '<h2>' + json.main.temp + " &deg;F</h2>"
results += "<p>"
for (var i=0; i<json.weather.length; i++) {
    results += json.weather[i].description
    if (i !== json.weather.length - 1)
	results += ", "
}
results += "</p>";
$("#weatherResults").html(results);*/