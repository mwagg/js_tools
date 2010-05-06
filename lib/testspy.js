function TestSpy(objectToFake) {
    var testSpy = this;
    var methodStubs = [];

    this.stub = stub;
    this.returns = returns;
    this.assert_was_called = assert_was_called;
    this.assert_was_not_called = assert_was_not_called;

    createMethodStubsForObject.call(this, objectToFake);

    function createMethodStubsForObject(constructor) {
        var constructorSource = constructor.toString();

        var regEx = /this.(\w+) = function/g;
        var match = regEx.exec(constructorSource);

        while (match != null) {
            var methodName = match[1];
            stub.call(this, methodName);

            match = regEx.exec(constructorSource);
        }
    }

    function stub(methodName) {
        var methodStub = new MethodStub(methodName);
        methodStubs[methodName] = methodStub;
        this[methodName] = methodStub.processCall;

        return methodStub;
    }

    function returns(returnValue) {
        return new MethodStub(testSpy, returnValue);
    }

    function assert_was_called(methodName) {
        methodStubs[methodName].assertWasCalled();
    }

    function assert_was_not_called(methodName) {
        methodStubs[methodName].assertWasNotCalled();
    }

    function MethodStub(methodName) {
        var wasCalled = false;
        var returnValue;

        this.methodName = methodName;

        this.and_return = function(value) {
            returnValue = value;
        };

        this.processCall = function() {
            wasCalled = true;
            return returnValue;
        };

        this.assertWasCalled = function() {
            if (!wasCalled) {
                throw "Expected method '{methodName}' to be called but it wasn't.".format({ methodName : methodName });
            }
        };

        this.assertWasNotCalled = function() {
            if (wasCalled) {
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