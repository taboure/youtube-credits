var ModelLine = function() {

    this.content = null;
    /**
     * @returns {ModelLine}
     */
    this.init = function() {
        return this;
    };
    /**
     * @param content
     * @returns {ModelLine}
     */
    this.setContent = function(content) {
        this.content = content;
        return this;
    };
    /**
     * @returns {null|string}
     */
    this.getContent = function() {
        return this.content;
    };

    return this.init();
};