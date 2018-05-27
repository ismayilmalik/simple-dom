(function (global) {

    function dom(selector) {
        return new SimpleDom(selector)
    }

    function SimpleDom(selector) {
        this.selector = selector
        this.node = document.querySelector(selector)
    }

    var _p = SimpleDom.prototype
    _p.style = function () {
        if (!arguments.length) {
            return this
        }

        if (arguments.length === 1 && typeof arguments[0] === "object") {
            for (var k in arguments[0]) {
                this.node.style[k] = arguments[0][k]
            }
            return this
        }

        this.node.style[arguments[0]] = arguments[1]
        return this
    }

    _p.text = function (textcontent) {
        this.node.innetText = textcontent
        return this
    }

    global.SD = dom

}(window))