var Config = function(opts) {

    this.options = {
        nbLines:  21,
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

    this.options = $.extend(true, this.options, opts);
    return this;
};