var Tools = {
    /**
     * @param n
     * @param p
     * @param c
     * @returns {string}
     */
    lpad: function(n, p, c) {
        var pad_char = typeof c !== 'undefined' ? c : '0';
        var pad = new Array(1 + p).join(pad_char);
        return (pad + n).slice(-pad.length);
    },
    /**
     * @param n
     * @param p
     * @param c
     * @returns {string}
     */
    rpad: function(n, p, c) {
        var pad_char = typeof c !== 'undefined' ? c : '0';
        var pad = new Array(1 + p).join(pad_char);
        return (n+pad).slice(0, -n.length);
    }
}