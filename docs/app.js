var gps = document.getElementById('gps');
var gpsOnImgSrc = 'images/location_gps.png';
var gpsOffImgSrc = 'images/location_off.png';
var gpsOn = true;
var deviceGps = true;
var currentView = TRACK_TIMES_VIEW_ID;
var currentViewMenuItemText = TRACK_TIME;
var gpsOscilator;
var watchId;

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
    //setTimeout(function() { messageInput.value = "GPS DEACTIVATED"; }, 15000);
    navigator.geolocation.clearWatch(getGPSLocationAddress.watchId);
    messageToUser("GPS Deactivated..");
    gps.src = gpsOffImgSrc;
    return false;
};

var turnOnGps = function() {
    if ("geolocation" in navigator) {
    /* geolocation is available */
    gps.src = gpsOnImgSrc;
    messageToUser("GPS ACTIVATED,  Searching....");
    watchId = getGPSLocationAddress();
    //gpsOscilator = setInterval(function() { getGPSLocationAddress(); }, 6000);
    return true;
    } else {
    /* geolocation IS NOT available */
    messageToUser('Unfortunately, your device does not support GPS.');
    return false;
    }
    
};

var gpsLooper = function(loop){
    if(loop){
        getGPSLocationAddress();
    }else{
    }
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

