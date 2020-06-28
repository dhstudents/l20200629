export default class AjaxService {
    static #method
    static #url
    static #data
    static #id
    static #contentType = '';

    static #result
    static #status

    static callback

    // static get Result() {
    //     return AjaxService.#result;
    // }
    // static get Status() {
    //     return AjaxService.#status;
    // }

    static get(url , id = '') {
        AjaxService.#method = "get"
        AjaxService.#url = url
        AjaxService.#id = id
        AjaxService.Request(null)
    }

    static post(url, data) {
        AjaxService.#method = "post"
        AjaxService.#url = url
        AjaxService.Request(JSON.stringify(data))
    }
    
    static put(url, data) {
        AjaxService.#method = "put"
        AjaxService.#url = url
      //  AjaxService.#id = id
        AjaxService.Request(JSON.stringify(data))
        
    }
    static delete(url) {
        AjaxService.#method = "delete"
        AjaxService.#url = url
      //  AjaxService.#id = id
        AjaxService.Request(null)
    }

    static Request(data) {
        const xhr = new XMLHttpRequest();
        xhr.open(AjaxService.#method, AjaxService.#url)
        if ("post_put".includes(AjaxService.#method)) {
            xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        }
        xhr.onload = AjaxService.callback
        xhr.send(data)
    }
}