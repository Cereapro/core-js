'use strict';
var IteratorPrototype = require('../internals/iterator-prototype');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var setToStringTag = require('../internals/set-to-string-tag');

module.exports = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  IteratorConstructor.prototype = Object.create(IteratorPrototype, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
  setToStringTag(IteratorConstructor, NAME + ' Iterator', false, true);
  return IteratorConstructor;
};
