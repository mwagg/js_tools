describe('TestSpy', function() {
    function TestObjectFunction() {
        this.foo = function() {
            return 'foo';
        };
    }

    describe('when creating a test spy for an object created by a function', function() {
        var testSpy;

        before_each(function() {
            testSpy = new TestSpy(TestObjectFunction);
        });

        it('should be possible to stub an existing method', function() {
            testSpy.returns('bar').when('foo').is_called();

            var returnedValue = testSpy.foo();

            returnedValue.should.equal('bar');
        });

        describe('when asserting a method was called', function() {
            before_each(function(){
               testSpy.returns('bar').when('foo').is_called();
            });

            it('should throw an error if the method was not called', function() {
                (function() { testSpy.assert_was_called('foo'); }).should.throw_error("Expected method 'foo' to be called but it wasn't.");
            });

            it('should not throw an error if the method was called', function() {
                testSpy.foo();

                (function() { testSpy.assert_was_called('foo'); }).should_not.throw_error();
            });
        })
    });
});