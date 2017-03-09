var createTimesDetailView = function(data) {
    console.log('Called "createSettingsView()" method');
    var display = document.getElementById('display');
    var results = document.getElementById('results');
    var removableDiv = document.createElement('div');
    removableDiv.id = (REMOVABLE_CONTAINER_ID);

    var title = document.createElement('h1');
    title.classList.add('sub-title');
    title.id = (MANAGE_TIMES_VIEW_ID + '-title');
    title.textContent = "Times Detail";
    display.insertBefore(title, display.firstChild);
    results.appendChild(removableDiv);
    show_hideElement(DISPLAY_VIEW_ID);
};