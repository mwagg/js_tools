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
        var expectedArguments;
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

        this.processCall = function(argumentsForCall) {
            actualArguments = argumentsForCall;

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
                    throw "Expected method '{methodName}' to be called with arguments '{expectedArguments}' but got '{actualArguments}'.".format({
                        methodName : methodName,
                        actualArguments : joinArguments(actualArguments),
                        expectedArguments : joinArguments(expectedArguments)
                    });
                }
            }
        };

        function joinArguments(args) {
            var result = '';

            for (var i = 0; i < args.length - 1; i++) {
                result += '{arg}, '.format({arg : args[i]});
            }

            return result + args[args.length -1];
        }

        function compareArrays(actual, expected) {
            if (actual.length != expected.length) return false;
            for (var i = 0; i < actual.length; i++) {
               if (actual[i] !== expected[i]){
                   return false;
               }
            }

            return true;
        }
    };
};
