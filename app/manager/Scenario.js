var ManagerScenario = function(managerScreen) {

    /**
     * @var ManagerScreen
     */
    this.managerScreen = managerScreen;

    /**
     * @type {ModelScenario}
     */
    this.scenario = new ModelScenario();

    /**
     * @returns {ManagerScenario}
     */
    this.init = function() {
        return this;
    };

    /**
     * @returns {ManagerScenario}
     */
    this.start = function () {
        var actions = this.scenario.getActions();

        for (var i = 0; i < actions.length; i++) {
            var action = actions[i];
            action(this.managerScreen);
        }
        return this;
    };

    /**
     * @param func
     * @returns {ManagerScenario}
     */
    this.add = function(func) {
        this.scenario.addAction(func);
        return this;
    };

    return this.init();
};