'use strict';
var $ = require('../internals/export');
var global = require('../internals/global');
var anInstance = require('../internals/an-instance');
var anObject = require('../internals/an-object');
var isCallable = require('../internals/is-callable');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var defineBuiltInAccessor = require('../internals/define-built-in-accessor');
var createProperty = require('../internals/create-property');
var fails = require('../internals/fails');
var hasOwn = require('../internals/has-own-property');
var wellKnownSymbol = require('../internals/well-known-symbol');
var IteratorPrototype = require('../internals/iterators-core').IteratorPrototype;
var IS_PURE = require('../internals/is-pure');

var CONSTRUCTOR = 'constructor';
var ITERATOR = 'Iterator';
var TO_STRING_TAG = wellKnownSymbol('toStringTag');

var $TypeError = TypeError;
var NativeIterator = global[ITERATOR];

// FF56- have non-standard global helper `Iterator`
var FORCED = IS_PURE
  || !isCallable(NativeIterator)
  || NativeIterator.prototype !== IteratorPrototype
  // FF44- non-standard `Iterator` passes previous tests
  || !fails(function () { NativeIterator({}); });

var IteratorConstructor = function Iterator() {
  anInstance(this, IteratorPrototype);
  if (getPrototypeOf(this) === IteratorPrototype) throw new $TypeError('Abstract class Iterator not directly constructable');
};

var defineIteratorPrototypeAccessor = function (key, value) {
  defineBuiltInAccessor(IteratorPrototype, key, {
    configurable: true,
    get: function () {
      return value;
    },
    set: function (replacement) {
      anObject(this);
      if (this === IteratorPrototype) throw new $TypeError("You can't redefine this property");
      if (hasOwn(this, key)) this[key] = replacement;
      else createProperty(this, key, replacement);
    },
  });
};

if (!hasOwn(IteratorPrototype, TO_STRING_TAG)) defineIteratorPrototypeAccessor(TO_STRING_TAG, ITERATOR);

if (FORCED || !hasOwn(IteratorPrototype, CONSTRUCTOR) || IteratorPrototype[CONSTRUCTOR] === Object) {
  defineIteratorPrototypeAccessor(CONSTRUCTOR, IteratorConstructor);
}

IteratorConstructor.prototype = IteratorPrototype;

// `Iterator` constructor
// https://github.com/tc39/proposal-iterator-helpers
$({ global: true, constructor: true, forced: FORCED }, {
  Iterator: IteratorConstructor,
});
