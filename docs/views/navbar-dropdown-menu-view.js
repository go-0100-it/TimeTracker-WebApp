var optionsMenuBtn = document.getElementById(OPTIONS_MENU_BUTTON_ID);
var dropdown = document.getElementsByClassName('dropdown-content');
var optionsMenuItem1Btn = document.getElementById(OPTIONS_MENU_ITEM_1_ID);
var optionsMenuItem2Btn = document.getElementById(OPTIONS_MENU_ITEM_2_ID);
var optionsMenuItem3Btn = document.getElementById(OPTIONS_MENU_ITEM_3_ID);
var optionsMenuItem4Btn = document.getElementById(OPTIONS_MENU_ITEM_4_ID);

optionsMenuBtn.addEventListener(CLICK, function() {
    toggleOptionsMenu();
});

optionsMenuItem1Btn.addEventListener(CLICK, function() {
    var id = this.id;
    var text = this.textContent;
    optionClickedRouter(text, id);
});

optionsMenuItem2Btn.addEventListener(CLICK, function() {
    var id = this.id;
    var text = this.textContent;
    optionClickedRouter(text, id);
});

optionsMenuItem3Btn.addEventListener(CLICK, function() {
    var id = this.id;
    var text = this.textContent;
    optionClickedRouter(text, id);
});

optionsMenuItem4Btn.addEventListener(CLICK, function() {
    var id = this.id;
    var text = this.textContent;
    optionClickedRouter(text, id);
});

var optionClickedRouter = function(text, id) {

    showHideCurrentView(text, id);

    switch (text) {
        case TRACK_TIME:
            resolveOptionClicked(TRACK_TIMES_VIEW_ID, TRACK_TIME, toggleElement);
            break;
        case SETTINGS:
            resolveOptionClicked(SETTINGS_VIEW_ID, SETTINGS, show_settings);
            break;
        case MANAGE_LOCATIONS:
            resolveOptionClicked(MANAGE_LOCATIONS_VIEW_ID, MANAGE_LOCATIONS, show_Locations_Detail);
            break;
        case MANAGE_TIMES:
            resolveOptionClicked(MANAGE_TIMES_VIEW_ID, MANAGE_TIMES, show_Times_Detail);
            break;
        case SHOW_TIMES:
            resolveOptionClicked(SHOW_TIMES_VIEW_ID, SHOW_TIMES, show_Times);
            break;
        default:
            break;
    }
};

var showHideCurrentView = function(text, id) {

    toggleOptionsMenu();
    if (currentView === TRACK_TIMES_VIEW_ID) {
        toggleElement(currentView);
    } else {
        removeElement([currentView + '-title', REMOVABLE_CONTAINER_ID]);
        toggleElement(DISPLAY_VIEW_ID);
    }
    toggleMenuItemText(id, currentViewMenuItemText);
};

var resolveOptionClicked = function(view, text, func) {
    currentView = view;
    currentViewMenuItemText = text;
    func();
};

var toggleOptionsMenu = function() {
    dropdown[0].classList.toggle('dropdown-hide');
    dropdown[0].classList.toggle('dropdown-show');
};

var toggleMenuItemText = function(el, optionText) {
    document.getElementById(el).textContent = optionText;
};