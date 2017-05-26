var Screen = function(elm, opts) {

    var self = this;

    this.events = {
        'initialization': []
    };

    /**
     * Default options
     */
    this.options = {
        nbLines:  12,
        nbColumns: 50,
        color: {
            brown: '#232525',
            yellow: '#e4c66d',
            orange: '#cc7832',
            red: '#BC3F3C',
            green: '#6a8759',
            blue: '#598dbb',
            purple: '#9876aa',
            white: '#a9b7c6'
        }
    };

    /**
     * @type {*}
     */
    this.$elm = $(elm);

    /**
     * @type {Array}
     */
    this.lines = [];

    /**
     * @type {Array}
     */
    this.cacheCursors = [];

    /**
     * Initialization
     * @returns {Screen}
     */
    this.start = function() {
        this.$elm.css({
            backgroundColor: this.options.color.brown,
            color: this.options.color.white
        });

        for (var i = 0; i < this.options.nbLines; i++) {
            var line = new Line();
            this.lines.push(line);
        }
        this.draw();

        var firstLine = this.getLine(0)
            .setShowPrefix(true);
        this.cursorAt(0);
        this.drawLine(0);

        this.fireEvent('initialization');

        return this;
    };

    /**
     * Draw the screen
     * @returns {Screen}
     */
    this.draw = function () {
        for(var i = 0; i < this.lines.length; i++) {
            this.drawLine(i);
        }
        return this;
    };

    /**
     * @param index
     * @returns {Screen}
     */
    this.drawLine = function (index) {
        var tag = this.$elm.find('div').eq(index);
        var line = this.getLine(index);

        if (tag.length === 0) {
            this.$elm.append(line.getElm());
        }
        else {
            tag.replaceWith(line.getElm());
        }
        return this;
    };

    /**
     * @param index
     * @returns {*}
     */
    this.getLine = function(index) {
        return this.lines[index];
    };
    /**
     * @param index
     * @param line
     * @returns {Screen}
     */
    this.setLine = function(index, line) {
        this.lines[index] = line;
        return this;
    };

    /**
     * @param index
     * @param value
     * @param prefix
     * @returns {Screen}
     */
    this.write = function(index, value, prefix) {
        var line = this.lines[index];
        line.setContent(value)
            .setShowPrefix(prefix);
        this.clearCursor();

        this.cursorAt(index);
        this.drawLine(index);

        line.write(this.$elm, index);
        return this;
    };

    /**
     * @param eventName
     */
    this.fireEvent = function (eventName) {
        var events = this.events[eventName];

        for(var i = 0; i < events.length; i++) {
            this.events[eventName][i].apply(this, arguments);
        }
    };

    /**
     * @param eventName
     * @param func
     */
    this.on = function(eventName, func) {
        this.events[eventName].push(func);
    };

    /**
     * @returns {Screen}
     */
    this.clear = function () {
        for (var i = 0; i < this.options.nbLines; i++) {
            var line = this.getLine(i);
            line.setShowPrefix(false);
            line.clear();
        }
        this.clearCursor();
        line = this.getLine(0);
        line.setShowPrefix(true);
        this.cursorAt(0);

        this.draw();

        return this;
    };

    /**
     * @returns {Screen}
     */
    this.clearCursor = function() {
        for(var i = 0; i < this.cacheCursors.length; i++) {
            var index = this.cacheCursors[i];
            var line = this.getLine(index)
                .setHasCursor(false);
            this.setLine(index, line);

            this.drawLine(index);
        }
        this.cacheCursors = [];

        return this;
    };
    
    /**
     * @param index
     * @returns {Screen}
     */
    this.cursorAt = function(index) {
        var line = this.getLine(index);
        line.setHasCursor(true);
        this.cacheCursors.push(index);

        return this;
    };

    this.options = $.extend(true, this.options, opts);
};