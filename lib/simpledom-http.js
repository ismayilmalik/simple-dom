(function (global) {

    var cycle = {
        UNINITIALIZED: 0,
        OPEN: 1,
        SEND: 2,
        RECEIVING: 3,
        COMPLETE: 4
    }

    function SDHTTPSuccessResponse(
        status, 
        payload, 
        responseType,
        responseUrl
    ){
        this.responseUrl = responseUrl || ''
        this.responseType = responseType || ''
        this.status = status || -1
        this.payload = payload || ''
    }

    function SDHTTPErrorResponse(status, error){
        this.status = status
        this.error = error
    }

    var sdHTTP = {}

    sdHTTP.request = function (options) {
        var xhr = new XMLHttpRequest()

        xhr.withCredentials = options.withCredentials
        xhr.timeout = options.timeout || 3000
        if (options.headers) {
            for (var k in options.headers) {
                xhr.setRequestHeader(k, options.headers[k])
            }
        }

        xhr.ontimeout = options.ontimeout || function () { }
        xhr.onloadstart = options.onloadstart || function () { }
        xhr.onprogress = options.onprogress || function (event) { }
        xhr.onerror = options.onerror || function () { }
        xhr.onabort = options.onabort || function () { }
        xhr.onload = options.onload || function () { }
        xhr.onloadend = options.onloadend || function () { }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === cycle.COMPLETE) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    options.onsuccess(new SDHTTPResponse(
                        xhr.status, 
                        xhr.responseText,
                        xhr.responseType,
                        xhr.responseURL
                    ))
                } else {
                    options.onerror(new SDHTTPErrorResponse(xhr.status, xhr.responseText))
                }
            }
        }

        xhr.open(options.method, options.url, true)
        xhr.send(options.data || null)
    }

    if (global.SD) {
        global.SD.plug(sdHTTP)
    }

}(window))


