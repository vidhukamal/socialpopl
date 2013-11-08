var geocoder;
var map;
var contentString = '<div id="population">'+ '<ul>'+ '<li>Facebook</li>'+'</ul>'+ '</div>' ;
var infowindow = new google.maps.InfoWindow({
      content: contentString
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
			
	        google.maps.event.addListener(marker, 'click', function() {
	        	infowindow.open(map,marker);
			});
		}
		else {
        	alert("Geocode was not successful for the following reason: " + status);
      	}
    }); 
 } 
google.maps.event.addDomListener(window, 'load', initialize);