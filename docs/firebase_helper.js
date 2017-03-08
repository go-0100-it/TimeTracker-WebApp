var rootRef = firebase.database().ref();
var appDataRef = firebase.database().ref("AppData");
var appStateRef = firebase.database().ref("AppData/app_state");
var appLastStateRef = firebase.database().ref("AppData/last_state/");
var times = firebase.database().ref("times");
var locations = firebase.database().ref("Locations");
var appData;
var currentSessionKey;
var tracking;

var getAppState = function() {
    return appDataRef.once('value').then(function(snapshot) {
        updateUIlastState(snapshot.val(), 'last state');
    })
};

var getTimesDetail = function() {
    return times.once('value').then(function(snapshot) {
        createTimesDetail(snapshot.val());
    })
};

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
        outTime: "-",
        outTimeMS: "-",
        date: date,
        shift: shift,
        fullDate: newdate,
        comment: msgText
    };

    var lastState = {
        inTime: inTime,
        inTimeMS: time,
        outTime: "-",
        outTimeMS: "-",
        date: newdate,
        shift: shift,
        comment: msgText,
        gps: gpsOn
    };

    var updates = {};

    // Updating 
    updates['/times/' + currentSessionKey] = timesData;

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
    updates['/times/' + currentSessionKey + "/comment"] = msgText;

    // Also updating AppData with current data and current state
    updates['AppData/app_state/tracking'] = false;
    updates['AppData/last_state/outTime'] = outTime;
    updates['AppData/last_state/outTimeMS'] = time;

    return firebase.database().ref().update(updates);

};

var clearLastStateData = function() {
    var date = new Date();
    var lastState = {
        inTime: "",
        inTimeMS: "",
        outTime: "-",
        outTimeMS: "-",
        date: date,
        shift: "DAYS"
    };
    var updates = {};
    updates['AppData/last_state'] = lastState;
    return firebase.database().ref().update(updates);
};

var updateGpsStatus = function() {
    var updates = {};
    updates['AppData/last_state/gps'] = gpsOn;
    return firebase.database().ref().update(updates);
};

var beginListening = function() {
    appDataRef.on('value', function(snapshot) {
        updateUIlastState(snapshot.val(), 'listener');
        console.log("Recieved new snapshot");
    });
    // appStateRef.on('value', function(snapshot) {
    //     lastState = snapshot.val();
    // });
    // locations.on('value', function(snapshot) {
    //     loc = snapshot.val();
    // });
};

var stopListening = function() {
    appDataRef.off('value');
};