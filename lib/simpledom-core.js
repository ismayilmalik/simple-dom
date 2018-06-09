(function (global) {

    function SimpleDom(selector) {
        return new SimpleDomCore(selector)
    }

    SimpleDom.plug = function (plugin) {
        for (var p in plugin) {
            if (typeof p === "function") {
                SimpleDom.prototype[p] = function () {
                    plugin[p].apply(null, [].slice.call(arguments))
                }
            } else {
                SimpleDom.prototype[p] = plugin[p]
            }
        }
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

    function SimpleDomCore(selector) {
        this.selector = selector || ''
        this.value = Array.prototype.slice.call(querySelector(selector))
    }

    var _p = SimpleDomCore.prototype

    // Utility methods
    _p.each = function (fn) {
        Array.prototype.forEach.call(this.value, fn)
        return this
    }

    //Styling methods
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

    _p.content = function (str) {
        return this.each(function (e) {
            e.textContent = str
        })
    }

    // Class manipulations
    _p.addClass = function (val) {
        return this.each(function (e) {
            e.classList.add(val)
        })
    }

    _p.rmClass = function (val) {
        return this.each(function (e) {
            e.classList.remove(val)
        })
    }

    _p.toggleClass = function (val) {
        return this.each(function (val) {
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

    _p.getAttr = function (k, i) {
        i = i || 0
        return this.value[i].getAttribute(k)
    }

    _p.rmAttr = function (k) {
        return this.each(function (e) {
            e.removeAttribute(k)
        })
    }

    // Manipulating eventhandlers
    _p.addEvent = function (type, handler, capture) {
        return this.each(function (e) {
            if (e.addEventListener) {
                a.addEventListener(type, handler, capture || false)
            } else if (e.attachEvent) {
                e.attachEvent("on" + type, handler.bind(e))
            } else {
                e["on" + type] = handler
            }
        })
    }

    _p.rmEvent = function (type, handler) {
        return this.each(function (e) {
            if (e.removeEventListener) {
                a.removeEventListener(type, handler, false)
            } else if (e.detachEvent) {
                e.detachEvent("on" + type, handler)
            } else {
                e["on" + type] = null;
            }
        })
    }

    _p.preventEvent = function (e) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }

    _p.stopPropagationEvent = function (e) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }

    _p.click =function(fn){
        return this.each(function(e){
            e.onclick = fn
        })
    }

    global.SD = SimpleDom
    global.$ = SimpleDom

}(window))