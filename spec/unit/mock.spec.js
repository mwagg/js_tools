describe('Mock', function() {
    var mock;

    before_each(function() {
        mock = new Mock();
    });

    it('should return an object when creating a mock', function() {
        mock.should_not.be_null();
    });

    describe('when an expectation is made', function(){
       it('checking expectations should not fail if an expected method was called', function() {
            mock.expect('a_method');

            mock.a_method();

            (function() { mock.checkExpectations(); }).should_not.throw_error();
        });

        it('checking expectations should fail if an expected method was not called', function() {
            mock.expect('a_method');

            (function() { mock.checkExpectations(); }).should.throw_error();
        });

        it('checking expectations should name the method which was not called', function() {
            mock.expect('a_method');

            (function() { mock.checkExpectations(); }).should.throw_error("Expected method 'a_method' to be called 1 times but it was called 0 times.");
        });

        describe('and the number of expected calls is specified', function(){
            it('should not fail if the number of actual calls matches', function(){
                mock.expect('a_method').to_be_called(2);

                mock.a_method();
                mock.a_method();

                        (function() { mock.checkExpectations(); }).should_not.throw_error();
            });

            it('should fail if the number of actual calls does not match', function(){
                mock.expect('a_method').to_be_called(2);

                mock.a_method();

                (function() { mock.checkExpectations(); }).should.throw_error("Expected method 'a_method' to be called 2 times but it was called 1 times.");
            });
        });

        describe('and the expected argument are specified', function(){
            it('should not fail if the actual arguments match the expected arguments', function(){
                mock.expect('a_method').with_arguments(1, 'two');

                mock.a_method(1, 'two');

                (function() { mock.checkExpectations(); }).should_not.throw_error();
            });

            it('should fail if the actual arguments do not match', function(){
                mock.expect('a_method').with_arguments(1, 'two');

                mock.a_method(1);

                (function() { mock.checkExpectations(); }).should.throw_error("Expected method 'a_method' to be called with arguments '1, two' but got '1'.");
            });
        });
    });
});