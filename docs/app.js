var optionsMenuBtn = document.getElementById(OPTIONS_MENU_BUTTON_ID);
var dropdown = document.getElementsByClassName('dropdown-content');
var optionsMenuItem1Btn = document.getElementById(OPTIONS_MENU_ITEM_1_ID);
var optionsMenuItem2Btn = document.getElementById(OPTIONS_MENU_ITEM_2_ID);
var optionsMenuItem3Btn = document.getElementById(OPTIONS_MENU_ITEM_3_ID);
var optionsMenuItem4Btn = document.getElementById(OPTIONS_MENU_ITEM_4_ID);
var gps = document.getElementById('gps');
var gpsOnImgSrc = 'images/location_gps.png';
var gpsOffImgSrc = 'images/location_off.png';
var gpsOn = false;
var deviceGps = true;
var timesShowing = false;
var currentView = TRACK_TIMES_VIEW_ID;
var currentViewMenuItemText = TRACK_TIME;

optionsMenuBtn.addEventListener(CLICK, function() {
    console.log('Options menu button clicked');
    toggleOptionsMenu();
});

optionsMenuItem1Btn.addEventListener(CLICK, function() {
    var id = this.id;
    var text = this.textContent;
    showHideCurrentView(text, id);
});

optionsMenuItem2Btn.addEventListener(CLICK, function() {
    var id = this.id;
    var text = this.textContent;
    showHideCurrentView(text, id);
});

optionsMenuItem3Btn.addEventListener(CLICK, function() {
    var id = this.id;
    var text = this.textContent;
    showHideCurrentView(text, id);
});

optionsMenuItem4Btn.addEventListener(CLICK, function() {
    var id = this.id;
    var text = this.textContent;
    showHideCurrentView(text, id);
});

gps.addEventListener(CLICK, function() {
    console.log('gps button clicked');
    toggleGps();
});

var showHideCurrentView = function(text, id) {

    console.log(currentViewMenuItemText);
    toggleOptionsMenu();
    if (currentView === TRACK_TIMES_VIEW_ID) {
        show_hideElement(currentView);
    } else {
        removeElement([currentView + '-title', REMOVABLE_CONTAINER_ID]);
        show_hideElement(DISPLAY_VIEW_ID);
    }
    toggleMenuItemText(id, currentViewMenuItemText);
    optionClickedRouter(text);
};

var optionClickedRouter = function(text) {
    switch (text) {
        case TRACK_TIME:
            show_hideElement(TRACK_TIMES_VIEW_ID);
            currentView = TRACK_TIMES_VIEW_ID;
            currentViewMenuItemText = TRACK_TIME;
            break;
        case SETTINGS:
            show_settings();
            console.log('Settings options menu item clicked');
            currentView = SETTINGS_VIEW_ID;
            currentViewMenuItemText = SETTINGS;
            break;
        case MANAGE_LOCATIONS:
            show_Locations_Detail();
            currentView = MANAGE_LOCATIONS_VIEW_ID;
            currentViewMenuItemText = MANAGE_LOCATIONS;
            break;
        case MANAGE_TIMES:
            show_Times_Detail();
            currentView = MANAGE_TIMES_VIEW_ID;
            currentViewMenuItemText = MANAGE_TIMES;
            break;
        case SHOW_TIMES:
            show_Times();
            console.log('Show times options menu item clicked');
            currentView = SHOW_TIMES_VIEW_ID;
            currentViewMenuItemText = SHOW_TIMES;
            break;
        default:
            break;
    }
};

var show_Times = function() {
    getTimesDetail();
};

var show_settings = function() {
    getSettingsData();
};

var show_Times_Detail = function() {
    getTimesDetailData();
};

var show_Locations_Detail = function() {
    getLocationsDetailData();
};

var toggleGps = function() {
    console.log('Called "toggleGps()" method');
    deviceGps ? (gpsOn ? turnOffGps() : turnOnGps()) : alert("Either your device does not support this service or the device's GPS is Off.");
    updateGpsStatus();
};

var turnOffGps = function() {
    console.log('Called "turnOffGps()" method');
    gps.src = gpsOffImgSrc;
    gpsOn = false;
};

var turnOnGps = function() {
    console.log('Called "turnOnGps()" method');
    gps.src = gpsOnImgSrc;
    gpsOn = true;
};

var removeElement = function(el) {
    console.log('Called "removeElement()" method');
    len = el.length;
    for (var i = 0; i < len; i++) {
        var elementToRemove = document.getElementById(el[i]);
        elementToRemove.parentNode.removeChild(elementToRemove);
    }
};

var toggleOptionsMenu = function() {
    console.log('Called "toggleOptionsMenu()" method');
    dropdown[0].classList.toggle('dropdown-hide');
    dropdown[0].classList.toggle('dropdown-show');
};

var show_hideElement = function(el) {
    console.log('Called "show_hideElement()" method  --' + el);
    document.getElementById(el).classList.toggle('hide');
};

var toggleMenuItemText = function(el, optionText) {
    console.log('Called "toggleMenuItemText()" method with: ' + el + ' and ' + optionText);
    document.getElementById(el).textContent = optionText;
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