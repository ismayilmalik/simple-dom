(function (global) {

    var dom = function (selector) {
        return new SimpleDom(selector)
    }

    var querySelector = function (selector) {
        var selectorParts = selector.split(',')
        if (selectorParts.length > 1) {
            return document.querySelectorAll(selector)
        }
        if (/^\./.test(selector)) {
            return document.getElementsByClassName(selector.substring(1))
        }
        if (/^#/.test(selector)) {
            return [document.getElementById(selector.substring(1))]
        }
        if (/^</.test(selector)) {
            return document.getElementsByTagName(selector.substring(1))
        }
        return document.querySelector(selector)
    }

    function SimpleDom(selector) {
        this.selector = selector || ''
        this.value = Array.prototype.slice.call(querySelector(selector))
    }

    var _p = SimpleDom.prototype

    _p.each = function (fn) {
        Array.prototype.forEach.call(this.value, fn)
        return this
    }

    _p.style = function (rules) {
        if (typeof rules === "object") {
            var styleTxt = ''
            for (var k in rules) {
                styleTxt += k.split(/(?=[A-Z])/).join('-').toLowerCase() + ':' + rules[k] + ';'
            }
            return this.each(function (e) {
                e.style.cssText += styleTxt
            })
        } else if (typeof rules === "string") {
            return this.each(function (e) {
                e.style.cssText += rules
            })
        } else {
            return this
        }
    }

    _p.html = function (htmlString) {
        return this.each(function (e) {
            e.innerHTML = htmlString || ''
        })
    }

    _p.text = function (str) {
        return this.each(function (e) {
            e.innerText = str || ''
        })
    }

    _p.content = function(str) {
        return this.each(function (e) {
            e.textContent = str
        })
    }

    // Class manipulations
    _p.addClass = function(val){
        return this.each(function(e){
            e.classList.add(val)
        })
    }

    _p.rmClass = function(val){
        return this.each(function(e){
            e.classList.remove(val)
        })
    }

    _p.toggleClass = function(val){
        return this.each(function(val){
            e.classList.toggle(val)
        })
    } 

    // Attribute manipulations
    _p.attrs = function (args) {
        if (typeof args !== "object") {
            return this
        }
        return this.each(function (e) {
            for (var k in args) {
                e.setAttribute(k, args[k])
            }
        })
    }

    _p.attr = function (key, val) {
        return this.each(function (e) {
            e.setAttribute(key, val)
        })
    }

    _p.getAttr = function(k, i){
        i = i || 0
        return this.value[i].getAttribute(k)
    }

    _p.rmAttr = function(k){
        return this.each(function(e){
            e.removeAttribute(k)
        })
    }

    global.SD = dom

}(window))