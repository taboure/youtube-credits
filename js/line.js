var Line = function(c) {
    var self = this;

    this.prefix = 'anthonykgross@youtube: ';
    this.showPrefix = false;

    this.content = '';

    this.cursor = '|';
    this.hasCursor = false;

    this.$elm = null;
    this.writer = null;

    /**
     * @param c
     * @returns {Line}
     */
    this.init = function(c) {
        this.content = c;
        return this;
    };

    /**
     * @returns {*|jQuery}
     */
    this.getElm = function() {
        var div = $('<div/>').addClass('line');

        if (this.showPrefix) {
            div.append(
                $('<span/>').addClass('line-prefix').append(this.prefix)
            );
        }

        div.append(
            $('<span/>').addClass('line-content').html('&nbsp;')
        );

        if (this.hasCursor) {
            div.append(
                $('<span/>').addClass('line-cursor').append(this.cursor)
            );
        }
        this.$elm = div;
        return this.$elm ;
    };

    /**
     * @param value
     * @returns {Line}
     */
    this.setContent = function(value) {
        this.content = value;
        return this;
    };

    /**
     * @param value
     * @returns {Line}
     */
    this.setShowPrefix = function (value) {
        this.showPrefix = value;
        return this;
    };

    /**
     * @param value
     * @returns {Line}
     */
    this.setHasCursor = function (value) {
        this.hasCursor = value;
        return this;
    };

    /**
     *
     */
    this.write = function($screen, index) {
        this.writer = new Writer(this.content, $screen.find('.line').eq(index).find('.line-content'));
        this.writer.start();
    };

    /**
     *
     */
    this.clear = function(){
        if (this.writer) {
            this.writer.clear();
        }
    };

    this.init(c);
};