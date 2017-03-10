var createLocationsDetailView = function(data) {
    var display = document.getElementById('display');
    var results = document.getElementById('results');
    var removableDiv = document.createElement('div');
    removableDiv.id = (REMOVABLE_CONTAINER_ID);

    var title = document.createElement('h1');
    title.classList.add('sub-title');
    title.id = (MANAGE_LOCATIONS_VIEW_ID + '-title');
    title.textContent = "Locations Detail";
    display.insertBefore(title, display.firstChild);
    results.appendChild(removableDiv);
    toggleElement(DISPLAY_VIEW_ID);
};

var show_Locations_Detail = function() {
    getLocationsDetailData();
};

var getGPSLocationAddress = function() {

    var watchID = navigator.geolocation.watchPosition(showPosition);

    function showPosition(position) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "//maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + "," + position.coords.longitude + "&key=AIzaSyB6qFUEfGmSRAS28jWCj-WVmO1Q4NN2W9A", true);
        xhr.send();
        xhr.onreadystatechange = processRequest;

        function processRequest(e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                currentLocation = (response.results[0].formatted_address);
                messageToUser(currentLocation);
                console.log('Still checking');
            }
            //setTimeout(function(){ gpsLooper(gpsOn); }, 5000);
        }
    }
};