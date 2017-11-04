var ManagerScreen = function(elm, config) {

    /**
     * @var ModelScreen
     */
    this.screen = null;
    /**
     * @var jQuery
     */
    this.elm = elm;
    /**
     * @var {Config}
     */
    this.config = config;

    /**
     * @var UiGraphicScreen
     */
    this.uiScreen = null;

    /**
     * @var UiGraphicLine[]
     */
    this.uiLines = [];

    /**
     * @returns {ManagerScreen}
     */
    this.init = function() {
        return this;
    };

    /**
     * @param data
     * @returns {ManagerScreen}
     */
    this.load = function(data) {
        this.screen = new ModelScreen();
        for (var i = 0; i < data.length; i++) {
            var content = data[i];

            var line = new ModelLine();
            line.setContent(content);
            this.screen.addLine(line);
        }
        return this;
    };

    /**
     * @returns {ManagerScreen}
     */
    this.redraw = function() {
        this.elm.empty();
        this.uiScreen = new UiGraphicScreen(this.elm, this.config);
        var lines = this.screen.getLines();

        for (var i = 0; i < lines.length; i++) {
            this.redrawLine(i);
        }
        return this;
    };
    /**
     * @param index
     * @returns {UiGraphicLine}
     */
    this.getUiGraphicLine = function (index) {
        return this.uiLines[index];
    };
    /**
     * @param index
     * @returns {ModelLine}
     */
    this.getLine = function (index) {
        return this.screen.getLines()[index];
    };
    /**
     * @param index
     * @returns {ManagerScreen}
     */
    this.redrawLine = function(index) {
        var line = this.getLine(index);
        var ui = new UiGraphicLine(line);
        this.uiLines[index] = ui;

        var div = this.elm.find('div');
        if (div.length === this.screen.getLines().length) {
            div.eq(index).after(ui.getElm());
            div.eq(index).remove();
        } else {
            this.elm.append(ui.getElm());
        }
        return this;
    };

    /**
     * @param index
     * @param content
     * @returns {ManagerScreen}
     */
    this.write = function(index, content) {
        var line = this.getLine(index);
        line.setContent(content);
        this.redrawLine(index);
        return this;
    };
    /**
     * @param index
     * @param search
     * @param value
     * @returns {ManagerScreen}
     */
    this.replace = function(index, search, value) {
        var line = this.getLine(index);
        value = this.cleanValue(value);
        var str = Tools.strip_tag(line.getContent().toString());

        var content = str.replace(search, value);
        line.setContent(content);
        this.redrawLine(index);
        return this;
    };
    /**
     * @param index
     * @param value
     * @param start
     * @param end
     * @returns {ManagerScreen}
     */
    this.replaceCharAt = function(index, value, start, end) {

        if(end === undefined || end === null) {
            end = start+value.length;
        }

        var line = this.getLine(index);
        value = this.cleanValue(value);

        var str = line.getContent().toString();
        str = Tools.strip_tag(str);

        var content = str.substring(0, start)+value+str.substring(end);
        line.setContent(content);
        this.redrawLine(index);
        return this;
    };

    /**
     * @param value
     * @returns string
     */
    this.cleanValue = function(value) {
        if (value instanceof jQuery) {
            return $('<div/>').append(value).html();
        }
        return value;
    };

    return this.init();
};