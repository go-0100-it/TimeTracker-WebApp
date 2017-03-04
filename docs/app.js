var rootRef = firebase.database().ref();
var appDataRef = firebase.database().ref("AppData");
var appStateRef = firebase.database().ref("AppData/app_state");
var appLastStateRef = firebase.database().ref("AppData/last_state");
var times = firebase.database().ref("times");
var other = firebase.database().ref("other");
var shiftInput = document.getElementById('shift-type');
var messageInput = document.getElementById('text');
var startBtn = document.getElementById('start');
var finishBtn = document.getElementById('finish');
var newBtn = document.getElementById('new');
var inTimeInput = document.getElementById('inTime');
var outTimeInput = document.getElementById('outTime');
var dateInput = document.getElementById('date');
var appData;
var currentSessionKey;
var tracking;

var getAppState = function() {
    return appDataRef.once('value').then(function(snapshot) {
        appData = snapshot.val();
    }).then(function() {
        if (appData && appData.app_state.tracking) {
            currentSessionKey = appData.last_state.inTimeMS;
            updateUItracking(new Date(appData.last_state.date));
        }
    });
};
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
    messageInput.value = inTimeInput.value = outTimeInput.value = dateInput.value = "";
    shiftInput.value = "DAYS";
    shiftInput.disabled = inTimeInput.disabled = outTimeInput.disabled = startBtn.disabled = dateInput.disabled = messageInput.disabled = false;
    newBtn.style.display = "none";
    startBtn.style.display = finishBtn.style.display = "inline-block";
    finishBtn.disabled = true;
});

var postStartTime = function(newdate) {
    var time = newdate.getTime();
    var inTime = newdate.toLocaleTimeString();
    var date = newdate.toDateString();
    var shift = shiftInput.value;
    var msgText = messageInput.value;
    currentSessionKey = times.push().key = time;

    var timesData = {
        inTime: inTime,
        inTimeMS: time,
        outTime: "00:00:00 xx",
        outTimeMS: "0",
        date: date
    };

    var otherData = {
        shift: shift,
        date: newdate,
        comment: msgText
    };

    var lastState = {
        inTime: inTime,
        inTimeMS: time,
        outTime: "00:00:00 xx",
        outTimeMS: "0",
        date: newdate
    };

    var updates = {};

    // Updating 
    updates['/times/' + currentSessionKey] = timesData;
    updates['/other/' + currentSessionKey] = otherData;

    // Also updating AppData with current data and current state
    updates['AppData/app_state/tracking'] = true;
    updates['AppData/last_state'] = lastState;

    return firebase.database().ref().update(updates);
};

var postFinishTime = function(date) {
    var msgText = messageInput.value;
    var outTime = outTimeInput.value = date.toLocaleTimeString();
    var time = date.getTime();

    var lastState = {
        outTime: outTime,
        outTimeMS: time,
    };

    var updates = {};


    updates['/times/' + currentSessionKey + "/outTime"] = outTime;
    updates['/times/' + currentSessionKey + "/outTimeMS"] = time;
    updates['/other/' + currentSessionKey + "/comment"] = msgText;

    // Also updating AppData with current data and current state
    updates['AppData/app_state/tracking'] = false;
    updates['AppData/last_state/outTime'] = outTime;
    updates['AppData/last_state/outTimeMS'] = time;

    return firebase.database().ref().update(updates);

};

var beginListening = function() {
    times.on('value', function(snapshot) {
        allTimes = snapshot.val();
        //updateUI(allTimes);
    });
    appStateRef.on('value', function(snapshot) {
        lastState = snapshot.val();
    });
};

var stopListening = function() {
    times.off('value');
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