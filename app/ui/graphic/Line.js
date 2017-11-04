var UiGraphicLine = function(line) {

    /**
     * @var ModelLine
     */
    this.model = line;

    /**
     * @returns {UiGraphicLine}
     */
    this.init = function() {
        return this;
    };

    /**
     * @returns {*|jQuery}
     */
    this.getElm = function() {
        var div = $('<div/>').addClass('line');
        var content = this.model.getContent();
        var cursor = new UiGraphicCursor();

        if (content) {
            content = content.replace(cursor.getChar(), cursor.html());
        }

        return div.html(content);
    };

    return this.init();
};