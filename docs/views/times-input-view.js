var shiftInput = document.getElementById(SHIFT_TYPE_INPUT_ID);
var messageInput = document.getElementById(COMMENT_INPUT_ID);
var startBtn = document.getElementById(START_BUTTON_ID);
var finishBtn = document.getElementById(FINISH_BUTTON_ID);
var newBtn = document.getElementById(NEW_TIMES_BUTTON_ID);
var inTimeInput = document.getElementById(INTIME_INPUT_ID);
var outTimeInput = document.getElementById(OUTTIME_INPUT_ID);
var dateInput = document.getElementById(DATE_INPUT_ID);

var createTimesList = function(data) {
    console.log('Called "createTimesDetail()" method');
    var display = document.getElementById('display');
    var results = document.getElementById('results');
    var removableDiv = document.createElement('div');
    removableDiv.id = (REMOVABLE_CONTAINER_ID);

    var title = document.createElement('h1');
    title.classList.add('sub-title');
    title.id = (SHOW_TIMES_VIEW_ID + '-title');
    title.textContent = "Times Detail List";
    display.insertBefore(title, display.firstChild);

    for (var prop in data) {

        var inTime = data[prop].inTime;
        var outTime = data[prop].outTime;
        var shift = data[prop].shift;
        var hrs = data[prop].hrs;

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
        totalHrs.textContent = hrs + " hrs";
        div.appendChild(totalHrs);
        removableDiv.appendChild(div);
    }
    results.appendChild(removableDiv);
    toggleElement('display');
};

finishBtn.disabled = true;

startBtn.addEventListener(CLICK, function() {
    console.log('Start button clicked');
    var newDate = new Date();

    //updateUIstart(newDate);
    postStartTime(newDate);
});

finishBtn.addEventListener(CLICK, function() {
    console.log('Finish button clicked');
    var newDate = new Date();
    postFinishTime(newDate);
    // updateUIfinished(newDate);
});

newBtn.addEventListener(CLICK, function() {
    console.log('New button clicked');
    clearLastStateData();
});

var updateUIlastState = function(data) {
    console.log('Called "updateUIlastState()" method');
    if (data) {
        currentSessionKey = data.last_state.inTimeMS;
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

var messageToUser = function(message){
    messageInput.value = message;
};

var show_Times = function() {
    getTimesDetail();
};