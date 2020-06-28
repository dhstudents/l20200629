import UI from './ui.js';

window.onload = init;

function init() {
    document.querySelector('#clear').addEventListener('click' , clearAll)
    UI.ActionButtons.addEventListener('click' , executeAction)
}

function clearAll(e) {
    UI.Id = ''
    UI.Name = ''
    UI.Active = ''
    e.cancelBubble = true;
}

function executeAction(event) {
    const btn = event.target
    if (btn.nodeName !== "BUTTON") {
        return 
    }
    UI.Actions[btn.id.toLowerCase()]()
    // switch (btn.id.toLowerCase()) {
    //     case "allmembers":
    //         // do get all
    //         UI.getAll()
    //         break;
    //     case "onemember":
    //         // do get one
    //         break;
    //     ...
    // }
}


