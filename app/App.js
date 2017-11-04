var App = function(elm, opts) {

    /**
     * @var {Config}
     */
    this.config = null;
    /**
     * @var jQuery
     */
    this.elm = null;

    /**
     * @var ManagerScreen
     */
    this.managerScreen = null;
    /**
     * @type ManagerScenario
     */
    this.managerScenario = null;

    /**
     * @param elm
     * @param opts
     * @returns {App}
     */
    this.init = function(elm, opts) {
        this.elm = elm;
        this.config = new Config(opts);
        this.managerScreen = new ManagerScreen(this.elm, this.config);
        this.managerScenario = new ManagerScenario(this.managerScreen);
        return this;
    };
    /**
     * @returns {App}
     */
    this.start = function () {
        this.managerScreen.redraw();
        this.managerScenario.start();
        return this;
    };
    /**
     * @param data
     * @returns {App}
     */
    this.load = function (data) {
        this.managerScreen.load(data);
        return this;
    };
    /**
     * @returns {ManagerScenario}
     */
    this.getScenario = function () {
        return this.managerScenario;
    };
    /**
     * @returns {ManagerScreen}
     */
    this.getManagerScreen = function () {
        return this.managerScreen;
    };

    return this.init(elm, opts);
};