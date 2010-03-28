JSpec.describe('.format', function() {
    it('should return strings unchanged if they contain no tokens', function() {
        "hello world".format().should.equal("hello world");
    });

    it('should return strings with tokens replaced', function() {
        "Hello {name}, how are you?".format({ name : 'mike' }).should.equal('Hello mike, how are you?');
    });

    it('should be able to replace multiple instances of the same token', function() {
        "Hello {name}, your name is {name}".format({ name : 'mike' }).should.equal('Hello mike, your name is mike');
    });

    it('should be able to replace multiple tokens', function() {
        var formattedString = "Hello {name}, my favourite colour is {colour}".format({ name : 'mike', colour : 'blue' });
        formattedString.should.equal("Hello mike, my favourite colour is blue");
    });
});
