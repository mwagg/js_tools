function TestSpy() {
    var testSpy = this;
    var methodStubs = [];

    this.stub = function(methodName) {
        var methodStub = new MethodStub(methodName);
        methodStubs[methodName] = methodStub;
        this[methodName] = methodStub.processCall;
        
        return methodStub;
    };

    this.returns = function(returnValue) {
        return new MethodStub(testSpy, returnValue);
    };

    this.addMethodStub = function (methodName, methodStub) {
        methodStubs[methodName] = methodStub;
    };

    this.assert_was_called = function(methodName) {
        methodStubs[methodName].assertWasCalled();
    };

    this.assert_was_not_called = function(methodName) {
        methodStubs[methodName].assertWasNotCalled();
    };

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