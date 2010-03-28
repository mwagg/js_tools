JSpec.describe('EventHub', function() {
    var eventHub;

    before_each(function() {
        eventHub = new EventHub();
    });

    describe('subscribing for an event', function() {
        it('should raise an error if the event name is null', function() {
            var action = function() {
                eventHub.subscribe(null, function() {
                });
            };

            action.should.throw_error('Event name is null.');
        });

        it('should raise an error if the subscriber is null', function() {
            var action = function() {
                eventHub.subscribe('some_event', null);
            };

            action.should.throw_error("Subscriber for event 'some_event' is null.");
        });
    });

    describe('publishing an event', function() {
        it('should raise an error if the event name is null', function() {
            var action = function() {
                eventHub.publish(null);
            };

            action.should.throw_error('Event name is null.');
        });

        it('should call an interested subscriber when an event is raised', function() {
            var subscriberWasCalled = false;

            eventHub.subscribe('some_event', function() {
                subscriberWasCalled = true;
            });

            eventHub.publish('some_event');

            subscriberWasCalled.should.be_true('The subscriber was not called.');
        });

        it('should not call subscribers interested in other events', function() {
            var subscriberWasCalled = false;

            eventHub.subscribe('some_event', function() {
                subscriberWasCalled = true;
            });

            eventHub.publish('some_other_event');

            subscriberWasCalled.should.be_false("The subscriber was unexpectedly called.");
        });

        it('should call all interested subscribers if there are more than one', function() {
            var firstSubscriberWasCalled = false;
            var secondSubscriberWasCalled = false;

            eventHub.subscribe('some_event', function() {
                firstSubscriberWasCalled = true;
            });

            eventHub.subscribe('some_event', function() {
                secondSubscriberWasCalled = true;
            });

            eventHub.publish('some_event');

            firstSubscriberWasCalled.should.be_true('First subscriber was not called.');
            secondSubscriberWasCalled.should.be_true('Second subscriber was not called.');
        });
    });
});
