function TestSpy() {
    var testSpy = this;
    var methodStubs = [];

    this.stub = function(methodName) {
        var methodStub = new MethodStub2(methodName);
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

    function MethodStub2(methodName) {
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

    MethodStub2.prototype.toString = function() {
        return "MethodStub [" + this.methodName + "]";
    };

    function MethodStub(testSpy, returnValue) {
        var wasCalled = false;
        var stubbedMethodName;

        this.when = function(methodName) {
            stubbedMethodName = methodName;

            testSpy[methodName] = function() {
                wasCalled = true;
                return returnValue;
            };

            testSpy.addMethodStub(methodName, this);

            return this;
        };

        this.is_called = function() {

        };

        this.assertWasCalled = function() {
            if (!wasCalled) {
                throw "Expected method '{methodName}' to be called but it wasn't.".format({ methodName : stubbedMethodName });
            }
        };

        this.assertWasNotCalled = function() {
            if (wasCalled) {
                throw "Expected method '{methodName}' to not be called but it was.".format({ methodName : stubbedMethodName });
            }
        };
    }
}

TestSpy.prototype.toString = function() {
    return "[TestSpy]";
}