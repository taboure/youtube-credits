var ModelScenario = function() {

    /**
     * @var {Array}
     */
    this.actions = [];

    /**
     * @returns {ModelScenario}
     */
    this.init = function() {
        return this;
    };

    /**
     * @param action
     * @returns {ModelScenario}
     */
    this.addAction = function(action) {
        this.actions.push(action);
        return this;
    };
    /**
     * @param index
     * @returns {ModelScenario}
     */
    this.removeAction = function(index) {
        this.actions.splice(index);
        return this;
    };
    /**
     * @returns Array
     */
    this.getActions = function() {
        return this.actions;
    };
    /**
     * @returns {ModelScenario}
     */
    this.clear = function() {
        this.actions = [];
        return this;
    };

    return this.init();
};