'use strict';
var parent = require('../../stable/set');
require('../../modules/esnext.set.difference');
require('../../modules/esnext.set.intersection');
require('../../modules/esnext.set.is-disjoint-from');
require('../../modules/esnext.set.is-subset-of');
require('../../modules/esnext.set.is-superset-of');
require('../../modules/esnext.set.symmetric-difference.v2');
require('../../modules/esnext.set.union.v2');

module.exports = parent;
