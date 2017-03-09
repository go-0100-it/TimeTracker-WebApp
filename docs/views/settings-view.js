var createSettingsView = function(data) {
    console.log('Called "createSettingsView()" method');
    var display = document.getElementById('display');
    var results = document.getElementById('results');
    var removableDiv = document.createElement('div');
    removableDiv.id = (REMOVABLE_CONTAINER_ID);

    var title = document.createElement('h1');
    title.classList.add('sub-title');
    title.id = (SETTINGS_VIEW_ID + '-title');
    title.textContent = "Settings Detail";
    display.insertBefore(title, display.firstChild);
    results.appendChild(removableDiv);
    toggleElement(DISPLAY_VIEW_ID);
};

var show_settings = function() {
    getSettingsData();
};