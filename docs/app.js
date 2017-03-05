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

finishBtn.disabled = true;

getAppState();

startBtn.addEventListener('click', function() {
    var newDate = new Date();
    updateUItracking(newDate);
    postStartTime(newDate);
});

finishBtn.addEventListener('click', function() {
    var newDate = new Date();
    postFinishTime(newDate);
    updateUIidol(newDate);
});

newBtn.addEventListener('click', function() {
    resetInputView();
});

optionsMenuBtn.addEventListener('click', function() {
    toggleOptionsMenu();
});

showTimes.addEventListener('click', function() {
    toggleOptionsMenu();
    if (this.textContent === 'Show Times') {
        toggleMenuItemText('show-times', 'Hide Times');
        getTimesDetail();
    } else {
        toggleMenuItemText('show-times', 'Show Times');
        removeElement('removable-container');
        show_hideElement('display');
    }
});

settings.addEventListener('click', function(){
    toggleOptionsMenu();
    getLocation();
});

manageTimes.addEventListener('click', function(){
    toggleOptionsMenu();
});

var removeElement = function(el) {
    var elementToRemove = document.getElementById(el);
    elementToRemove.parentNode.removeChild(elementToRemove);
};

var toggleOptionsMenu = function() {
    dropdown[0].classList.toggle('dropdown-hide');
    dropdown[0].classList.toggle('dropdown-show');
};

var resetInputView = function() {
    messageInput.value = inTimeInput.value = outTimeInput.value = dateInput.value = "";
    shiftInput.value = "DAYS";
    shiftInput.disabled = inTimeInput.disabled = outTimeInput.disabled = startBtn.disabled = dateInput.disabled = messageInput.disabled = false;
    newBtn.style.display = "none";
    startBtn.style.display = finishBtn.style.display = "inline-block";
    finishBtn.disabled = true;
};

beginListening();

var updateUItracking = function(date) {
    shiftInput.disabled = inTimeInput.disabled = startBtn.disabled = dateInput.disabled = true;
    finishBtn.disabled = false;
    inTimeInput.value = date.toLocaleTimeString();
    dateInput.value = date.toDateString();
};

var updateUIidol = function(date) {
    newBtn.style.display = "inline-block";
    startBtn.style.display = finishBtn.style.display = "none";
    outTimeInput.disabled = messageInput.disabled = true;
    outTime.value = date.toLocaleTimeString();
};

var createTimesDetail = function(data) {

    var results = document.getElementById('results');
    var removableDiv = document.createElement('div');
    removableDiv.id = ('removable-container');

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
    document.getElementById(el).classList.toggle('hide');
};

var toggleMenuItemText = function(el, optionText) {
    document.getElementById(el).textContent = optionText;
};

var getTotalHrs = function(shift, t1, t2, date) {
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
