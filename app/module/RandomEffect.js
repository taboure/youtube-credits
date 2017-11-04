var RandomEffect = function() {

    /**
     * @returns {RandomEffect}
     */
    this.init = function() {
        return this;
    };

    this.randomize = function(text, duration, list, func) {
        var t = Math.floor(
            Math.floor(duration/(text.length)+1) / (list.length+1)
        );

        var cache = '';
        var count = 0;
        for (var i = 0; i < text.length; i++) {
            for (var j = 0; j < list.length; j++) {
                count = count+t;

                setTimeout(
                    function(j) {
                        func(cache + list[j]);
                    },
                    count,
                    j
                );
            }
            count = count+t;

            setTimeout(
                function(i) {
                    cache += text[i];
                    func(cache);
                },
                count,
                i
            );
        }
    };
    return this.init();
};