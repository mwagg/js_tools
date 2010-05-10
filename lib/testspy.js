function TestSpy(objectToFake) {
    var testSpy = this;
    var methodStubs = [];

    this.stub = stub;
    this.returns = returns;
    this.assert_was_called = assert_was_called;
    this.assert_was_not_called = assert_was_not_called;

    createMethodStubsForObject(objectToFake);
    createMethodStubsForPrototype(objectToFake);

    function createMethodStubsForPrototype(object) {
        for (var methodName in object.prototype) {
            createMethodStub(methodName);
        }
    }

    function createMethodStubsForObject(constructor) {
        var constructorSource = constructor.toString();

        var regEx = /this.(\w+) = function/g;
        var match = regEx.exec(constructorSource);

        while (match != null) {
            var methodName = match[1];
            createMethodStub(methodName);

            match = regEx.exec(constructorSource);
        }
    }

    function createMethodStub(methodName) {
        var methodStub = new MethodStub(methodName);
        methodStubs[methodName] = methodStub;
        testSpy[methodName] = methodStub.processCall;
    }

    function stub(methodName) {
        var methodStub = methodStubs[methodName];

        if(methodStub == null) {
            throw "Cannot stub method '{methodName}' as it is not defined.".format({ methodName : methodName })
        }

        return methodStub;
    }

    function returns(returnValue) {
        return new MethodStub(testSpy, returnValue);
    }

    function assert_was_called(methodName) {
        return methodStubs[methodName].assertWasCalled();
    }

    function assert_was_not_called(methodName) {
        methodStubs[methodName].assertWasNotCalled();
    }

    function MethodStub(methodName) {
        var methodStub = this;
        var callCount = 0;
        var returnValue;

        this.methodName = methodName;

        this.and_return = function(value) {
            returnValue = value;
        };

        this.processCall = function() {
            callCount++;
            return returnValue;
        };

        this.assertWasCalled = function() {
            if (callCount == 0) {
                throw "Expected method '{methodName}' to be called but it wasn't.".format({ methodName : methodName });
            }

            return methodStub;
        };

        this.with_call_count = function(expectedCallCount) {
            if (callCount != expectedCallCount) {
                throw "Expected method '{methodName}' to be called {expected} times but it was called {actual} times.".format({
                    methodName : methodName,
                    expected : expectedCallCount,
                    actual : callCount
                });
            }
        };

        this.assertWasNotCalled = function() {
            if (callCount) {
                throw "Expected method '{methodName}' to not be called but it was.".format({ methodName : methodName });
            }
        };
    }

    MethodStub.prototype.toString = function() {
        return "MethodStub [" + this.methodName + "]";
    };
}

TestSpy.prototype.toString = function() {
    return "[TestSpy]";
};