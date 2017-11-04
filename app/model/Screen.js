var ModelScreen = function() {

    this.lines = [];

    /**
     * @returns {ModelScreen}
     */
    this.init = function() {
        return this;
    };
    /**
     * @param line ModelLine
     * @returns {ModelScreen}
     */
    this.addLine = function(line) {
        this.lines.push(line);
        return this;
    };
    /**
     * @param index
     * @returns {ModelScreen}
     */
    this.removeLine = function(index) {
        this.lines.splice(index);
        return this;
    };
    /**
     * @returns ModelLine[]
     */
    this.getLines = function() {
        return this.lines;
    };
    /**
     * @returns {ModelScreen}
     */
    this.clear = function() {
        this.lines = [];
        return this;
    };

    return this.init();
};