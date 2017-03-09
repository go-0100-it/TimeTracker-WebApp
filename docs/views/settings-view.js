var createSettingsView = function(data) {
    console.log('Called "createSettingsView()" method');
    var display = document.getElementById('display');
    var results = document.getElementById('results');
    var removableDiv = document.createElement('div');
    removableDiv.id = ('removable-container');

    var title = document.createElement('h1');
    title.classList.add('sub-title');
    title.id = ('settings-view-title');
    title.textContent = "Settings Detail";
    display.insertBefore(title, display.firstChild);
    results.appendChild(removableDiv);
    show_hideElement('display');
};