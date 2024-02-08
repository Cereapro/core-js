'use strict';
var $ = require('../internals/export');
var apply = require('../internals/function-apply');
var aCallable = require('../internals/a-callable');
var slice = require('../internals/array-slice');
var newPromiseCapabilityModule = require('../internals/new-promise-capability');
var perform = require('../internals/perform');

// `Promise.try` method
// https://github.com/tc39/proposal-promise-try
$({ target: 'Promise', stat: true, forced: true }, {
  try: function (callbackfn /* , ...args */) {
    // dependency: es.promise.constructor
    // dependency: es.promise.catch
    // dependency: es.promise.finally
    var promiseCapability = newPromiseCapabilityModule.f(this);
    var args = slice(arguments, 1);
    var result = perform(function () {
      return apply(aCallable(callbackfn), undefined, args);
    });
    (result.error ? promiseCapability.reject : promiseCapability.resolve)(result.value);
    return promiseCapability.promise;
  },
});
