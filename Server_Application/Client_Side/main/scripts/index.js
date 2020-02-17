function successCallback(position) {
	alert ("Your location:\nLatitude: " + position.coords.latitude + "\n" + 
			"Longitude: " + position.coords.longitude + "\n" + 
			"Altitude: " + position.coords.altitude);
}


function errorCallback(position) {
	switch (position.code) {
		case 1:
			alert ("PERMISSION_DENIED");
			alert ("You are denied access to your geolocatiion position...")
			break;
		case 2:
			alert ("POSITION_UNAVAILABLE");
			alert ("Please, check your internet connection...")
			break;
		case 3:
			alert ("TIMEOUT");
			alert ("Please try again later...");
			break;
	}
}


//navigator.geolocation.getCurrentPosition(successCallback, errorCallback);