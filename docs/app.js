var shiftInput = document.getElementById('shift-type');
var messageInput = document.getElementById('text');
var startBtn = document.getElementById('start');
var finishBtn = document.getElementById('finish');
var newBtn = document.getElementById('new');
var inTimeInput = document.getElementById('inTime');
var outTimeInput = document.getElementById('outTime');
var dateInput = document.getElementById('date');
var optionsMenuBtn = document.getElementById('options-menu-btn');
var dropdown = document.getElementsByClassName('dropdown-content');
var manageTimes = document.getElementById('manage-times');
var showTimes = document.getElementById('show-times');
var settings = document.getElementById('settings');
var gps = document.getElementById('gps');
var gpsOnImgSrc = 'images/location_gps.png';
var gpsOffImgSrc = 'images/location_off.png';
var gpsOn = false;
var deviceGps = true;

finishBtn.disabled = true;

startBtn.addEventListener('click', function() {
            console.log('Start button clicked');
    var newDate = new Date();

    //updateUIstart(newDate);
    postStartTime(newDate);
});

finishBtn.addEventListener('click', function() {
                console.log('Finish button clicked');
    var newDate = new Date();
    postFinishTime(newDate);
    // updateUIfinished(newDate);
});

newBtn.addEventListener('click', function() {
                console.log('New button clicked');
    clearLastStateData();
});

optionsMenuBtn.addEventListener('click', function() {
                console.log('Options menu button clicked');
    toggleOptionsMenu();
});

showTimes.addEventListener('click', function() {
                console.log('Show times options menu item clicked');
    toggleOptionsMenu();
    if (this.textContent === 'Show Times') {
        toggleMenuItemText('show-times', 'Hide Times');
        getTimesDetail();
    } else {
        toggleMenuItemText('show-times', 'Show Times');
        removeElement(['removable-container', 'times-detail-title']);
        show_hideElement('display');
    }
});

settings.addEventListener('click', function() {
                console.log('Settings options menu item clicked');
    toggleOptionsMenu();
    gpsOn ? getLocation() : alert('GPS is not on.  Please turn on GPS and try again.');
});

manageTimes.addEventListener('click', function() {
                console.log('Manage times options menu item clicked');
    toggleOptionsMenu();
});

gps.addEventListener('click', function() {
                console.log('gps button clicked');
    toggleGps();
});

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

var updateUIlastState = function(data) {
    console.log('Called "updateUIlastState()" method');
    if (data) {
        var date = new Date(data.last_state.date);
        inTimeInput.value = data.last_state.inTime;
        outTimeInput.value = data.last_state.outTime;
        dateInput.value = date.toDateString();
        messageInput.value = data.last_state.comment;
        if (data.app_state.tracking) {

            console.log('last state called: UI start: Tracking');
            updateUIstart();
            shiftInput.value = data.last_state.shift;

        } else {
            if (data.last_state.inTime === "") {
                console.log('last state called: UI start: Not Tracking');
                resetInputView();
            } else {
                console.log('last state called: UI finished:');
                updateUIfinished();
                shiftInput.value = data.last_state.shift;
            }

        }
        data.last_state.gps ? turnOnGps() : turnOffGps();
    } else {
        alert('There was a problem fetching data from the database.');
    }
};

var updateUIstart = function() {
    console.log('Called "updateUIstart()" method');
    shiftInput.disabled = inTimeInput.disabled = startBtn.disabled = dateInput.disabled = true;
    finishBtn.disabled = false;
};

var updateUIfinished = function() {
    console.log('Called "updateUIfinished()" method');
    newBtn.style.display = "inline-block";
    startBtn.style.display = finishBtn.style.display = "none";
    inTimeInput.disabled = outTimeInput.disabled = messageInput.disabled = true;
};

var resetInputView = function() {
    console.log('Called "resetInputView()" method');
    messageInput.value = inTimeInput.value = outTimeInput.value = dateInput.value = "";
    shiftInput.value = "DAYS";
    shiftInput.disabled = inTimeInput.disabled = outTimeInput.disabled = startBtn.disabled = dateInput.disabled = messageInput.disabled = false;
    newBtn.style.display = "none";
    startBtn.style.display = finishBtn.style.display = "inline-block";
    finishBtn.disabled = true;
};

beginListeningAppData();

var createTimesDetail = function(data) {
    console.log('Called "createTimesDetail()" method');
    var display = document.getElementById('display');
    var results = document.getElementById('results');
    var removableDiv = document.createElement('div');
    removableDiv.id = ('removable-container');

    var title = document.createElement('h1');
    title.classList.add('sub-title');
    title.id = ('times-detail-title');
    title.textContent = "Times Detail List";
    display.insertBefore(title, display.firstChild);

    for (var prop in data) {

        var inTime = data[prop].inTime;
        var outTime = data[prop].outTime;
        var shift = data[prop].shift;

        var div = document.createElement('div');
        div.classList.add("times-list-item");
        div.id = (prop);
        var shiftSpan = document.createElement('span');
        shiftSpan.classList.add('shift-span');
        shiftSpan.textContent = shift.charAt(0).toUpperCase();
        div.appendChild(shiftSpan);
        var dateSpan = document.createElement('span');
        dateSpan.classList.add('date-span');
        dateSpan.textContent = data[prop].date;
        div.appendChild(dateSpan);
        var inSpan = document.createElement('span');
        inSpan.classList.add('in-time');
        inSpan.textContent = inTime;
        div.appendChild(inSpan);
        var outSpan = document.createElement('span');
        outSpan.classList.add('out-time');
        outSpan.textContent = outTime;
        div.appendChild(outSpan);
        var totalHrs = document.createElement('span');
        totalHrs.classList.add('total-hrs');
        totalHrs.textContent = getTotalHrs(shift, data[prop].inTimeMS, data[prop].outTimeMS, data[prop].fullDate) + " hrs";
        div.appendChild(totalHrs);
        removableDiv.appendChild(div);
    };
    results.appendChild(removableDiv);
    show_hideElement('display');
}

var show_hideElement = function(el) {
    console.log('Called "show_hideElement()" method');
    document.getElementById(el).classList.toggle('hide');
};

var toggleMenuItemText = function(el, optionText) {
    console.log('Called "toggleMenuItemText()" method');
    document.getElementById(el).textContent = optionText;
};

var getTotalHrs = function(shift, t1, t2, date) {
    console.log('Called "getTotalHrs()" method');
    t2 = isNaN(t2) ? (new Date()).getTime() : t2;
    var reduction = (shift === "ww" && (new Date(date).getDay()) === 6) ? 1920000 : 720000;
    var msec = t2 - t1 - reduction;
    var totalHrs = Math.floor((msec / (60 * 60 * 1000)) * 10) / 10;
    return (totalHrs < 0) ? 0 : totalHrs;
};

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