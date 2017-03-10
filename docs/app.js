var gps = document.getElementById('gps');
var gpsOnImgSrc = 'images/location_gps.png';
var gpsOffImgSrc = 'images/location_off.png';
var gpsOn = false;
var deviceGps = true;
var currentView = TRACK_TIMES_VIEW_ID;
var currentViewMenuItemText = TRACK_TIME;

gps.addEventListener(CLICK, function() {
    toggleGps();
});

var toggleGps = function() {

    gpsOn = gpsOn ? turnOffGps() : turnOnGps();
    // TODO:
    // Add functionality to check if device GPS is supported and available.
    //var GPSready = deviceGps ? (gpsOn ?  : ) : alert("Either your device does not support this service or the device's GPS is Off.");
    updateGpsStatus();
};

var turnOffGps = function() {
    clearInterval(gpsOsilator);
    setTimeout(function() { messageInput.value = "GPS DEACTIVATED"; }, 15000);
    gps.src = gpsOffImgSrc;
    return false;
};

var turnOnGps = function() {
    gps.src = gpsOnImgSrc;
    gpsOsilator = setInterval(function() { getLocationAddress(); }, 6000);
    return true;
};

var removeElement = function(el) {
    len = el.length;
    for (var i = 0; i < len; i++) {
        var elementToRemove = document.getElementById(el[i]);
        elementToRemove.parentNode.removeChild(elementToRemove);
    }
};

var toggleElement = function(el) {
    el = el ? el : currentView;
    document.getElementById(el).classList.toggle('hide');
};

beginListeningAppData();

var mobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (mobile.Android() || mobile.BlackBerry() || mobile.iOS() || mobile.Opera() || mobile.Windows());
    }
};
messageInput.value = mobile.any();
// https:

var getLocationAddress = function() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.value = "Geolocation is not supported by this browser.";
    }

    function showPosition(position) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "//maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + "," + position.coords.longitude + "&key=AIzaSyB6qFUEfGmSRAS28jWCj-WVmO1Q4NN2W9A", true);
        xhr.send();
        xhr.onreadystatechange = processRequest;

        function processRequest(e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                currentLocation = (response.results[0].formatted_address);
                messageInput.value = currentLocation;
            }
        }
    }
};