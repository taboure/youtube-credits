var KeyboardEffect = function() {

    /**
     * @returns {KeyboardEffect}
     */
    this.init = function() {
        return this;
    };

    this.type = function(text, duration, func) {
        var t = Math.floor(
            Math.floor(duration/(text.length)+1)
        );

        var cache = '';
        var count = 0;
        var extraT = 0;

        for (var i = 0; i < text.length; i++) {
            var rand = Math.floor((Math.random() * 100) + 1)/100;
            var m = t + extraT;
            extraT = (t*rand);
            m = t - extraT;

            setTimeout(
                function(i) {
                    var cursor = new UiGraphicCursor().getChar();

                    cache += text[i];
                    func(cache+cursor);
                },
                count,
                i
            );
            count = count+m;
        }
    };
    return this.init();
};