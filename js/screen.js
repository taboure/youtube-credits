var Screen = function(elm, opts) {

    /**
     * Default options
     */
    var options = {
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
    var $elm = $(elm);

    /**
     * @type {Array}
     */
    var lines = [];

    /**
     * Initialization
     */
    var init = function() {
        $elm.css({
            backgroundColor: options.color.brown,
            color: options.color.white
        });


        for(var i =0; i < options.nbLines; i++) {
            lines.push(i.toString());
        }
        draw();
    };

    /**
     * Draw the screen
     */
    var draw = function () {
        $elm.html('');

        for(var i = 0; i < lines.length; i++) {
            $elm.append(getLine(i));
        }
    };

    /**
     * Return HTML component for the indexed row
     * @param index
     * @returns {*|jQuery|HTMLElement}
     */
    var getLine = function(index) {
        var d = $('<div/>');
        var content = Tools.rpad(lines[index], options.nbColumns, ' ');
        d.html(content);
        return d;
    };

    options = $.extend(true, options, opts);
    init();
};