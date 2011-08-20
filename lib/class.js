var Class = function(proto) {
  return function() {
    var self = {
      initialize : function() {}
    };

    for (var i in proto) {
      if (typeof proto[i] === "function") {
        self[i] = proxy(proto[i], self);
      } else {
        self[i] = proto[i];
      }
    }

    self.initialize.apply(self, arguments);

    return self;
  };

  function proxy(func, context) {
    return function() {
      return func.apply(context, arguments);
    };
  }
};
