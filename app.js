var geocoder;
var map;
var contentString = '<div id="population">'+ '<ul>'+ '<li id="census">Population: </li>'+'</ul>'+ '</div>' ;
var infowindow = new google.maps.InfoWindow({
	content: contentString
});

$(document).ready(function(){
	
});
  
function initialize() {
        geocoder = new google.maps.Geocoder();	
        var mapOptions = {
          center: new google.maps.LatLng(-34.397, 150.644),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
         map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
}

function codeAddress() {
	var address = document.getElementById("address").value;
	geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			marker = new google.maps.Marker({
				map: map,
				position: results[0].geometry.location,
				title: 'Population'
			});
			
			alert("Click on the red marker to see population in " + address + "!");
			
	        google.maps.event.addListener(marker, 'click', function() {
	        	//alert($("#address").val());
	        	
	        	//Getting population from Census API
	        	
	        	$.ajax({
	        		type: "GET",
	        		url: "http://api.census.gov/data/2010/sf1?key=f107333cc9985e7aa64df5d552c19d6bf50ef0c3&get=P0010001,NAME&for=state:06",
	        		dataType:"json",
	        		success: function(data,textStatus){
	        			
	        			var population = numeral(data[1][0]).format('0,0');
	        			var state = data[1][1];
	        			contentString = '<div id="population">'+ '<ul>'+ '<li id="census">Population: </li>'+population+'</ul>'+ '</div>';	        			
	        			
	        			infowindow.content = contentString;	        			
	        			//show marker
	        			infowindow.open(map,marker);	        				        			
	        		},
	        		error: function(XMLHttpRequest, errorString, exceptionThrown){
	        			alert("error");		
	        		}
	        	});
	        	
			});
		}
		else {
        	alert("Geocode was not successful for the following reason: " + status);
      	}
    }); 
 } 
google.maps.event.addDomListener(window, 'load', initialize);