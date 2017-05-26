var Writer = function(sentence, $elm){
    this.sentence = sentence;
    this.$elm = $elm;

    this.threads = [];

    /**
     *
     */
    this.getPlanning = function() {
        var timeline = this.sentence.split(' ');
        timeline.pop();


        var planning = [];
        var time = 0;

        for (var i = 0; i < timeline.length; i++) {
            var word = timeline[i];
            var delay = this.getDelayFromWord(word);

            if (delay > 0) {
                word = '';
            } else {
                word += ' ';
                delay = Math.random()*1000;
            }

            var timePerText = Math.floor(
                delay/(word.length+1)
            );

            for (var j = 0; j < word.length; j++) {
                var text = word[j];
                planning.push({
                    'text': text,
                    'time': time+timePerText*(j+1)
                });
            }
            time = Math.floor(time+delay);
        }
        return planning;
    };

    /**
     * @param word
     * @returns {*}
     */
    this.getDelayFromWord = function(word) {
        var matches = word.match(/[\\^(0-9)]{1,}/);
        if (matches) {
            delay = matches[0];
            return parseInt(delay.substr(1));
        }
        return 0;
    };
    /**
     *
     */
    this.start = function()
    {
        var planning = this.getPlanning();

        var e = this.$elm;
        var text = '';

        for(var i = 0; i < planning.length; i++){
            var plan = planning[i];

            this.threads.push(
                setTimeout(
                    function(p) {
                        text += p.text;
                        e.html(text);
                    },
                    plan.time,
                    plan
                )
            );
        }
    };

    /**
     *
     */
    this.clear = function() {
        for(var i = 0; i < this.threads; i++) {
            var thread = this.threads[i];
            clearTimeout(thread);
        }
    }
}