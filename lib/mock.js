var Mock = function() {
    var expectations = [];

    this.expect = function(methodName) {
        var expectation = new Expectation(methodName);
        expectations[methodName] = expectation;

        this[methodName] = function() {
            expectation.processCall(arguments);
        };

        return expectation;
    };

    this.checkExpectations = function () {
        for (var i in expectations) {
            expectations[i].checkExpectation();
        }
    };

    var Expectation = function(methodName) {
        var expectedArguments = null;
        var actualArguments = null;
        var actualCallCount = 0;
        var expectedCallCount = 1;

        this.to_be_called = function(count) {
            expectedCallCount = count;
            return this;
        };

        this.with_arguments = function() {
            expectedArguments = arguments;
            return this;
        };

        this.processCall = function(arguments) {
            actualArguments = arguments;
            actualCallCount++;
        };

        this.checkExpectation = function() {
            if (actualCallCount != expectedCallCount) {
                throw "Expected method '{methodName}' to be called {expectedCallCount} times but it was called {actualCallCount} times.".format({
                    methodName : methodName,
                    expectedCallCount : expectedCallCount,
                    actualCallCount : actualCallCount
                });
            }

            if (expectedArguments != null) {
                if (!compareArrays(actualArguments, expectedArguments)) {
                    throw "Expected method '{methodName}' to be called with '{expectedArguments} but got '{actualArguments}'.".format({
                        methodName : methodName,
                        expectedArguments : expectedArguments.join(','),
                        actualArguments : expectedArguments.join(',')
                    });
                }
            }
        };

        function compareArrays(actual, expected) {
            if (actual.length != expected.length) return false;
            for (var i = 0; i < actual.length; i++) {
               if (actual[i] != expected[i]){
                   return false;
               }
            }

            return true;
        }
    };
};
