var UiGraphicScreen = function(elm, config) {

    /**
     * @var jQuery
     */
    this.$elm = elm;

    /**
     * @var Config
     */
    this.config = config;

    /**
     * @returns {UiGraphicScreen}
     */
    this.init = function() {
        this.$elm.css({
            backgroundColor: this.config.options.color.brown,
            color: this.config.options.color.white
        })
        .addClass('screen-on-playing');
        return this;
    };

    return this.init();
};