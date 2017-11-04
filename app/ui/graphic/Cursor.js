var UiGraphicCursor = function() {

    /**
     * @var {*|jQuery}
     */
    this.elm = null;

    /**
     * @returns {UiGraphicCursor}
     */
    this.init = function() {
        return this;
    };

    /**
     * @returns {string}
     */
    this.getChar = function () {
        return '¬';
    };

    /**
     * @returns {*|jQuery}
     */
    this.getElm = function() {
        this.elm = $('<span/>').addClass('line-cursor').append('|');
        return this.elm;
    };

    /**
     * @returns {*}
     */
    this.html = function() {
        var div = $('<div/>');
        return div.append(this.getElm()).html();
    };

    return this.init();
};