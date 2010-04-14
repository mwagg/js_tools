function TestSpy() {
    var testSpy = this;
    var methodStubs = [];

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
            if(wasCalled) {
                throw "Expected method '{methodName}' to not be called but it was.".format({ methodName : stubbedMethodName });
            }
        };
    }
}