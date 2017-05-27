var Scenario = function(elm, screenOpts) {
    this.screen = null;
    this.$elm = elm;
    this.screenFunction = null;

    this.timeline = 0;

    /**
     * @param screenOpts
     * @returns {Scenario}
     */
    this.init = function(screenOpts) {
      this.screen = new Screen(this.$elm, screenOpts);
      return this;
    };
    /**
     * @returns {Scenario}
     */
    this.start = function () {
        if(this.screenFunction) {
            var $this = this;
            this.screen.on('initialization', function () {
                $this.screenFunction($this.screen);
            });
        }

        this.screen.start();
        return this;
    };
    /**
     * @param func
     * @returns {Scenario}
     */
    this.addScreenFunction = function(func) {
        this.screenFunction = func;
        return this;
    };
    /**
     * @param index
     * @param value
     * @param prefix
     * @param skipAnimation
     * @returns {Scenario}
     */
    this.writeScreen = function(index, value, prefix, skipAnimation) {
        this.screen.write(index, value, prefix, skipAnimation);
        return this;
    };

    /**
     * @param index
     * @param value
     * @param prefix
     * @returns {Scenario}
     */
    this.popScreen = function(index, value, prefix) {
        this.screen.write(index, value, prefix, true);
        return this;
    };

    /**
     * @param duration
     * @param func
     * @returns {Scenario}
     */
    this.addToTimeLine = function (duration, func) {
        var r = setTimeout(func, this.timeline);
        this.timeline+= duration;
        this.addScreenFunction(r);
        return this;
    };

    return this.init(screenOpts);
}