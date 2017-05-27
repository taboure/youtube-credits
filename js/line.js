var Line = function(c) {
    this.prefix = 'anthonykgross@youtube: ';
    this.showPrefix = false;

    this.content = '';

    this.cursor = '|';
    this.hasCursor = false;
    this.animationDone = false;

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

        var content = this.content;
        if(!this.animationDone) {
            content = '&nbsp;';
        }

        div.append(
            $('<span/>').addClass('line-content').html(content)
        );

        if (this.hasCursor) {
            div.append(
                $('<span/>').addClass('line-cursor').append(this.cursor)
            );
        }
        this.$elm = div;
        return this.$elm;
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
     * @param $screen
     * @param index
     * @returns {Line}
     */
    this.write = function($screen, index) {
        if (!this.animationDone) {
            var $elm = $screen.find('.line').eq(index);

            this.writer = new Writer(this.content, $elm.find('.line-content'));
            this.writer.start();

            var $this = this;
            this.writer.on('animationDone', function () {
                $elm.scrollLeft(0);
            });
            this.writer.on('animationOnDoing', function (event, text) {
                $this.animationDone = true;
                $elm.scrollLeft(100000);
                $this.content = text;
            });
        }
        return this;
    };

    /**
     * @returns {Line}
     */
    this.clear = function(){
        if (this.writer) {
            this.writer.clear();
        }
        this.hasCursor = false;
        this.showPrefix = false;
        this.animationDone = false;
        return this;
    };

    /**
     * @returns {Line}
     */
    this.skipAnimation = function() {
        this.animationDone = true;
        return this;
    };

    this.init(c);
};