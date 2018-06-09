(function (global) {

    const ID_SELECT_RGX = /^#/
    const CLASS_SELECT_RGX = /^\./
    const TAG_SELECT_RGX = /^</

    var dom = function(selector) {
        return new SimpleDom(selector)
    }

    var _state = {
        selector: '',
        node: {},
        nodes: [],
    }

    var storeNodes = function(nodes){
        if(nodes && nodes.length) {
            _state.nodes = nodes
            _state.node = nodes[0]
        }
    }

    function SimpleDom(selector) {

        _state.selector = selector || ''

        if(ID_SELECT_RGX.test(selector)){
            _state.node = document.getElementById(selector.substring(1))
        } else if(TAG_SELECT_RGX.test(selector)){
            storeNodes(document.getElementsByTagName(selector.substring(1, selector.length - 1)))
        } else if(CLASS_SELECT_RGX.test(selector)) {
            storeNodes(document.getElementsByClassName(selector.substring(1)))
        } else {
            storeNodes(document.getElementsByName(selector))
        }
    }

    var _p = SimpleDom.prototype

    //This methods will set current node in case of query
    _p.setDefaultNode = function(index) {
        _state.node = _state.nodes[index]
        return this
    }

    _p.firstNodeAsDefault = function() {
        return this.setDefaultNode(0)
    }

    _p.lastNodeAsDefault = function(){
        return this.setDefaultNode(_state.nodes.length - 1)
    }

    _p.style = function () {
        if (!arguments.length) {
            return this
        }

        if (arguments.length === 1 && typeof arguments[0] === "object") {
            for (var k in arguments[0]) {
                _state.node.style[k] = arguments[0][k]
            }
            return this
        }

        _state.node.style[arguments[0]] = arguments[1]
        return this
    }

    _p.text = function (textcontent) {
        _state.node.innetText = textcontent
        return this
    }

    global.SD = dom

}(window))