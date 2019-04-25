var hidden_element_id = 'good_tab_name';

// detect if tab just became active, thanks to https://stackoverflow.com/questions/19519535/detect-if-browser-tab-is-active-or-user-has-switched-away
var vis = (function() {
var stateKey, eventKey, keys = {
    hidden: "visibilitychange",
    webkitHidden: "webkitvisibilitychange",
    mozHidden: "mozvisibilitychange",
    msHidden: "msvisibilitychange"
};
for (stateKey in keys) {
    if (stateKey in document) {
        eventKey = keys[stateKey];
        break;
    }
}
return function(c) {
    if (c) document.addEventListener(eventKey, c);
    return !document[stateKey];
}
})();



// when we switch back to the tab, stop suppressing tab title changes
vis(function(){
    if (vis()) {
        var hidden_element = document.getElementById(hidden_element_id);
        if (hidden_element) {
            document.body.removeChild(hidden_element);
        }
    }
});


// while the tab is inactive, store the "X messaged you" title in a hidden input
// and whenever the page tries to change the title, change it back to the value
// of the hidden input
if (document.title.includes('messaged')) {
    var hidden_element = document.getElementById(hidden_element_id);
    if (!hidden_element) {
        hidden_element = document.createElement("input");
        hidden_element.setAttribute('type', 'hidden');
        hidden_element.setAttribute('id', hidden_element_id);
        hidden_element.setAttribute('value', document.title);
        document.body.appendChild(hidden_element);
    }
    hidden_element.setAttribute('value', document.title);
} else {
    var hidden_element = document.getElementById(hidden_element_id);
    if (hidden_element) {
        document.title = hidden_element.value;
    }
}
