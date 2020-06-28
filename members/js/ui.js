import AjaxService from './ajaxService.js';

export default class UI {

    static get Actions() {
        return {
            allmembers: UI.getAll,
            onemember: UI.getOne,
            newmember: UI.addMemeber,
            updatemember: UI.updateMemeber,
            deletemember: UI.deleteMemeber
        }
    }

    static get ActionButtons() {
        return document.querySelector('#actions')
    }

    static getAll() {
        let result;
        let html;
        const cb = function () {
            result = JSON.parse(this.responseText);
            html = result.map(member => `<tr><td>${member.id}</td><td>${member.name}</td><td>${member.active}</td></tr>`)
            UI.Emplist.innerHTML = `<table border="1" style="border-collapse: collapse;">${html.join('')}</table>`
            UI.focus('Id')
        }
        AjaxService.callback = cb;
        AjaxService.get("http://localhost:3000/members")
    }

    static getOne() {
        let result;
        let id = UI.Id.value
        if (id === '') {
            alert("Id Required!!!")
            UI.focus('Id');
            return;
        }
        const cb = function () {
            result = JSON.parse(this.responseText);
            if (result.id) {
                UI.Id = result.id;
                UI.Name = result.name;
                UI.Active = result.active;
            } else {
                alert(`ID: ${id} - not found!!!`)
                UI.Name = '';
                UI.Active = '';
            }
            UI.focus('Id');
        }
        AjaxService.callback = cb;
        AjaxService.get("http://localhost:3000/members/" + id)
    }
    static addMemeber() {
        let result
        const member = { name: UI.Name.value, active: JSON.parse(UI.Active.value) }
        const cb = function () {
            if (this.status === 201) {
                result = this.status + " " + this.statusText;
                UI.Id = JSON.parse(this.response).id;
                alert("ID #" + UI.Id.value + " " + result)
            } else {
                alert("Problem in creating member!!!")
            }
            UI.focus('Id');
        }
        AjaxService.callback = cb;
        AjaxService.post("http://localhost:3000/members",member)
    }
    static updateMemeber() {
        let result
        let id = UI.Id.value
        if (id === '') {
            alert("Id Required!!!")
            UI.focus('Id');
            return;
        }
        const member = { name: UI.Name.value, active: JSON.parse(UI.Active.value) }
        const cb = function () {
            if (this.status === 200) {
                result = this.status + " " + this.statusText;
                UI.Id = JSON.parse(this.response).id;
                alert("ID #" + UI.Id.value + " updated!!! (" + result +")")
            } else {
                alert("Problem in creating member!!!")
            }
            UI.focus('Id');
        }
        AjaxService.callback = cb;
        AjaxService.put("http://localhost:3000/members/" + id,member)

    }
    static deleteMemeber() {
        let result;
        let id = UI.Id.value
        if (id === '') {
            alert("Id Required!!!")
            UI.focus('Id');
            return;
        }
        const cb = function () {
            result = JSON.parse(this.responseText);
            if (this.status === 200) {
                result = this.status + " " + this.statusText;
             //   UI.Id = JSON.parse(this.response).id;
                alert("ID #" + UI.Id.value + " deleted (" + result +")")
            } else {
                alert("Problem in deleting member!!!")
            }
            UI.focus('Id');
        }
        AjaxService.callback = cb;
        AjaxService.delete("http://localhost:3000/members/" + id)
    }

    static get Emplist() {
        return document.querySelector('#empList')
    }

    static get Id() {
        return document.querySelector('#memberid')
    }
    static set Id(value) {
        document.querySelector('#memberid').value = value;
    }

    static get Name() {
        return document.querySelector('#membername')
    }

    static set Name(value) {
        document.querySelector('#membername').value = value
    }
    static get Active() {
        return document.querySelector('#active')
    }
    static set Active(value) {
        return document.querySelector('#active').value = value
    }

    static focus(inputElement) {
        const el = UI[inputElement]
        el.focus();
    }
}