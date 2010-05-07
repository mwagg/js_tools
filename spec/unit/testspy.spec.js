describe('TestSpy', function() {
    function TestObjectFunction() {
        this.foo = function() {
            return 'foo';
        };

        this.mike = function() {

        };
    }

    describe('when creating a test spy for an object created by a constructor', function() {
        var testSpy;

        before_each(function() {
            testSpy = new TestSpy(TestObjectFunction);
        });

        it('should be possible to stub the return value of an existing method', function() {
            testSpy.stub('foo').and_return('bar');

            var returnedValue = testSpy.foo();

            returnedValue.should.equal('bar');
        });

        describe('and asserting a method was called', function() {
            it('should throw an error if the method was not called', function() {
                var action = function() {
                    testSpy.assert_was_called('foo');
                };
                action.should.throw_error("Expected method 'foo' to be called but it wasn't.");
            });

            it('should not throw an error if the method was called', function() {
                testSpy.foo();

                var action = function() {
                    testSpy.assert_was_called('foo');
                };
                action.should_not.throw_error();
            });
        });

        describe('and asserting a method was not called', function() {
            before_each(function() {
                testSpy.stub('foo').and_return('bar');
            });

            it('should throw an error if the method was called', function() {
                testSpy.foo();

                var action = function() {
                    testSpy.assert_was_not_called('foo');
                };
                action.should.throw_error("Expected method 'foo' to not be called but it was.");
            });

            it('should not throw an error if the method was not called', function() {
                var action = function() {
                    testSpy.assert_was_not_called('foo');
                };
                action.should_not.throw_error();
            });
        });

        describe('and asserting a method was called a specific number of times', function() {
            it('should throw an error if the method was called an incorrect number of times', function() {
                testSpy.foo();
                testSpy.foo();

                var action = function() {
                    testSpy.assert_was_called('foo').with_call_count(3)
                };

                action.should.throw_error("Expected method 'foo' to be called 3 times but it was called 2 times.");
            });

            it('should not throw an error if the method was called the correct number of times', function() {
                testSpy.foo();
                testSpy.foo();

                var action = function() {
                    testSpy.assert_was_called('foo').with_call_count(2)
                };

                action.should_not.throw_error();
            });
        });
    });
});