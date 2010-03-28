(function() {
    String.prototype.format = function(replaceValues) {
        var tokens = this.match(/\{\w+\}/g);

        var string = this;

        for (var i in tokens) {
            var tokenName = tokens[i].substring(1, tokens[i].length - 1);

            string = string.replace(tokens[i], replaceValues[tokenName]);
        }

        return string.toString();
    };
})();       