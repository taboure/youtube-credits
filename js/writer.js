var Writer = function(sentence, $elm){
    this.sentence = sentence;
    this.$elm = $elm;

    this.threads = [];

    /**
     * @type {{initialization: Array}}
     */
    this.events = {
        'animationDone': [],
        'animationCancelled': [],
        'animationOnDoing': []
    };

    /**
     * @returns {Array}
     */
    this.getPlanning = function() {
        var timeline = this.sentence.split(' ');
        var planning = [];
        var time = 0;

        for (var i = 0; i < timeline.length; i++) {
            var word = timeline[i];
            var data = this.getDataFromWord(word);

            if (data.word === undefined) {
                data.word  = ' ';

                if (data.delay === undefined) {
                    data.delay = 50;
                }
            } else {
                data.word  += ' ';
            }

            if (data.delay === undefined) {
                data.delay  = 1000;
            }
            data.delay = parseInt(data.delay);

            var timePerText = Math.floor(
                data.delay/(data.word.length+1)
            );

            for (var j = 0; j < data.word.length; j++) {
                var text = data.word[j];
                planning.push({
                    'text': text,
                    'time': time+timePerText*(j+1)
                });
            }
            time = Math.floor(time+data.delay);
        }
        return planning;
    };

    /**
     * @param word
     * @returns {*}
     */
    this.getDataFromWord = function(word) {
        var matches = word.match(/([^\ \^]{1,})*(\^([0-9]{1,}))*/);
        return {
            'word': matches[1],
            'delay':matches[3]
        };
    };
    /**
     * @returns {Writer}
     */
    this.start = function()
    {
        var planning = this.getPlanning();

        var e = this.$elm;
        var $this = this;
        var text = '';

        for(var i = 0; i < planning.length; i++){
            var plan = planning[i];
            var last = (i === planning.length-1);

            this.threads.push(
                setTimeout(
                    function(p, last) {
                        text += p.text;
                        e.html(text);

                        $this.fireEvent('animationOnDoing', text);

                        if (last) {
                            $this.fireEvent('animationDone');
                        }
                    },
                    plan.time,
                    plan,
                    last
                )
            );
        }
        return this;
    };

    /**
     * @returns {Writer}
     */
    this.clear = function() {
        for(var i = 0; i < this.threads; i++) {
            var thread = this.threads[i];
            clearTimeout(thread);
            this.fireEvent('animationCancelled');
        }
        return this;
    };

    /**
     * @param eventName
     * @returns {Writer}
     */
    this.fireEvent = function (eventName) {
        var events = this.events[eventName];

        for(var i = 0; i < events.length; i++) {
            this.events[eventName][i].apply(this, arguments);
        }
        return this;
    };

    /**
     * @param eventName
     * @param func
     * @returns {Writer}
     */
    this.on = function(eventName, func) {
        this.events[eventName].push(func);
        return this;
    };

    return this;
}