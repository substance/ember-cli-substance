(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var Substance = require('./src/basics');

Substance.Data = require('./src/data');
Substance.Document = require('./src/document');
Substance.Operator = require('./src/operator');
Substance.Surface = require('./src/surface');

Substance._ = require('./src/basics/helpers');

module.exports = Substance;

},{"./src/basics":115,"./src/basics/helpers":114,"./src/data":121,"./src/document":141,"./src/operator":151,"./src/surface":161}],2:[function(require,module,exports){
/**
 * Creates an array with all falsey values removed. The values `false`, `null`,
 * `0`, `""`, `undefined`, and `NaN` are falsey.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to compact.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * _.compact([0, 1, false, 2, '', 3]);
 * // => [1, 2, 3]
 */
function compact(array) {
  var index = -1,
      length = array ? array.length : 0,
      resIndex = -1,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (value) {
      result[++resIndex] = value;
    }
  }
  return result;
}

module.exports = compact;

},{}],3:[function(require,module,exports){
/**
 * Gets the first element of `array`.
 *
 * @static
 * @memberOf _
 * @alias head
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the first element of `array`.
 * @example
 *
 * _.first([1, 2, 3]);
 * // => 1
 *
 * _.first([]);
 * // => undefined
 */
function first(array) {
  return array ? array[0] : undefined;
}

module.exports = first;

},{}],4:[function(require,module,exports){
var baseIndexOf = require('../internal/baseIndexOf'),
    cacheIndexOf = require('../internal/cacheIndexOf'),
    createCache = require('../internal/createCache'),
    isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray');

/**
 * Creates an array of unique values in all provided arrays using `SameValueZero`
 * for equality comparisons.
 *
 * **Note:** `SameValueZero` comparisons are like strict equality comparisons,
 * e.g. `===`, except that `NaN` matches `NaN`. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of shared values.
 * @example
 * _.intersection([1, 2], [4, 2], [2, 1]);
 * // => [2]
 */
function intersection() {
  var args = [],
      argsIndex = -1,
      argsLength = arguments.length,
      caches = [],
      indexOf = baseIndexOf,
      isCommon = true;

  while (++argsIndex < argsLength) {
    var value = arguments[argsIndex];
    if (isArray(value) || isArguments(value)) {
      args.push(value);
      caches.push((isCommon && value.length >= 120) ? createCache(argsIndex && value) : null);
    }
  }
  argsLength = args.length;
  var array = args[0],
      index = -1,
      length = array ? array.length : 0,
      result = [],
      seen = caches[0];

  outer:
  while (++index < length) {
    value = array[index];
    if ((seen ? cacheIndexOf(seen, value) : indexOf(result, value)) < 0) {
      argsIndex = argsLength;
      while (--argsIndex) {
        var cache = caches[argsIndex];
        if ((cache ? cacheIndexOf(cache, value) : indexOf(args[argsIndex], value)) < 0) {
          continue outer;
        }
      }
      if (seen) {
        seen.push(value);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = intersection;

},{"../internal/baseIndexOf":38,"../internal/cacheIndexOf":55,"../internal/createCache":63,"../lang/isArguments":91,"../lang/isArray":92}],5:[function(require,module,exports){
/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array ? array.length : 0;
  return length ? array[length - 1] : undefined;
}

module.exports = last;

},{}],6:[function(require,module,exports){
var baseFlatten = require('../internal/baseFlatten'),
    baseUniq = require('../internal/baseUniq');

/**
 * Creates an array of unique values, in order, of the provided arrays using
 * `SameValueZero` for equality comparisons.
 *
 * **Note:** `SameValueZero` comparisons are like strict equality comparisons,
 * e.g. `===`, except that `NaN` matches `NaN`. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of combined values.
 * @example
 *
 * _.union([1, 2], [4, 2], [2, 1]);
 * // => [1, 2, 4]
 */
function union() {
  return baseUniq(baseFlatten(arguments, false, true));
}

module.exports = union;

},{"../internal/baseFlatten":35,"../internal/baseUniq":51}],7:[function(require,module,exports){
var baseCallback = require('../internal/baseCallback'),
    baseUniq = require('../internal/baseUniq'),
    isIterateeCall = require('../internal/isIterateeCall'),
    sortedUniq = require('../internal/sortedUniq');

/**
 * Creates a duplicate-value-free version of an array using `SameValueZero`
 * for equality comparisons. Providing `true` for `isSorted` performs a faster
 * search algorithm for sorted arrays. If an iteratee function is provided it
 * is invoked for each value in the array to generate the criterion by which
 * uniqueness is computed. The `iteratee` is bound to `thisArg` and invoked
 * with three arguments; (value, index, array).
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * **Note:** `SameValueZero` comparisons are like strict equality comparisons,
 * e.g. `===`, except that `NaN` matches `NaN`. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
 * for more details.
 *
 * @static
 * @memberOf _
 * @alias unique
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {boolean} [isSorted] Specify the array is sorted.
 * @param {Function|Object|string} [iteratee] The function invoked per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array} Returns the new duplicate-value-free array.
 * @example
 *
 * _.uniq([1, 2, 1]);
 * // => [1, 2]
 *
 * // using `isSorted`
 * _.uniq([1, 1, 2], true);
 * // => [1, 2]
 *
 * // using an iteratee function
 * _.uniq([1, 2.5, 1.5, 2], function(n) {
 *   return this.floor(n);
 * }, Math);
 * // => [1, 2.5]
 *
 * // using the `_.property` callback shorthand
 * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
 * // => [{ 'x': 1 }, { 'x': 2 }]
 */
function uniq(array, isSorted, iteratee, thisArg) {
  var length = array ? array.length : 0;
  if (!length) {
    return [];
  }
  if (isSorted != null && typeof isSorted != 'boolean') {
    thisArg = iteratee;
    iteratee = isIterateeCall(array, isSorted, thisArg) ? null : isSorted;
    isSorted = false;
  }
  iteratee = iteratee == null ? iteratee : baseCallback(iteratee, thisArg, 3);
  return (isSorted)
    ? sortedUniq(array, iteratee)
    : baseUniq(array, iteratee);
}

module.exports = uniq;

},{"../internal/baseCallback":26,"../internal/baseUniq":51,"../internal/isIterateeCall":78,"../internal/sortedUniq":88}],8:[function(require,module,exports){
var baseDifference = require('../internal/baseDifference'),
    baseSlice = require('../internal/baseSlice');

/**
 * Creates an array excluding all provided values using `SameValueZero` for
 * equality comparisons.
 *
 * **Note:** `SameValueZero` comparisons are like strict equality comparisons,
 * e.g. `===`, except that `NaN` matches `NaN`. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to filter.
 * @param {...*} [values] The values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * _.without([1, 2, 1, 3], 1, 2);
 * // => [3]
 */
function without(array) {
  return baseDifference(array, baseSlice(arguments, 1));
}

module.exports = without;

},{"../internal/baseDifference":32,"../internal/baseSlice":48}],9:[function(require,module,exports){
var arrayFilter = require('../internal/arrayFilter'),
    baseCallback = require('../internal/baseCallback'),
    baseFilter = require('../internal/baseFilter'),
    isArray = require('../lang/isArray');

/**
 * Iterates over elements of `collection`, returning an array of all elements
 * `predicate` returns truthy for. The predicate is bound to `thisArg` and
 * invoked with three arguments; (value, index|key, collection).
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @alias select
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {Array} Returns the new filtered array.
 * @example
 *
 * _.filter([4, 5, 6], function(n) {
 *   return n % 2 == 0;
 * });
 * // => [4, 6]
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': true },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * // using the `_.matches` callback shorthand
 * _.pluck(_.filter(users, { 'age': 36, 'active': true }), 'user');
 * // => ['barney']
 *
 * // using the `_.matchesProperty` callback shorthand
 * _.pluck(_.filter(users, 'active', false), 'user');
 * // => ['fred']
 *
 * // using the `_.property` callback shorthand
 * _.pluck(_.filter(users, 'active'), 'user');
 * // => ['barney']
 */
function filter(collection, predicate, thisArg) {
  var func = isArray(collection) ? arrayFilter : baseFilter;
  predicate = baseCallback(predicate, thisArg, 3);
  return func(collection, predicate);
}

module.exports = filter;

},{"../internal/arrayFilter":23,"../internal/baseCallback":26,"../internal/baseFilter":34,"../lang/isArray":92}],10:[function(require,module,exports){
var arrayEach = require('../internal/arrayEach'),
    baseEach = require('../internal/baseEach'),
    bindCallback = require('../internal/bindCallback'),
    isArray = require('../lang/isArray');

/**
 * Iterates over elements of `collection` invoking `iteratee` for each element.
 * The `iteratee` is bound to `thisArg` and invoked with three arguments;
 * (value, index|key, collection). Iterator functions may exit iteration early
 * by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a `length` property
 * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
 * may be used for object iteration.
 *
 * @static
 * @memberOf _
 * @alias each
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array|Object|string} Returns `collection`.
 * @example
 *
 * _([1, 2]).forEach(function(n) {
 *   console.log(n);
 * }).value();
 * // => logs each value from left to right and returns the array
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
 *   console.log(n, key);
 * });
 * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
 */
function forEach(collection, iteratee, thisArg) {
  return (typeof iteratee == 'function' && typeof thisArg == 'undefined' && isArray(collection))
    ? arrayEach(collection, iteratee)
    : baseEach(collection, bindCallback(iteratee, thisArg, 3));
}

module.exports = forEach;

},{"../internal/arrayEach":22,"../internal/baseEach":33,"../internal/bindCallback":53,"../lang/isArray":92}],11:[function(require,module,exports){
var baseIndexOf = require('../internal/baseIndexOf'),
    isArray = require('../lang/isArray'),
    isLength = require('../internal/isLength'),
    isString = require('../lang/isString'),
    values = require('../object/values');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Checks if `value` is in `collection` using `SameValueZero` for equality
 * comparisons. If `fromIndex` is negative, it is used as the offset from
 * the end of `collection`.
 *
 * **Note:** `SameValueZero` comparisons are like strict equality comparisons,
 * e.g. `===`, except that `NaN` matches `NaN`. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
 * for more details.
 *
 * @static
 * @memberOf _
 * @alias contains, include
 * @category Collection
 * @param {Array|Object|string} collection The collection to search.
 * @param {*} target The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {boolean} Returns `true` if a matching element is found, else `false`.
 * @example
 *
 * _.includes([1, 2, 3], 1);
 * // => true
 *
 * _.includes([1, 2, 3], 1, 2);
 * // => false
 *
 * _.includes({ 'user': 'fred', 'age': 40 }, 'fred');
 * // => true
 *
 * _.includes('pebbles', 'eb');
 * // => true
 */
function includes(collection, target, fromIndex) {
  var length = collection ? collection.length : 0;
  if (!isLength(length)) {
    collection = values(collection);
    length = collection.length;
  }
  if (!length) {
    return false;
  }
  if (typeof fromIndex == 'number') {
    fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : (fromIndex || 0);
  } else {
    fromIndex = 0;
  }
  return (typeof collection == 'string' || !isArray(collection) && isString(collection))
    ? (fromIndex < length && collection.indexOf(target, fromIndex) > -1)
    : (baseIndexOf(collection, target, fromIndex) > -1);
}

module.exports = includes;

},{"../internal/baseIndexOf":38,"../internal/isLength":79,"../lang/isArray":92,"../lang/isString":99,"../object/values":105}],12:[function(require,module,exports){
var createAggregator = require('../internal/createAggregator');

/**
 * Creates an object composed of keys generated from the results of running
 * each element of `collection` through `iteratee`. The corresponding value
 * of each key is the last element responsible for generating the key. The
 * iteratee function is bound to `thisArg` and invoked with three arguments;
 * (value, index|key, collection).
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [iteratee=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Object} Returns the composed aggregate object.
 * @example
 *
 * var keyData = [
 *   { 'dir': 'left', 'code': 97 },
 *   { 'dir': 'right', 'code': 100 }
 * ];
 *
 * _.indexBy(keyData, 'dir');
 * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
 *
 * _.indexBy(keyData, function(object) {
 *   return String.fromCharCode(object.code);
 * });
 * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
 *
 * _.indexBy(keyData, function(object) {
 *   return this.fromCharCode(object.code);
 * }, String);
 * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
 */
var indexBy = createAggregator(function(result, value, key) {
  result[key] = value;
});

module.exports = indexBy;

},{"../internal/createAggregator":60}],13:[function(require,module,exports){
var arrayMap = require('../internal/arrayMap'),
    baseCallback = require('../internal/baseCallback'),
    baseMap = require('../internal/baseMap'),
    isArray = require('../lang/isArray');

/**
 * Creates an array of values by running each element in `collection` through
 * `iteratee`. The `iteratee` is bound to `thisArg` and invoked with three
 * arguments; (value, index|key, collection).
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * Many lodash methods are guarded to work as interatees for methods like
 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
 *
 * The guarded methods are:
 * `ary`, `callback`, `chunk`, `clone`, `create`, `curry`, `curryRight`, `drop`,
 * `dropRight`, `fill`, `flatten`, `invert`, `max`, `min`, `parseInt`, `slice`,
 * `sortBy`, `take`, `takeRight`, `template`, `trim`, `trimLeft`, `trimRight`,
 * `trunc`, `random`, `range`, `sample`, `uniq`, and `words`
 *
 * @static
 * @memberOf _
 * @alias collect
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [iteratee=_.identity] The function invoked
 *  per iteration.
 *  create a `_.property` or `_.matches` style callback respectively.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function timesThree(n) {
 *   return n * 3;
 * }
 *
 * _.map([1, 2], timesThree);
 * // => [3, 6]
 *
 * _.map({ 'a': 1, 'b': 2 }, timesThree);
 * // => [3, 6] (iteration order is not guaranteed)
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * // using the `_.property` callback shorthand
 * _.map(users, 'user');
 * // => ['barney', 'fred']
 */
function map(collection, iteratee, thisArg) {
  var func = isArray(collection) ? arrayMap : baseMap;
  iteratee = baseCallback(iteratee, thisArg, 3);
  return func(collection, iteratee);
}

module.exports = map;

},{"../internal/arrayMap":24,"../internal/baseCallback":26,"../internal/baseMap":43,"../lang/isArray":92}],14:[function(require,module,exports){
var baseProperty = require('../internal/baseProperty'),
    map = require('./map');

/**
 * Gets the value of `key` from all elements in `collection`.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {string} key The key of the property to pluck.
 * @returns {Array} Returns the property values.
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 40 }
 * ];
 *
 * _.pluck(users, 'user');
 * // => ['barney', 'fred']
 *
 * var userIndex = _.indexBy(users, 'user');
 * _.pluck(userIndex, 'age');
 * // => [36, 40] (iteration order is not guaranteed)
 */
function pluck(collection, key) {
  return map(collection, baseProperty(key));
}

module.exports = pluck;

},{"../internal/baseProperty":46,"./map":13}],15:[function(require,module,exports){
var baseCallback = require('../internal/baseCallback'),
    baseEach = require('../internal/baseEach'),
    baseSortBy = require('../internal/baseSortBy'),
    compareAscending = require('../internal/compareAscending'),
    isIterateeCall = require('../internal/isIterateeCall'),
    isLength = require('../internal/isLength');

/**
 * Creates an array of elements, sorted in ascending order by the results of
 * running each element in a collection through `iteratee`. This method performs
 * a stable sort, that is, it preserves the original sort order of equal elements.
 * The `iteratee` is bound to `thisArg` and invoked with three arguments;
 * (value, index|key, collection).
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Array|Function|Object|string} [iteratee=_.identity] The function
 *  invoked per iteration. If a property name or an object is provided it is
 *  used to create a `_.property` or `_.matches` style callback respectively.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * _.sortBy([1, 2, 3], function(n) {
 *   return Math.sin(n);
 * });
 * // => [3, 1, 2]
 *
 * _.sortBy([1, 2, 3], function(n) {
 *   return this.sin(n);
 * }, Math);
 * // => [3, 1, 2]
 *
 * var users = [
 *   { 'user': 'fred' },
 *   { 'user': 'pebbles' },
 *   { 'user': 'barney' }
 * ];
 *
 * // using the `_.property` callback shorthand
 * _.pluck(_.sortBy(users, 'user'), 'user');
 * // => ['barney', 'fred', 'pebbles']
 */
function sortBy(collection, iteratee, thisArg) {
  var index = -1,
      length = collection ? collection.length : 0,
      result = isLength(length) ? Array(length) : [];

  if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
    iteratee = null;
  }
  iteratee = baseCallback(iteratee, thisArg, 3);
  baseEach(collection, function(value, key, collection) {
    result[++index] = { 'criteria': iteratee(value, key, collection), 'index': index, 'value': value };
  });
  return baseSortBy(result, compareAscending);
}

module.exports = sortBy;

},{"../internal/baseCallback":26,"../internal/baseEach":33,"../internal/baseSortBy":49,"../internal/compareAscending":57,"../internal/isIterateeCall":78,"../internal/isLength":79}],16:[function(require,module,exports){
var isNative = require('../lang/isNative');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeNow = isNative(nativeNow = Date.now) && nativeNow;

/**
 * Gets the number of milliseconds that have elapsed since the Unix epoch
 * (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @category Date
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => logs the number of milliseconds it took for the deferred function to be invoked
 */
var now = nativeNow || function() {
  return new Date().getTime();
};

module.exports = now;

},{"../lang/isNative":96}],17:[function(require,module,exports){
var baseSlice = require('../internal/baseSlice'),
    createWrapper = require('../internal/createWrapper'),
    replaceHolders = require('../internal/replaceHolders');

/** Used to compose bitmasks for wrapper metadata. */
var BIND_FLAG = 1,
    PARTIAL_FLAG = 32;

/**
 * Creates a function that invokes `func` with the `this` binding of `thisArg`
 * and prepends any additional `_.bind` arguments to those provided to the
 * bound function.
 *
 * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
 * may be used as a placeholder for partially applied arguments.
 *
 * **Note:** Unlike native `Function#bind` this method does not set the `length`
 * property of bound functions.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {...*} [args] The arguments to be partially applied.
 * @returns {Function} Returns the new bound function.
 * @example
 *
 * var greet = function(greeting, punctuation) {
 *   return greeting + ' ' + this.user + punctuation;
 * };
 *
 * var object = { 'user': 'fred' };
 *
 * var bound = _.bind(greet, object, 'hi');
 * bound('!');
 * // => 'hi fred!'
 *
 * // using placeholders
 * var bound = _.bind(greet, object, _, '!');
 * bound('hi');
 * // => 'hi fred!'
 */
function bind(func, thisArg) {
  var bitmask = BIND_FLAG;
  if (arguments.length > 2) {
    var partials = baseSlice(arguments, 2),
        holders = replaceHolders(partials, bind.placeholder);

    bitmask |= PARTIAL_FLAG;
  }
  return createWrapper(func, bitmask, thisArg, partials, holders);
}

// Assign default placeholders.
bind.placeholder = {};

module.exports = bind;

},{"../internal/baseSlice":48,"../internal/createWrapper":67,"../internal/replaceHolders":85}],18:[function(require,module,exports){
var isObject = require('../lang/isObject'),
    now = require('../date/now');

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that delays invoking `func` until after `wait` milliseconds
 * have elapsed since the last time it was invoked. The created function comes
 * with a `cancel` method to cancel delayed invocations. Provide an options
 * object to indicate that `func` should be invoked on the leading and/or
 * trailing edge of the `wait` timeout. Subsequent calls to the debounced
 * function return the result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
 * on the trailing edge of the timeout only if the the debounced function is
 * invoked more than once during the `wait` timeout.
 *
 * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options] The options object.
 * @param {boolean} [options.leading=false] Specify invoking on the leading
 *  edge of the timeout.
 * @param {number} [options.maxWait] The maximum time `func` is allowed to be
 *  delayed before it is invoked.
 * @param {boolean} [options.trailing=true] Specify invoking on the trailing
 *  edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // avoid costly calculations while the window size is in flux
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // invoke `sendMail` when the click event is fired, debouncing subsequent calls
 * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // ensure `batchLog` is invoked once after 1 second of debounced calls
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', _.debounce(batchLog, 250, {
 *   'maxWait': 1000
 * }));
 *
 * // cancel a debounced call
 * var todoChanges = _.debounce(batchLog, 1000);
 * Object.observe(models.todo, todoChanges);
 *
 * Object.observe(models, function(changes) {
 *   if (_.find(changes, { 'user': 'todo', 'type': 'delete'})) {
 *     todoChanges.cancel();
 *   }
 * }, ['delete']);
 *
 * // ...at some point `models.todo` is changed
 * models.todo.completed = true;
 *
 * // ...before 1 second has passed `models.todo` is deleted
 * // which cancels the debounced `todoChanges` call
 * delete models.todo;
 */
function debounce(func, wait, options) {
  var args,
      maxTimeoutId,
      result,
      stamp,
      thisArg,
      timeoutId,
      trailingCall,
      lastCalled = 0,
      maxWait = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = wait < 0 ? 0 : (+wait || 0);
  if (options === true) {
    var leading = true;
    trailing = false;
  } else if (isObject(options)) {
    leading = options.leading;
    maxWait = 'maxWait' in options && nativeMax(+options.maxWait || 0, wait);
    trailing = 'trailing' in options ? options.trailing : trailing;
  }

  function cancel() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    if (maxTimeoutId) {
      clearTimeout(maxTimeoutId);
    }
    maxTimeoutId = timeoutId = trailingCall = undefined;
  }

  function delayed() {
    var remaining = wait - (now() - stamp);
    if (remaining <= 0 || remaining > wait) {
      if (maxTimeoutId) {
        clearTimeout(maxTimeoutId);
      }
      var isCalled = trailingCall;
      maxTimeoutId = timeoutId = trailingCall = undefined;
      if (isCalled) {
        lastCalled = now();
        result = func.apply(thisArg, args);
        if (!timeoutId && !maxTimeoutId) {
          args = thisArg = null;
        }
      }
    } else {
      timeoutId = setTimeout(delayed, remaining);
    }
  }

  function maxDelayed() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    maxTimeoutId = timeoutId = trailingCall = undefined;
    if (trailing || (maxWait !== wait)) {
      lastCalled = now();
      result = func.apply(thisArg, args);
      if (!timeoutId && !maxTimeoutId) {
        args = thisArg = null;
      }
    }
  }

  function debounced() {
    args = arguments;
    stamp = now();
    thisArg = this;
    trailingCall = trailing && (timeoutId || !leading);

    if (maxWait === false) {
      var leadingCall = leading && !timeoutId;
    } else {
      if (!maxTimeoutId && !leading) {
        lastCalled = stamp;
      }
      var remaining = maxWait - (stamp - lastCalled),
          isCalled = remaining <= 0 || remaining > maxWait;

      if (isCalled) {
        if (maxTimeoutId) {
          maxTimeoutId = clearTimeout(maxTimeoutId);
        }
        lastCalled = stamp;
        result = func.apply(thisArg, args);
      }
      else if (!maxTimeoutId) {
        maxTimeoutId = setTimeout(maxDelayed, remaining);
      }
    }
    if (isCalled && timeoutId) {
      timeoutId = clearTimeout(timeoutId);
    }
    else if (!timeoutId && wait !== maxWait) {
      timeoutId = setTimeout(delayed, wait);
    }
    if (leadingCall) {
      isCalled = true;
      result = func.apply(thisArg, args);
    }
    if (isCalled && !timeoutId && !maxTimeoutId) {
      args = thisArg = null;
    }
    return result;
  }
  debounced.cancel = cancel;
  return debounced;
}

module.exports = debounce;

},{"../date/now":16,"../lang/isObject":98}],19:[function(require,module,exports){
var baseDelay = require('../internal/baseDelay');

/**
 * Invokes `func` after `wait` milliseconds. Any additional arguments are
 * provided to `func` when it is invoked.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to delay.
 * @param {number} wait The number of milliseconds to delay invocation.
 * @param {...*} [args] The arguments to invoke the function with.
 * @returns {number} Returns the timer id.
 * @example
 *
 * _.delay(function(text) {
 *   console.log(text);
 * }, 1000, 'later');
 * // => logs 'later' after one second
 */
function delay(func, wait) {
  return baseDelay(func, wait, arguments, 2);
}

module.exports = delay;

},{"../internal/baseDelay":31}],20:[function(require,module,exports){
(function (global){
var cachePush = require('./cachePush'),
    isNative = require('../lang/isNative');

/** Native method references. */
var Set = isNative(Set = global.Set) && Set;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate;

/**
 *
 * Creates a cache object to store unique values.
 *
 * @private
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var length = values ? values.length : 0;

  this.data = { 'hash': nativeCreate(null), 'set': new Set };
  while (length--) {
    this.push(values[length]);
  }
}

// Add functions to the `Set` cache.
SetCache.prototype.push = cachePush;

module.exports = SetCache;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lang/isNative":96,"./cachePush":56}],21:[function(require,module,exports){
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function arrayCopy(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = arrayCopy;

},{}],22:[function(require,module,exports){
/**
 * A specialized version of `_.forEach` for arrays without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

},{}],23:[function(require,module,exports){
/**
 * A specialized version of `_.filter` for arrays without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array.length,
      resIndex = -1,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[++resIndex] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;

},{}],24:[function(require,module,exports){
/**
 * A specialized version of `_.map` for arrays without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;

},{}],25:[function(require,module,exports){
var baseCopy = require('./baseCopy'),
    keys = require('../object/keys');

/**
 * The base implementation of `_.assign` without support for argument juggling,
 * multiple sources, and `this` binding `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {Function} [customizer] The function to customize assigning values.
 * @returns {Object} Returns the destination object.
 */
function baseAssign(object, source, customizer) {
  var props = keys(source);
  if (!customizer) {
    return baseCopy(source, object, props);
  }
  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index],
        value = object[key],
        result = customizer(value, source[key], key, object, source);

    if ((result === result ? result !== value : value === value) ||
        (typeof value == 'undefined' && !(key in object))) {
      object[key] = result;
    }
  }
  return object;
}

module.exports = baseAssign;

},{"../object/keys":103,"./baseCopy":29}],26:[function(require,module,exports){
var baseMatches = require('./baseMatches'),
    baseMatchesProperty = require('./baseMatchesProperty'),
    baseProperty = require('./baseProperty'),
    bindCallback = require('./bindCallback'),
    identity = require('../utility/identity'),
    isBindable = require('./isBindable');

/**
 * The base implementation of `_.callback` which supports specifying the
 * number of arguments to provide to `func`.
 *
 * @private
 * @param {*} [func=_.identity] The value to convert to a callback.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function baseCallback(func, thisArg, argCount) {
  var type = typeof func;
  if (type == 'function') {
    return (typeof thisArg != 'undefined' && isBindable(func))
      ? bindCallback(func, thisArg, argCount)
      : func;
  }
  if (func == null) {
    return identity;
  }
  if (type == 'object') {
    return baseMatches(func);
  }
  return typeof thisArg == 'undefined'
    ? baseProperty(func + '')
    : baseMatchesProperty(func + '', thisArg);
}

module.exports = baseCallback;

},{"../utility/identity":109,"./baseMatches":44,"./baseMatchesProperty":45,"./baseProperty":46,"./bindCallback":53,"./isBindable":76}],27:[function(require,module,exports){
var arrayCopy = require('./arrayCopy'),
    arrayEach = require('./arrayEach'),
    baseCopy = require('./baseCopy'),
    baseForOwn = require('./baseForOwn'),
    initCloneArray = require('./initCloneArray'),
    initCloneByTag = require('./initCloneByTag'),
    initCloneObject = require('./initCloneObject'),
    isArray = require('../lang/isArray'),
    isObject = require('../lang/isObject'),
    keys = require('../object/keys');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[boolTag] =
cloneableTags[dateTag] = cloneableTags[float32Tag] =
cloneableTags[float64Tag] = cloneableTags[int8Tag] =
cloneableTags[int16Tag] = cloneableTags[int32Tag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[stringTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[mapTag] = cloneableTags[setTag] =
cloneableTags[weakMapTag] = false;

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * The base implementation of `_.clone` without support for argument juggling
 * and `this` binding `customizer` functions.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {Function} [customizer] The function to customize cloning values.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The object `value` belongs to.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates clones with source counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
  var result;
  if (customizer) {
    result = object ? customizer(value, key, object) : customizer(value);
  }
  if (typeof result != 'undefined') {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return arrayCopy(value, result);
    }
  } else {
    var tag = objToString.call(value),
        isFunc = tag == funcTag;

    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return baseCopy(value, result, keys(value));
      }
    } else {
      return cloneableTags[tag]
        ? initCloneByTag(value, tag, isDeep)
        : (object ? value : {});
    }
  }
  // Check for circular references and return corresponding clone.
  stackA || (stackA = []);
  stackB || (stackB = []);

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == value) {
      return stackB[length];
    }
  }
  // Add the source value to the stack of traversed objects and associate it with its clone.
  stackA.push(value);
  stackB.push(result);

  // Recursively populate clone (susceptible to call stack limits).
  (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
    result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
  });
  return result;
}

module.exports = baseClone;

},{"../lang/isArray":92,"../lang/isObject":98,"../object/keys":103,"./arrayCopy":21,"./arrayEach":22,"./baseCopy":29,"./baseForOwn":37,"./initCloneArray":73,"./initCloneByTag":74,"./initCloneObject":75}],28:[function(require,module,exports){
/**
 * The base implementation of `compareAscending` which compares values and
 * sorts them in ascending order without guaranteeing a stable sort.
 *
 * @private
 * @param {*} value The value to compare to `other`.
 * @param {*} other The value to compare to `value`.
 * @returns {number} Returns the sort order indicator for `value`.
 */
function baseCompareAscending(value, other) {
  if (value !== other) {
    var valIsReflexive = value === value,
        othIsReflexive = other === other;

    if (value > other || !valIsReflexive || (typeof value == 'undefined' && othIsReflexive)) {
      return 1;
    }
    if (value < other || !othIsReflexive || (typeof other == 'undefined' && valIsReflexive)) {
      return -1;
    }
  }
  return 0;
}

module.exports = baseCompareAscending;

},{}],29:[function(require,module,exports){
/**
 * Copies the properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Array} props The property names to copy.
 * @returns {Object} Returns `object`.
 */
function baseCopy(source, object, props) {
  if (!props) {
    props = object;
    object = {};
  }
  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];
    object[key] = source[key];
  }
  return object;
}

module.exports = baseCopy;

},{}],30:[function(require,module,exports){
(function (global){
var isObject = require('../lang/isObject');

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function Object() {}
  return function(prototype) {
    if (isObject(prototype)) {
      Object.prototype = prototype;
      var result = new Object;
      Object.prototype = null;
    }
    return result || global.Object();
  };
}());

module.exports = baseCreate;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lang/isObject":98}],31:[function(require,module,exports){
var baseSlice = require('./baseSlice');

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * The base implementation of `_.delay` and `_.defer` which accepts an index
 * of where to slice the arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to delay.
 * @param {number} wait The number of milliseconds to delay invocation.
 * @param {Object} args The `arguments` object to slice and provide to `func`.
 * @returns {number} Returns the timer id.
 */
function baseDelay(func, wait, args, fromIndex) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  return setTimeout(function() { func.apply(undefined, baseSlice(args, fromIndex)); }, wait);
}

module.exports = baseDelay;

},{"./baseSlice":48}],32:[function(require,module,exports){
var baseIndexOf = require('./baseIndexOf'),
    cacheIndexOf = require('./cacheIndexOf'),
    createCache = require('./createCache');

/**
 * The base implementation of `_.difference` which accepts a single array
 * of values to exclude.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values) {
  var length = array ? array.length : 0,
      result = [];

  if (!length) {
    return result;
  }
  var index = -1,
      indexOf = baseIndexOf,
      isCommon = true,
      cache = (isCommon && values.length >= 200) ? createCache(values) : null,
      valuesLength = values.length;

  if (cache) {
    indexOf = cacheIndexOf;
    isCommon = false;
    values = cache;
  }
  outer:
  while (++index < length) {
    var value = array[index];

    if (isCommon && value === value) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === value) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (indexOf(values, value) < 0) {
      result.push(value);
    }
  }
  return result;
}

module.exports = baseDifference;

},{"./baseIndexOf":38,"./cacheIndexOf":55,"./createCache":63}],33:[function(require,module,exports){
var baseForOwn = require('./baseForOwn'),
    isLength = require('./isLength'),
    toObject = require('./toObject');

/**
 * The base implementation of `_.forEach` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object|string} Returns `collection`.
 */
function baseEach(collection, iteratee) {
  var length = collection ? collection.length : 0;
  if (!isLength(length)) {
    return baseForOwn(collection, iteratee);
  }
  var index = -1,
      iterable = toObject(collection);

  while (++index < length) {
    if (iteratee(iterable[index], index, iterable) === false) {
      break;
    }
  }
  return collection;
}

module.exports = baseEach;

},{"./baseForOwn":37,"./isLength":79,"./toObject":89}],34:[function(require,module,exports){
var baseEach = require('./baseEach');

/**
 * The base implementation of `_.filter` without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function baseFilter(collection, predicate) {
  var result = [];
  baseEach(collection, function(value, index, collection) {
    if (predicate(value, index, collection)) {
      result.push(value);
    }
  });
  return result;
}

module.exports = baseFilter;

},{"./baseEach":33}],35:[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isLength = require('./isLength'),
    isObjectLike = require('./isObjectLike');

/**
 * The base implementation of `_.flatten` with added support for restricting
 * flattening and specifying the start index.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {boolean} [isDeep] Specify a deep flatten.
 * @param {boolean} [isStrict] Restrict flattening to arrays and `arguments` objects.
 * @param {number} [fromIndex=0] The index to start from.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, isDeep, isStrict, fromIndex) {
  var index = (fromIndex || 0) - 1,
      length = array.length,
      resIndex = -1,
      result = [];

  while (++index < length) {
    var value = array[index];

    if (isObjectLike(value) && isLength(value.length) && (isArray(value) || isArguments(value))) {
      if (isDeep) {
        // Recursively flatten arrays (susceptible to call stack limits).
        value = baseFlatten(value, isDeep, isStrict);
      }
      var valIndex = -1,
          valLength = value.length;

      result.length += valLength;
      while (++valIndex < valLength) {
        result[++resIndex] = value[valIndex];
      }
    } else if (!isStrict) {
      result[++resIndex] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;

},{"../lang/isArguments":91,"../lang/isArray":92,"./isLength":79,"./isObjectLike":80}],36:[function(require,module,exports){
var toObject = require('./toObject');

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iterator functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
function baseFor(object, iteratee, keysFunc) {
  var index = -1,
      iterable = toObject(object),
      props = keysFunc(object),
      length = props.length;

  while (++index < length) {
    var key = props[index];
    if (iteratee(iterable[key], key, iterable) === false) {
      break;
    }
  }
  return object;
}

module.exports = baseFor;

},{"./toObject":89}],37:[function(require,module,exports){
var baseFor = require('./baseFor'),
    keys = require('../object/keys');

/**
 * The base implementation of `_.forOwn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;

},{"../object/keys":103,"./baseFor":36}],38:[function(require,module,exports){
var indexOfNaN = require('./indexOfNaN');

/**
 * The base implementation of `_.indexOf` without support for binary searches.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return indexOfNaN(array, fromIndex);
  }
  var index = (fromIndex || 0) - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = baseIndexOf;

},{"./indexOfNaN":72}],39:[function(require,module,exports){
var baseIsEqualDeep = require('./baseIsEqualDeep');

/**
 * The base implementation of `_.isEqual` without support for `this` binding
 * `customizer` functions.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isWhere] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, isWhere, stackA, stackB) {
  // Exit early for identical values.
  if (value === other) {
    // Treat `+0` vs. `-0` as not equal.
    return value !== 0 || (1 / value == 1 / other);
  }
  var valType = typeof value,
      othType = typeof other;

  // Exit early for unlike primitive values.
  if ((valType != 'function' && valType != 'object' && othType != 'function' && othType != 'object') ||
      value == null || other == null) {
    // Return `false` unless both values are `NaN`.
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isWhere, stackA, stackB);
}

module.exports = baseIsEqual;

},{"./baseIsEqualDeep":40}],40:[function(require,module,exports){
var equalArrays = require('./equalArrays'),
    equalByTag = require('./equalByTag'),
    equalObjects = require('./equalObjects'),
    isArray = require('../lang/isArray'),
    isTypedArray = require('../lang/isTypedArray');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @param {boolean} [isWhere] Specify performing partial comparisons.
 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, isWhere, stackA, stackB) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = objToString.call(object);
    if (objTag == argsTag) {
      objTag = objectTag;
    } else if (objTag != objectTag) {
      objIsArr = isTypedArray(object);
    }
  }
  if (!othIsArr) {
    othTag = objToString.call(other);
    if (othTag == argsTag) {
      othTag = objectTag;
    } else if (othTag != objectTag) {
      othIsArr = isTypedArray(other);
    }
  }
  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && !(objIsArr || objIsObj)) {
    return equalByTag(object, other, objTag);
  }
  var valWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
      othWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

  if (valWrapped || othWrapped) {
    return equalFunc(valWrapped ? object.value() : object, othWrapped ? other.value() : other, customizer, isWhere, stackA, stackB);
  }
  if (!isSameTag) {
    return false;
  }
  // Assume cyclic values are equal.
  // For more information on detecting circular references see https://es5.github.io/#JO.
  stackA || (stackA = []);
  stackB || (stackB = []);

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == object) {
      return stackB[length] == other;
    }
  }
  // Add `object` and `other` to the stack of traversed objects.
  stackA.push(object);
  stackB.push(other);

  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isWhere, stackA, stackB);

  stackA.pop();
  stackB.pop();

  return result;
}

module.exports = baseIsEqualDeep;

},{"../lang/isArray":92,"../lang/isTypedArray":100,"./equalArrays":68,"./equalByTag":69,"./equalObjects":70}],41:[function(require,module,exports){
/**
 * The base implementation of `_.isFunction` without support for environments
 * with incorrect `typeof` results.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 */
function baseIsFunction(value) {
  // Avoid a Chakra JIT bug in compatibility modes of IE 11.
  // See https://github.com/jashkenas/underscore/issues/1621 for more details.
  return typeof value == 'function' || false;
}

module.exports = baseIsFunction;

},{}],42:[function(require,module,exports){
var baseIsEqual = require('./baseIsEqual');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.isMatch` without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Array} props The source property names to match.
 * @param {Array} values The source values to match.
 * @param {Array} strictCompareFlags Strict comparison flags for source values.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, props, values, strictCompareFlags, customizer) {
  var length = props.length;
  if (object == null) {
    return !length;
  }
  var index = -1,
      noCustomizer = !customizer;

  while (++index < length) {
    if ((noCustomizer && strictCompareFlags[index])
          ? values[index] !== object[props[index]]
          : !hasOwnProperty.call(object, props[index])
        ) {
      return false;
    }
  }
  index = -1;
  while (++index < length) {
    var key = props[index];
    if (noCustomizer && strictCompareFlags[index]) {
      var result = hasOwnProperty.call(object, key);
    } else {
      var objValue = object[key],
          srcValue = values[index];

      result = customizer ? customizer(objValue, srcValue, key) : undefined;
      if (typeof result == 'undefined') {
        result = baseIsEqual(srcValue, objValue, customizer, true);
      }
    }
    if (!result) {
      return false;
    }
  }
  return true;
}

module.exports = baseIsMatch;

},{"./baseIsEqual":39}],43:[function(require,module,exports){
var baseEach = require('./baseEach');

/**
 * The base implementation of `_.map` without support for callback shorthands
 * or `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(collection, iteratee) {
  var result = [];
  baseEach(collection, function(value, key, collection) {
    result.push(iteratee(value, key, collection));
  });
  return result;
}

module.exports = baseMap;

},{"./baseEach":33}],44:[function(require,module,exports){
var baseIsMatch = require('./baseIsMatch'),
    isStrictComparable = require('./isStrictComparable'),
    keys = require('../object/keys');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.matches` which does not clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new function.
 */
function baseMatches(source) {
  var props = keys(source),
      length = props.length;

  if (length == 1) {
    var key = props[0],
        value = source[key];

    if (isStrictComparable(value)) {
      return function(object) {
        return object != null && object[key] === value && hasOwnProperty.call(object, key);
      };
    }
  }
  var values = Array(length),
      strictCompareFlags = Array(length);

  while (length--) {
    value = source[props[length]];
    values[length] = value;
    strictCompareFlags[length] = isStrictComparable(value);
  }
  return function(object) {
    return baseIsMatch(object, props, values, strictCompareFlags);
  };
}

module.exports = baseMatches;

},{"../object/keys":103,"./baseIsMatch":42,"./isStrictComparable":81}],45:[function(require,module,exports){
var baseIsEqual = require('./baseIsEqual'),
    isStrictComparable = require('./isStrictComparable');

/**
 * The base implementation of `_.matchesProperty` which does not coerce `key`
 * to a string.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} value The value to compare.
 * @returns {Function} Returns the new function.
 */
function baseMatchesProperty(key, value) {
  if (isStrictComparable(value)) {
    return function(object) {
      return object != null && object[key] === value;
    };
  }
  return function(object) {
    return object != null && baseIsEqual(value, object[key], null, true);
  };
}

module.exports = baseMatchesProperty;

},{"./baseIsEqual":39,"./isStrictComparable":81}],46:[function(require,module,exports){
/**
 * The base implementation of `_.property` which does not coerce `key` to a string.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;

},{}],47:[function(require,module,exports){
var identity = require('../utility/identity'),
    metaMap = require('./metaMap');

/**
 * The base implementation of `setData` without support for hot loop detection.
 *
 * @private
 * @param {Function} func The function to associate metadata with.
 * @param {*} data The metadata.
 * @returns {Function} Returns `func`.
 */
var baseSetData = !metaMap ? identity : function(func, data) {
  metaMap.set(func, data);
  return func;
};

module.exports = baseSetData;

},{"../utility/identity":109,"./metaMap":83}],48:[function(require,module,exports){
/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  start = start == null ? 0 : (+start || 0);
  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = (typeof end == 'undefined' || end > length) ? length : (+end || 0);
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : (end - start) >>> 0;
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;

},{}],49:[function(require,module,exports){
/**
 * The base implementation of `_.sortBy` and `_.sortByAll` which uses `comparer`
 * to define the sort order of `array` and replaces criteria objects with their
 * corresponding values.
 *
 * @private
 * @param {Array} array The array to sort.
 * @param {Function} comparer The function to define sort order.
 * @returns {Array} Returns `array`.
 */
function baseSortBy(array, comparer) {
  var length = array.length;

  array.sort(comparer);
  while (length--) {
    array[length] = array[length].value;
  }
  return array;
}

module.exports = baseSortBy;

},{}],50:[function(require,module,exports){
/**
 * Converts `value` to a string if it is not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  if (typeof value == 'string') {
    return value;
  }
  return value == null ? '' : (value + '');
}

module.exports = baseToString;

},{}],51:[function(require,module,exports){
var baseIndexOf = require('./baseIndexOf'),
    cacheIndexOf = require('./cacheIndexOf'),
    createCache = require('./createCache');

/**
 * The base implementation of `_.uniq` without support for callback shorthands
 * and `this` binding.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The function invoked per iteration.
 * @returns {Array} Returns the new duplicate-value-free array.
 */
function baseUniq(array, iteratee) {
  var index = -1,
      indexOf = baseIndexOf,
      length = array.length,
      isCommon = true,
      isLarge = isCommon && length >= 200,
      seen = isLarge ? createCache() : null,
      result = [];

  if (seen) {
    indexOf = cacheIndexOf;
    isCommon = false;
  } else {
    isLarge = false;
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value, index, array) : value;

    if (isCommon && value === value) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (indexOf(seen, computed) < 0) {
      if (iteratee || isLarge) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseUniq;

},{"./baseIndexOf":38,"./cacheIndexOf":55,"./createCache":63}],52:[function(require,module,exports){
/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * returned by `keysFunc`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  var index = -1,
      length = props.length,
      result = Array(length);

  while (++index < length) {
    result[index] = object[props[index]];
  }
  return result;
}

module.exports = baseValues;

},{}],53:[function(require,module,exports){
var identity = require('../utility/identity');

/**
 * A specialized version of `baseCallback` which only supports `this` binding
 * and specifying the number of arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function bindCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  if (typeof thisArg == 'undefined') {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
    case 5: return function(value, other, key, object, source) {
      return func.call(thisArg, value, other, key, object, source);
    };
  }
  return function() {
    return func.apply(thisArg, arguments);
  };
}

module.exports = bindCallback;

},{"../utility/identity":109}],54:[function(require,module,exports){
(function (global){
var constant = require('../utility/constant'),
    isNative = require('../lang/isNative');

/** Native method references. */
var ArrayBuffer = isNative(ArrayBuffer = global.ArrayBuffer) && ArrayBuffer,
    bufferSlice = isNative(bufferSlice = ArrayBuffer && new ArrayBuffer(0).slice) && bufferSlice,
    floor = Math.floor,
    Uint8Array = isNative(Uint8Array = global.Uint8Array) && Uint8Array;

/** Used to clone array buffers. */
var Float64Array = (function() {
  // Safari 5 errors when using an array buffer to initialize a typed array
  // where the array buffer's `byteLength` is not a multiple of the typed
  // array's `BYTES_PER_ELEMENT`.
  try {
    var func = isNative(func = global.Float64Array) && func,
        result = new func(new ArrayBuffer(10), 0, 1) && func;
  } catch(e) {}
  return result;
}());

/** Used as the size, in bytes, of each `Float64Array` element. */
var FLOAT64_BYTES_PER_ELEMENT = Float64Array ? Float64Array.BYTES_PER_ELEMENT : 0;

/**
 * Creates a clone of the given array buffer.
 *
 * @private
 * @param {ArrayBuffer} buffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function bufferClone(buffer) {
  return bufferSlice.call(buffer, 0);
}
if (!bufferSlice) {
  // PhantomJS has `ArrayBuffer` and `Uint8Array` but not `Float64Array`.
  bufferClone = !(ArrayBuffer && Uint8Array) ? constant(null) : function(buffer) {
    var byteLength = buffer.byteLength,
        floatLength = Float64Array ? floor(byteLength / FLOAT64_BYTES_PER_ELEMENT) : 0,
        offset = floatLength * FLOAT64_BYTES_PER_ELEMENT,
        result = new ArrayBuffer(byteLength);

    if (floatLength) {
      var view = new Float64Array(result, 0, floatLength);
      view.set(new Float64Array(buffer, 0, floatLength));
    }
    if (byteLength != offset) {
      view = new Uint8Array(result, offset);
      view.set(new Uint8Array(buffer, offset));
    }
    return result;
  };
}

module.exports = bufferClone;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lang/isNative":96,"../utility/constant":108}],55:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Checks if `value` is in `cache` mimicking the return signature of
 * `_.indexOf` by returning `0` if the value is found, else `-1`.
 *
 * @private
 * @param {Object} cache The cache to search.
 * @param {*} value The value to search for.
 * @returns {number} Returns `0` if `value` is found, else `-1`.
 */
function cacheIndexOf(cache, value) {
  var data = cache.data,
      result = (typeof value == 'string' || isObject(value)) ? data.set.has(value) : data.hash[value];

  return result ? 0 : -1;
}

module.exports = cacheIndexOf;

},{"../lang/isObject":98}],56:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Adds `value` to the cache.
 *
 * @private
 * @name push
 * @memberOf SetCache
 * @param {*} value The value to cache.
 */
function cachePush(value) {
  var data = this.data;
  if (typeof value == 'string' || isObject(value)) {
    data.set.add(value);
  } else {
    data.hash[value] = true;
  }
}

module.exports = cachePush;

},{"../lang/isObject":98}],57:[function(require,module,exports){
var baseCompareAscending = require('./baseCompareAscending');

/**
 * Used by `_.sortBy` to compare transformed elements of a collection and stable
 * sort them in ascending order.
 *
 * @private
 * @param {Object} object The object to compare to `other`.
 * @param {Object} other The object to compare to `object`.
 * @returns {number} Returns the sort order indicator for `object`.
 */
function compareAscending(object, other) {
  return baseCompareAscending(object.criteria, other.criteria) || (object.index - other.index);
}

module.exports = compareAscending;

},{"./baseCompareAscending":28}],58:[function(require,module,exports){
/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates an array that is the composition of partially applied arguments,
 * placeholders, and provided arguments into a single array of arguments.
 *
 * @private
 * @param {Array|Object} args The provided arguments.
 * @param {Array} partials The arguments to prepend to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgs(args, partials, holders) {
  var holdersLength = holders.length,
      argsIndex = -1,
      argsLength = nativeMax(args.length - holdersLength, 0),
      leftIndex = -1,
      leftLength = partials.length,
      result = Array(argsLength + leftLength);

  while (++leftIndex < leftLength) {
    result[leftIndex] = partials[leftIndex];
  }
  while (++argsIndex < holdersLength) {
    result[holders[argsIndex]] = args[argsIndex];
  }
  while (argsLength--) {
    result[leftIndex++] = args[argsIndex++];
  }
  return result;
}

module.exports = composeArgs;

},{}],59:[function(require,module,exports){
/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * This function is like `composeArgs` except that the arguments composition
 * is tailored for `_.partialRight`.
 *
 * @private
 * @param {Array|Object} args The provided arguments.
 * @param {Array} partials The arguments to append to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgsRight(args, partials, holders) {
  var holdersIndex = -1,
      holdersLength = holders.length,
      argsIndex = -1,
      argsLength = nativeMax(args.length - holdersLength, 0),
      rightIndex = -1,
      rightLength = partials.length,
      result = Array(argsLength + rightLength);

  while (++argsIndex < argsLength) {
    result[argsIndex] = args[argsIndex];
  }
  var pad = argsIndex;
  while (++rightIndex < rightLength) {
    result[pad + rightIndex] = partials[rightIndex];
  }
  while (++holdersIndex < holdersLength) {
    result[pad + holders[holdersIndex]] = args[argsIndex++];
  }
  return result;
}

module.exports = composeArgsRight;

},{}],60:[function(require,module,exports){
var baseCallback = require('./baseCallback'),
    baseEach = require('./baseEach'),
    isArray = require('../lang/isArray');

/**
 * Creates a function that aggregates a collection, creating an accumulator
 * object composed from the results of running each element in the collection
 * through an iteratee.
 *
 * @private
 * @param {Function} setter The function to set keys and values of the accumulator object.
 * @param {Function} [initializer] The function to initialize the accumulator object.
 * @returns {Function} Returns the new aggregator function.
 */
function createAggregator(setter, initializer) {
  return function(collection, iteratee, thisArg) {
    var result = initializer ? initializer() : {};
    iteratee = baseCallback(iteratee, thisArg, 3);

    if (isArray(collection)) {
      var index = -1,
          length = collection.length;

      while (++index < length) {
        var value = collection[index];
        setter(result, value, iteratee(value, index, collection), collection);
      }
    } else {
      baseEach(collection, function(value, key, collection) {
        setter(result, value, iteratee(value, key, collection), collection);
      });
    }
    return result;
  };
}

module.exports = createAggregator;

},{"../lang/isArray":92,"./baseCallback":26,"./baseEach":33}],61:[function(require,module,exports){
var bindCallback = require('./bindCallback'),
    isIterateeCall = require('./isIterateeCall');

/**
 * Creates a function that assigns properties of source object(s) to a given
 * destination object.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return function() {
    var length = arguments.length,
        object = arguments[0];

    if (length < 2 || object == null) {
      return object;
    }
    if (length > 3 && isIterateeCall(arguments[1], arguments[2], arguments[3])) {
      length = 2;
    }
    // Juggle arguments.
    if (length > 3 && typeof arguments[length - 2] == 'function') {
      var customizer = bindCallback(arguments[--length - 1], arguments[length--], 5);
    } else if (length > 2 && typeof arguments[length - 1] == 'function') {
      customizer = arguments[--length];
    }
    var index = 0;
    while (++index < length) {
      var source = arguments[index];
      if (source) {
        assigner(object, source, customizer);
      }
    }
    return object;
  };
}

module.exports = createAssigner;

},{"./bindCallback":53,"./isIterateeCall":78}],62:[function(require,module,exports){
var createCtorWrapper = require('./createCtorWrapper');

/**
 * Creates a function that wraps `func` and invokes it with the `this`
 * binding of `thisArg`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @returns {Function} Returns the new bound function.
 */
function createBindWrapper(func, thisArg) {
  var Ctor = createCtorWrapper(func);

  function wrapper() {
    return (this instanceof wrapper ? Ctor : func).apply(thisArg, arguments);
  }
  return wrapper;
}

module.exports = createBindWrapper;

},{"./createCtorWrapper":64}],63:[function(require,module,exports){
(function (global){
var SetCache = require('./SetCache'),
    constant = require('../utility/constant'),
    isNative = require('../lang/isNative');

/** Native method references. */
var Set = isNative(Set = global.Set) && Set;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate;

/**
 * Creates a `Set` cache object to optimize linear searches of large arrays.
 *
 * @private
 * @param {Array} [values] The values to cache.
 * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
 */
var createCache = !(nativeCreate && Set) ? constant(null) : function(values) {
  return new SetCache(values);
};

module.exports = createCache;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lang/isNative":96,"../utility/constant":108,"./SetCache":20}],64:[function(require,module,exports){
var baseCreate = require('./baseCreate'),
    isObject = require('../lang/isObject');

/**
 * Creates a function that produces an instance of `Ctor` regardless of
 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
 *
 * @private
 * @param {Function} Ctor The constructor to wrap.
 * @returns {Function} Returns the new wrapped function.
 */
function createCtorWrapper(Ctor) {
  return function() {
    var thisBinding = baseCreate(Ctor.prototype),
        result = Ctor.apply(thisBinding, arguments);

    // Mimic the constructor's `return` behavior.
    // See https://es5.github.io/#x13.2.2 for more details.
    return isObject(result) ? result : thisBinding;
  };
}

module.exports = createCtorWrapper;

},{"../lang/isObject":98,"./baseCreate":30}],65:[function(require,module,exports){
var arrayCopy = require('./arrayCopy'),
    composeArgs = require('./composeArgs'),
    composeArgsRight = require('./composeArgsRight'),
    createCtorWrapper = require('./createCtorWrapper'),
    reorder = require('./reorder'),
    replaceHolders = require('./replaceHolders');

/** Used to compose bitmasks for wrapper metadata. */
var BIND_FLAG = 1,
    BIND_KEY_FLAG = 2,
    CURRY_BOUND_FLAG = 4,
    CURRY_FLAG = 8,
    CURRY_RIGHT_FLAG = 16,
    PARTIAL_FLAG = 32,
    PARTIAL_RIGHT_FLAG = 64,
    ARY_FLAG = 256;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that wraps `func` and invokes it with optional `this`
 * binding of, partial application, and currying.
 *
 * @private
 * @param {Function|string} func The function or method name to reference.
 * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [partialsRight] The arguments to append to those provided to the new function.
 * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createHybridWrapper(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
  var isAry = bitmask & ARY_FLAG,
      isBind = bitmask & BIND_FLAG,
      isBindKey = bitmask & BIND_KEY_FLAG,
      isCurry = bitmask & CURRY_FLAG,
      isCurryBound = bitmask & CURRY_BOUND_FLAG,
      isCurryRight = bitmask & CURRY_RIGHT_FLAG;

  var Ctor = !isBindKey && createCtorWrapper(func),
      key = func;

  function wrapper() {
    // Avoid `arguments` object use disqualifying optimizations by
    // converting it to an array before providing it to other functions.
    var length = arguments.length,
        index = length,
        args = Array(length);

    while (index--) {
      args[index] = arguments[index];
    }
    if (partials) {
      args = composeArgs(args, partials, holders);
    }
    if (partialsRight) {
      args = composeArgsRight(args, partialsRight, holdersRight);
    }
    if (isCurry || isCurryRight) {
      var placeholder = wrapper.placeholder,
          argsHolders = replaceHolders(args, placeholder);

      length -= argsHolders.length;
      if (length < arity) {
        var newArgPos = argPos ? arrayCopy(argPos) : null,
            newArity = nativeMax(arity - length, 0),
            newsHolders = isCurry ? argsHolders : null,
            newHoldersRight = isCurry ? null : argsHolders,
            newPartials = isCurry ? args : null,
            newPartialsRight = isCurry ? null : args;

        bitmask |= (isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG);
        bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);

        if (!isCurryBound) {
          bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
        }
        var result = createHybridWrapper(func, bitmask, thisArg, newPartials, newsHolders, newPartialsRight, newHoldersRight, newArgPos, ary, newArity);
        result.placeholder = placeholder;
        return result;
      }
    }
    var thisBinding = isBind ? thisArg : this;
    if (isBindKey) {
      func = thisBinding[key];
    }
    if (argPos) {
      args = reorder(args, argPos);
    }
    if (isAry && ary < args.length) {
      args.length = ary;
    }
    return (this instanceof wrapper ? (Ctor || createCtorWrapper(func)) : func).apply(thisBinding, args);
  }
  return wrapper;
}

module.exports = createHybridWrapper;

},{"./arrayCopy":21,"./composeArgs":58,"./composeArgsRight":59,"./createCtorWrapper":64,"./reorder":84,"./replaceHolders":85}],66:[function(require,module,exports){
var createCtorWrapper = require('./createCtorWrapper');

/** Used to compose bitmasks for wrapper metadata. */
var BIND_FLAG = 1;

/**
 * Creates a function that wraps `func` and invokes it with the optional `this`
 * binding of `thisArg` and the `partials` prepended to those provided to
 * the wrapper.
 *
 * @private
 * @param {Function} func The function to partially apply arguments to.
 * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} partials The arguments to prepend to those provided to the new function.
 * @returns {Function} Returns the new bound function.
 */
function createPartialWrapper(func, bitmask, thisArg, partials) {
  var isBind = bitmask & BIND_FLAG,
      Ctor = createCtorWrapper(func);

  function wrapper() {
    // Avoid `arguments` object use disqualifying optimizations by
    // converting it to an array before providing it `func`.
    var argsIndex = -1,
        argsLength = arguments.length,
        leftIndex = -1,
        leftLength = partials.length,
        args = Array(argsLength + leftLength);

    while (++leftIndex < leftLength) {
      args[leftIndex] = partials[leftIndex];
    }
    while (argsLength--) {
      args[leftIndex++] = arguments[++argsIndex];
    }
    return (this instanceof wrapper ? Ctor : func).apply(isBind ? thisArg : this, args);
  }
  return wrapper;
}

module.exports = createPartialWrapper;

},{"./createCtorWrapper":64}],67:[function(require,module,exports){
var baseSetData = require('./baseSetData'),
    createBindWrapper = require('./createBindWrapper'),
    createHybridWrapper = require('./createHybridWrapper'),
    createPartialWrapper = require('./createPartialWrapper'),
    getData = require('./getData'),
    mergeData = require('./mergeData'),
    setData = require('./setData');

/** Used to compose bitmasks for wrapper metadata. */
var BIND_FLAG = 1,
    BIND_KEY_FLAG = 2,
    PARTIAL_FLAG = 32,
    PARTIAL_RIGHT_FLAG = 64;

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that either curries or invokes `func` with optional
 * `this` binding and partially applied arguments.
 *
 * @private
 * @param {Function|string} func The function or method name to reference.
 * @param {number} bitmask The bitmask of flags.
 *  The bitmask may be composed of the following flags:
 *     1 - `_.bind`
 *     2 - `_.bindKey`
 *     4 - `_.curry` or `_.curryRight` of a bound function
 *     8 - `_.curry`
 *    16 - `_.curryRight`
 *    32 - `_.partial`
 *    64 - `_.partialRight`
 *   128 - `_.rearg`
 *   256 - `_.ary`
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to be partially applied.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createWrapper(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
  var isBindKey = bitmask & BIND_KEY_FLAG;
  if (!isBindKey && typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var length = partials ? partials.length : 0;
  if (!length) {
    bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
    partials = holders = null;
  }
  length -= (holders ? holders.length : 0);
  if (bitmask & PARTIAL_RIGHT_FLAG) {
    var partialsRight = partials,
        holdersRight = holders;

    partials = holders = null;
  }
  var data = !isBindKey && getData(func),
      newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];

  if (data && data !== true) {
    mergeData(newData, data);
    bitmask = newData[1];
    arity = newData[9];
  }
  newData[9] = arity == null
    ? (isBindKey ? 0 : func.length)
    : (nativeMax(arity - length, 0) || 0);

  if (bitmask == BIND_FLAG) {
    var result = createBindWrapper(newData[0], newData[2]);
  } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !newData[4].length) {
    result = createPartialWrapper.apply(undefined, newData);
  } else {
    result = createHybridWrapper.apply(undefined, newData);
  }
  var setter = data ? baseSetData : setData;
  return setter(result, newData);
}

module.exports = createWrapper;

},{"./baseSetData":47,"./createBindWrapper":62,"./createHybridWrapper":65,"./createPartialWrapper":66,"./getData":71,"./mergeData":82,"./setData":86}],68:[function(require,module,exports){
/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing arrays.
 * @param {boolean} [isWhere] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, isWhere, stackA, stackB) {
  var index = -1,
      arrLength = array.length,
      othLength = other.length,
      result = true;

  if (arrLength != othLength && !(isWhere && othLength > arrLength)) {
    return false;
  }
  // Deep compare the contents, ignoring non-numeric properties.
  while (result && ++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    result = undefined;
    if (customizer) {
      result = isWhere
        ? customizer(othValue, arrValue, index)
        : customizer(arrValue, othValue, index);
    }
    if (typeof result == 'undefined') {
      // Recursively compare arrays (susceptible to call stack limits).
      if (isWhere) {
        var othIndex = othLength;
        while (othIndex--) {
          othValue = other[othIndex];
          result = (arrValue && arrValue === othValue) || equalFunc(arrValue, othValue, customizer, isWhere, stackA, stackB);
          if (result) {
            break;
          }
        }
      } else {
        result = (arrValue && arrValue === othValue) || equalFunc(arrValue, othValue, customizer, isWhere, stackA, stackB);
      }
    }
  }
  return !!result;
}

module.exports = equalArrays;

},{}],69:[function(require,module,exports){
/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    stringTag = '[object String]';

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} value The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag) {
  switch (tag) {
    case boolTag:
    case dateTag:
      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
      return +object == +other;

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case numberTag:
      // Treat `NaN` vs. `NaN` as equal.
      return (object != +object)
        ? other != +other
        // But, treat `-0` vs. `+0` as not equal.
        : (object == 0 ? ((1 / object) == (1 / other)) : object == +other);

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings primitives and string
      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
      return object == (other + '');
  }
  return false;
}

module.exports = equalByTag;

},{}],70:[function(require,module,exports){
var keys = require('../object/keys');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isWhere] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, isWhere, stackA, stackB) {
  var objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isWhere) {
    return false;
  }
  var hasCtor,
      index = -1;

  while (++index < objLength) {
    var key = objProps[index],
        result = hasOwnProperty.call(other, key);

    if (result) {
      var objValue = object[key],
          othValue = other[key];

      result = undefined;
      if (customizer) {
        result = isWhere
          ? customizer(othValue, objValue, key)
          : customizer(objValue, othValue, key);
      }
      if (typeof result == 'undefined') {
        // Recursively compare objects (susceptible to call stack limits).
        result = (objValue && objValue === othValue) || equalFunc(objValue, othValue, customizer, isWhere, stackA, stackB);
      }
    }
    if (!result) {
      return false;
    }
    hasCtor || (hasCtor = key == 'constructor');
  }
  if (!hasCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor && ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      return false;
    }
  }
  return true;
}

module.exports = equalObjects;

},{"../object/keys":103}],71:[function(require,module,exports){
var metaMap = require('./metaMap'),
    noop = require('../utility/noop');

/**
 * Gets metadata for `func`.
 *
 * @private
 * @param {Function} func The function to query.
 * @returns {*} Returns the metadata for `func`.
 */
var getData = !metaMap ? noop : function(func) {
  return metaMap.get(func);
};

module.exports = getData;

},{"../utility/noop":110,"./metaMap":83}],72:[function(require,module,exports){
/**
 * Gets the index at which the first occurrence of `NaN` is found in `array`.
 * If `fromRight` is provided elements of `array` are iterated from right to left.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {number} [fromIndex] The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
 */
function indexOfNaN(array, fromIndex, fromRight) {
  var length = array.length,
      index = fromRight ? (fromIndex || length) : ((fromIndex || 0) - 1);

  while ((fromRight ? index-- : ++index < length)) {
    var other = array[index];
    if (other !== other) {
      return index;
    }
  }
  return -1;
}

module.exports = indexOfNaN;

},{}],73:[function(require,module,exports){
/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add array properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;

},{}],74:[function(require,module,exports){
var bufferClone = require('./bufferClone');

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    stringTag = '[object String]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return bufferClone(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      var buffer = object.buffer;
      return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      var result = new Ctor(object.source, reFlags.exec(object));
      result.lastIndex = object.lastIndex;
  }
  return result;
}

module.exports = initCloneByTag;

},{"./bufferClone":54}],75:[function(require,module,exports){
/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  var Ctor = object.constructor;
  if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
    Ctor = Object;
  }
  return new Ctor;
}

module.exports = initCloneObject;

},{}],76:[function(require,module,exports){
var baseSetData = require('./baseSetData'),
    isNative = require('../lang/isNative'),
    support = require('../support');

/** Used to detect named functions. */
var reFuncName = /^\s*function[ \n\r\t]+\w/;

/** Used to detect functions containing a `this` reference. */
var reThis = /\bthis\b/;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/**
 * Checks if `func` is eligible for `this` binding.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is eligible, else `false`.
 */
function isBindable(func) {
  var result = !(support.funcNames ? func.name : support.funcDecomp);

  if (!result) {
    var source = fnToString.call(func);
    if (!support.funcNames) {
      result = !reFuncName.test(source);
    }
    if (!result) {
      // Check if `func` references the `this` keyword and store the result.
      result = reThis.test(source) || isNative(func);
      baseSetData(func, result);
    }
  }
  return result;
}

module.exports = isBindable;

},{"../lang/isNative":96,"../support":107,"./baseSetData":47}],77:[function(require,module,exports){
/**
 * Used as the maximum length of an array-like value.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * for more details.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = +value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

},{}],78:[function(require,module,exports){
var isIndex = require('./isIndex'),
    isLength = require('./isLength'),
    isObject = require('../lang/isObject');

/**
 * Checks if the provided arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number') {
    var length = object.length,
        prereq = isLength(length) && isIndex(index, length);
  } else {
    prereq = type == 'string' && index in object;
  }
  if (prereq) {
    var other = object[index];
    return value === value ? value === other : other !== other;
  }
  return false;
}

module.exports = isIterateeCall;

},{"../lang/isObject":98,"./isIndex":77,"./isLength":79}],79:[function(require,module,exports){
/**
 * Used as the maximum length of an array-like value.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * for more details.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on ES `ToLength`. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
 * for more details.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],80:[function(require,module,exports){
/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return (value && typeof value == 'object') || false;
}

module.exports = isObjectLike;

},{}],81:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && (value === 0 ? ((1 / value) > 0) : !isObject(value));
}

module.exports = isStrictComparable;

},{"../lang/isObject":98}],82:[function(require,module,exports){
var arrayCopy = require('./arrayCopy'),
    composeArgs = require('./composeArgs'),
    composeArgsRight = require('./composeArgsRight'),
    replaceHolders = require('./replaceHolders');

/** Used to compose bitmasks for wrapper metadata. */
var BIND_FLAG = 1,
    BIND_KEY_FLAG = 2,
    CURRY_BOUND_FLAG = 4,
    CURRY_RIGHT_FLAG = 16,
    REARG_FLAG = 128,
    ARY_FLAG = 256;

/** Used as the internal argument placeholder. */
var PLACEHOLDER = '__lodash_placeholder__';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * Merges the function metadata of `source` into `data`.
 *
 * Merging metadata reduces the number of wrappers required to invoke a function.
 * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
 * may be applied regardless of execution order. Methods like `_.ary` and `_.rearg`
 * augment function arguments, making the order in which they are executed important,
 * preventing the merging of metadata. However, we make an exception for a safe
 * common case where curried functions have `_.ary` and or `_.rearg` applied.
 *
 * @private
 * @param {Array} data The destination metadata.
 * @param {Array} source The source metadata.
 * @returns {Array} Returns `data`.
 */
function mergeData(data, source) {
  var bitmask = data[1],
      srcBitmask = source[1],
      newBitmask = bitmask | srcBitmask;

  var arityFlags = ARY_FLAG | REARG_FLAG,
      bindFlags = BIND_FLAG | BIND_KEY_FLAG,
      comboFlags = arityFlags | bindFlags | CURRY_BOUND_FLAG | CURRY_RIGHT_FLAG;

  var isAry = bitmask & ARY_FLAG && !(srcBitmask & ARY_FLAG),
      isRearg = bitmask & REARG_FLAG && !(srcBitmask & REARG_FLAG),
      argPos = (isRearg ? data : source)[7],
      ary = (isAry ? data : source)[8];

  var isCommon = !(bitmask >= REARG_FLAG && srcBitmask > bindFlags) &&
    !(bitmask > bindFlags && srcBitmask >= REARG_FLAG);

  var isCombo = (newBitmask >= arityFlags && newBitmask <= comboFlags) &&
    (bitmask < REARG_FLAG || ((isRearg || isAry) && argPos.length <= ary));

  // Exit early if metadata can't be merged.
  if (!(isCommon || isCombo)) {
    return data;
  }
  // Use source `thisArg` if available.
  if (srcBitmask & BIND_FLAG) {
    data[2] = source[2];
    // Set when currying a bound function.
    newBitmask |= (bitmask & BIND_FLAG) ? 0 : CURRY_BOUND_FLAG;
  }
  // Compose partial arguments.
  var value = source[3];
  if (value) {
    var partials = data[3];
    data[3] = partials ? composeArgs(partials, value, source[4]) : arrayCopy(value);
    data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : arrayCopy(source[4]);
  }
  // Compose partial right arguments.
  value = source[5];
  if (value) {
    partials = data[5];
    data[5] = partials ? composeArgsRight(partials, value, source[6]) : arrayCopy(value);
    data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : arrayCopy(source[6]);
  }
  // Use source `argPos` if available.
  value = source[7];
  if (value) {
    data[7] = arrayCopy(value);
  }
  // Use source `ary` if it's smaller.
  if (srcBitmask & ARY_FLAG) {
    data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
  }
  // Use source `arity` if one is not provided.
  if (data[9] == null) {
    data[9] = source[9];
  }
  // Use source `func` and merge bitmasks.
  data[0] = source[0];
  data[1] = newBitmask;

  return data;
}

module.exports = mergeData;

},{"./arrayCopy":21,"./composeArgs":58,"./composeArgsRight":59,"./replaceHolders":85}],83:[function(require,module,exports){
(function (global){
var isNative = require('../lang/isNative');

/** Native method references. */
var WeakMap = isNative(WeakMap = global.WeakMap) && WeakMap;

/** Used to store function metadata. */
var metaMap = WeakMap && new WeakMap;

module.exports = metaMap;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lang/isNative":96}],84:[function(require,module,exports){
var arrayCopy = require('./arrayCopy'),
    isIndex = require('./isIndex');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * Reorder `array` according to the specified indexes where the element at
 * the first index is assigned as the first element, the element at
 * the second index is assigned as the second element, and so on.
 *
 * @private
 * @param {Array} array The array to reorder.
 * @param {Array} indexes The arranged array indexes.
 * @returns {Array} Returns `array`.
 */
function reorder(array, indexes) {
  var arrLength = array.length,
      length = nativeMin(indexes.length, arrLength),
      oldArray = arrayCopy(array);

  while (length--) {
    var index = indexes[length];
    array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
  }
  return array;
}

module.exports = reorder;

},{"./arrayCopy":21,"./isIndex":77}],85:[function(require,module,exports){
/** Used as the internal argument placeholder. */
var PLACEHOLDER = '__lodash_placeholder__';

/**
 * Replaces all `placeholder` elements in `array` with an internal placeholder
 * and returns an array of their indexes.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {*} placeholder The placeholder to replace.
 * @returns {Array} Returns the new array of placeholder indexes.
 */
function replaceHolders(array, placeholder) {
  var index = -1,
      length = array.length,
      resIndex = -1,
      result = [];

  while (++index < length) {
    if (array[index] === placeholder) {
      array[index] = PLACEHOLDER;
      result[++resIndex] = index;
    }
  }
  return result;
}

module.exports = replaceHolders;

},{}],86:[function(require,module,exports){
var baseSetData = require('./baseSetData'),
    now = require('../date/now');

/** Used to detect when a function becomes hot. */
var HOT_COUNT = 150,
    HOT_SPAN = 16;

/**
 * Sets metadata for `func`.
 *
 * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
 * period of time, it will trip its breaker and transition to an identity function
 * to avoid garbage collection pauses in V8. See [V8 issue 2070](https://code.google.com/p/v8/issues/detail?id=2070)
 * for more details.
 *
 * @private
 * @param {Function} func The function to associate metadata with.
 * @param {*} data The metadata.
 * @returns {Function} Returns `func`.
 */
var setData = (function() {
  var count = 0,
      lastCalled = 0;

  return function(key, value) {
    var stamp = now(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return key;
      }
    } else {
      count = 0;
    }
    return baseSetData(key, value);
  };
}());

module.exports = setData;

},{"../date/now":16,"./baseSetData":47}],87:[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('./isIndex'),
    isLength = require('./isLength'),
    keysIn = require('../object/keysIn'),
    support = require('../support');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = length && isLength(length) &&
    (isArray(object) || (support.nonEnumArgs && isArguments(object)));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = shimKeys;

},{"../lang/isArguments":91,"../lang/isArray":92,"../object/keysIn":104,"../support":107,"./isIndex":77,"./isLength":79}],88:[function(require,module,exports){
/**
 * An implementation of `_.uniq` optimized for sorted arrays without support
 * for callback shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The function invoked per iteration.
 * @returns {Array} Returns the new duplicate-value-free array.
 */
function sortedUniq(array, iteratee) {
  var seen,
      index = -1,
      length = array.length,
      resIndex = -1,
      result = [];

  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value, index, array) : value;

    if (!index || seen !== computed) {
      seen = computed;
      result[++resIndex] = value;
    }
  }
  return result;
}

module.exports = sortedUniq;

},{}],89:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Converts `value` to an object if it is not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Object} Returns the object.
 */
function toObject(value) {
  return isObject(value) ? value : Object(value);
}

module.exports = toObject;

},{"../lang/isObject":98}],90:[function(require,module,exports){
var baseClone = require('../internal/baseClone'),
    bindCallback = require('../internal/bindCallback');

/**
 * Creates a deep clone of `value`. If `customizer` is provided it is invoked
 * to produce the cloned values. If `customizer` returns `undefined` cloning
 * is handled by the method instead. The `customizer` is bound to `thisArg`
 * and invoked with two argument; (value [, index|key, object]).
 *
 * **Note:** This method is loosely based on the structured clone algorithm.
 * The enumerable properties of `arguments` objects and objects created by
 * constructors other than `Object` are cloned to plain `Object` objects. An
 * empty object is returned for uncloneable values such as functions, DOM nodes,
 * Maps, Sets, and WeakMaps. See the [HTML5 specification](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to deep clone.
 * @param {Function} [customizer] The function to customize cloning values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {*} Returns the deep cloned value.
 * @example
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * var deep = _.cloneDeep(users);
 * deep[0] === users[0];
 * // => false
 *
 * // using a customizer callback
 * var el = _.cloneDeep(document.body, function(value) {
 *   if (_.isElement(value)) {
 *     return value.cloneNode(true);
 *   }
 * });
 *
 * el === document.body
 * // => false
 * el.nodeName
 * // => BODY
 * el.childNodes.length;
 * // => 20
 */
function cloneDeep(value, customizer, thisArg) {
  customizer = typeof customizer == 'function' && bindCallback(customizer, thisArg, 1);
  return baseClone(value, true, customizer);
}

module.exports = cloneDeep;

},{"../internal/baseClone":27,"../internal/bindCallback":53}],91:[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  var length = isObjectLike(value) ? value.length : undefined;
  return (isLength(length) && objToString.call(value) == argsTag) || false;
}

module.exports = isArguments;

},{"../internal/isLength":79,"../internal/isObjectLike":80}],92:[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isNative = require('./isNative'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var arrayTag = '[object Array]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return (isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag) || false;
};

module.exports = isArray;

},{"../internal/isLength":79,"../internal/isObjectLike":80,"./isNative":96}],93:[function(require,module,exports){
var isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var boolTag = '[object Boolean]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isBoolean(false);
 * // => true
 *
 * _.isBoolean(null);
 * // => false
 */
function isBoolean(value) {
  return (value === true || value === false || isObjectLike(value) && objToString.call(value) == boolTag) || false;
}

module.exports = isBoolean;

},{"../internal/isObjectLike":80}],94:[function(require,module,exports){
var baseIsEqual = require('../internal/baseIsEqual'),
    bindCallback = require('../internal/bindCallback'),
    isStrictComparable = require('../internal/isStrictComparable');

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent. If `customizer` is provided it is invoked to compare values.
 * If `customizer` returns `undefined` comparisons are handled by the method
 * instead. The `customizer` is bound to `thisArg` and invoked with three
 * arguments; (value, other [, index|key]).
 *
 * **Note:** This method supports comparing arrays, booleans, `Date` objects,
 * numbers, `Object` objects, regexes, and strings. Objects are compared by
 * their own, not inherited, enumerable properties. Functions and DOM nodes
 * are **not** supported. Provide a customizer function to extend support
 * for comparing other values.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'user': 'fred' };
 * var other = { 'user': 'fred' };
 *
 * object == other;
 * // => false
 *
 * _.isEqual(object, other);
 * // => true
 *
 * // using a customizer callback
 * var array = ['hello', 'goodbye'];
 * var other = ['hi', 'goodbye'];
 *
 * _.isEqual(array, other, function(value, other) {
 *   if (_.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/)) {
 *     return true;
 *   }
 * });
 * // => true
 */
function isEqual(value, other, customizer, thisArg) {
  customizer = typeof customizer == 'function' && bindCallback(customizer, thisArg, 3);
  if (!customizer && isStrictComparable(value) && isStrictComparable(other)) {
    return value === other;
  }
  var result = customizer ? customizer(value, other) : undefined;
  return typeof result == 'undefined' ? baseIsEqual(value, other, customizer) : !!result;
}

module.exports = isEqual;

},{"../internal/baseIsEqual":39,"../internal/bindCallback":53,"../internal/isStrictComparable":81}],95:[function(require,module,exports){
(function (global){
var baseIsFunction = require('../internal/baseIsFunction'),
    isNative = require('./isNative');

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/** Native method references. */
var Uint8Array = isNative(Uint8Array = global.Uint8Array) && Uint8Array;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
var isFunction = !(baseIsFunction(/x/) || (Uint8Array && !baseIsFunction(Uint8Array))) ? baseIsFunction : function(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return objToString.call(value) == funcTag;
};

module.exports = isFunction;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../internal/baseIsFunction":41,"./isNative":96}],96:[function(require,module,exports){
var escapeRegExp = require('../string/escapeRegExp'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reHostCtor = /^\[object .+?Constructor\]$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reNative = RegExp('^' +
  escapeRegExp(objToString)
  .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (objToString.call(value) == funcTag) {
    return reNative.test(fnToString.call(value));
  }
  return (isObjectLike(value) && reHostCtor.test(value)) || false;
}

module.exports = isNative;

},{"../internal/isObjectLike":80,"../string/escapeRegExp":106}],97:[function(require,module,exports){
var isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var numberTag = '[object Number]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Number` primitive or object.
 *
 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
 * as numbers, use the `_.isFinite` method.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isNumber(8.4);
 * // => true
 *
 * _.isNumber(NaN);
 * // => true
 *
 * _.isNumber('8.4');
 * // => false
 */
function isNumber(value) {
  return typeof value == 'number' || (isObjectLike(value) && objToString.call(value) == numberTag) || false;
}

module.exports = isNumber;

},{"../internal/isObjectLike":80}],98:[function(require,module,exports){
/**
 * Checks if `value` is the language type of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * **Note:** See the [ES5 spec](https://es5.github.io/#x8) for more details.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return type == 'function' || (value && type == 'object') || false;
}

module.exports = isObject;

},{}],99:[function(require,module,exports){
var isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var stringTag = '[object String]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag) || false;
}

module.exports = isString;

},{"../internal/isObjectLike":80}],100:[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dateTag] = typedArrayTags[errorTag] =
typedArrayTags[funcTag] = typedArrayTags[mapTag] =
typedArrayTags[numberTag] = typedArrayTags[objectTag] =
typedArrayTags[regexpTag] = typedArrayTags[setTag] =
typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
function isTypedArray(value) {
  return (isObjectLike(value) && isLength(value.length) && typedArrayTags[objToString.call(value)]) || false;
}

module.exports = isTypedArray;

},{"../internal/isLength":79,"../internal/isObjectLike":80}],101:[function(require,module,exports){
var baseAssign = require('../internal/baseAssign'),
    createAssigner = require('../internal/createAssigner');

/**
 * Assigns own enumerable properties of source object(s) to the destination
 * object. Subsequent sources overwrite property assignments of previous sources.
 * If `customizer` is provided it is invoked to produce the assigned values.
 * The `customizer` is bound to `thisArg` and invoked with five arguments;
 * (objectValue, sourceValue, key, object, source).
 *
 * @static
 * @memberOf _
 * @alias extend
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @param {Function} [customizer] The function to customize assigning values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
 * // => { 'user': 'fred', 'age': 40 }
 *
 * // using a customizer callback
 * var defaults = _.partialRight(_.assign, function(value, other) {
 *   return typeof value == 'undefined' ? other : value;
 * });
 *
 * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
 * // => { 'user': 'barney', 'age': 36 }
 */
var assign = createAssigner(baseAssign);

module.exports = assign;

},{"../internal/baseAssign":25,"../internal/createAssigner":61}],102:[function(require,module,exports){
module.exports = require('./assign');

},{"./assign":101}],103:[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isNative = require('../lang/isNative'),
    isObject = require('../lang/isObject'),
    shimKeys = require('../internal/shimKeys');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  if (object) {
    var Ctor = object.constructor,
        length = object.length;
  }
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
     (typeof object != 'function' && (length && isLength(length)))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

module.exports = keys;

},{"../internal/isLength":79,"../internal/shimKeys":87,"../lang/isNative":96,"../lang/isObject":98}],104:[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('../internal/isIndex'),
    isLength = require('../internal/isLength'),
    isObject = require('../lang/isObject'),
    support = require('../support');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || (support.nonEnumArgs && isArguments(object))) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keysIn;

},{"../internal/isIndex":77,"../internal/isLength":79,"../lang/isArguments":91,"../lang/isArray":92,"../lang/isObject":98,"../support":107}],105:[function(require,module,exports){
var baseValues = require('../internal/baseValues'),
    keys = require('./keys');

/**
 * Creates an array of the own enumerable property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return baseValues(object, keys(object));
}

module.exports = values;

},{"../internal/baseValues":52,"./keys":103}],106:[function(require,module,exports){
var baseToString = require('../internal/baseToString');

/**
 * Used to match `RegExp` special characters.
 * See this [article on `RegExp` characters](http://www.regular-expressions.info/characters.html#special)
 * for more details.
 */
var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
    reHasRegExpChars = RegExp(reRegExpChars.source);

/**
 * Escapes the `RegExp` special characters "\", "^", "$", ".", "|", "?", "*",
 * "+", "(", ")", "[", "]", "{" and "}" in `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https://lodash\.com/\)'
 */
function escapeRegExp(string) {
  string = baseToString(string);
  return (string && reHasRegExpChars.test(string))
    ? string.replace(reRegExpChars, '\\$&')
    : string;
}

module.exports = escapeRegExp;

},{"../internal/baseToString":50}],107:[function(require,module,exports){
(function (global){
var isNative = require('./lang/isNative');

/** Used to detect functions containing a `this` reference. */
var reThis = /\bthis\b/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to detect DOM support. */
var document = (document = global.window) && document.document;

/** Native method references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * An object environment feature flags.
 *
 * @static
 * @memberOf _
 * @type Object
 */
var support = {};

(function(x) {

  /**
   * Detect if functions can be decompiled by `Function#toString`
   * (all but Firefox OS certified apps, older Opera mobile browsers, and
   * the PlayStation 3; forced `false` for Windows 8 apps).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.funcDecomp = !isNative(global.WinRTError) && reThis.test(function() { return this; });

  /**
   * Detect if `Function#name` is supported (all but IE).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.funcNames = typeof Function.name == 'string';

  /**
   * Detect if the DOM is supported.
   *
   * @memberOf _.support
   * @type boolean
   */
  try {
    support.dom = document.createDocumentFragment().nodeType === 11;
  } catch(e) {
    support.dom = false;
  }

  /**
   * Detect if `arguments` object indexes are non-enumerable.
   *
   * In Firefox < 4, IE < 9, PhantomJS, and Safari < 5.1 `arguments` object
   * indexes are non-enumerable. Chrome < 25 and Node.js < 0.11.0 treat
   * `arguments` object indexes as non-enumerable and fail `hasOwnProperty`
   * checks for indexes that exceed their function's formal parameters with
   * associated values of `0`.
   *
   * @memberOf _.support
   * @type boolean
   */
  try {
    support.nonEnumArgs = !propertyIsEnumerable.call(arguments, 1);
  } catch(e) {
    support.nonEnumArgs = true;
  }
}(0, 0));

module.exports = support;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./lang/isNative":96}],108:[function(require,module,exports){
/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var object = { 'user': 'fred' };
 * var getter = _.constant(object);
 *
 * getter() === object;
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;

},{}],109:[function(require,module,exports){
/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],110:[function(require,module,exports){
/**
 * A no-operation function which returns `undefined` regardless of the
 * arguments it receives.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.noop(object) === undefined;
 * // => true
 */
function noop() {
  // No operation performed.
}

module.exports = noop;

},{}],111:[function(require,module,exports){
'use strict';

var OO = require('./oo');

/**
 * Base class for Substance errors.
 *
 * @class SubstanceError
 * @extends Error
 * @constructor
 * @module Basics
 */
function SubstanceError() {
  Error.apply(this, arguments);
}

OO.inherit(SubstanceError, Error);

module.exports = SubstanceError;

},{"./oo":116}],112:[function(require,module,exports){
'use strict';

var OO = require("./oo");

/**
 * Event support.
 *
 * Inspired by VisualEditor's EventEmitter class.
 *
 * @class EventEmitter
 * @constructor
 * @module Basics
 */
function EventEmitter() {
  this.__events__ = {};
}

EventEmitter.Prototype = function() {

  function validateMethod( method, context ) {
    // Validate method and context
    if ( typeof method === 'string' ) {
      // Validate method
      if ( context === undefined || context === null ) {
        throw new Error( 'Method name "' + method + '" has no context.' );
      }
      if ( !( method in context ) ) {
        // Technically the method does not need to exist yet: it could be
        // added before call time. But this probably signals a typo.
        throw new Error( 'Method not found: "' + method + '"' );
      }
      if ( typeof context[method] !== 'function' ) {
        // Technically the property could be replaced by a function before
        // call time. But this probably signals a typo.
        throw new Error( 'Property "' + method + '" is not a function' );
      }
    } else if ( typeof method !== 'function' ) {
      throw new Error( 'Invalid callback. Function or method name expected.' );
    }
  }

  /**
   * Register a listener.
   *
   * @method on
   * @param {String} event
   * @param {Function} method
   * @param {Object} context
   * @chainable
   */
  this.on = function ( event, method, context ) {
    var bindings;
    validateMethod( method, context );
    if ( this.__events__.hasOwnProperty( event ) ) {
      bindings = this.__events__[event];
    } else {
      // Auto-initialize bindings list
      bindings = this.__events__[event] = [];
    }
    // Add binding
    bindings.push({
      method: method,
      context: context || null
    });
    return this;
  };

  /**
   * Remove a listener.
   *
   * @method off
   * @param {String} event
   * @param {Function} method
   * @param {Object} context
   * @chainable
   */
  this.off = function ( event, method, context ) {
    var i, bindings;
    if ( arguments.length === 1 ) {
      // Remove all bindings for event
      delete this.__events__[event];
      return this;
    }
    validateMethod( method, context );
    if ( !( event in this.__events__ ) || !this.__events__[event].length ) {
      // No matching bindings
      return this;
    }
    // Default to null context
    if ( arguments.length < 3 ) {
      context = null;
    }
    // Remove matching handlers
    bindings = this.__events__[event];
    i = bindings.length;
    while ( i-- ) {
      if ( bindings[i].method === method && bindings[i].context === context ) {
        bindings.splice( i, 1 );
      }
    }
    // Cleanup if now empty
    if ( bindings.length === 0 ) {
      delete this.__events__[event];
    }
    return this;
  };

  /**
   * Emit an event.
   *
   * @method emit
   * @param {String} event
   * @param ...arguments
   * @return true if a listener was notified, false otherwise.
   */
  this.emit = function (event) {
    if ( event in this.__events__ ) {
      // Clone the list of bindings so that handlers can remove or add handlers during the call.
      var bindings = this.__events__[event].slice();
      var args = Array.prototype.slice.call(arguments, 1);
      for (var i = 0, len = bindings.length; i < len; i++) {
        var binding = bindings[i];
        binding.method.apply(binding.context, args);
      }
      return true;
    }
    return false;
  };

  /**
   * Connect a listener to a set of events.
   *
   * @method emit
   * @param {Object} listener
   * @param {Object} hash with event as keys, and handler functions as values.
   * @chainable
   */
  this.connect = function (obj, methods) {
    for ( var event in methods ) {
      var method = methods[event];
      this.on( event, method, obj );
    }
    return this;
  };

  /**
   * Disconnect a listener (all bindings).
   *
   * @method emit
   * @param {Object} listener
   * @chainable
   */
  this.disconnect = function (context) {
    var i, event, bindings;
    // Remove all connections to the context
    for ( event in this.__events__ ) {
      bindings = this.__events__[event];
      i = bindings.length;
      while ( i-- ) {
        // bindings[i] may have been removed by the previous step's
        // this.off so check it still exists
        if ( bindings[i] && bindings[i].context === context ) {
          this.off( event, bindings[i].method, context );
        }
      }
    }
    return this;
  };
};

OO.initClass( EventEmitter );

module.exports = EventEmitter;

},{"./oo":116}],113:[function(require,module,exports){
'use strict';

var OO = require('./oo');
var Registry = require('./registry');

/**
 * Factory
 * -------
 * Simple factory implementation.
 *
 * @class Factory
 * @extends Registry
 * @constructor
 * @module Basics
 */
function Factory() {
  Factory.super.call(this);
}

Factory.Prototype = function() {

  /**
   * Create an instance of the clazz with a given name.
   *
   * @param {String} name
   * @return A new instance.
   * @method create
   */
  this.create = function ( name ) {
    var clazz = this.get(name);
    if ( !clazz ) {
      throw new Error( 'No class registered by that name: ' + name );
    }
    // call the clazz providing the remaining arguments
    var args = Array.prototype.slice.call( arguments, 1 );
    var obj = Object.create( clazz.prototype );
    clazz.apply( obj, args );
    return obj;
  };

};

OO.inherit(Factory, Registry);

module.exports = Factory;

},{"./oo":116,"./registry":118}],114:[function(require,module,exports){
'use strict';

/**
 * Mostly taken from lodash.
 *
 * @class Helpers
 * @static
 * @module Basics
 */
var Helpers = {};

// Lang helpers

/**
 * See https://lodash.com/docs#isEqual
 * @method isEqual
 */
Helpers.isEqual = require('lodash/lang/isEqual');
/**
 * See https://lodash.com/docs#isObject
 * @method isObject
 */
Helpers.isObject = require('lodash/lang/isObject');
/**
 * See https://lodash.com/docs#isArray
 * @method isArray
 */
Helpers.isArray = require('lodash/lang/isArray');
/**
 * See https://lodash.com/docs#isString
 * @method isString
 */
Helpers.isString = require('lodash/lang/isString');
/**
 * See https://lodash.com/docs#isNumber
 * @method isNumber
 */
Helpers.isNumber = require('lodash/lang/isNumber');
/**
 * See https://lodash.com/docs#isBoolean
 * @method isBoolean
 */
Helpers.isBoolean = require('lodash/lang/isBoolean');
/**
 * See https://lodash.com/docs#isFunction
 * @method isFunction
 */
Helpers.isFunction = require('lodash/lang/isFunction');
/**
 * See https://lodash.com/docs#cloneDeep
 * @method cloneDeep
 */
Helpers.cloneDeep = require('lodash/lang/cloneDeep');

// Function helpers

/**
 * See https://lodash.com/docs#bind
 * @method bind
 */
Helpers.bind = require('lodash/function/bind');
/**
 * See https://lodash.com/docs#delay
 * @method delay
 */
Helpers.delay = require('lodash/function/delay');
/**
 * See https://lodash.com/docs#debounce
 * @method debounce
 */
Helpers.debounce = require('lodash/function/debounce');

// Object helpers

/**
 * See https://lodash.com/docs#extend
 * @method extend
 */
Helpers.extend = require('lodash/object/extend');

// Array helpers

/**
 * See https://lodash.com/docs#last
 * @method last
 */
Helpers.last = require('lodash/array/last');
/**
 * See https://lodash.com/docs#first
 * @method first
 */
Helpers.first = require('lodash/array/first');
/**
 * See https://lodash.com/docs#compact
 * @method compact
 */
Helpers.compact = require('lodash/array/compact');
/**
 * See https://lodash.com/docs#uniq
 * @method uniq
 */
Helpers.uniq = require('lodash/array/uniq');
/**
 * See https://lodash.com/docs#intersection
 * @method intersection
 */
Helpers.intersection = require('lodash/array/intersection');
/**
 * See https://lodash.com/docs#union
 * @method union
 */
Helpers.union = require('lodash/array/union');
/**
 * See https://lodash.com/docs#without
 * @method without
 */
Helpers.without = require('lodash/array/without');

// Collection helpers

/**
 * See https://lodash.com/docs#each
 * @method each
 */
Helpers.each = require('lodash/collection/forEach');
/**
 * See https://lodash.com/docs#filter
 * @method filter
 */
Helpers.filter = require('lodash/collection/filter');
/**
 * See https://lodash.com/docs#includes
 * @method includes
 */
Helpers.includes = require('lodash/collection/includes');
/**
 * See https://lodash.com/docs#map
 * @method map
 */
Helpers.map = require('lodash/collection/map');
/**
 * See https://lodash.com/docs#pluck
 * @method pluck
 */
Helpers.pluck = require('lodash/collection/pluck');
/**
 * See https://lodash.com/docs#indexBy
 * @method indexBy
 */
Helpers.indexBy = require('lodash/collection/indexBy');
/**
 * See https://lodash.com/docs#sortBy
 * @method sortBy
 */
Helpers.sortBy = require('lodash/collection/sortBy');

/**
 * Check if two arrays are equal.
 *
 * @method isArrayEqual
 * @param {Array} a
 * @param {Array} b
 * @deprecated use `Helpers.isEqual` instead.
 */
Helpers.isArrayEqual = function(a, b) {
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (a.length != b.length) return false;
  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

/**
 * Removes all occurrence of value in array using Array.splice
 * I.e., this changes the array instead of creating a new one
 * as _.without() does.
 *
 * @method deleteFromArray
 * @param {Array} array
 * @param value
 */
Helpers.deleteFromArray = function(array, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === value) {
      array.splice(i, 1);
      i--;
    }
  }
};


/**
 * Clones a given object.
 * Uses obj.clone() if available, otherwise delegates to _.cloneDeep().
 *
 * @method clone
 * @param {Object} obj
 * @return The cloned object.
 */
Helpers.clone = function(obj) {
  if (obj === null || obj === undefined) {
    return obj;
  }
  if (Helpers.isFunction(obj.clone)) {
    return obj.clone();
  }
  return Helpers.deepclone(obj);
};

/**
 * Alias for {{#crossLink "Helpers/cloneDeep:method"}}{{/crossLink}}.
 * @method deepClone
 */
Helpers.deepclone = Helpers.cloneDeep;

/**
 * Web helper to compute the relative offset of an element to an ancestor element.
 *
 * @method getRelativeOffset
 * @param {jQuery.Selector} $element
 * @param {jQuery.Selector} $ancestor
 * @return An object with properties
 *   - top: Number
 *   - left: Number
 */
Helpers.getRelativeOffset = function ( $element, $ancestor ) {
  var pos = $element.offset();
  var ancestorPos = $ancestor.offset();
  pos.left -= ancestorPos.left;
  pos.top -= ancestorPos.top;
  return pos;
};

/*!
Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com
Copyright (c) 2010 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/

/**
 * Generates a unique id.
 *
 * @method uuid
 * @param {String} [prefix] if provided the UUID will be prefixed.
 * @param {Number} [len] if provided a UUID with given length will be created.
 * @return A generated uuid.
 */
Helpers.uuid = function (prefix, len) {
  if (prefix && prefix[prefix.length-1] !== "_") {
    prefix = prefix.concat("_");
  }
  var chars = '0123456789abcdefghijklmnopqrstuvwxyz'.split(''),
      uuid = [],
      radix = 16,
      idx;
  len = len || 32;
  if (len) {
    // Compact form
    for (idx = 0; idx < len; idx++) uuid[idx] = chars[0 | Math.random()*radix];
  } else {
    // rfc4122, version 4 form
    var r;
    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (idx = 0; idx < 36; idx++) {
      if (!uuid[idx]) {
        r = 0 | Math.random()*16;
        uuid[idx] = chars[(idx == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return (prefix ? prefix : "") + uuid.join('');
};

module.exports = Helpers;

},{"lodash/array/compact":2,"lodash/array/first":3,"lodash/array/intersection":4,"lodash/array/last":5,"lodash/array/union":6,"lodash/array/uniq":7,"lodash/array/without":8,"lodash/collection/filter":9,"lodash/collection/forEach":10,"lodash/collection/includes":11,"lodash/collection/indexBy":12,"lodash/collection/map":13,"lodash/collection/pluck":14,"lodash/collection/sortBy":15,"lodash/function/bind":17,"lodash/function/debounce":18,"lodash/function/delay":19,"lodash/lang/cloneDeep":90,"lodash/lang/isArray":92,"lodash/lang/isBoolean":93,"lodash/lang/isEqual":94,"lodash/lang/isFunction":95,"lodash/lang/isNumber":97,"lodash/lang/isObject":98,"lodash/lang/isString":99,"lodash/object/extend":102}],115:[function(require,module,exports){
'use strict';

var _ = require('./helpers');

/**
 * Substance.Basics
 * ----------------
 * A collection of helpers pulled together from different sources, such as lodash.
 *
 * @module Basics
 * @main Basics
 */
var Basics = {};

_.extend(Basics, require('./helpers'));
_.extend(Basics, require('./oo'));
Basics.PathAdapter = require('./path_adapter');
Basics.EventEmitter = require('./event_emitter');
Basics.Error = require('./error');
Basics.Registry = require('./registry');
Basics.Factory = require('./factory');

module.exports = Basics;

},{"./error":111,"./event_emitter":112,"./factory":113,"./helpers":114,"./oo":116,"./path_adapter":117,"./registry":118}],116:[function(require,module,exports){
'use strict';

var _ = require('./helpers');

/**
 * Helpers for OO programming.
 *
 * Inspired by VisualEditor's OO module.
 *
 * @class OO
 * @static
 * @module Basics
 */
var OO = {};

var extend = function( parent, proto ) {
  var ctor = function $$$() {
    parent.apply(this, arguments);
    if (this.init) {
      this.init();
    }
  };
  OO.inherit(ctor, parent);
  for(var key in proto) {
    if (proto.hasOwnProperty(key)) {
      if (key === "name") {
        continue;
      }
      ctor.prototype[key] = proto[key];
    }
  }
  ctor.static.name = proto.name;
  return ctor;
};

/**
 * Initialize a class.
 *
 * @param {Constructor} clazz
 * @method initClass
 */
OO.initClass = function(clazz) {
  if (clazz.Prototype && !(clazz.prototype instanceof clazz.Prototype)) {
    clazz.prototype = new clazz.Prototype();
    clazz.prototype.constructor = clazz;
  }
  clazz.static = clazz.static || {};
  clazz.extend = clazz.extend || _.bind(extend, null, clazz);
};

/**
 * Inherit from a parent class.
 *
 * @param clazz {Constructor} class constructor
 * @param parentClazz {Constructor} parent constructor
 *
 * @method inherit
 */
OO.inherit =  function(clazz, parentClazz) {
  if (clazz.prototype instanceof parentClazz) {
    throw new Error('Target already inherits from origin');
  }
  var targetConstructor = clazz.prototype.constructor;
  // Customization: supporting a prototype constructor function
  // defined as a static member 'Prototype' of the target function.
  var TargetPrototypeCtor = clazz.Prototype;
  // Provide a shortcut to the parent constructor
  clazz.super = parentClazz;
  if (TargetPrototypeCtor) {
    TargetPrototypeCtor.prototype = parentClazz.prototype;
    clazz.prototype = new TargetPrototypeCtor();
    clazz.prototype.constructor = clazz;
  } else {
    clazz.prototype = Object.create(parentClazz.prototype, {
      // Restore constructor property of clazz
      constructor: {
        value: targetConstructor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  }
  // provide a shortcut to the parent prototype
  clazz.prototype.super = parentClazz.prototype;
  // Extend static properties - always initialize both sides
  OO.initClass( parentClazz );
  clazz.static = Object.create(parentClazz.static);
  clazz.extend = _.bind(extend, null, clazz);
};

/**
 * @param clazz {Constructor} class constructor
 * @param mixinClazz {Constructor} parent constructor
 * @method mixin
 */
OO.mixin = function(clazz, mixinClazz) {
  var key;
  var prototype = mixinClazz.prototype;
  if (mixinClazz.Prototype) {
    prototype = new mixinClazz.Prototype();
  }
  // Copy prototype properties
  for ( key in prototype ) {
    if ( key !== 'constructor' && prototype.hasOwnProperty( key ) ) {
      clazz.prototype[key] = prototype[key];
    }
  }
  // make sure the clazz is initialized
  OO.initClass(clazz);
  // Copy static properties
  if ( mixinClazz.static ) {
    for ( key in mixinClazz.static ) {
      if ( mixinClazz.static.hasOwnProperty( key ) ) {
        clazz.static[key] = mixinClazz.static[key];
      }
    }
  } else {
    OO.initClass(mixinClazz);
  }
};

module.exports = OO;

},{"./helpers":114}],117:[function(require,module,exports){
'use strict';

var _ = require('./helpers');
var oo = require('./oo');

/**
 * An adapter to access an object via path.
 *
 * @class PathAdapter
 * @module Basics
 * @constructor
 */
function PathAdapter(obj) {
  if (obj) {
    this.root = obj;
  }
}

PathAdapter.Prototype = function() {

  // use this to create extra scope for children ids
  // Example: {
  //   "foo": {
  //      "bar": true
  //      "children": {
  //          "bla": {
  //            "blupp": true
  //          }
  //      }
  //   }
  // }
  this.childrenScope = false;

  this.getRoot = function() {
    return this.root || this;
  };

  this._resolve = function(path, create) {
    var lastIdx = path.length-1;
    var context = this.getRoot();
    for (var i = 0; i < lastIdx; i++) {
      var key = path[i];
      if (context[key] === undefined) {
        if (create) {
          context[key] = {};
          if (this.childrenScope) {
            context[key].children = {};
          }
        } else {
          return undefined;
        }
      }
      context = context[key];
      if (this.childrenScope) {
        context = context.children;
      }
    }
    return context;
  };

  this.get = function(path) {
    if (_.isString(path)) {
      return this[path];
    } else if (!path || path.length === 0) {
      return this.getRoot();
    } else {
      var key = path[path.length-1];
      var context = this._resolve(path);
      if (context) {
        return context[key];
      } else {
        return undefined;
      }
    }
  };

  this.set = function(path, value) {
    if (_.isString(path)) {
      this[path] = value;
    } else {
      var key = path[path.length-1];
      this._resolve(path, true)[key] = value;
    }
  };

  this.delete = function(path, strict) {
    if (_.isString(path)) {
      delete this[path];
    } else {
      var key = path[path.length-1];
      var obj = this._resolve(path);
      if (strict && !obj || !obj[key]) {
        throw new Error('Invalid path.');
      }
      delete obj[key];
    }
  };

  this.clear = function() {
    var root = this.getRoot();
    for (var key in root) {
      if (root.hasOwnProperty(key)) {
        delete root[key];
      }
    }
  };

  this._traverse = function(root, path, fn, ctx) {
    for (var id in root) {
      if (root.hasOwnProperty(id) && id !== '__values__') {
        var childPath = path.concat([id]);
        fn.call(ctx, childPath, root[id]);
        this._traverse(root[id], childPath, fn, ctx);
      }
    }
  };

  this.traverse = function(fn, ctx) {
    this._traverse(this.getRoot(), [], fn, ctx);
  };

};

oo.initClass( PathAdapter );

PathAdapter.Arrays = function() {
  PathAdapter.apply(this, arguments);
};

PathAdapter.Arrays.Prototype = function() {

  this.get = function(path) {
    if (_.isString(path)) {
      return this[path];
    } else if (!path || path.length === 0) {
      return this.getRoot();
    } else {
      var key = path[path.length-1];
      var context = this._resolve(path);
      if (context && context[key]) {
        return context[key].__values__;
      } else {
        return undefined;
      }
    }
  };

  this.add = function(path, value) {
    var key = path[path.length-1];
    var context = this._resolve(path, true);
    if (!context[key]) {
      context[key] = {__values__: []};
    }
    var values = context[key].__values__;
    values.push(value);
  };

  this.remove = function(path, value) {
    var values = this.get(path);
    if (values) {
      _.deleteFromArray(values, value);
    } else {
      console.warn('Warning: trying to remove a value for an unknown path.', path, value);
    }
  };

  this.removeAll = function(path) {
    var values = this.get(path);
    values.splice(0, values.length);
  };

  this.set = function() {
    throw new Error('This method is not available for PathAdapter.Arrays');
  };

  this._traverse = function(root, path, fn, ctx) {
    for (var id in root) {
      if (id === '__values__') {
        fn.call(ctx, root.__values__);
      } else {
        var childPath = path.concat([id]);
        this._traverse(root[id], childPath, fn, ctx);
      }
    }
  };

};

oo.inherit(PathAdapter.Arrays, PathAdapter);

module.exports = PathAdapter;

},{"./helpers":114,"./oo":116}],118:[function(require,module,exports){
'use strict';

var oo = require('./oo');

/**
 * Simple registry implementation.
 *
 * @class Registry
 * @constructor
 * @module Basics
 */
function Registry() {
  this.entries = {};
  // used to control order
  this.names = [];
}

Registry.Prototype = function() {

  /**
   * Check if an entry is registered for a given name.
   *
   * @param {String} name
   * @method contains
   */
  this.contains = function(name) {
    return !!this.entries[name];
  };

  /**
   * Add an entry to the registry.
   *
   * @param {String} name
   * @param {Object} entry
   * @method add
   */
  this.add = function(name, entry) {
    if (this.contains(name)) {
      this.remove(name);
    }
    this.entries[name] = entry;
    this.names.push(name);
  };

  /**
   * Remove an entry from the registry.
   *
   * @param {String} name
   * @method remove
   */
  this.remove = function(name) {
    var pos = this.names.indexOf(name);
    if (pos >= 0) {
      this.names.splice(pos, 1);
    }
    delete this.entries[name];
  };

  /**
   * Get the entry registered for a given name.
   *
   * @param {String} name
   * @return The registered entry
   * @method get
   */
  this.get = function(name) {
    return this.entries[name];
  };

  /**
   * Iterate all registered entries in the order they were registered.
   *
   * @param {Function} callback with signature function(entry, name)
   * @param {Object} execution context
   * @method each
   */
  this.each = function(callback, ctx) {
    for (var i = 0; i < this.names.length; i++) {
      var name = this.names[i];
      var _continue = callback.call(ctx, this.entries[name], name);
      if (_continue === false) {
        break;
      }
    }
  };
};

oo.initClass(Registry);

module.exports = Registry;

},{"./oo":116}],119:[function(require,module,exports){
'use strict';

var _ = require('../basics/helpers');
var Substance = require('../basics');
var PathAdapter = Substance.PathAdapter;
var EventEmitter = Substance.EventEmitter;

/**
 * A data storage implemention.
 *
 * @class Data
 * @extends EventEmitter
 * @constructor
 * @param {Schema} schema
 * @param {Object} [options]
 * @module Data
 */
function Data(schema, options) {
  EventEmitter.call(this);

  this.schema = schema;
  this.nodes = new PathAdapter();
  this.indexes = {};
  // Handlers that are called after a node was created or deleted
  options = options || {};
  // For example in Substance.Document this is used to attach and detach a document from a node.
  this.didCreateNode = options.didCreateNode || function() {};
  this.didDeleteNode = options.didDeleteNode || function() {};
}

Data.Prototype = function() {

  /**
   * Get a node or value via path.
   *
   * @method get
   * @param {String|Array} path node id or path to property.
   * @return a Node instance, a value or undefined if not found.
   */
  this.get = function(path) {
    if (!path) {
      throw new Error('Path or id required');
    }
    return this.nodes.get(path);
  };

  /**
   * Get the internal storage for nodes.
   *
   * @method getNodes
   * @return The internal node storage.
   */
  this.getNodes = function() {
    return this.nodes;
  };

  /**
   * Create a node from the given data.
   *
   * @method create
   * @return {Node} The created node.
   */
  this.create = function(nodeData) {
    var node = this.schema.getNodeFactory().create(nodeData.type, nodeData);
    if (!node) {
      throw new Error('Illegal argument: could not create node for data:', nodeData);
    }
    if (this.contains(node.id)) {
      throw new Error("Node already exists: " + node.id);
    }
    if (!node.id || !node.type) {
      throw new Error("Node id and type are mandatory.");
    }
    this.nodes[node.id] = node;
    this.didCreateNode(node);
    _.each(this.indexes, function(index) {
      if (index.select(node)) {
        index.create(node);
      }
    });
    return node;
  };

  /**
   * Delete the node with given id.
   *
   * @method delete
   * @param {String} nodeId
   * @return {Node} The deleted node.
   */
  this.delete = function(nodeId) {
    var node = this.nodes[nodeId];
    delete this.nodes[nodeId];
    this.didDeleteNode(node);
    _.each(this.indexes, function(index) {
      if (index.select(node)) {
        index.delete(node);
      }
    });
    return node;
  };

  /**
   * Set a property to a new value.
   *
   * @method set
   * @param {Array} property path
   * @param {Object} newValue
   * @return {Node} The deleted node.
   */
  this.set = function(path, newValue) {
    var node = this.get(path[0]);
    var oldValue = this.nodes.get(path);
    this.nodes.set(path, newValue);
    _.each(this.indexes, function(index) {
      if (index.select(node)) {
        index.update(node, path, newValue, oldValue);
      }
    });
    return oldValue;
  };

  // TODO: do we really want this incremental implementation here?
  this.update = function(path, diff) {
    var oldValue = this.nodes.get(path);
    var newValue;
    if (diff.isOperation) {
      newValue = diff.apply(oldValue);
    } else {
      var start, end, pos, val;
      if (_.isString(oldValue)) {
        if (diff['delete']) {
          // { delete: [2, 5] }
          start = diff['delete'].start;
          end = diff['delete'].end;
          newValue = oldValue.split('').splice(start, end-start).join('');
        } else if (diff['insert']) {
          // { insert: [2, "foo"] }
          pos = diff['insert'].offset;
          val = diff['insert'].value;
          newValue = [oldValue.substring(0, pos), val, oldValue.substring(pos)].join('');
        } else {
          throw new Error('Diff is not supported:', JSON.stringify(diff));
        }
      } else if (_.isArray(oldValue)) {
        newValue = oldValue.slice(0);
        if (diff['delete']) {
          // { delete: 2 }
          pos = diff['delete'].offset;
          newValue.splice(pos, 1);
        } else if (diff['insert']) {
          // { insert: [2, "foo"] }
          pos = diff['insert'].offset;
          val = diff['insert'].value;
          newValue.splice(pos, 0, val);
        } else {
          throw new Error('Diff is not supported:', JSON.stringify(diff));
        }
      } else {
        throw new Error('Diff is not supported:', JSON.stringify(diff));
      }
    }
    this.nodes.set(path, newValue);
    var node = this.get(path[0]);
    _.each(this.indexes, function(index) {
      if (index.select(node)) {
        index.update(node, path, oldValue, newValue);
      }
    });
    return oldValue;
  };

  /**
   * Convert to JSON.
   *
   * @method toJSON
   * @return {Object} Plain content.
   */
  this.toJSON = function() {
    return {
      schema: [this.schema.id, this.schema.version],
      nodes: _.deepclone(this.nodes)
    };
  };

  /**
   * Check if this storage contains a node with given id.
   *
   * @method contains
   * @return {Boolean} `true` if a node with id exists, `false` otherwise.
   */
  this.contains = function(id) {
    return (!!this.nodes[id]);
  };

  /**
   * Clear nodes.
   *
   * @method reset
   */
  this.reset = function() {
    this.nodes = new PathAdapter();
  };

  /**
   * Add a node index.
   *
   * @method addIndex
   * @param {String} name
   * @param {NodeIndex} index
   */
  this.addIndex = function(name, index) {
    if (this.indexes[name]) {
      console.error('Index with name %s already exists.', name);
    }
    index.reset(this);
    this.indexes[name] = index;
    return this;
  };

  /**
   * Get the node index with given name.
   *
   * @method getIndex
   * @param {String} name
   * @return The node index.
   */
  this.getIndex = function(name) {
    return this.indexes[name];
  };

};

Substance.inherit(Data, EventEmitter);

module.exports = Data;

},{"../basics":115,"../basics/helpers":114}],120:[function(require,module,exports){
'use strict';

var Substance = require('../basics');

var Data = require('./data');
var Operator = require('../operator');
var ObjectOperation = Operator.ObjectOperation;
var ArrayOperation = Operator.ArrayOperation;
var TextOperation = Operator.TextOperation;

/**
 * Incremental data storage implemention.
 *
 * @class Data.Incremental
 * @extends Data
 * @constructor
 * @param {Schema} schema
 * @param {Object} [options]
 * @module Data
 */
var IncrementalData = function(schema, options) {
  IncrementalData.super.call(this, schema, options);
};

IncrementalData.Prototype = function() {

  /**
   * Create a new node.
   *
   * @method create
   * @param {Object} nodeData
   * @return The applied operation.
   */
  this.create = function(nodeData) {
    var op = ObjectOperation.Create([nodeData.id], nodeData);
    this.apply(op);
    return op;
  };

  /**
   * Delete a node.
   *
   * @method delete
   * @param {String} nodeId
   * @return The applied operation.
   */
  this.delete = function(nodeId) {
    var op = null;
    var node = this.get(nodeId);
    if (node) {
      var nodeData = node.toJSON();
      op = ObjectOperation.Delete([nodeId], nodeData);
      this.apply(op);
    }
    return op;
  };

  /**
   * Update a property incrementally.
   *
   * The diff can be of the following forms (depending on the updated property type):
   *   - String:
   *     - `{ insert: { offset: Number, value: Object } }`
   *     - `{ delete: { start: Number, end: Number } }`
   *   - Array:
   *     - `{ insert: { offset: Number, value: Object } }`
   *     - `{ delete: { offset: Number } }`
   *
   * @method update
   * @param {Array} path
   * @param {Object} diff
   * @return The applied operation.
   */
  this.update = function(path, diff) {
    var diffOp = this._getDiffOp(path, diff);
    var op = ObjectOperation.Update(path, diffOp);
    this.apply(op);
    return op;
  };

  /**
   * Set a property to a new value
   *
   * @method set
   * @param {Array} path
   * @param {Object} newValue
   * @return The applied operation.
   */
  this.set = function(path, newValue) {
    var oldValue = this.get(path);
    var op = ObjectOperation.Set(path, oldValue, newValue);
    this.apply(op);
    return op;
  };

  /**
   * Apply a given operation.
   *
   * @method apply
   * @param {ObjectOperation} op
   */
  this.apply = function(op) {
    if (op.type === ObjectOperation.NOP) return;
    else if (op.type === ObjectOperation.CREATE) {
      // clone here as the operations value must not be changed
      this.super.create.call(this, Substance.clone(op.val));
    } else if (op.type === ObjectOperation.DELETE) {
      this.super.delete.call(this, op.val.id);
    } else if (op.type === ObjectOperation.UPDATE) {
      var oldVal = this.get(op.path);
      var diff = op.diff;
      if (op.propertyType === 'array') {
        if (! (diff instanceof ArrayOperation) ) {
          diff = ArrayOperation.fromJSON(diff);
        }
        // array ops work inplace
        diff.apply(oldVal);
      } else if (op.propertyType === 'string') {
        if (! (diff instanceof TextOperation) ) {
          diff = TextOperation.fromJSON(diff);
        }
        var newVal = diff.apply(oldVal);
        this.super.set.call(this, op.path, newVal);
      } else {
        throw new Error("Unsupported type for operational update.");
      }
    } else if (op.type === ObjectOperation.SET) {
      this.super.set.call(this, op.path, op.val);
    } else {
      throw new Error("Illegal state.");
    }
    this.emit('operation:applied', op, this);
  };

  this._getDiffOp = function(path, diff) {
    var diffOp = null;
    if (diff.isOperation) {
      diffOp = diff;
    } else {
      var value = this.get(path);
      var start, end, pos, val;
      if (Substance.isString(value)) {
        if (diff['delete']) {
          // { delete: [2, 5] }
          start = diff['delete'].start;
          end = diff['delete'].end;
          diffOp = TextOperation.Delete(start, value.substring(start, end));
        } else if (diff['insert']) {
          // { insert: [2, "foo"] }
          pos = diff['insert'].offset;
          val = diff['insert'].value;
          diffOp = TextOperation.Insert(pos, val);
        }
      } else if (Substance.isArray(value)) {
        if (diff['delete']) {
          // { delete: 2 }
          pos = diff['delete'].offset;
          diffOp = ArrayOperation.Delete(pos, value[pos]);
        } else if (diff['insert']) {
          // { insert: [2, "foo"] }
          pos = diff['insert'].offset;
          val = diff['insert'].value;
          diffOp = ArrayOperation.Insert(pos, val);
        }
      }
    }
    if (!diffOp) {
      throw new Error('Unsupported diff: ' + JSON.stringify(diff));
    }
    return diffOp;
  };

};

Substance.inherit(IncrementalData, Data);

module.exports = IncrementalData;

},{"../basics":115,"../operator":151,"./data":119}],121:[function(require,module,exports){
'use strict';

/**
 * Substance.Data
 * --------------
 * Provides a data model with a simple CRUD style manuipulation API,
 * support for OT based incremental manipulations, etc.
 *
 * @module Data
 * @main Data
 */

var Data = require('./data');

Data.Incremental = require('./incremental_data');
Data.Node = require('./node');
Data.Schema = require('./schema');
Data.Index = require('./node_index');

module.exports = Data;

},{"./data":119,"./incremental_data":120,"./node":122,"./node_index":124,"./schema":125}],122:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var EventEmitter = Substance.EventEmitter;

/**
 * Base node implemention.
 *
 * @class Data.Node
 * @extends EventEmitter
 * @constructor
 * @param {Object} properties
 * @module Data
 */
function Node( properties ) {
  EventEmitter.call(this);

  /**
   * The internal storage for properties.
   * @property properties {Object}
   */
  this.properties = Substance.extend({}, this.getDefaultProperties(), properties);
  this.properties.type = this.constructor.static.name;
  this.properties.id = this.properties.id || Substance.uuid(this.properties.type);
}

Node.Prototype = function() {

  /**
   * Serialize to JSON.
   *
   * @method toJSON
   * @return Plain object.
   */
  this.toJSON = function() {
    return this.properties;
  };

  /**
   * Get default properties.
   *
   * Stub implementation.
   *
   * @method getDefaultProperties
   * @return An object containing default properties.
   */
  this.getDefaultProperties = function() {};

  /**
   * Check if the node is of a given type.
   *
   * @method isInstanceOf
   * @param {String} typeName
   * @return true if the node has a parent with given type, false otherwise.
   */
  this.isInstanceOf = function(typeName) {
    return Node.isInstanceOf(this.constructor, typeName);
  };

  /**
   * Get a the list of all polymorphic types.
   *
   * @method getClassNames
   * @return An array of type names.
   */
  this.getClassNames = function() {
    var classNames = [];
    var staticData = this.constructor.static;
    while (staticData && staticData.name !== "node") {
      classNames.push(staticData.name);
      staticData = Object.getPrototypeOf(staticData);
    }
    return classNames.join(' ');
  };

  /**
   * Get the type of a property.
   *
   * @method getPropertyType
   * @param {String} propertyName
   * @return The property's type.
   */
  this.getPropertyType = function(propertyName) {
    var schema = this.constructor.static.schema;
    return schema[propertyName];
  };

};

Substance.inherit(Node, EventEmitter);

/**
 * Symbolic name for this model class. Must be set to a unique string by every subclass.
 * @static
 * @property name {String}
 */
Node.static.name = "node";

/**
 * The node schema.
 *
 * @property schema {Object}
 * @static
 */
Node.static.schema = {
  type: 'string',
  id: 'string'
};

/**
 * Read-only properties.
 *
 * @property readOnlyProperties {Array}
 * @static
 */
Node.static.readOnlyProperties = ['type', 'id'];

/**
 * Internal implementation of Node.prototype.isInstanceOf.
 *
 * @method isInstanceOf
 * @static
 * @private
 */
 Node.isInstanceOf = function(NodeClass, typeName) {
  var staticData = NodeClass.static;
  while (staticData && staticData.name !== "node") {
    if (staticData && staticData.name === typeName) {
      return true;
    }
    staticData = Object.getPrototypeOf(staticData);
  }
  return false;
};

var defineProperty = function(prototype, property, readonly) {
  var getter, setter;
  getter = function() {
    return this.properties[property];
  };
  if (readonly) {
    setter = function() {
      throw new Error("Property " + property + " is readonly!");
    };
  } else {
    setter = function(val) {
      this.properties[property] = val;
      return this;
    };
  }
  var spec = {
    get: getter,
    set: setter
  };
  Object.defineProperty(prototype, property, spec);
};

var defineProperties = function(NodeClass) {
  var prototype = NodeClass.prototype;
  if (!NodeClass.static.schema) return;
  var properties = Object.keys(NodeClass.static.schema);
  for (var i = 0; i < properties.length; i++) {
    var property = properties[i];
    if (prototype.hasOwnProperty(property)) continue;
    var readonly = ( NodeClass.static.readOnlyProperties &&
      NodeClass.static.readOnlyProperties.indexOf(property) > 0 );
    defineProperty(prototype, property, readonly);
  }
};

var extend;

var prepareSchema = function(NodeClass) {
  var schema = NodeClass.static.schema;
  var parentStatic = Object.getPrototypeOf(NodeClass.static);
  var parentSchema = parentStatic.schema;
  if (parentSchema) {
    NodeClass.static.schema = Substance.extend(Object.create(parentSchema), schema);
  }
};

var initNodeClass = function(NodeClass) {
  // add a extend method so that this class can be used to create child models.
  NodeClass.extend = Substance.bind(extend, null, NodeClass);
  // define properties and so on
  defineProperties(NodeClass);
  prepareSchema(NodeClass);
  NodeClass.type = NodeClass.static.name;
};

extend = function( parent, modelSpec ) {
  var ctor = function NodeClass() {
    parent.apply(this, arguments);
  };
  Substance.inherit(ctor, parent);
  for(var key in modelSpec) {
    if (modelSpec.hasOwnProperty(key)) {
      if (key === "name" || key === "properties") {
        continue;
      }
      ctor.prototype[key] = modelSpec[key];
    }
  }
  ctor.static.name = modelSpec.name;
  ctor.static.schema = modelSpec.properties;
  initNodeClass(ctor);
  return ctor;
};

initNodeClass(Node);

Node.initNodeClass = initNodeClass;

module.exports = Node;

},{"../basics":115}],123:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var Node = require('./node');
var Factory = Substance.Factory;

/**
 * Factory for Nodes.
 *
 * @class Data.NodeFactory
 * @extends Factory
 * @constructor
 * @module Data
 */
function NodeFactory() {
  Factory.call(this);
}

NodeFactory.Prototype = function() {
  /**
   * Register a Node class.
   *
   * @method register
   * @param {Class} nodeClass
   */
  this.register = function ( nodeClazz ) {
    var name = nodeClazz.static && nodeClazz.static.name;
    if ( typeof name !== 'string' || name === '' ) {
      throw new Error( 'Node names must be strings and must not be empty' );
    }
    if ( !( nodeClazz.prototype instanceof Node) ) {
      throw new Error( 'Nodes must be subclasses of Substance.Data.Node' );
    }
    this.add(name, nodeClazz);
  };
};

Substance.inherit(NodeFactory, Factory);

module.exports = NodeFactory;

},{"../basics":115,"./node":122}],124:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var PathAdapter = Substance.PathAdapter;

/**
 * Index for Nodes.
 *
 * Node indexes are first-class citizens in Substance.Data.
 * I.e., they are updated after each operation.
 *
 * @class Data.NodeIndex
 * @constructor
 * @module Data
 */
var NodeIndex = function() {
  /**
   * Internal storage.
   * @property {PathAdapter} index
   * @private
   */
  this.index = new PathAdapter();
};

NodeIndex.Prototype = function() {

  /**
   * Reset the index using a Data instance.
   *
   * @method reset
   * @private
   */
  this.reset = function(data) {
    this.index.clear();
    this._initialize(data);
  };

  this._initialize = function(data) {
    Substance.each(data.getNodes(), function(node) {
      if (this.select(node)) {
        this.create(node);
      }
    }, this);
  };

  /**
   * The property used for indexing.
   *
   * @property {String} property
   * @protected
   */
  this.property = "id";

  /**
   * Check if a node should be indexed.
   *
   * Used internally only. Override this in subclasses to achieve a custom behavior.
   *
   * @method select
   * @protected
   */
  this.select = function(node) {
    if(!this.type) {
      return true;
    } else {
      return node.isInstanceOf(this.type);
    }
  };

  /**
   * Get all indexed nodes for a given path.
   *
   * @method get
   * @param {Array} path
   * @return A node or an object with ids and nodes as values.
   */
  // TODO: what is the correct return value. We have arrays at some places.
  this.get = function(path) {
    // HACK: unwrap objects on the index when method is called without a path
    if (!path) return this.getAll();
    return this.index.get(path) || {};
  };

  /**
   * Collects all indexed nodes.
   *
   * @method getAll
   * @return An object with ids as keys and nodes as values.
   */
  // TODO: is that true?
  this.getAll = function() {
    var result = {};
    Substance.each(this.index, function(values) {
      Substance.extend(result, values);
    });
    return result;
  };

  /**
   * Called when a node has been created.
   *
   * Override this in subclasses for customization.
   *
   * @method create
   * @param {Node} node
   * @protected
   */
  this.create = function(node) {
    var values = node[this.property];
    if (!Substance.isArray(values)) {
      values = [values];
    }
    Substance.each(values, function(value) {
      this.index.set([value, node.id], node);
    }, this);
  };

  /**
   * Called when a node has been deleted.
   *
   * Override this in subclasses for customization.
   *
   * @method delete
   * @param {Node} node
   * @protected
   */
  this.delete = function(node) {
    var values = node[this.property];
    if (!Substance.isArray(values)) {
      values = [values];
    }
    Substance.each(values, function(value) {
      this.index.delete([value, node.id]);
    }, this);
  };

  /**
   * Called when a property has been updated.
   *
   * Override this in subclasses for customization.
   *
   * @method update
   * @param {Node} node
   * @protected
   */
  this.update = function(node, path, newValue, oldValue) {
    if (!this.select(node) || path[1] !== this.property) return;
    var values = oldValue;
    if (!Substance.isArray(values)) {
      values = [values];
    }
    Substance.each(values, function(value) {
      this.index.delete([value, node.id]);
    }, this);
    values = newValue;
    if (!Substance.isArray(values)) {
      values = [values];
    }
    Substance.each(values, function(value) {
      this.index.set([value, node.id], node);
    }, this);
  };

  /**
   * Clone this index.
   *
   * @method clone
   * @return A cloned NodeIndex.
   */
  this.clone = function() {
    var NodeIndexClass = this.constructor;
    var clone = new NodeIndexClass();
    return clone;
  };
};

Substance.initClass( NodeIndex );

/**
 * Create a new NodeIndex using the given prototype as mixin.
 *
 * @method create
 * @param {Object} prototype
 * @static
 * @return A customized NodeIndex.
 */
NodeIndex.create = function(prototype) {
  var index = Substance.extend(new NodeIndex(), prototype);
  index.clone = function() {
    return NodeIndex.create(prototype);
  };
  return index;
};

module.exports = NodeIndex;

},{"../basics":115}],125:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var Node = require('./node');
var NodeFactory = require('./node_factory');

/**
 * Data Schema.
 *
 * @class Data.Schema
 * @constructor
 * @param {String} name
 * @param {String} version
 * @module Data
 */
function Schema(name, version) {
  /**
   * @property {String} name
   */
  this.name = name;
  /**
   * @property {String} version
   */
  this.version = version;
  /**
   * @property {NodeFactory} nodeFactory
   * @private
   */
  this.nodeFactory = new NodeFactory();

  // add built-in node classes
  this.addNodes(this.getBuiltIns());
}

Schema.Prototype = function() {

  /**
   * Add nodes to the schema.
   *
   * @method addNodes
   * @param {Array} nodes Array of Node classes
   */
  this.addNodes = function(nodes) {
    if (!nodes) return;
    for (var i = 0; i < nodes.length; i++) {
      this.nodeFactory.register(nodes[i]);
    }
  };

  /**
   * Get the node class for a type name.
   *
   * @method getNodeClass
   * @param {String} name
   */
  this.getNodeClass = function(name) {
    return this.nodeFactory.get(name);
  };

  /**
   * Provide the node factory.
   *
   * @method getNodeFactory
   * @return A NodeFactory instance.
   * @deprecated Use `this.createNode(type, data)` instead.
   */
  this.getNodeFactory = function() {
    return this.nodeFactory;
  };

  function getJsonForNodeClass(nodeClass) {
    var nodeSchema = {};
    if (nodeClass.static.hasOwnProperty('schema')) {
      nodeSchema.properties = Substance.clone(nodeClass.static.schema);
    }
    // add 'parent' attribute if the nodeClass has a parent
    return nodeSchema;
  }

  /**
   * Serialize to JSON.
   *
   * @method toJSON
   * @return A plain object describing the schema.
   */
  // TODO: what is this used for? IMO this is not necessary anymore
  this.toJSON = function() {
    var data = {
      id: this.name,
      version: this.version,
      types: {}
    };
    this.nodeFactory.each(function(nodeClass, name) {
      data.types[name] = getJsonForNodeClass(nodeClass);
    });
    return data;
  };

  /**
   * Create a node instance.
   *
   * @method createNode
   * @param {String} type
   * @param {Object} properties
   * @return A new Node instance.
   */
  this.createNode = function(type, properties) {
    var node = this.nodeFactory.create(type, properties);
    return node;
  };

  /**
   * Provide all built-in node classes.
   *
   * Used internally.
   *
   * @method getBuiltIns
   * @protected
   * @return An array of Node classes.
   */
  this.getBuiltIns = function() {
    return [ Node ];
  };

  /**
   * Check if a given type is of given parent type.
   *
   * @method isInstanceOf
   * @param {String} type
   * @param {String} parentType
   * @return True if type instanceof parentType.
   */
  this.isInstanceOf = function(type, parentType) {
    var NodeClass = this.getNodeClass(type);
    if (NodeClass) {
      return Node.static.isInstanceOf(NodeClass, parentType);
    }
    return false;
  };

  /**
   * Iterate over all registered node classes.
   *
   * See {{#crossLink "Registry/each:method"}}Registry.each{{/crossLink}}
   *
   * @method each
   * @param {Function} callback
   * @param {Object} context
   */
  this.each = function() {
    this.nodeFactory.each.apply(this.nodeFactory, arguments);
  };
};

Substance.initClass(Schema);

module.exports = Schema;

},{"../basics":115,"./node":122,"./node_factory":123}],126:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var Node = require('./node');
var Selection = require('./selection');

// Annotation
// --------
//
// An annotation can be used to overlay text and give it a special meaning.
// Annotations only work on text properties. If you want to annotate multiple
// nodes you have to use a ContainerAnnotation.
//
// Properties:
//   - path: Identifies a text property in the document (e.g. ["text_1", "content"])
//   - startOffset: the character where the annoation starts
//   - endOffset: the character where the annoation starts

// TODO: in current terminology this is a PropertyAnnotation
var Annotation = Node.extend({
  name: "annotation",

  properties: {
    path: ['array', 'string'],
    startOffset: 'number',
    endOffset: 'number'
  },

  canSplit: function() {
    return true;
  },

  getSelection: function() {
    return Selection.create(this.path, this.startOffset, this.endOffset);
  },

  updateRange: function(tx, sel) {
    if (!sel.isPropertySelection()) {
      throw new Error('Cannot change to ContainerAnnotation.');
    }
    if (!Substance.isEqual(this.startPath, sel.start.path)) {
      tx.set([this.id, 'path'], sel.start.path);
    }
    if (this.startOffset !== sel.start.offset) {
      tx.set([this.id, 'startOffset'], sel.start.offset);
    }
    if (this.endOffset !== sel.end.offset) {
      tx.set([this.id, 'endOffset'], sel.end.offset);
    }
  },

  getText: function() {
    var doc = this.getDocument();
    if (!doc) {
      console.warn('Trying to use an Annotation which is not attached to the document.');
      return "";
    }
    var text = doc.get(this.path);
    return text.substring(this.startOffset, this.endOffset);
  }

});

// default implementation for inline elements
// Attention: there is a difference between the implementation
// of toHtml for annotations and general nodes.
// Annotations are modeled as overlays, so they do not 'own' their content.
// Thus, during conversion HtmlExporter serves the content as a prepared
// array of children element which just need to be wrapped (or can be manipulated).
Annotation.static.toHtml = function(anno, converter, children) {
  var tagName = anno.constructor.static.tagName || 'span';
  var el = converter.createElement(tagName);
  for (var i = 0; i < children.length; i++) {
    el.appendChild(children[i]);
  }
  return el;
};

Object.defineProperties(Annotation.prototype, {
  startPath: {
    get: function() {
      return this.path;
    }
  },
  endPath: {
    get: function() {
      return this.path;
    }
  }
});

module.exports = Annotation;

},{"../basics":115,"./node":142,"./selection":146}],127:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var PathAdapter = Substance.PathAdapter;
var Data = require('../data');
var Annotation = require('./annotation');

// Annotation Index
// ----------------
//
// Lets us look up existing annotations by path and type
//
// To get all annotations for the content of a text node
//
//    var aIndex = doc.annotationIndex;
//    aIndex.get(["text_1", "content"]);
//
// You can also scope for a specific range
//
//    aIndex.get(["text_1", "content"], 23, 45);

var AnnotationIndex = function() {
  this.byPath = new PathAdapter();
  this.byType = new PathAdapter();
};

AnnotationIndex.Prototype = function() {

  this.property = "path";

  this.select = function(node) {
    return (node instanceof Annotation);
  };

  this.reset = function(data) {
    this.byPath.clear();
    this.byType.clear();
    this._initialize(data);
  };

  // TODO: use object interface? so we can combine filters (path and type)
  this.get = function(path, start, end, type) {
    var annotations = this.byPath.get(path) || {};
    if (Substance.isString(path) || path.length === 1) {
      // flatten annotations if this is called via node id
      var _annos = annotations;
      annotations = [];
      Substance.each(_annos, function(level) {
        annotations = annotations.concat(Substance.map(level, function(anno) {
          return anno;
        }));
      });
    } else {
      annotations = Substance.map(annotations, function(anno) {
        return anno;
      });
    }
    /* jshint eqnull:true */
    // null check for null or undefined
    if (start != null) {
      annotations = Substance.filter(annotations, AnnotationIndex.filterByRange(start, end));
    }
    if (type) {
      annotations = Substance.filter(annotations, AnnotationIndex.filterByType(type));
    }
    return annotations;
  };

  this.create = function(anno) {
    this.byType.set([anno.type, anno.id], anno);
    this.byPath.set(anno.path.concat([anno.id]), anno);
  };

  this.delete = function(anno) {
    this.byType.delete([anno.type, anno.id]);
    this.byPath.delete(anno.path.concat([anno.id]));
  };

  this.update = function(node, path, newValue, oldValue) {
    if (this.select(node) && path[1] === this.property) {
      this.delete({ id: node.id, type: node.type, path: oldValue });
      this.create(node);
    }
  };

};

Substance.inherit(AnnotationIndex, Data.Index);

AnnotationIndex.filterByRange = function(start, end) {
  return function(anno) {
    var aStart = anno.startOffset;
    var aEnd = anno.endOffset;
    var overlap = (aEnd >= start);
    // Note: it is allowed to omit the end part
    /* jshint eqnull: true */
    if (end != null) {
      overlap = overlap && (aStart <= end);
    }
    /* jshint eqnull: false */
    return overlap;
  };
};

AnnotationIndex.filterByType = function(type) {
  return function(anno) {
    return anno.isInstanceOf(type);
  };
};

module.exports = AnnotationIndex;
},{"../basics":115,"../data":121,"./annotation":126}],128:[function(require,module,exports){
"use strict";

var Substance = require('../basics');

// A collection of methods to update annotations
// --------
//
// As we treat annotations as overlay of plain text we need to keep them up-to-date during editing.

var insertedText = function(doc, coordinate, length) {
  if (!length) return;
  var index = doc.getIndex('annotations');
  var annotations = index.get(coordinate.path);
  Substance.each(annotations, function(anno) {
    var pos = coordinate.offset;
    var start = anno.startOffset;
    var end = anno.endOffset;
    var newStart = start;
    var newEnd = end;
    if ( (pos < start) ||
         (pos === start && !coordinate.after) ) {
      newStart += length;
    }
    if ( (pos < end) ||
         (pos === end && !coordinate.after) ) {
      newEnd += length;
    }
    if (newStart !== start) {
      doc.set([anno.id, 'startOffset'], newStart);
    }
    if (newEnd !== end) {
      doc.set([anno.id, 'endOffset'], newEnd);
    }
  });
  // same for container annotation anchors
  index = doc.getIndex('container-annotations');
  var anchors = index.get(coordinate.path);
  Substance.each(anchors, function(anchor) {
    var pos = coordinate.offset;
    var start = anchor.offset;
    var changed = false;
    if ( (pos < start) ||
         (pos === start && !coordinate.after) ) {
      start += length;
      changed = true;
    }
    if (changed) {
      var property = (anchor.isStart?'startOffset':'endOffset');
      doc.set([anchor.id, property], start);
    }
  });
};

var deletedText = function(doc, path, startOffset, endOffset) {
  if (startOffset === endOffset) return;
  var index = doc.getIndex('annotations');
  var annotations = index.get(path);
  var length = endOffset - startOffset;
  Substance.each(annotations, function(anno) {
    var pos1 = startOffset;
    var pos2 = endOffset;
    var start = anno.startOffset;
    var end = anno.endOffset;
    var newStart = start;
    var newEnd = end;
    if (pos2 <= start) {
      newStart -= length;
      newEnd -= length;
      doc.set([anno.id, 'startOffset'], newStart);
      doc.set([anno.id, 'endOffset'], newEnd);
    } else {
      if (pos1 <= start) {
        newStart = start - Math.min(pos2-pos1, start-pos1);
      }
      if (pos1 <= end) {
        newEnd = end - Math.min(pos2-pos1, end-pos1);
      }
      // delete the annotation if it has collapsed by this delete
      if (start !== end && newStart === newEnd) {
        doc.delete(anno.id);
      } else {
        if (start !== newStart) {
          doc.set([anno.id, 'startOffset'], newStart);
        }
        if (end !== newEnd) {
          doc.set([anno.id, 'endOffset'], newEnd);
        }
      }
    }
  });
  // same for container annotation anchors
  index = doc.getIndex('container-annotations');
  var anchors = index.get(path);
  var containerAnnoIds = [];
  Substance.each(anchors, function(anchor) {
    containerAnnoIds.push(anchor.id);
    var pos1 = startOffset;
    var pos2 = endOffset;
    var start = anchor.offset;
    var changed = false;
    if (pos2 <= start) {
      start -= length;
      changed = true;
    } else {
      if (pos1 <= start) {
        var newStart = start - Math.min(pos2-pos1, start-pos1);
        if (start !== newStart) {
          start = newStart;
          changed = true;
        }
      }
    }
    if (changed) {
      var property = (anchor.isStart?'startOffset':'endOffset');
      doc.set([anchor.id, property], start);
    }
  });
  // check all anchors after that if they have collapsed and remove the annotation in that case
  Substance.each(Substance.uniq(containerAnnoIds), function(id) {
    var anno = doc.get(id);
    var annoSel = anno.getSelection();
    if(annoSel.isCollapsed()) {
      console.log("...deleting container annotation because it has collapsed" + id);
      doc.delete(id);
    }
  });
};

// used when breaking a node to transfer annotations to the new property
var transferAnnotations = function(doc, path, offset, newPath, newOffset) {
  var index = doc.getIndex('annotations');
  var annotations = index.get(path, offset);
  Substance.each(annotations, function(a) {
    var isInside = (offset > a.startOffset && offset < a.endOffset);
    var start = a.startOffset;
    var end = a.endOffset;
    var newStart, newEnd;
    // 1. if the cursor is inside an annotation it gets either split or truncated
    if (isInside) {
      // create a new annotation if the annotation is splittable
      if (a.canSplit()) {
        var newAnno = Substance.clone(a.properties);
        newAnno.id = Substance.uuid(a.type + "_");
        newAnno.startOffset = newOffset;
        newAnno.endOffset = newOffset + a.endOffset - offset;
        newAnno.path = newPath;
        doc.create(newAnno);
      }
      // in either cases truncate the first part
      newStart = a.startOffset;
      newEnd = offset;
      // if after truncate the anno is empty, delete it
      if (newEnd === newStart) {
        doc.delete(a.id);
      }
      // ... otherwise update the range
      else {
        if (newStart !== start) {
          doc.set([a.id, "startOffset"], newStart);
        }
        if (newEnd !== end) {
          doc.set([a.id, "endOffset"], newEnd);
        }
      }
    }
    // 2. if the cursor is before an annotation then simply transfer the annotation to the new node
    else if (a.startOffset >= offset) {
      // Note: we are preserving the annotation so that anything which is connected to the annotation
      // remains valid.
      newStart = newOffset + a.startOffset - offset;
      newEnd = newOffset + a.endOffset - offset;
      doc.set([a.id, "path"], newPath);
      doc.set([a.id, "startOffset"], newStart);
      doc.set([a.id, "endOffset"], newEnd);
    }
  });
  // same for container annotation anchors
  index = doc.getIndex('container-annotations');
  var anchors = index.get(path);
  var containerAnnoIds = [];
  Substance.each(anchors, function(anchor) {
    containerAnnoIds.push(anchor.id);
    var start = anchor.offset;
    if (offset <= start) {
      var pathProperty = (anchor.isStart?'startPath':'endPath');
      var offsetProperty = (anchor.isStart?'startOffset':'endOffset');
      doc.set([anchor.id, pathProperty], newPath);
      doc.set([anchor.id, offsetProperty], newOffset + anchor.offset - offset);
    }
  });
  // check all anchors after that if they have collapsed and remove the annotation in that case
  Substance.each(Substance.uniq(containerAnnoIds), function(id) {
    var anno = doc.get(id);
    var annoSel = anno.getSelection();
    if(annoSel.isCollapsed()) {
      console.log("...deleting container annotation because it has collapsed" + id);
      doc.delete(id);
    }
  });
};

module.exports = {
  insertedText: insertedText,
  deletedText: deletedText,
  transferAnnotations: transferAnnotations
};

},{"../basics":115}],129:[function(require,module,exports){
"use strict";

var Substance = require('../basics');

var ENTER = 1;
var EXIT = -1;
// Markers are put before other opening tags
var ENTER_EXIT = -2;

// Annotator
// --------
//
// An algorithm that is used to fragment overlapping structure elements
// following a priority rule set.
// E.g., we use this for creating DOM elements for annotations. The annotations
// can partially be overlapping. However this is not allowed in general for DOM elements
// or other hierarchical structures.
//
// Example: For the Annotation use casec consider a 'comment' spanning partially
// over an 'emphasis' annotation.
// 'The <comment>quick brown <bold>fox</comment> jumps over</bold> the lazy dog.'
// We want to be able to create a valid XML structure:
// 'The <comment>quick brown <bold>fox</bold></comment><bold> jumps over</bold> the lazy dog.'
//
// For that one would choose
//
//     {
//        'comment': 0,
//        'bold': 1
//     }
//
// as priority levels.
// In case of structural violations as in the example, elements with a higher level
// would be fragmented and those with lower levels would be preserved as one piece.
//
// TODO: If a violation for nodes of the same level occurs an Error should be thrown.
// Currently, in such cases the first element that is opened earlier is preserved.

var Annotator = function(options) {
  Substance.extend(this, options);
};

Annotator.Prototype = function() {

  // This is a sweep algorithm wich uses a set of ENTER/EXIT entries
  // to manage a stack of active elements.
  // Whenever a new element is entered it will be appended to its parent element.
  // The stack is ordered by the annotation types.
  //
  // Examples:
  //
  // - simple case:
  //
  //       [top] -> ENTER(idea1) -> [top, idea1]
  //
  //   Creates a new 'idea' element and appends it to 'top'
  //
  // - stacked ENTER:
  //
  //       [top, idea1] -> ENTER(bold1) -> [top, idea1, bold1]
  //
  //   Creates a new 'bold' element and appends it to 'idea1'
  //
  // - simple EXIT:
  //
  //       [top, idea1] -> EXIT(idea1) -> [top]
  //
  //   Removes 'idea1' from stack.
  //
  // - reordering ENTER:
  //
  //       [top, bold1] -> ENTER(idea1) -> [top, idea1, bold1]
  //
  //   Inserts 'idea1' at 2nd position, creates a new 'bold1', and appends itself to 'top'
  //
  // - reordering EXIT
  //
  //       [top, idea1, bold1] -> EXIT(idea1)) -> [top, bold1]
  //
  //   Removes 'idea1' from stack and creates a new 'bold1'
  //

  // Orders sweep events according to following precedences:
  //
  // 1. pos
  // 2. EXIT < ENTER
  // 3. if both ENTER: ascending level
  // 4. if both EXIT: descending level

  var _compare = function(a, b) {
    if (a.pos < b.pos) return -1;
    if (a.pos > b.pos) return 1;

    if (a.id === b.id) {
      return b.mode - a.mode;
    }

    if (a.mode < b.mode) return -1;
    if (a.mode > b.mode) return 1;

    if (a.mode === ENTER) {
      if (a.level < b.level) return -1;
      if (a.level > b.level) return 1;
    }

    if (a.mode === EXIT) {
      if (a.level > b.level) return -1;
      if (a.level < b.level) return 1;
    }

    return 0;
  };

  var extractEntries = function(annotations) {
    var entries = [];
    Substance.each(annotations, function(a) {
      // special treatment for zero-width annos such as ContainerAnnotation.Anchors
      if (a.zeroWidth) {
        entries.push({ pos: a.offset, mode: ENTER_EXIT, id: a.id, level: Number.MAX_VALUE, type: 'anchor', node: a });
      } else {
        // use a weak default level when not given
        var l = a.constructor.static.level || 1000;
        entries.push({ pos : a.startOffset, mode: ENTER, level: l, id: a.id, type: a.type, node: a });
        entries.push({ pos : a.endOffset, mode: EXIT, level: l, id: a.id, type: a.type, node: a });
      }
    });
    return entries;
  };

  this.onText = function(/*context, text*/) {};

  // should return the created user context
  this.onEnter = function(/*entry, parentContext*/) {
    return null;
  };

  this.onExit = function(/*entry, context, parentContext*/) {};

  this.enter = function(entry, parentContext) {
    return this.onEnter(entry, parentContext);
  };

  this.exit = function(entry, context, parentContext) {
    this.onExit(entry, context, parentContext);
  };

  this.createText = function(context, text) {
    if (text.length > 0) {
      this.onText(context, text);
    }
  };

  this.start = function(rootContext, text, annotations) {
    var self = this;

    var entries = extractEntries.call(this, annotations);
    entries.sort(_compare.bind(this));
    var stack = [{context: rootContext, entry: null}];
    var pos = 0;

    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      // in any case we add the last text to the current element
      this.createText(stack[stack.length-1].context, text.substring(pos, entry.pos));

      pos = entry.pos;
      var stackLevel, idx;
      if (entry.mode === ENTER || entry.mode === ENTER_EXIT) {
        // find the correct position and insert an entry
        for (stackLevel = 1; stackLevel < stack.length; stackLevel++) {
          if (entry.level < stack[stackLevel].entry.level) {
            break;
          }
        }
        // create elements which are open, and are now stacked ontop of the
        // entered entry
        for (idx = stackLevel; idx < stack.length; idx++) {
          this.exit(stack[idx].entry, stack[idx].context, stack[idx-1].context);
        }
        stack.splice(stackLevel, 0, {entry: entry});
        // create new elements for all lower entries
        for (idx = stackLevel; idx < stack.length; idx++) {
          stack[idx].context = self.enter(stack[idx].entry, stack[idx-1].context);
        }
      }
      if (entry.mode === EXIT || entry.mode === ENTER_EXIT) {
        // find the according entry and remove it from the stack
        for (stackLevel = 1; stackLevel < stack.length; stackLevel++) {
          if (stack[stackLevel].entry.node === entry.node) {
            break;
          }
        }
        for (idx = stackLevel; idx < stack.length; idx++) {
          this.exit(stack[idx].entry, stack[idx].context, stack[idx-1].context);
        }
        stack.splice(stackLevel, 1);
        // create new elements for all lower entries
        for (idx = stackLevel; idx < stack.length; idx++) {
          stack[idx].context = self.enter(stack[idx].entry, stack[idx-1].context);
        }
      }
    }

    // Finally append a trailing text node
    this.createText(rootContext, text.substring(pos));
  };

};

Substance.initClass( Annotator );

module.exports = Annotator;

},{"../basics":115}],130:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var PathAdapter = Substance.PathAdapter;
var Node = require('./node');

// Container
// --------
//
// A Container in first place represents a list of node ids.
// At the same time it bookkeeps a sequence of components which are the editable properties of
// the nodes within this container.
// While most editing occurs on a property level (such as editing text), other things
// happen on a node level, e.g., breaking or mergin nodes, or spanning annotations or so called
// ContainerAnnotations. A Container provides a bridge between those two worlds: nodes and properties.
//
// Example:
// A figure node might consist of a title, an image, and a caption.
// As the image is not editable via conventional editing, we can say, the figure consists of
// two editable properties 'title' and 'caption'.
//
// In our data model we can describe selections by a start coordinate and an end
// coordinate, such as
//      start: { path: ['paragraph_1', 'content'],   offset: 10 } },
//      end:   { path: ['figure_10',   'caption'],   offset: 5  } }
// I.e. such a selection starts in a component of a paragraph, and ends in the caption of a figure.
// If you want to use that selection for deleting, you need to derive somehow what exactly
// lies between those coordinates. For example, there could be some paragraphs, which would
// get deleted completely and the paragraph and the figure where the selection started and ended
// would only be updated.
//
function Container() {
  Node.apply(this, arguments);
  this.components = [];
  this.nodeComponents = {};
  this.byPath = new PathAdapter({});
}

Container.Prototype = function() {

  this.getPosition = function(nodeId) {
    var pos = this.nodes.indexOf(nodeId);
    return pos;
  };

  this.show = function(nodeId, pos) {
    var doc = this.getDocument();
    // Note: checking with ==  is what we want here
    /* jshint eqnull: true */
    if (pos == null) {
      pos = this.nodes.length;
    }
    /* jshint eqnull: false */
    doc.update([this.id, 'nodes'], {
      insert: { offset: pos, value: nodeId }
    });
  };

  this.hide = function(nodeId) {
    var doc = this.getDocument();
    var pos = this.nodes.indexOf(nodeId);
    if (pos >= 0) {
      doc.update([this.id, 'nodes'], {
        delete: { offset: pos }
      });
    } else {
      console.error('Could not find node with id %s.', nodeId);
    }
  };

  this.getComponent = function(path) {
    var comp = this.byPath.get(path);
    return comp;
  };

  this.getComponentsForRange = function(range) {
    var comps = [];
    var startComp = this.byPath.get(range.start.path);
    var endComp = this.byPath.get(range.end.path);
    var startIdx = startComp.getIndex();
    var endIdx = endComp.getIndex();
    comps.push(startComp);
    for (var idx = startIdx+1; idx <= endIdx; idx++) {
      comps.push(this.getComponentAt(idx));
    }
    return comps;
  };

  this.getComponentAt = function(idx) {
    return this.components[idx];
  };

  this.getFirstComponent = function() {
    return this.components[0];
  };

  this.getLastComponent = function() {
    return Substance.last(this.components);
  };

  this.getComponentsForNode = function(nodeId) {
    var nodeComponent = this.nodeComponents[nodeId];
    if (nodeComponent) {
      return nodeComponent.components.slice(0);
    }
  };

  this.getNodeForComponentPath = function(path) {
    var comp = this.getComponent(path);
    if (!comp) return null;
    var nodeId = comp.rootId;
    return this.getDocument().get(nodeId);
  };

  this.getAnnotationFragments = function(containerAnnotation) {
    var fragments = [];
    var doc = containerAnnotation.getDocument();
    var anno = containerAnnotation;
    var startAnchor = anno.getStartAnchor();
    var endAnchor = anno.getEndAnchor();
    // if start and end anchors are on the same property, then there is only one fragment
    if (Substance.isEqual(startAnchor.path, endAnchor.path)) {
      fragments.push({
        id: anno.id,
        path: startAnchor.path,
        startOffset: startAnchor.offset,
        endOffset: endAnchor.offset,
      });
    }
    // otherwise create a trailing fragment for the property of the start anchor,
    // full-spanning fragments for inner properties,
    // and one for the property containing the end anchor.
    else {
      var text = doc.get(startAnchor.path);
      var startComp = this.getComponent(startAnchor.path);
      var endComp = this.getComponent(endAnchor.path);
      if (!startComp || !endComp) {
        throw new Error('Could not find components of AbstractContainerAnnotation');
      }
      fragments.push({
        path: startAnchor.path,
        id: anno.id,
        startOffset: startAnchor.offset,
        endOffset: text.length,
      });
      for (var idx = startComp.idx + 1; idx < endComp.idx; idx++) {
        var comp = this.getComponentAt(idx);
        text = doc.get(comp.path);
        fragments.push({
          path: comp.path,
          id: anno.id,
          startOffset: 0,
          endOffset: text.length,
        });
      }
      fragments.push({
        path: endAnchor.path,
        id: anno.id,
        startOffset: 0,
        endOffset: endAnchor.offset,
      });
    }
    return fragments;
  };

  this.reset = function() {
    this.byPath = new Substance.PathAdapter();
    var doc = this.getDocument();
    var components = [];
    Substance.each(this.nodes, function(id) {
      var node = doc.get(id);
      components = components.concat(_getNodeComponents(node));
    }, this);
    this.components = [];
    this.nodeComponents = {};
    this._insertComponentsAt(0, components);
    this._updateComponentPositions(0);
  };

  // Incrementally updates the container based on a given operation.
  // Gets called by Substance.Document for every applied operation.
  this.update = function(op) {
    if (op.type === "create" || op.type === "delete") {
      return;
    }
    if (op.path[0] === this.id && op.path[1] === 'nodes') {
      if (op.type === 'set') {
        this.reset();
      } else {
        var diff = op.diff;
        if (diff.isInsert()) {
          var insertPos = this._handleInsert(diff.getValue(), diff.getOffset());
          this._updateComponentPositions(insertPos);
        } else if (diff.isDelete()) {
          var deletePos = this._handleDelete(diff.getValue());
          this._updateComponentPositions(deletePos);
        } else {
          throw new Error('Illegal state');
        }
      }
    }
  };

  // TODO: nested structures such as tables and lists should
  // call this whenever they change
  this.updateNode = function(nodeId) {
    var node = this.getDocument().get(nodeId);
    var deletePos = this._handleDelete(nodeId);
    var components = _getNodeComponents(node);
    this._insertComponentsAt(deletePos, components);
    this._updateComponentPositions(deletePos);
  };

  this._insertComponentsAt = function(pos, components) {
    var before = this.components[pos-1];
    var after = this.components[pos];
    var nodeComponents = this.nodeComponents;
    var byPath = this.byPath;
    for (var i = 0; i < components.length; i++) {
      var comp = components[i];
      var nodeId = comp.rootId;
      var nodeComponent = nodeComponents[nodeId];
      if (!nodeComponent) {
        nodeComponent = new Container.NodeComponent(nodeId);
        nodeComponents[nodeId] = nodeComponent;
      }
      comp.parentNode = nodeComponent;
      if (i === 0 && before) {
        before.next = comp;
        comp.previous = before;
      } else if (i > 0) {
        comp.previous = components[i-1];
        components[i-1].next = comp;
      }
      nodeComponent.components.push(comp);
      byPath.set(comp.path, comp);
    }
    if (after) {
      components[components.length-1].next = after;
      after.previous = components[components.length-1];
    }
    this.components.splice.apply(this.components, [pos, 0].concat(components));
  };

  this._updateComponentPositions = function(startPos) {
    for (var i = startPos; i < this.components.length; i++) {
      this.components[i].idx = i;
    }
  };

  // if something has been inserted, we need to get the next id
  // and insert before its first component.
  this._handleInsert = function(nodeId, nodePos) {
    var doc = this.getDocument();
    var node = doc.get(nodeId);
    var length = this.nodes.length;
    var componentPos;
    // NOTE: the original length of the nodes was one less
    // Thus, we detect an 'append' situation by comparing the insertPosition with
    // the previous length
    if (nodePos === length-1) {
      componentPos = this.components.length;
    } else {
      var afterId = this.nodes[nodePos+1];
      var after = this.nodeComponents[afterId].components[0];
      componentPos = after.getIndex();
    }
    var components = _getNodeComponents(node);
    this._insertComponentsAt(componentPos, components);
    return componentPos;
  };

  this._handleDelete = function(nodeId) {
    var nodeComponent = this.nodeComponents[nodeId];
    var components = nodeComponent.components;
    var start = nodeComponent.components[0].getIndex();
    var end = Substance.last(components).getIndex();

    // remove the components from the tree
    for (var i = 0; i < components.length; i++) {
      var comp = components[i];
      this.byPath.delete(comp.path);
    }
    // and delete the nodeComponent
    delete this.nodeComponents[nodeId];

    this.components.splice(start, end-start+1);
    if (this.components.length > start) {
      this.components[start].previous = this.components[start-1];
    }
    if (start>0) {
      this.components[start-1].next = this.components[start];
    }
    return start;
  };

  var _getNodeComponents = function(node, rootNode) {
    rootNode = rootNode || node;
    var components = [];
    var componentNames = node.getComponents();
    var childNode;
    for (var i = 0; i < componentNames.length; i++) {
      var name = componentNames[i];
      var propertyType = node.getPropertyType(name);
      // text property
      if ( propertyType === "string" ) {
        var path = [node.id, name];
        components.push(new Container.Component(path, rootNode.id));
      }
      // child node
      else if (propertyType === "id") {
        var childId = node[name];
        childNode = node.getDocument().get(childId);
        components = components.concat(_getNodeComponents(childNode, rootNode));
      }
      // array of children
      else if (Substance.isEqual(propertyType, ['array', 'id'])) {
        var ids = node[name];
        for (var j = 0; j < ids.length; j++) {
          childNode = node.getDocument().get(ids[j]);
          components = components.concat(_getNodeComponents(childNode, rootNode));
        }
      } else {
        throw new Error('Not yet implemented.');
      }
    }
    return components;
  };
};

Substance.inherit(Container, Node);

Container.static.name = "container";

Container.static.schema = {
  nodes: ["array", "string"]
};

// HACK: ATM we do a lot of Node initialization, but we only do it using Node.extend(..)
Node.initNodeClass(Container);

Container.Component = function Component(path, rootId) {
  this.path = path;
  this.rootId = rootId;
  // computed dynamically
  this.idx = -1;
  this.parentNode = null;
  this.previous = null;
  this.next = null;
};

Container.Component.Prototype = function() {

  this.hasPrevious = function() {
    return !!this.previous;
  };

  this.getPrevious = function() {
    return this.previous;
  };

  this.hasNext = function() {
    return !!this.next;
  };

  this.getNext = function() {
    return this.next;
  };

  this.getIndex = function() {
    return this.idx;
  };

  this.getParentNode = function() {
    return this.parentNode;
  };
};

Substance.initClass(Container.Component);

Container.NodeComponent = function NodeComponent(id) {
  this.id = id;
  this.components = [];
};

Substance.initClass(Container.NodeComponent);

module.exports = Container;

},{"../basics":115,"./node":142}],131:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var Node = require('./node');
var Selection = require('./selection');


// Container Annotation
// ----------------
//
// Describes an annotation sticking on a container that can span over multiple
// nodes.
//
// Here's an example:
//
// {
//   "id": "subject_reference_1",
//   "type": "subject_reference",
//   "container": "content",
//   "startPath": ["text_2", "content"],
//   "startOffset": 100,
//   "endPath": ["text_4", "content"],
//   "endOffset": 40
// }


var ContainerAnnotation = Node.extend({
  name: "container_annotation",

  properties: {
    // id of container node
    container: 'string',
    startPath: ['array', 'string'],
    startOffset: 'number',
    endPath: ['array', 'string'],
    endOffset: 'number'
  },

  getStartAnchor: function() {
    if (!this._startAnchor) {
      this._startAnchor = new ContainerAnnotation.Anchor(this, 'isStart');
    }
    return this._startAnchor;
  },

  getEndAnchor: function() {
    if (!this._endAnchor) {
      this._endAnchor = new ContainerAnnotation.Anchor(this);
    }
    return this._endAnchor;
  },

  // Provide a selection which has the same range as this annotation.
  getSelection: function() {
    var doc = this.getDocument();
    // Guard: when this is called while this node has been detached already.
    if (!doc) {
      console.warn('Trying to use a ContainerAnnotation which is not attached to the document.');
      return Selection.nullSelection();
    }
    var container = doc.get(this.container);
    return Selection.create(container, this.startPath, this.startOffset, this.endPath, this.endOffset);
  },

  getText: function() {
    var doc = this.getDocument();
    if (!doc) {
      console.warn('Trying to use a ContainerAnnotation which is not attached to the document.');
      return "";
    }
    return doc.getTextForSelection(this.getSelection());
  },

  updateRange: function(tx, sel) {
    if (!sel.isContainerSelection()) {
      throw new Error('Cannot change to ContainerAnnotation.');
    }
    if (!Substance.isEqual(this.startPath, sel.start.path)) {
      tx.set([this.id, 'startPath'], sel.start.path);
    }
    if (this.startOffset !== sel.start.offset) {
      tx.set([this.id, 'startOffset'], sel.start.offset);
    }
    if (!Substance.isEqual(this.endPath, sel.end.path)) {
      tx.set([this.id, 'endPath'], sel.end.path);
    }
    if (this.endOffset !== sel.end.offset) {
      tx.set([this.id, 'endOffset'], sel.end.offset);
    }
  },

});

ContainerAnnotation.Anchor = function(node, isStart) {
  this.node = node;
  this.id = node.id;
  this.container = node.container;
  this.isStart = !!isStart;
  Object.freeze(this);
};

ContainerAnnotation.Anchor.Prototype = function() {
  this.zeroWidth = true;
  this.getClassNames = function() {
    return (this.node.getClassNames()+" anchor "+(this.isStart?"start-anchor":"end-anchor"));
  };
};

Substance.initClass(ContainerAnnotation.Anchor);

Object.defineProperties(ContainerAnnotation.Anchor.prototype, {
  path: {
    get: function() {
      return (this.isStart ? this.node.startPath : this.node.endPath);
    },
    set: function() { throw new Error('Immutable!'); }
  },
  offset: {
    get: function() {
      return (this.isStart ? this.node.startOffset : this.node.endOffset);
    },
    set: function() { throw new Error('Immutable!'); }
  },
});

module.exports = ContainerAnnotation;
},{"../basics":115,"./node":142,"./selection":146}],132:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var PathAdapter = Substance.PathAdapter;
var Data = require('../data');
var ContainerAnnotation = require('./container_annotation');

var ContainerAnnotationIndex = function(doc) {
  this.doc = doc;
  this.byPath = new PathAdapter.Arrays();
  this.byId = {};
};

ContainerAnnotationIndex.Prototype = function() {

  this.select = function(node) {
    return (node instanceof ContainerAnnotation);
  };

  this.reset = function(data) {
    this.byPath.clear();
    this.byId = {};
    this._initialize(data);
  };

  this.get = function(path, containerName) {
    var anchors = this.byPath.get(path) || [];
    if (!Substance.isArray(anchors)) {
      var _anchors = [];
      this.byPath._traverse(anchors, [], function(anchors) {
        _anchors = _anchors.concat(anchors);
      });
      anchors = _anchors;
    }
    if (containerName) {
      return Substance.filter(anchors, function(anchor) {
        return (anchor.container === containerName);
      });
    } else {
      // return a copy of the array
      return anchors.slice(0);
    }
    return anchors;
  };

  this.create = function(containerAnno) {
    var startAnchor = containerAnno.getStartAnchor();
    var endAnchor = containerAnno.getEndAnchor();
    this.byPath.add(startAnchor.path, startAnchor);
    this.byPath.add(endAnchor.path, endAnchor);
    this.byId[containerAnno.id] = containerAnno;
  };

  this.delete = function(containerAnno) {
    var startAnchor = containerAnno.getStartAnchor();
    var endAnchor = containerAnno.getEndAnchor();
    this.byPath.remove(startAnchor.path, startAnchor);
    this.byPath.remove(endAnchor.path, endAnchor);
    delete this.byId[containerAnno.id];
  };

  this.update = function(node, path, newValue, oldValue) {
    if (this.select(node)) {
      var anchor = null;
      if (path[1] === 'startPath') {
        anchor = node.getStartAnchor();
      } else if (path[1] === 'endPath') {
        anchor = node.getEndAnchor();
      } else {
        return;
      }
      this.byPath.remove(oldValue, anchor);
      this.byPath.add(anchor.path, anchor);
    }
  };

};

Substance.inherit(ContainerAnnotationIndex, Data.Index);

module.exports = ContainerAnnotationIndex;

},{"../basics":115,"../data":121,"./container_annotation":131}],133:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var PropertySelection = require('./property_selection');
var Selection = require('./selection');
var Container = require('./container');

function ContainerSelection(container, range, reverse) {
  if (!(container instanceof Container)) {
    throw new Error('Illegal argument: expected Container instance.');
  }
  // Note: not calling the super ctor as it freezes the instance
  this.container = container;
  this.range = range;
  this.reverse = reverse;
  this.collapsed = range.start.equals(range.end);
  this._internal = {};
  Object.freeze(this);
}

ContainerSelection.Prototype = function() {

  this.isPropertySelection = function() {
    return false;
  };

  this.isContainerSelection = function() {
    return true;
  };

  this.toString = function() {
    return "ContainerSelection("+ JSON.stringify(this.range.start.path) + ":" + this.range.start.offset + " -> " +  JSON.stringify(this.range.end.path) + ":" + this.range.end.offset + (this.reverse ? ", reverse" : "") + ")";
  };

  this.expand = function(other) {
    var c1 = _coordinates(this.container, this);
    var c2 = _coordinates(this.container, other);
    var c1s = c1.start;
    var c2s = c2.start;
    var c1e = c1.end;
    var c2e = c2.end;
    var newCoors = {
      start: { pos: c1s.pos, offset: c1s.offset },
      end: { pos: c1e.pos, offset: c1e.offset }
    };
    if (c1s.pos > c2s.pos) {
      newCoors.start.pos = c2s.pos;
      newCoors.start.offset = c2s.offset;
    } else if (c1s.pos === c2s.pos) {
      newCoors.start.offset = Math.min(c1s.offset, c2s.offset);
    }
    if (c1e.pos < c2e.pos) {
      newCoors.end.pos = c2e.pos;
      newCoors.end.offset = c2e.offset;
    } else if (c1e.pos === c2e.pos) {
      newCoors.end.offset = Math.max(c1e.offset, c2e.offset);
    }
    return _createNewSelection(this.container, newCoors);
  };

  // There should be exactly one
  this.truncate = function(other) {
    var c1 = _coordinates(this.container, this);
    var c2 = _coordinates(this.container, other);
    var newCoors = {};
    if (_isBefore(c2.start, c1.start, 'strict')) {
      newCoors.start = c1.start;
      newCoors.end = c2.end;
    } else if (_isBefore(c1.end, c2.end, 'strict')) {
      newCoors.start = c2.start;
      newCoors.end = c1.end;
    } else if (_isEqual(c1.start, c2.start)) {
      if (_isEqual(c1.end, c2.end)) {
        return Selection.nullSelection;
      } else {
        newCoors.start = c2.end;
        newCoors.end = c1.end;
      }
    } else if (_isEqual(c1.end, c2.end)) {
      newCoors.start = c1.start;
      newCoors.end = c2.start;
    }
    return _createNewSelection(this.container, newCoors);
  };

  this.isInsideOf = function(other, strict) {
    if (other.isNull()) return false;
    var c1 = _coordinates(this.container, this);
    var c2 = _coordinates(this.container, other);
    return (_isBefore(c2.start, c1.start, strict) && _isBefore(c1.end, c2.end, strict));
  };

  this.contains = function(other) {
    var c1 = _coordinates(this.container, this);
    var c2 = _coordinates(this.container, other);
    return (_isBefore(c1.start, c2.start) && _isBefore(c2.end, c1.end));
  };

  // includes and at least one boundary
  this.includesWithOneBoundary = function(other) {
    var c1 = _coordinates(this.container, this);
    var c2 = _coordinates(this.container, other);
    return (
      (_isEqual(c1.start, c2.start) && _isBefore(c2.end, c1.end)) ||
      (_isEqual(c1.end, c2.end) && _isBefore(c1.start, c2.start))
    );
  };

  this.overlaps = function(other) {
    var c1 = _coordinates(this.container, this);
    var c2 = _coordinates(this.container, other);
    // it overlaps if they are not disjunct
    return !(_isBefore(c1.end, c2.start) || _isBefore(c2.end, c1.start));
  };

  this.isLeftAlignedWith = function(other) {
    var c1 = _coordinates(this.container, this);
    var c2 = _coordinates(this.container, other);
    return _isEqual(c1.start, c2.start);
  };

  this.isRightAlignedWith = function(other) {
    var c1 = _coordinates(this.container, this);
    var c2 = _coordinates(this.container, other);
    return _isEqual(c1.end, c2.end);
  };

  this.splitIntoPropertySelections = function() {
    var sels = [];
    var comps = this.container.getComponentsForRange(this.range);
    var doc = this.container.getDocument();
    for (var i = 0; i < comps.length; i++) {
      var comp = comps[i];
      var startOffset, endOffset;
      if (i===0) {
        startOffset = this.startOffset;
      } else {
        startOffset = 0;
      }
      if (i===comps.length-1) {
        endOffset = this.endOffset;
      } else {
        endOffset = doc.get(comp.path).length;
      }
      sels.push(Selection.create(comp.path, startOffset, endOffset));
    }
    return sels;
  };

  var _coordinates = function(container, sel) {
    if (sel._internal.coor) {
      return sel._internal.coor;
    }
    var range = sel.getRange();
    var startPos = container.getComponent(range.start.path).getIndex();
    var endPos;
    if (sel.isCollapsed()) {
      endPos = startPos;
    } else {
      endPos = container.getComponent(range.end.path).getIndex();
    }
    var result = {
      start: {
        pos: startPos,
        offset: range.start.offset,
      },
      end: {
        pos: endPos,
        offset: range.end.offset
      },
      collapsed: sel.isCollapsed()
    };
    sel._internal.coor = result;
    return result;
  };

  var _isBefore = function(c1, c2, strict) {
    if (strict) {
      if (c1.pos >= c2.pos) return false;
      if (c1.pos == c2.pos && c1.offset >= c2.offset) return false;
      return true;
    } else {
      if (c1.pos > c2.pos) return false;
      if (c1.pos == c2.pos && c1.offset > c2.offset) return false;
      return true;
    }
  };

  var _isEqual = function(c1, c2) {
    return (c1.pos === c2.pos && c1.offset === c2.offset);
  };

  var _createNewSelection = function(container, newCoors) {
    newCoors.start.path = container.getComponentAt(newCoors.start.pos).path;
    newCoors.end.path = container.getComponentAt(newCoors.end.pos).path;
    return Selection.create(container,
      newCoors.start.path, newCoors.start.offset,
      newCoors.end.path, newCoors.end.offset);
  };
};

Substance.inherit(ContainerSelection, PropertySelection);

Object.defineProperties(ContainerSelection.prototype, {
  path: {
    get: function() {
      throw new Error('ContainerSelection has not path property. Use startPath and endPath instead');
    },
    set: function() { throw new Error('immutable.'); }
  },
  startPath: {
    get: function() {
      return this.range.start.path;
    },
    set: function() { throw new Error('immutable.'); }
  },
  endPath: {
    get: function() {
      return this.range.end.path;
    },
    set: function() { throw new Error('immutable.'); }
  }
});

module.exports = ContainerSelection;

},{"../basics":115,"./container":130,"./property_selection":144,"./selection":146}],134:[function(require,module,exports){
'use strict';

var Substance = require('../basics');

// path: the address of a property, such as ['text_1', 'content']
// offset: the position in the property
// after: an internal flag indicating if the address should be associated to the left or right side
//   Note: at boundaries of annotations there are two possible positions with the same address
//       foo <strong>bar</strong> ...
//     With offset=7 normally we associate this position:
//       foo <strong>bar|</strong> ...
//     With after=true we can describe this position:
//       foo <strong>bar</strong>| ...
function Coordinate(path, offset, after) {
  this.path = path;
  this.offset = offset;
  this.after = after;
  Object.freeze(path);
  Object.freeze(this);
}

Coordinate.Prototype = function() {

  this.equals = function(other) {
    return (other === this ||
      (Substance.isArrayEqual(other.path, this.path) && other.offset === this.offset) );
  };

  this.withCharPos = function(offset) {
    return new Coordinate(this.path, offset);
  };

  this.getNodeId = function() {
    return this.path[0];
  };

  this.getPath = function() {
    return this.path;
  };

  this.getOffset = function() {
    return this.offset;
  };

};

Substance.initClass( Coordinate );

module.exports = Coordinate;
},{"../basics":115}],135:[function(require,module,exports){
var Substance = require('../basics');
var PropertySelection = require('./property_selection');
var ContainerSelection = require('./container_selection');
var Coordinate = require('./coordinate');
var Range = require('./range');

// create(range, [, reverse]) -> creates a PropertySelection
// create(coor, [, reverse]) -> creates a collapsed PropertySelection
// create(path, offset[, reverse]) -> creates a collapsed PropertySelection
// create(path, startOffset, endOffset[, reverse]) -> creates an expanded PropertySelection
// create(container, startPath, startOffset, endPath, endOffset) -> creates an expanded ContainerSelection
module.exports = function createSelection(/* arguments */) {
  var container, startPath, startOffset, endPath, endOffset, start, end, reverse;
  var a = arguments;
  if (a[0] instanceof Range) {
    if (Substance.isBoolean(a[1])) {
      reverse = a[1];
    }
    return new PropertySelection(a[0], reverse);
  } else if (a[0] instanceof Coordinate) {
    if (Substance.isBoolean(a[1])) {
      reverse = a[1];
    }
    return new PropertySelection(new Range(a[0], a[0]), reverse);
  } else if (a.length < 5) {
    startPath = a[0];
    startOffset = endOffset = a[1];
    start = end = new Coordinate(startPath, startOffset);
    if (a.length > 2) {
      if (Substance.isBoolean(a[2])) {
        endOffset = startOffset;
        reverse = a[2];
      } else if (Substance.isNumber(a[2])) {
        endOffset = a[2];
        reverse = !!a[3];
        end = new Coordinate(startPath, endOffset);
      }
    }
    /* jshint eqnull:true */
    if ( startPath == null || startOffset == null || endOffset == null ) {
      throw new Error('Illegal arguments: expected (path, offset [, reverse]) or (path, startOffset, endOffset[, reverse])');
    }
    return new PropertySelection(new Range(start, end));
  } else {
    if (!Substance.isArray(arguments[1]) || !Substance.isNumber(arguments[2]) || !Substance.isArray(arguments[3]) || !Substance.isNumber(arguments[4])) {
      throw new Error('Illegal arguments: expected (startPath, startOffset, endPath, endOffset)');
    }
    container = arguments[0];
    startPath = arguments[1];
    startOffset = arguments[2];
    endPath = arguments[3];
    endOffset = arguments[4];
    reverse = !!arguments[5];
    start = new Coordinate(startPath, startOffset);
    if (Substance.isArrayEqual(startPath, endPath)) {
      // return a PropertySelection instead if the given paths are equal
      end = new Coordinate(startPath, endOffset);
    } else {
      end = new Coordinate(endPath, endOffset);
    }
    return new ContainerSelection(container, new Range(start, end));
  }
};

},{"../basics":115,"./container_selection":133,"./coordinate":134,"./property_selection":144,"./range":145}],136:[function(require,module,exports){
'use strict';

var _ = require('../basics/helpers');
var Substance = require('../basics');
var Data = require('../data');

var AnnotationIndex = require('./annotation_index');
var ContainerAnnotationIndex = require('./container_annotation_index');

var TransactionDocument = require('./transaction_document');
var DocumentChange = require('./document_change');

var NotifyPropertyChange = require('./notify_property_change');

function Document(schema) {
  Substance.EventEmitter.call(this);

  this.schema = schema;

  this.data = new Data.Incremental(schema, {
    didCreateNode: _.bind(this._didCreateNode, this),
    didDeleteNode: _.bind(this._didDeleteNode, this),
  });

  // all by type
  this.nodeIndex = this.addIndex('type', Substance.Data.Index.create({
    property: "type"
  }));
  // special index for (property-scoped) annotations
  this.annotationIndex = this.addIndex('annotations', new AnnotationIndex());

  // special index for (contaoiner-scoped) annotations
  this.containerAnnotationIndex = this.addIndex('container-annotations', new ContainerAnnotationIndex());

  // the stage is a essentially a clone of this document
  // used to apply a sequence of document operations
  // without touching this document
  this.stage = new TransactionDocument(this);
  this.isTransacting = false;

  this.done = [];
  this.undone = [];

  // change event proxies are triggered after a document change has been applied
  // before the regular document:changed event is fired.
  // They serve the purpose of making the event notification more efficient
  // In earlier days all observers such as node views where listening on the same event 'operation:applied'.
  // This did not scale with increasing number of nodes, as on every operation all listeners where notified.
  // The proxies filter the document change by interest and then only notify a small set of observers.
  // Example: NotifyByPath notifies only observers which are interested in changes to a certain path.
  this.eventProxies = {
    'path': new NotifyPropertyChange(this),
  };

  this.initialize();

  // CONTRACT: containers should be added in this.initialize()
  this.containers = this.getIndex('type').get('container');
}

Document.Prototype = function() {

  this.newInstance = function() {
    return new Document(this.schema);
  };

  this.initialize = function() {
    // add things to the document, such as containers etc.
  };

  this.loadSeed = function(seed) {
    _.each(seed.nodes, function(nodeData) {
      this.create(nodeData);
    }, this);
    _.each(this.containers, function(container) {
      container.reset();
    });
  };

  this.fromSnapshot = function(data) {
    var doc = this.newInstance();
    doc.loadSeed(data);
    return doc;
  };

  this.getSchema = function() {
    return this.schema;
  };

  this.get = function(path) {
    return this.data.get(path);
  };

  this.getNodes = function() {
    return this.data.getNodes();
  };

  this.addIndex = function(name, index) {
    return this.data.addIndex(name, index);
  };

  this.getIndex = function(name) {
    return this.data.getIndex(name);
  };

  this.getEventProxy = function(name) {
    return this.eventProxies[name];
  };

  this.getTextForSelection = function(sel) {
    var result = [];
    var text;
    if (!sel || sel.isNull()) {
      return "";
    } else if (sel.isPropertySelection()) {
      text = this.get(sel.start.path);
      result.push(text.substring(sel.start.offset, sel.end.offset));
    } else if (sel.isContainerSelection()) {
      var container = this.get(sel.container.id);
      var components = container.getComponentsForRange(sel.range);
      for (var i = 0; i < components.length; i++) {
        var comp = components[i];
        text = this.get(comp.path);
        if (components.length === 1) {
          result.push(text.substring(sel.start.offset, sel.end.offset));
        } else if (i===0) {
          result.push(text.substring(sel.start.offset));
        } else if (i===components.length-1) {
          result.push(text.substring(0, sel.end.offset));
        } else {
          result.push(text);
        }
      }
    }
    return result.join('');
  };

  this.toJSON = function() {
    return {
      schema: [this.schema.name, this.schema.version],
      nodes: this.getNodes()
    };
  };

  // Document manipulation
  //
  // var tx = doc.startTransaction()
  // tx.create(...);
  // ...
  // tx.save();
  //
  // Note: there is no direct manipulation without transaction
  this.startTransaction = function(beforeState) {
    if (this.isTransacting) {
      throw new Error('Nested transactions are not supported.');
    }
    this.isTransacting = true;
    // TODO: maybe we need to prepare the stage
    this.stage.before = beforeState || {};
    this.emit('transaction:started', this.stage);
    return this.stage;
  };

  this.create = function(nodeData) {
    if (this.isTransacting) {
      this.stage.create(nodeData);
    } else {
      this.stage.create(nodeData);
      this.data.create(nodeData);
    }
    return this.data.get(nodeData.id);
  };

  this.delete = function(nodeId) {
    if (this.isTransacting) {
      this.stage.delete(nodeId);
    } else {
      this.stage.delete(nodeId);
      this.data.delete(nodeId);
    }
  };

  this.set = function(path, value) {
    if (this.isTransacting) {
      this.stage.set(path, value);
    } else {
      var op = this.stage.set(path, value);
      this.data.set(path, value);
      this._updateContainers(op);
    }
  };

  this.setText = function(path, text, annotations) {
    var idx;
    var oldAnnos = this.getIndex('annotations').get(path);
    // TODO: what to do with container annotations
    for (idx = 0; idx < oldAnnos.length; idx++) {
      this.delete(oldAnnos[idx].id);
    }
    this.set(path, text);
    for (idx = 0; idx < annotations.length; idx++) {
      this.create(annotations[idx]);
    }
  };

  this.update = function(path, diff) {
    if (this.isTransacting) {
      this.stage.update(path, diff);
    } else {
      var op = this.stage.update(path, diff);
      this.data.update(path, diff);
      this._updateContainers(op);
    }
  };

  this.undo = function() {
    var change = this.done.pop();
    if (change) {
      var inverted = change.invert();
      this._apply(inverted);
      this.undone.push(inverted);
      this._notifyChangeListeners(inverted, { 'replay': true });
    } else {
      console.error('No change can be undone.');
    }
  };

  this.redo = function() {
    var change = this.undone.pop();
    if (change) {
      var inverted = change.invert();
      this._apply(inverted);
      this.done.push(inverted);
      this._notifyChangeListeners(inverted, { 'replay': true });
    } else {
      console.error('No change can be redone.');
    }
  };

  // sel: PropertySelection
  // options:
  //   container: container instance
  //   type: string (annotation type filter)
  //
  // WARNING: Returns an empty array when selection is a container selection
  this.getAnnotationsForSelection = function(sel, options) {
    options = options || {};
    var annotations;
    var path, startOffset, endOffset;

    if (sel.isPropertySelection()) {
      path = sel.getPath();
      startOffset = sel.getStartOffset();
      endOffset = sel.getEndOffset();
    } else {
      return [];
    }
    annotations = this.annotationIndex.get(path, startOffset, endOffset);
    if (options.type) {
      annotations = _.filter(annotations, AnnotationIndex.filterByType(options.type));
    }
    return annotations;
  };

  // Attention: looking for container annotations is not as efficient
  // as property selections, as we do not have an index that has
  // notion of the spatial extend of an annotation
  // (which would depend on a model-side implementation of Container).
  // Opposed to that, common annotations are bound to properties which make it easy to lookup.
  this.getContainerAnnotationsForSelection = function(sel, container, options) {
    if (!container) {
      // Fail more silently
      return [];
      // throw new Error('Container required.');
    }
    var annotations;
    // Also look for container annotations if a Container instance is given
    if (options.type) {
      annotations = this.getIndex('type').get(options.type);
    } else {
      annotations = this.getIndex('container-annotations').byId;
    }
    annotations = _.filter(annotations, function(anno) {
      var annoSel = anno.getSelection();
      return sel.overlaps(annoSel);
    });
    return annotations;
  };

  // Called back by Substance.Data after a node instance has been created
  this._didCreateNode = function(node) {
    // create the node from schema
    node.attach(this);
  };

  this._didDeleteNode = function(node) {
    // create the node from schema
    node.detach(this);
  };

  this._saveTransaction = function(beforeState, afterState, info) {
    if (!this.isTransacting) {
      throw new Error('Not in a transaction.');
    }
    this.isTransacting = false;
    var ops = this.stage.getOperations();
    var documentChange = new DocumentChange(ops, beforeState, afterState);
    // apply the change
    this._apply(documentChange, 'skipStage');
    // push to undo queue and wipe the redo queue
    this.done.push(documentChange);
    this.undone = [];
    this._notifyChangeListeners(documentChange, info);
  };

  this._cancelTransaction = function() {
    if (!this.isTransacting) {
      throw new Error('Not in a transaction.');
    }
    this.isTransacting = false;
  };

  this._updateContainers = function(op) {
    var containers = this.containers;
    _.each(containers, function(container) {
      container.update(op);
    });
  };


  this._apply = function(documentChange, mode) {
    if (this.isTransacting) {
      throw new Error('Can not replay a document change during transaction.');
    }
    // Note: we apply everything doubled, to keep the staging clone up2date.
    if (mode !== 'skipStage') {
      this.stage.apply(documentChange);
    }
    _.each(documentChange.ops, function(op) {
      this.data.apply(op);
      this._updateContainers(op);
    }, this);
  };

  this._notifyChangeListeners = function(documentChange, info) {
    info = info || {};
    _.each(this.eventProxies, function(proxy) {
      proxy.onDocumentChanged(documentChange, info);
    });
    this.emit('document:changed', documentChange, info);
  };

};

Substance.inherit(Document, Substance.EventEmitter);

Object.defineProperty(Document.prototype, 'id', {
  get: function() {
    return this.get('document').guid;
  },
  set: function() {
    throw new Error("Id is an immutable property.");
  }
});

module.exports = Document;

},{"../basics":115,"../basics/helpers":114,"../data":121,"./annotation_index":127,"./container_annotation_index":132,"./document_change":137,"./notify_property_change":143,"./transaction_document":148}],137:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var PathAdapter = Substance.PathAdapter;

function DocumentChange(ops, before, after) {
  this.id = Substance.uuid();
  this.ops = ops.slice(0);
  this.before = before;
  this.after = after;
  this.updated = null;
  this._init();
  Object.freeze(this);
  Object.freeze(this.ops);
  Object.freeze(this.before);
  Object.freeze(this.after);
  Object.freeze(this.updated);
}

DocumentChange.Prototype = function() {

  this._init = function() {
    var ops = this.ops;
    var created = {};
    var deleted = {};
    var updated = new PathAdapter({});
    var i;
    for (i = 0; i < ops.length; i++) {
      var op = ops[i];
      if (op.type === "create") {
        created[op.val.id] = op.val;
        delete deleted[op.val.id];
      }
      if (op.type === "delete") {
        delete created[op.val.id];
        delete updated[op.val.id];
        deleted[op.val.id] = op.val;
      }
      if (op.type === "set" || op.type === "update") {
        // The old as well the new one is affected
        updated.set(op.path, true);
      }
    }
    this.created = created;
    this.deleted = deleted;
    this.updated = updated;
  };

  this.isAffected = function(path) {
    return !!this.updated.get(path);
  };

  this.invert = function() {
    var ops = [];
    for (var i = this.ops.length - 1; i >= 0; i--) {
      ops.push(this.ops[i].invert());
    }
    var before = this.after;
    var after = this.before;
    return new DocumentChange(ops, before, after);
  };

  this.traverse = function(fn, ctx) {
    this.updated.traverse(function() {
      fn.apply(ctx, arguments);
    });
  };

};

Substance.initClass(DocumentChange);

module.exports = DocumentChange;

},{"../basics":115}],138:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var Data = require('../data');

var Node = require('./node');
var Annotation = require('./annotation');
var Container = require('./container');
var ContainerAnnotation = require('./container_annotation');
var TextNode = require('./text_node');

function DocumentSchema(name, version) {
  DocumentSchema.super.call(this, name, version);
}

DocumentSchema.Prototype = function() {

  this.isAnnotationType = function(type) {
    var nodeClass = this.getNodeClass(type);
    return (nodeClass && nodeClass.prototype instanceof Annotation);
  };

  this.getBuiltIns = function() {
    return [ Node, Annotation, Container, ContainerAnnotation, TextNode ];
  };
};

Substance.inherit( DocumentSchema, Data.Schema );

module.exports = DocumentSchema;

},{"../basics":115,"../data":121,"./annotation":126,"./container":130,"./container_annotation":131,"./node":142,"./text_node":147}],139:[function(require,module,exports){
(function (global){
"use strict";

var Substance = require('../basics');
var Annotator = require('./annotator');

var Node = window.Node;

function HtmlExporter(config) {
  this.config = config || {};
  this.state = null;
}

HtmlExporter.Prototype = function() {

  this.createElement = function(tagName) {
    return global.document.createElement(tagName);
  };

  this.toHtml = function(doc, containerId, options) {
    options = {} || options;
    this.state =  {
      doc: doc,
      rootElement: this.createElement('div'),
      options: options
    };
    var container = doc.get(containerId);
    this.container(container);
    return this.state.rootElement;
  };

  this.propertyToHtml = function(doc, path, options) {
    options = {} || options;
    this.state =  {
      doc: doc,
      options: options
    };
    var frag = this.annotatedText(path);
    var div = this.createElement('div');
    div.appendChild(frag);
    var html = div.innerHTML;
    // console.log('HtmlExporter.propertyToHtml', path, html);
    return html;
  };

  this.container = function(containerNode) {
    var state = this.state;
    var nodeIds = containerNode.nodes;
    for (var i = 0; i < nodeIds.length; i++) {
      var node = state.doc.get(nodeIds[i]);
      var el = node.toHtml(this);
      if (!el || (el.nodeType !== Node.ELEMENT_NODE)) {
        throw new Error('Contract: Node.toHtml() must return a DOM element. NodeType: '+node.type);
      }
      el.setAttribute('data-id', node.id);
      state.rootElement.appendChild(el);
    }
  };

  this.annotatedText = function(path) {
    var self = this;
    var doc = this.state.doc;
    var fragment = global.document.createDocumentFragment();
    var annotations = doc.getIndex('annotations').get(path);
    var text = doc.get(path);

    var annotator = new Annotator();
    annotator.onText = function(context, text) {
      context.children.push(global.document.createTextNode(text));
    };
    annotator.onEnter = function(entry) {
      var anno = entry.node;
      return {
        annotation: anno,
        children: []
      };
    };
    annotator.onExit = function(entry, context, parentContext) {
      var anno = context.annotation;
      var el = anno.toHtml(self, context.children);
      if (!el || el.nodeType !== Node.ELEMENT_NODE) {
        throw new Error('Contract: Annotation.toHtml() must return a DOM element.');
      }
      el.setAttribute('data-id', anno.id);
      parentContext.children.push(el);
    };
    var root = { children: [] };
    annotator.start(root, text, annotations);
    for (var i = 0; i < root.children.length; i++) {
      fragment.appendChild(root.children[i]);
    }
    return fragment;
  };

};

Substance.initClass(HtmlExporter);

module.exports = HtmlExporter;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../basics":115,"./annotator":129}],140:[function(require,module,exports){
(function (global){
var Substance = require('../basics');
var _ = Substance;

var Node = window.Node;

function HtmlImporter( config ) {
  this.config = config || {};
  this.nodeTypes = [];
  this.blockTypes = [];
  this.inlineTypes = [];
  // register converters defined in schema
  if (config.schema) {
    config.schema.each(function(NodeClass) {
      // ATM Node.matchElement is required
      if (!NodeClass.static.matchElement) {
        return;
      }
      this.nodeTypes.push(NodeClass);
      if (NodeClass.static.blockType) {
        this.blockTypes.push(NodeClass);
      } else {
        this.inlineTypes.push(NodeClass);
      }
    }, this);
  }
}

HtmlImporter.Prototype = function HtmlImporterPrototype() {

  this.defaultConverter = function(/*el, converter*/) {
    console.warn('This element is not handled by the converters you provided. This is the default implementation which just skips conversion. Override HtmlImporter.defaultConverter(el, converter) to change this behavior.');
  };

  this.initialize = function(doc, rootEl, containerId) {
    var state = {
      doc: doc,
      rootEl: rootEl,
      inlineNodes: [],
      trimWhitespaces: !!this.config.trimWhitespaces,
      // stack of contexts to handle reentrant calls
      stack: [],
      lastChar: "",
      skipTypes: {},
      ignoreAnnotations: false,
    };
    if (containerId) {
      var containerNode = doc.get(containerId);
      if (!containerNode) {
        throw new Error('Illegal argument: could not find container with id' + containerId);
      }
      state.containerNode = containerNode;
    }
    this.state = state;
  };

  this.createElement = function(tagName) {
    return global.document.createElement(tagName);
  };

  this.convert = function(rootEl, doc, containerId) {
    if (!containerId) {
      throw new Error('Missing argument: containerId is required.');
    }
    this.initialize(doc, rootEl, containerId);
    this.body(rootEl);
    // create annotations afterwards so that the targeted nodes
    // exist for sure
    for (var i = 0; i < this.state.inlineNodes.length; i++) {
      doc.create(this.state.inlineNodes[i]);
    }
  };

  this.convertDocument = function(htmlDoc, doc, containerId) {
    var body = htmlDoc.getElementsByTagName( 'body' )[0];
    body = this.sanitizeHtmlDoc(body);
    console.log('Sanitized html:', body.innerHTML);

    this.initialize(doc, body, containerId);
    this.body(body);

    // Note: we need to create inlineNodes/annotations afterwards
    // as at this point the target nodes exist
    for (var i = 0; i < this.state.inlineNodes.length; i++) {
      doc.create(this.state.inlineNodes[i]);
    }
  };

  this.convertProperty = function(doc, path, html) {
    var el = this.createElement('div');
    el.innerHTML = html;
    this.initialize(doc, el);
    var text = this.annotatedText(el, path);
    doc.setText(path, text, this.state.inlineNodes);
  };

  this.sanitizeHtmlDoc = function(body) {
    var newRoot = body;
    // Look for paragraphs in <b> which is served by GDocs.
    var gdocs = body.querySelector('b > p');
    if (gdocs) {
      return gdocs.parentNode;
    }
    $(body).find('*[style]').removeAttr('style');
    return newRoot;
  };

  this.convertElement = function(el) {
    var doc = this.state.doc;
    var nodeType = this._getNodeTypeForElement(el);
    if (!nodeType) {
      console.error("Could not find a node class associated to element", el);
      throw new Error("Could not find a node class associated to element");
    }
    var node = nodeType.static.fromHtml(el, this);
    node.type = nodeType.static.name;
    node.id = node.id || Substance.uuid(node.type);
    doc.create(node);
    return node;
  };

  this.body = function(body) {
    var state = this.state;
    var doc = state.doc;
    var containerNode = state.containerNode;
    var childIterator = new HtmlImporter.ChildNodeIterator(body);
    while(childIterator.hasNext()) {
      var el = childIterator.next();
      var blockType = this._getBlockTypeForElement(el);
      var node;
      if (blockType) {
        node = blockType.static.fromHtml(el, this);
        if (!node) {
          throw new Error("Contract: a Node's fromHtml() method must return a node");
        } else {
          node.type = blockType.static.name;
          node.id = node.id || Substance.uuid(node.type);
          doc.create(node);
          containerNode.show(node.id);
        }
      } else {
        if (el.nodeType === Node.COMMENT_NODE) {
          // skip comment nodes on block level
        } else if (el.nodeType === Node.TEXT_NODE) {
          var text = el.textContent;
          if (/^\s*$/.exec(text)) continue;
          // If we find text nodes on the block level we wrap
          // it into a paragraph element (or what is configured as default block level element)
          childIterator.back();
          this.wrapInlineElementsIntoBlockElement(childIterator);
        } else if (el.nodeType === Node.ELEMENT_NODE) {
          // NOTE: hard to tell if unsupported nodes on this level
          // should be treated as inline or not.
          // ATM we only support spans as entry to the catch-all implementation
          // that collects inline elements and wraps into a paragraph.
          // TODO: maybe this should be the default?
          if (el.tagName.toLowerCase() === "span") {
            childIterator.back();
            this.wrapInlineElementsIntoBlockElement(childIterator);
          } else {
            this.createDefaultBlockElement(el);
          }
        }
      }
    }
  };

  this.wrapInlineElementsIntoBlockElement = function(childIterator) {
    var state = this.state;
    var doc = state.doc;
    var containerNode = state.containerNode;
    var wrapper = global.document.createElement('div');
    while(childIterator.hasNext()) {
      var el = childIterator.next();
      var blockType = this._getBlockTypeForElement(el);
      if (blockType) {
        childIterator.back();
        break;
      }
      wrapper.appendChild(el.cloneNode(true));
    }
    var node = this.defaultConverter(wrapper, this);
    if (node) {
      if (!node.type) {
        throw new Error('Contract: Html.defaultConverter() must return a node with type.');
      }
      node.id = node.id || Substance.uuid(node.type);
      doc.create(node);
      containerNode.show(node.id);
    }
  };

  this.createDefaultBlockElement = function(el) {
    var state = this.state;
    var doc = state.doc;
    var containerNode = state.containerNode;
    var node = this.defaultConverter(el, this);
    if (node) {
      if (!node.type) {
        throw new Error('Contract: Html.defaultConverter() must return a node with type.');
      }
      node.id = node.id || Substance.uuid(node.type);
      doc.create(node);
      containerNode.show(node.id);
    }
  };

  /**
   * Parse annotated text
   *
   * Make sure you call this method only for elements where `this.isParagraphish(elements) === true`
   */
  this.annotatedText = function(el, path) {
    var state = this.state;
    if (path) {
      if (state.stack.length>0) {
        throw new Error('Contract: it is not allowed to bind a new call annotatedText to a path while the previous has not been completed.');
      }
      state.stack = [{ path: path, offset: 0, text: ""}];
    } else {
      if (state.stack.length===0) {
        throw new Error("Contract: HtmlImporter.annotatedText() requires 'path' for non-reentrant call.");
      }
    }
    var iterator = new HtmlImporter.ChildNodeIterator(el);
    var text = this._annotatedText(iterator);
    if (path) {
      state.stack.pop();
    }
    return text;
  };

  this.plainText = function(el) {
    var state = this.state;
    var text = $(el).text();
    if (state.stack.length > 0) {
      var context = _.last(state.stack);
      context.offset += text.length;
      context.text += context.text.concat(text);
    }
    return text;
  };

  // Internal function for parsing annotated text
  // --------------------------------------------
  //
  this._annotatedText = function(iterator) {
    var state = this.state;
    var context = _.last(state.stack);
    if (!context) {
      throw new Error('Illegal state: context is null.');
    }
    while(iterator.hasNext()) {
      var el = iterator.next();
      var text = "";
      // Plain text nodes...
      if (el.nodeType === Node.TEXT_NODE) {
        text = this._prepareText(state, el.textContent);
        if (text.length) {
          // Note: text is not merged into the reentrant state
          // so that we are able to return for this reentrant call
          context.text = context.text.concat(text);
          context.offset += text.length;
        }
      } else if (el.nodeType === Node.COMMENT_NODE) {
        // skip comment nodes
        continue;
      } else if (el.nodeType === Node.ELEMENT_NODE) {
        var inlineType = this._getInlineTypeForElement(el);
        if (!inlineType) {
          var blockType = this._getInlineTypeForElement(el);
          if (blockType) {
            throw new Error('Expected inline element. Found block element:', el);
          }
          console.warn('Unsupported inline element. We will not create an annotation for it, but process its children to extract annotated text.', el);
          // Note: this will store the result into the current context
          this.annotatedText(el);
          continue;
        }
        // reentrant: we delegate the conversion to the inline node class
        // it will either call us back (this.annotatedText) or give us a finished
        // node instantly (self-managed)
        var startOffset = context.offset;
        var inlineNode;
        if (inlineType.static.fromHtml) {
          // push a new context so we can deal with reentrant calls
          state.stack.push({ path: context.path, offset: startOffset, text: ""});
          inlineNode = inlineType.static.fromHtml(el, this);
          if (!inlineNode) {
            throw new Error("Contract: a Node's fromHtml() method must return a node");
          }
          // ... and transfer the result into the current context
          var result = state.stack.pop();
          context.offset = result.offset;
          context.text = context.text.concat(result.text);
        } else {
          inlineNode = {};
          this.annotatedText(el);
        }
        // in the mean time the offset will probably have changed to reentrant calls
        var endOffset = context.offset;
        inlineNode.type = inlineType.static.name;
        inlineNode.id = inlineType.id || Substance.uuid(inlineNode.type);
        inlineNode.startOffset = startOffset;
        inlineNode.endOffset = endOffset;
        inlineNode.path = context.path.slice(0);
        state.inlineNodes.push(inlineNode);
      } else {
        console.warn('Unknown element type. Taking plain text. NodeTyp=%s', el.nodeType, el);
        text = this._prepareText(state, el.textContent);
        context.text = context.text.concat(text);
        context.offset += text.length;
      }
    }
    // return the plain text collected during this reentrant call
    return context.text;
  };

  this._getBlockTypeForElement = function(el) {
    // HACK: tagName does not exist for prmitive nodes such as DOM TextNode.
    if (!el.tagName) return null;
    for (var i = 0; i < this.blockTypes.length; i++) {
      if (this.blockTypes[i].static.matchElement(el)) {
        return this.blockTypes[i];
      }
    }
  };

  this._getInlineTypeForElement = function(el) {
    for (var i = 0; i < this.inlineTypes.length; i++) {
      if (this.inlineTypes[i].static.matchElement(el)) {
        return this.inlineTypes[i];
      }
    }
  };

  this._getNodeTypeForElement = function(el) {
    for (var i = 0; i < this.nodeTypes.length; i++) {
      if (this.nodeTypes[i].static.matchElement(el)) {
        return this.nodeTypes[i];
      }
    }
  };

  this._getDomNodeType = function(el) {
    if (el.nodeType === Node.TEXT_NODE) {
      return "text";
    } else if (el.nodeType === Node.COMMENT_NODE) {
      return "comment";
    } else if (el.tagName) {
      return el.tagName.toLowerCase();
    } else {
      throw new Error("Unknown node type");
    }
  };

  var WS_LEFT = /^\s+/g;
  var WS_LEFT_ALL = /^\s*/g;
  var WS_RIGHT = /\s+$/g;
  var WS_ALL = /\s+/g;
  // var ALL_WS_NOTSPACE_LEFT = /^[\t\n]+/g;
  // var ALL_WS_NOTSPACE_RIGHT = /[\t\n]+$/g;
  var SPACE = " ";
  var TABS_OR_NL = /[\t\n\r]+/g;

  this._prepareText = function(state, text) {
    if (!state.trimWhitespaces) {
      return text;
    }
    // EXPERIMENTAL: drop all 'formatting' white-spaces (e.g., tabs and new lines)
    // (instead of doing so only at the left and right end)
    //text = text.replace(ALL_WS_NOTSPACE_LEFT, "");
    //text = text.replace(ALL_WS_NOTSPACE_RIGHT, "");
    text = text.replace(TABS_OR_NL, SPACE);
    if (state.lastChar === SPACE) {
      text = text.replace(WS_LEFT_ALL, SPACE);
    } else {
      text = text.replace(WS_LEFT, SPACE);
    }
    text = text.replace(WS_RIGHT, SPACE);
    // EXPERIMENTAL: also remove white-space within
    if (this.config.REMOVE_INNER_WS) {
      text = text.replace(WS_ALL, SPACE);
    }
    state.lastChar = text[text.length-1] || state.lastChar;
    return text;
  };

};
HtmlImporter.prototype = new HtmlImporter.Prototype();

HtmlImporter.ChildNodeIterator = function(arg) {
  this.nodes = arg.childNodes;
  this.length = this.nodes.length;
  this.pos = -1;
};

HtmlImporter.ChildNodeIterator.Prototype = function() {
  this.hasNext = function() {
    return this.pos < this.length - 1;
  };
  this.next = function() {
    this.pos += 1;
    return this.nodes[this.pos];
  };
  this.back = function() {
    if (this.pos >= 0) {
      this.pos -= 1;
    }
    return this;
  };
};
HtmlImporter.ChildNodeIterator.prototype = new HtmlImporter.ChildNodeIterator.Prototype();

module.exports = HtmlImporter;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../basics":115}],141:[function(require,module,exports){
'use strict';

var Document = require('./document');

Document.Schema = require('./document_schema');

Document.Node = require('./node');
Document.Annotation = require('./annotation');
Document.Container = require('./container');
Document.ContainerAnnotation = require('./container_annotation');
Document.TextNode = require('./text_node');

Document.Coordinate = require('./coordinate');
Document.Range = require('./range');
Document.Selection = require('./selection');
Document.Selection.create = require('./create_selection');
Document.nullSelection = Document.Selection.nullSelection;
Document.PropertySelection = require('./property_selection');
Document.ContainerSelection = require('./container_selection');

Document.Annotator = require('./annotator');
Document.AnnotationUpdates = require('./annotation_updates');

Document.HtmlImporter = require('./html_importer');
Document.HtmlExporter = require('./html_exporter');

module.exports = Document;

},{"./annotation":126,"./annotation_updates":128,"./annotator":129,"./container":130,"./container_annotation":131,"./container_selection":133,"./coordinate":134,"./create_selection":135,"./document":136,"./document_schema":138,"./html_exporter":139,"./html_importer":140,"./node":142,"./property_selection":144,"./range":145,"./selection":146,"./text_node":147}],142:[function(require,module,exports){
'use strict';

var _ = require('../basics');
var Data = require('../data');

var Node = Data.Node.extend({

  name: "node",

  attach: function( document ) {
    this.document = document;
  },

  detach: function() {
    this.document = null;
  },

  isAttached: function() {
    return this.document !== null;
  },

  getDocument: function() {
    return this.document;
  },

  hasParent: function() {
    return false;
  },

  getParentNode: function() {
    return this.document.get(this.parentId);
  },

  isResilient: function() {
    return false;
  },

  getComponents: function() {
    var componentNames = this.constructor.static.components || [];
    if (componentNames.length === 0) {
      console.warn('Contract: a node must define its editable properties.');
    }
    return componentNames;
  },

  // Note: children are provided for inline nodes only.
  toHtml: function(converter, children) {
    return this.constructor.static.toHtml(this, converter, children);
  },

  // Node can be managed externally.
  // They are not removed from a document when the node
  // gets deleted by the user, but only removed from
  // the container.
  isExternal: function() {
    return !!this.constructor.static.external;
  },

});

Node.initNodeClass = Data.Node.initNodeClass;

// default HTML serialization
Node.static.toHtml = function(node, converter) {
  var $ = converter.$;
  var $el = $('<div itemscope>')
    .attr('data-id', node.id)
    .attr('data-type', node.type);
  _.each(node.properties, function(value, name) {
    var $prop = $('<div').attr('itemprop', name);
    if (node.getPropertyType === 'string') {
      $prop[0].appendChild(converter.annotatedText([node.id, name]));
    } else {
      $prop.text(value);
    }
    $el.append($prop);
  });
  return $el[0];
};

module.exports = Node;

},{"../basics":115,"../data":121}],143:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var PathAdapter = Substance.PathAdapter;

var NotifyByPathProxy = function(doc) {
  this.listeners = new PathAdapter();
  this.doc = doc;
};

NotifyByPathProxy.Prototype = function() {

  this.onDocumentChanged = function(change, info) {
    var listeners = this.listeners;
    var updated = change.updated;

    function _updated(path) {
      if (!change.deleted[path[0]]) {
        updated.set(path, true);
      }
    }

    Substance.each(change.ops, function(op) {
      if ( (op.type === "create" || op.type === "delete") && (op.val.path || op.val.startPath)) {
        if (op.val.path) {
          _updated(op.val.path);
        } else if (op.val.startPath) {
          _updated(op.val.startPath);
          _updated(op.val.endPath);
        }
      }
      else if (op.type === "set" && (op.path[1] === "path" || op.path[1] === "startPath" || op.path[1] === "endPath")) {
        _updated(op.val);
        _updated(op.original);
      }
      else if (op.type === "set" && (op.path[1] === "startOffset" || op.path[1] === "endOffset")) {
        var anno = this.doc.get(op.path[0]);
        if (anno) {
          if (anno.path) {
            _updated(anno.path);
          } else {
            _updated(anno.startPath);
            _updated(anno.endPath);
          }
        }
      }
    }, this);
    change.traverse(function(path) {
      var key = path.concat(['listeners']);
      var scopedListeners = listeners.get(key);
      Substance.each(scopedListeners, function(entry) {
        entry.method.call(entry.listener, change, info);
      });
    }, this);
  };

  this.add = function(path, listener, method) {
    var key = path.concat(['listeners']);
    var listeners = this.listeners.get(key);
    if (!listeners) {
      listeners = [];
      this.listeners.set(key, listeners);
    }
    if (!method) {
      throw new Error('Invalid argument: expected function but got ' + method);
    }
    listeners.push({ method: method, listener: listener });
  };

  // TODO: it would be cool if we would just need to provide the listener instance, no path
  this.remove = function(path, listener) {
    var key = path.concat(['listeners']);
    var listeners = this.listeners.get(key);
    if (listeners) {
      for (var i = 0; i < listeners.length; i++) {
        if (listeners[i].listener === listener) {
          listeners.splice(i, 1);
          return;
        }
      }
    }
  };
};

Substance.initClass(NotifyByPathProxy);

module.exports = NotifyByPathProxy;

},{"../basics":115}],144:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var Selection = require('./selection');

function PropertySelection(range, reverse) {
  this.range = range;
  this.reverse = reverse;
  this._internal = {};
  Object.freeze(this);
}

PropertySelection.Prototype = function() {

  Substance.extend(this, Selection.prototype);

  this.isNull = function() {
    return false;
  };

  this.getRanges = function() {
    return [this.range];
  };

  this.getRange = function() {
    return this.range;
  };

  this.isCollapsed = function() {
    return this.range.isCollapsed();
  };

  this.isReverse = function() {
    return this.reverse;
  };

  this.isPropertySelection = function() {
    return true;
  };

  this.isMultiSeletion = function() {
    return false;
  };

  this.equals = function(other) {
    return (
      Selection.prototype.equals.call(this, other) &&
      this.range.equals(other.range)
    );
  };

  this.collapse = function(direction) {
    var coor;
    if (direction === 'left') {
      coor = this.range.start;
    } else {
      coor = this.range.end;
    }
    return Selection.create(coor);
  };

  // Helper Methods
  // ----------------------

  this.getPath = function() {
    return this.range.start.path;
  };

  this.getStartOffset = function() {
    return this.range.start.offset;
  };

  this.getEndOffset = function() {
    return this.range.end.offset;
  };

  this.toString = function() {
    return [
      "PropertySelection(", JSON.stringify(this.range.start.path), ", ",
        this.range.start.offset, " -> ", this.range.end.offset,
        (this.reverse?", reverse":""),
        (this.range.start.after?", after":""),
      ")"
    ].join('');
  };

  this.isInsideOf = function(other, strict) {
    if (other.isNull()) return false;
    if (other.isContainerSelection()) {
      // console.log('PropertySelection.isInsideOf: delegating to ContainerSelection.contains...');
      return other.contains(this);
    }
    if (strict) {
      return (Substance.isEqual(this.path, other.path) &&
        this.start.offset > other.start.offset &&
        this.end.offset < other.end.offset);
    } else {
      return (Substance.isEqual(this.path, other.path) &&
        this.start.offset >= other.start.offset &&
        this.end.offset <= other.end.offset);
    }
  };

  this.contains = function(other, strict) {
    if (other.isNull()) return false;
    if (other.isContainerSelection()) {
      // console.log('PropertySelection.contains: delegating to ContainerSelection.isInsideOf...');
      return other.isInsideOf(this);
    }
    if (strict) {
      return (Substance.isEqual(this.path, other.path) &&
        this.start.offset < other.start.offset &&
        this.end.offset > other.end.offset);
    } else {
      return (Substance.isEqual(this.path, other.path) &&
        this.start.offset <= other.start.offset &&
        this.end.offset >= other.end.offset);
    }
  };

  this.overlaps = function(other, strict) {
    if (other.isNull()) return false;
    if (other.isContainerSelection()) {
      // console.log('PropertySelection.overlaps: delegating to ContainerSelection.overlaps...');
      return other.overlaps(this);
    }
    if (!Substance.isEqual(this.getPath(), other.getPath())) return false;
    if (strict) {
      return (! (this.startOffset>=other.endOffset||this.endOffset<=other.startOffset) );
    } else {
      return (! (this.startOffset>other.endOffset||this.endOffset<other.startOffset) );
    }
  };

  this.isRightAlignedWith = function(other) {
    if (other.isNull()) return false;
    if (other.isContainerSelection()) {
      // console.log('PropertySelection.isRightAlignedWith: delegating to ContainerSelection.isRightAlignedWith...');
      return other.isRightAlignedWith(this);
    }
    return (Substance.isEqual(this.getPath(), other.getPath()) &&
      this.getEndOffset() === other.getEndOffset());
  };

  this.isLeftAlignedWith = function(other) {
    if (other.isNull()) return false;
    if (other.isContainerSelection()) {
      // console.log('PropertySelection.isLeftAlignedWith: delegating to ContainerSelection.isLeftAlignedWith...');
      return other.isLeftAlignedWith(this);
    }
    return (Substance.isEqual(this.getPath(), other.getPath()) &&
      this.getStartOffset() === other.getStartOffset());
  };

  this.expand = function(other) {
    if (other.isNull()) return this;
    if (other.isContainerSelection()) {
      // console.log('PropertySelection.expand: delegating to ContainerSelection.expand...');
      return other.expand(this);
    }
    if (!Substance.isEqual(this.path, other.path)) {
      throw new Error('Can not expand PropertySelection to a different property.');
    }
    var newStartOffset = Math.min(this.startOffset, other.startOffset);
    var newEndOffset = Math.max(this.endOffset, other.endOffset);
    return Selection.create(this.getPath(), newStartOffset, newEndOffset);
  };

  this.truncate = function(other) {
    if (other.isNull()) return this;
    // Checking that paths are ok
    // doing that in a generalized manner so that other can even be a ContainerSelection
    if (!Substance.isEqual(this.start.path, other.start.path) ||
      !Substance.isEqual(this.end.path, other.end.path)) {
      throw new Error('Can not expand PropertySelection to a different property.');
    }
    var newStartOffset;
    var newEndOffset;
    if (this.startOffset === other.startOffset) {
      newStartOffset = other.endOffset;
      newEndOffset = this.endOffset;
    } else if (this.endOffset === other.endOffset) {
      newStartOffset = this.startOffset;
      newEndOffset = other.startOffset;
    }
    return Selection.create(this.getPath(), newStartOffset, newEndOffset);
  };
};

Substance.inherit(PropertySelection, Selection);

Object.defineProperties(PropertySelection.prototype, {
  start: {
    get: function() {
      return this.range.start;
    },
    set: function() { throw new Error('immutable.'); }
  },
  end: {
    get: function() {
      return this.range.end;
    },
    set: function() { throw new Error('immutable.'); }
  },
  path: {
    get: function() {
      return this.range.start.path;
    },
    set: function() { throw new Error('immutable.'); }
  },
  startOffset: {
    get: function() {
      return this.range.start.offset;
    },
    set: function() { throw new Error('immutable.'); }
  },
  endOffset: {
    get: function() {
      return this.range.end.offset;
    },
    set: function() { throw new Error('immutable.'); }
  }
});

module.exports = PropertySelection;

},{"../basics":115,"./selection":146}],145:[function(require,module,exports){
'use strict';

var Substance = require('../basics');

var Range = function(start, end) {
  this.start = start;
  this.end = end;
  Object.freeze(this);
};

Range.Prototype = function() {

  this.isCollapsed = function() {
    return this.start.equals(this.end);
  };

  this.equals = function(other) {
    if (this === other) return true;
    else return (this.start.equals(other.start) && this.end.equals(other.end));
  };

};

Substance.initClass(Range);

module.exports = Range;

},{"../basics":115}],146:[function(require,module,exports){
'use strict';

var Substance = require('../basics');

function Selection() {
}

Selection.Prototype = function() {

  this.getRanges = function() {
    return [];
  };

  this.isNull = function() {
    return true;
  };

  this.isMultiSeletion = function() {
    return false;
  };

  this.isPropertySelection = function() {
    return false;
  };

  this.isContainerSelection = function() {
    return false;
  };

  this.isCollapsed = function() {
    return true;
  };

  this.isReverse = function() {
    return false;
  };

  this.equals = function(other) {
    if (this === other) {
      return true ;
    } else if (!other) {
      return false;
    } else if (this.isNull() !== other.isNull()) {
      return false;
    } else {
      return true;
    }
  };

  this.toString = function() {
    return "null";
  };

};

Substance.initClass(Selection);

var NullSelection = function() {};
NullSelection.Prototype = function() {
  this.isNull = function() {
    return true;
  };
};
Substance.inherit(NullSelection, Selection);
Selection.nullSelection = Object.freeze(new NullSelection());

// this is set in index as it has dependencies to sub-classes
// which can't be required here to avoid cyclic dep.
Selection.create = null;

module.exports = Selection;

},{"../basics":115}],147:[function(require,module,exports){
'use strict';

var Node = require('./node');

// Text Node
// ---------
//
// A base class for all text-ish nodes, such as Paragraphs, Headings,
// Prerendered, etc.

var TextNode = Node.extend({
  name: "text",
  properties: {
    content: 'string'
  },
});

TextNode.static.components = ['content'];

module.exports = TextNode;

},{"./node":142}],148:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var Data = require('../data');

function TransactionDocument(document) {

  this.document = document;
  this.schema = document.schema;
  this.ops = [];
  // app information state information used to recover the state before the transaction
  // when calling undo
  this.before = {};

  this.data = new Data.Incremental(document.schema, {
    didCreateNode: Substance.bind(this._didCreateNode, this),
    didDeleteNode: Substance.bind(this._didDeleteNode, this),
  });

  Substance.each(document.data.indexes, function(index, name) {
    this.data.addIndex(name, index.clone());
  }, this);

  // reset containers initially
  this.containers = this.getIndex('type').get('container');
  Substance.each(this.containers, function(container) {
    container.reset();
  });
}

TransactionDocument.Prototype = function() {

  this.reset = function() {
    this.ops = [];
    this.before = {};
    // reset containers initially
    Substance.each(this.containers, function(container) {
      container.reset();
    });
  };

  this.get = function(path) {
    return this.data.get(path);
  };

  this.create = function(nodeData) {
    var op = this.data.create(nodeData);
    if (!op) return;
    if (this.document.isTransacting) {
      this.ops.push(op);
    }
    return this.data.get(nodeData.id);
  };

  this.delete = function(nodeId) {
    var op = this.data.delete(nodeId);
    if (!op) return;
    if (this.document.isTransacting) {
      this.ops.push(op);
    }
    return op;
  };

  this.set = function(path, value) {
    var op = this.data.set(path, value);
    if (!op) return;
    this._updateContainers(op);
    if (this.document.isTransacting) {
      this.ops.push(op);
    }
    return op;
  };

  this.update = function(path, diffOp) {
    var op = this.data.update(path, diffOp);
    if (!op) return;
    this._updateContainers(op);
    if (this.document.isTransacting) {
      this.ops.push(op);
    }
    return op;
  };

  this._updateContainers = function(op) {
    var containers = this.containers;
    Substance.each(containers, function(container) {
      container.update(op);
    });
  };

  this.save = function(afterState, info) {
    var before = this.before;
    var after = Substance.extend({}, before, afterState);
    this.document._saveTransaction(before, after, info);
    // reset after finishing
    this.reset();
  };

  this.cancel = function() {
    // revert all recorded changes
    for (var i = this.ops.length - 1; i >= 0; i--) {
      this.data.apply(this.ops[i].invert());
    }
    this.document._cancelTransaction();
    this.reset();
  };

  this.finish = function() {
    if (this.document.isTransacting) {
      this.cancel();
    }
  };

  this.cleanup = this.finish;

  this.getOperations = function() {
    return this.ops;
  };

  this.apply = function(documentChange) {
    Substance.each(documentChange.ops, function(op) {
      this.data.apply(op);
      this._updateContainers(op);
    }, this);
  };

  this.getIndex = function(name) {
    return this.data.getIndex(name);
  };

  // Called back by Substance.Data after a node instance has been created
  this._didCreateNode = function(node) {
    // create the node from schema
    node.attach(this);
  };

  this._didDeleteNode = function(node) {
    // create the node from schema
    node.detach(this);
  };

};

Substance.initClass(TransactionDocument);

module.exports = TransactionDocument;

},{"../basics":115,"../data":121}],149:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var Operation = require('./operation');
var Conflict = require('./conflict');

var NOP = "NOP";
var DEL = "delete";
var INS = "insert";

var ArrayOperation = function(data) {
  Operation.call(this);

  /* jshint eqnull: true */
  if (!data || data.type == null) {
    throw new Error("Illegal argument: insufficient data.");
  }
  /* jshint eqnull: false */
  this.type = data.type;
  if (this.type === NOP) return;

  if (this.type !== INS && this.type !== DEL) {
    throw new Error("Illegal type.");
  }
  // the position where to apply the operation
  this.pos = data.pos;
  // the value to insert or delete
  this.val = data.val;
  if (!Substance.isNumber(this.pos) || this.pos < 0) {
    throw new Error("Illegal argument: expecting positive number as pos.");
  }
};

ArrayOperation.fromJSON = function(data) {
  return new ArrayOperation(data);
};

ArrayOperation.Prototype = function() {

  this.apply = function(array) {
    if (this.type === NOP) {
      return array;
    }
    if (this.type === INS) {
      if (array.length < this.pos) {
        throw new Error("Provided array is too small.");
      }
      array.splice(this.pos, 0, this.val);
      return array;
    }
    // Delete
    else /* if (this.type === DEL) */ {
      if (array.length < this.pos) {
        throw new Error("Provided array is too small.");
      }
      if (!Substance.isEqual(array[this.pos], this.val)) {
        throw Error("Unexpected value at position " + this.pos + ". Expected " + this.val + ", found " + array[this.pos]);
      }
      array.splice(this.pos, 1);
      return array;
    }
  };

  this.clone = function() {
    return new ArrayOperation(this);
  };

  this.invert = function() {
    var data = this.toJSON();
    if (this.type === NOP) data.type = NOP;
    else if (this.type === INS) data.type = DEL;
    else /* if (this.type === DEL) */ data.type = INS;
    return new ArrayOperation(data);
  };

  this.hasConflict = function(other) {
    return ArrayOperation.hasConflict(this, other);
  };

  this.toJSON = function() {
    var result = {
      type: this.type,
    };
    if (this.type === NOP) return result;
    result.pos = this.pos;
    result.val = Substance.clone(this.val);
    return result;
  };

  this.isInsert = function() {
    return this.type === INS;
  };

  this.isDelete = function() {
    return this.type === DEL;
  };

  this.getOffset = function() {
    return this.pos;
  };

  this.getValue = function() {
    return this.val;
  };

  this.isNOP = function() {
    return this.type === NOP;
  };

  this.toString = function() {
    return ["(", (this.isInsert() ? '+' : '-'), ",", this.getOffset(), ",'", this.getValue(), "')"].join('');
  };
};

Substance.inherit(ArrayOperation, Operation);

var hasConflict = function(a, b) {
  if (a.type === NOP || b.type === NOP) return false;
  if (a.type === INS && b.type === INS) {
    return a.pos === b.pos;
  } else {
    return false;
  }
};

function transform_insert_insert(a, b) {
  if (a.pos === b.pos) {
    b.pos += 1;
  }
  // a before b
  else if (a.pos < b.pos) {
    b.pos += 1;
  }
  // a after b
  else  {
    a.pos += 1;
  }
}

function transform_delete_delete(a, b) {
  // turn the second of two concurrent deletes into a NOP
  if (a.pos === b.pos) {
    b.type = NOP;
    a.type = NOP;
    return;
  }
  if (a.pos < b.pos) {
    b.pos -= 1;
  } else {
    a.pos -= 1;
  }
}

function transform_insert_delete(a, b) {
  // reduce to a normalized case
  if (a.type === DEL) {
    var tmp = a;
    a = b;
    b = tmp;
  }
  if (a.pos <= b.pos) {
    b.pos += 1;
  } else {
    a.pos -= 1;
  }
}

var transform = function(a, b, options) {
  options = options || {};
  // enable conflicts when you want to notify the user of potential problems
  // Note that even in these cases, there is a defined result.
  if (options['no-conflict'] && hasConflict(a, b)) {
    throw new Conflict(a, b);
  }
  // this is used internally only as optimization, e.g., when rebasing an operation
  if (!options.inplace) {
    a = Substance.clone(a);
    b = Substance.clone(b);
  }
  if (a.type === NOP || b.type === NOP)  {
    // nothing to transform
  }
  else if (a.type === INS && b.type === INS)  {
    transform_insert_insert(a, b);
  }
  else if (a.type === DEL && b.type === DEL) {
    transform_delete_delete(a, b);
  }
  else {
    transform_insert_delete(a, b);
  }
  return [a, b];
};

ArrayOperation.transform = transform;
ArrayOperation.hasConflict = hasConflict;

/* Factories */

ArrayOperation.Insert = function(pos, val) {
  return new ArrayOperation({type:INS, pos: pos, val: val});
};

ArrayOperation.Delete = function(pos, val) {
  return new ArrayOperation({ type:DEL, pos: pos, val: val });
};

ArrayOperation.NOP = NOP;
ArrayOperation.DELETE = DEL;
ArrayOperation.INSERT = INS;

// Export
// ========

module.exports = ArrayOperation;

},{"../basics":115,"./conflict":150,"./operation":153}],150:[function(require,module,exports){
'use strict';

function Conflict(a, b) {
  Error.call(this, "Conflict: " + JSON.stringify(a) +" vs " + JSON.stringify(b));
  this.a = a;
  this.b = b;
}
Conflict.prototype = Error.prototype;

module.exports = Conflict;

},{}],151:[function(require,module,exports){
'use strict';

module.exports = {
  Operation: require('./operation'),
  TextOperation: require('./text_operation'),
  ArrayOperation: require('./array_operation'),
  ObjectOperation: require('./object_operation')
};

},{"./array_operation":149,"./object_operation":152,"./operation":153,"./text_operation":154}],152:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var PathAdapter = Substance.PathAdapter;

var Operation = require('./operation');
var TextOperation = require('./text_operation');
var ArrayOperation = require('./array_operation');

var Conflict = require('./conflict');

var NOP = "NOP";
var CREATE = "create";
var DELETE = 'delete';
var UPDATE = 'update';
var SET = 'set';

var ObjectOperation = function(data) {
  Operation.call(this);
  if (!data) {
    throw new Error('Data of ObjectOperation is missing.');
  }
  if (!data.type) {
    throw new Error('Invalid data: type is mandatory.');
  }
  this.type = data.type;
  if (data.type === NOP) {
    return;
  }
  this.path = data.path;
  if (!data.path) {
    throw new Error('Invalid data: path is mandatory.');
  }
  if (this.type === CREATE || this.type === DELETE) {
    if (!data.val) {
      throw new Error('Invalid data: value is missing.');
    }
    this.val = data.val;
  }
  else if (this.type === UPDATE) {
    if (data.diff) {
      this.diff = data.diff;
      if (data.diff instanceof TextOperation) {
        this.propertyType = 'string';
      } else if (data.diff instanceof ArrayOperation) {
        this.propertyType = 'array';
      } else {
        throw new Error('Invalid data: diff must be a TextOperation or an ArrayOperation.');
      }
    } else {
      throw new Error("Invalid data: diff is mandatory for update operation.");
    }
  }
  else if (this.type === SET) {
    this.val = data.val;
    this.original = data.original;
  } else {
    throw new Error('Invalid type: '+ data.type);
  }
};

ObjectOperation.fromJSON = function(data) {
  data = Substance.clone(data);
  if (data.type === "update") {
    switch (data.propertyType) {
    case "string":
      data.diff = TextOperation.fromJSON(data.diff);
      break;
    case "array":
      data.diff = ArrayOperation.fromJSON(data.diff);
      break;
    default:
      throw new Error("Unsupported update diff:" + JSON.stringify(data.diff));
    }
  }
  var op = new ObjectOperation(data);
  return op;
};

ObjectOperation.Prototype = function() {

  this.apply = function(obj) {
    if (this.type === NOP) return obj;
    var adapter;
    if (obj instanceof PathAdapter) {
      adapter = obj;
    } else {
      adapter = new PathAdapter(obj);
    }
    if (this.type === CREATE) {
      adapter.set(this.path, Substance.clone(this.val));
      return obj;
    }
    if (this.type === DELETE) {
      adapter.delete(this.path, "strict");
    }
    else if (this.type === UPDATE) {
      var diff = this.diff;
      var oldVal = adapter.get(this.path);
      var newVal;
      if (diff instanceof ArrayOperation) {
        newVal = diff.apply(oldVal);
      } else {
        newVal = diff.apply(oldVal);
      }
      adapter.set(this.path, newVal);
    }
    else /* if (this.type === SET) */ {
      // clone here as the operations value must not be changed
      adapter.set(this.path, Substance.clone(this.val));
    }
    return obj;
  };

  this.clone = function() {
    return new ObjectOperation(this);
  };

  this.isNOP = function() {
    if (this.type === NOP) return true;
    else if (this.type === UPDATE) return this.diff.isNOP();
  };

  this.isCreate = function() {
    return this.type === CREATE;
  };

  this.isDelete = function() {
    return this.type === DELETE;
  };

  this.isUpdate = function() {
    return this.type === UPDATE;
  };

  this.isSet = function() {
    return this.type === SET;
  };

  this.invert = function() {
    if (this.type === NOP) {
      return new ObjectOperation({ type: NOP });
    }
    var result = new ObjectOperation(this);
    if (this.type === CREATE) {
      result.type = DELETE;
    }
    else if (this.type === DELETE) {
      result.type = CREATE;
    }
    else if (this.type === UPDATE) {
      var invertedDiff;
      if (this.diff instanceof TextOperation) {
        invertedDiff = TextOperation.fromJSON(this.diff.toJSON()).invert();
      } else {
        invertedDiff = ArrayOperation.fromJSON(this.diff.toJSON()).invert();
      }
      result.diff = invertedDiff;
    }
    else /* if (this.type === SET) */ {
      result.val = this.original;
      result.original = this.val;
    }
    return result;
  };

  this.hasConflict = function(other) {
    return ObjectOperation.hasConflict(this, other);
  };

  this.toJSON = function() {
    if (this.type === NOP) {
      return { type: NOP };
    }
    var data = {
      type: this.type,
      path: this.path,
    };
    if (this.type === CREATE || this.type === DELETE) {
      data.val = this.val;
    }
    else if (this.type === UPDATE) {
      if (this.diff instanceof ArrayOperation) {
        data.propertyType = "array";
      } else /* if (this.diff instanceof TextOperation) */ {
        data.propertyType = "string";
      }
      data.diff = this.diff.toJSON();
    }
    else /* if (this.type === SET) */ {
      data.val = this.val;
      data.original = this.original;
    }
    return data;
  };

  this.getType = function() {
    return this.type;
  };

  this.getPath = function() {
    return this.path;
  };

  this.getValue = function() {
    return this.val;
  };

  this.toString = function() {
    switch (this.type) {
      case CREATE:
        return ["(+,", JSON.stringify(this.path), JSON.stringify(this.val), ")"].join('');
      case DELETE:
        return ["(-,", JSON.stringify(this.path), JSON.stringify(this.val), ")"].join('');
      case UPDATE:
        return ["(>>,", JSON.stringify(this.path), this.propertyType, this.diff.toString(), ")"].join('');
      case SET:
        return ["(=,", JSON.stringify(this.path), this.val, this.original, ")"].join('');
    }
  };
};

Substance.inherit(ObjectOperation, Operation);

/* Low level implementation */

var hasConflict = function(a, b) {
  if (a.type === NOP || b.type === NOP) return false;
  return Substance.isEqual(a.path, b.path);
};

var transform_delete_delete = function(a, b) {
  // both operations have the same effect.
  // the transformed operations are turned into NOPs
  a.type = NOP;
  b.type = NOP;
};

var transform_create_create = function() {
  throw new Error("Can not transform two concurring creates of the same property");
};

var transform_delete_create = function() {
  throw new Error('Illegal state: can not create and delete a value at the same time.');
};

var transform_delete_update = function(a, b, flipped) {
  if (a.type !== DELETE) {
    return transform_delete_update(b, a, true);
  }
  var op;
  if (b.propertyType === 'string') {
    op = TextOperation.fromJSON(b.diff);
  } else /* if (b.propertyType === 'array') */ {
    op = ArrayOperation.fromJSON(b.diff);
  }
  // (DELETE, UPDATE) is transformed into (DELETE, CREATE)
  if (!flipped) {
    a.type = NOP;
    b.type = CREATE;
    b.val = op.apply(a.val);
  }
  // (UPDATE, DELETE): the delete is updated to delete the updated value
  else {
    a.val = op.apply(a.val);
    b.type = NOP;
  }
};

var transform_create_update = function() {
  // it is not possible to reasonably transform this.
  throw new Error("Can not transform a concurring create and update of the same property");
};

var transform_update_update = function(a, b) {
  // Note: this is a conflict the user should know about
  var op_a, op_b, t;
  if (b.propertyType === 'string') {
    op_a = TextOperation.fromJSON(a.diff);
    op_b = TextOperation.fromJSON(b.diff);
    t = TextOperation.transform(op_a, op_b, {inplace: true});
  } else /* if (b.propertyType === 'array') */ {
    op_a = ArrayOperation.fromJSON(a.diff);
    op_b = ArrayOperation.fromJSON(b.diff);
    t = ArrayOperation.transform(op_a, op_b, {inplace: true});
  }
  a.diff = t[0];
  b.diff = t[1];
};

var transform_create_set = function() {
  throw new Error('Illegal state: can not create and set a value at the same time.');
};

var transform_delete_set = function(a, b, flipped) {
  if (a.type !== DELETE) return transform_delete_set(b, a, true);
  if (!flipped) {
    a.type = NOP;
    b.type = CREATE;
    b.original = undefined;
  } else {
    a.val = b.val;
    b.type = NOP;
  }
};

var transform_update_set = function() {
  throw new Error("Unresolvable conflict: update + set.");
};

var transform_set_set = function(a, b) {
  a.type = NOP;
  b.original = a.val;
};

var _NOP = 0;
var _CREATE = 1;
var _DELETE = 2;
var _UPDATE = 4;
var _SET = 8;

var CODE = {};
CODE[NOP] =_NOP;
CODE[CREATE] = _CREATE;
CODE[DELETE] = _DELETE;
CODE[UPDATE] = _UPDATE;
CODE[SET] = _SET;

var __transform__ = [];
__transform__[_DELETE | _DELETE] = transform_delete_delete;
__transform__[_DELETE | _CREATE] = transform_delete_create;
__transform__[_DELETE | _UPDATE] = transform_delete_update;
__transform__[_CREATE | _CREATE] = transform_create_create;
__transform__[_CREATE | _UPDATE] = transform_create_update;
__transform__[_UPDATE | _UPDATE] = transform_update_update;
__transform__[_CREATE | _SET   ] = transform_create_set;
__transform__[_DELETE | _SET   ] = transform_delete_set;
__transform__[_UPDATE | _SET   ] = transform_update_set;
__transform__[_SET    | _SET   ] = transform_set_set;

var transform = function(a, b, options) {
  options = options || {};
  if (options['no-conflict'] && hasConflict(a, b)) {
    throw new Conflict(a, b);
  }
  if (!options.inplace) {
    a = Substance.clone(a);
    b = Substance.clone(b);
  }
  if (a.isNOP() || b.isNOP()) {
    return [a, b];
  }
  var sameProp = Substance.isEqual(a.path, b.path);
  // without conflict: a' = a, b' = b
  if (sameProp) {
    __transform__[CODE[a.type] | CODE[b.type]](a,b);
  }
  return [a, b];
};

ObjectOperation.transform = transform;
ObjectOperation.hasConflict = hasConflict;

/* Factories */

ObjectOperation.Create = function(idOrPath, val) {
  var path;
  if (Substance.isString(idOrPath)) {
    path = [idOrPath];
  } else {
    path = idOrPath;
  }
  return new ObjectOperation({type: CREATE, path: path, val: val});
};

ObjectOperation.Delete = function(idOrPath, val) {
  var path;
  if (Substance.isString(idOrPath)) {
    path = [idOrPath];
  } else {
    path = idOrPath;
  }
  return new ObjectOperation({type: DELETE, path: path, val: val});
};

ObjectOperation.Update = function(path, op) {
  var propertyType;
  if (op instanceof TextOperation) {
    propertyType = "string";
  }
  else if (op instanceof ArrayOperation) {
    propertyType = "array";
  }
  else {
    throw new Error('Unsupported type for operational changes');
  }
  return new ObjectOperation({
    type: UPDATE,
    path: path,
    diff: op
  });
};

ObjectOperation.Set = function(path, oldVal, newVal) {
  return new ObjectOperation({
    type: SET,
    path: path,
    val: Substance.clone(newVal),
    original: Substance.clone(oldVal)
  });
};

ObjectOperation.NOP = NOP;
ObjectOperation.CREATE = CREATE;
ObjectOperation.DELETE = DELETE;
ObjectOperation.UPDATE = UPDATE;
ObjectOperation.SET = SET;

module.exports = ObjectOperation;

},{"../basics":115,"./array_operation":149,"./conflict":150,"./operation":153,"./text_operation":154}],153:[function(require,module,exports){
'use strict';

var Substance = require('../basics');

function Operation() {
}

Operation.Prototype = function() {

  this.isOperation = true;

};

Substance.initClass(Operation);

module.exports = Operation;
},{"../basics":115}],154:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var Operation = require('./operation');
var Conflict = require('./conflict');

var INS = "+";
var DEL = "-";

var hasConflict;

function TextOperation(data) {
  Operation.call(this);

  if (!data || data.type === undefined || data.pos === undefined || data.str === undefined) {
    throw new Error("Illegal argument: insufficient data.");
  }
  // '+' or '-'
  this.type = data.type;
  // the position where to apply the operation
  this.pos = data.pos;
  // the string to delete or insert
  this.str = data.str;
  // sanity checks
  if(!this.isInsert() && !this.isDelete()) {
    throw new Error("Illegal type.");
  }
  if (!Substance.isString(this.str)) {
    throw new Error("Illegal argument: expecting string.");
  }
  if (!Substance.isNumber(this.pos) || this.pos < 0) {
    throw new Error("Illegal argument: expecting positive number as pos.");
  }
}

TextOperation.fromJSON = function(data) {
  return new TextOperation(data);
};

TextOperation.Prototype = function() {

  this.apply = function(str) {
    if (this.isEmpty()) return str;
    if (this.type === INS) {
      if (str.length < this.pos) {
        throw new Error("Provided string is too short.");
      }
      if (str.splice) {
        return str.splice(this.pos, 0, this.str);
      } else {
        return str.slice(0, this.pos).concat(this.str).concat(str.slice(this.pos));
      }
    }
    else /* if (this.type === DEL) */ {
      if (str.length < this.pos + this.str.length) {
        throw new Error("Provided string is too short.");
      }
      if (str.splice) {
        return str.splice(this.pos, this.str.length);
      } else {
        return str.slice(0, this.pos).concat(str.slice(this.pos + this.str.length));
      }
    }
  };

  this.clone = function() {
    return new TextOperation(this);
  };

  this.isNOP = function() {
    return this.type === "NOP" || this.str.length === 0;
  };

  this.isInsert = function() {
    return this.type === INS;
  };

  this.isDelete = function() {
    return this.type === DEL;
  };

  this.getLength = function() {
    return this.str.length;
  };

  this.invert = function() {
    var data = {
      type: this.isInsert() ? '-' : '+',
      pos: this.pos,
      str: this.str
    };
    return new TextOperation(data);
  };

  this.hasConflict = function(other) {
    return hasConflict(this, other);
  };

  this.isEmpty = function() {
    return this.str.length === 0;
  };

  this.toJSON = function() {
    return {
      type: this.type,
      pos: this.pos,
      str: this.str
    };
  };

  this.toString = function() {
    return ["(", (this.isInsert() ? '+' : '-'), ",", this.pos, ",'", this.str, "')"].join('');
  };
};

Substance.inherit(TextOperation, Operation);

hasConflict = function(a, b) {
  // Insert vs Insert:
  //
  // Insertions are conflicting iff their insert position is the same.
  if (a.type === INS && b.type === INS)  return (a.pos === b.pos);
  // Delete vs Delete:
  //
  // Deletions are conflicting if their ranges overlap.
  if (a.type === DEL && b.type === DEL) {
    // to have no conflict, either `a` should be after `b` or `b` after `a`, otherwise.
    return !(a.pos >= b.pos + b.str.length || b.pos >= a.pos + a.str.length);
  }
  // Delete vs Insert:
  //
  // A deletion and an insertion are conflicting if the insert position is within the deleted range.
  var del, ins;
  if (a.type === DEL) {
    del = a; ins = b;
  } else {
    del = b; ins = a;
  }
  return (ins.pos >= del.pos && ins.pos < del.pos + del.str.length);
};

// Transforms two Insertions
// --------

function transform_insert_insert(a, b) {
  if (a.pos === b.pos) {
    b.pos += a.str.length;
  }
  else if (a.pos < b.pos) {
    b.pos += a.str.length;
  }
  else {
    a.pos += b.str.length;
  }
}

// Transform two Deletions
// --------
//

function transform_delete_delete(a, b, first) {
  // reduce to a normalized case
  if (a.pos > b.pos) {
    return transform_delete_delete(b, a, !first);
  }
  if (a.pos === b.pos && a.str.length > b.str.length) {
    return transform_delete_delete(b, a, !first);
  }
  // take out overlapping parts
  if (b.pos < a.pos + a.str.length) {
    var s = b.pos - a.pos;
    var s1 = a.str.length - s;
    var s2 = s + b.str.length;
    a.str = a.str.slice(0, s) + a.str.slice(s2);
    b.str = b.str.slice(s1);
    b.pos -= s;
  } else {
    b.pos -= a.str.length;
  }
}

// Transform Insert and Deletion
// --------
//

function transform_insert_delete(a, b) {
  if (a.type === DEL) {
    return transform_insert_delete(b, a);
  }
  // we can assume, that a is an insertion and b is a deletion
  // a is before b
  if (a.pos <= b.pos) {
    b.pos += a.str.length;
  }
  // a is after b
  else if (a.pos >= b.pos + b.str.length) {
    a.pos -= b.str.length;
  }
  // Note: this is a conflict case the user should be noticed about
  // If applied still, the deletion takes precedence
  // a.pos > b.pos && <= b.pos + b.length
  else {
    var s = a.pos - b.pos;
    b.str = b.str.slice(0, s) + a.str + b.str.slice(s);
    a.str = "";
  }
}

var transform = function(a, b, options) {
  options = options || {};
  if (options["no-conflict"] && hasConflict(a, b)) {
    throw new Conflict(a, b);
  }
  if (!options.inplace) {
    a = Substance.clone(a);
    b = Substance.clone(b);
  }
  if (a.type === INS && b.type === INS)  {
    transform_insert_insert(a, b);
  }
  else if (a.type === DEL && b.type === DEL) {
    transform_delete_delete(a, b, true);
  }
  else {
    transform_insert_delete(a,b);
  }
  return [a, b];
};

TextOperation.transform = function() {
  return transform.apply(null, arguments);
};

/* Factories */

TextOperation.Insert = function(pos, str) {
  return new TextOperation({ type: INS, pos: pos, str: str });
};

TextOperation.Delete = function(pos, str) {
  return new TextOperation({ type: DEL, pos: pos, str: str });
};

TextOperation.INSERT = INS;
TextOperation.DELETE = DEL;

module.exports = TextOperation;

},{"../basics":115,"./conflict":150,"./operation":153}],155:[function(require,module,exports){
var Substance = require("../basics");
var Tool = require('./tool');

function AnnotationTool() {
  Tool.call(this);
}

AnnotationTool.Prototype = function() {
  // blacklist of modes; one of 'create', 'remove', 'truncate', 'expand', 'fusion'
  this.disabledModes = [];

  this.splitContainerSelections = false;

  // Provides the type of the associated annotation node.
  // The default implementation uses the Tool's static name.
  // Override this method to customize.
  this.getAnnotationType = function() {
    if (this.constructor.static.name) {
      return this.constructor.static.name;
    } else {
      throw new Error('Contract: AnnotationTool.static.name should be associated to a document annotation type.');
    }
  };

  this.afterCreate = function() {};

  this.afterFusion = function() {};

  this.afterRemove = function() {};

  this.afterTruncate = function() {};

  this.afterExpand = function() {};

  // When there's no existing annotation overlapping, we create a new one.
  this.canCreate = function(annos, sel) {
    return (annos.length === 0 && !sel.isCollapsed());
  };

  // When more than one annotation overlaps with the current selection
  this.canFusion = function(annos) {
    return (annos.length >= 2);
  };

  // When the cursor or selection is inside an existing annotation
  this.canRemove = function(annos, sel) {
    if (annos.length !== 1) return false;
    var annoSel = annos[0].getSelection();
    return sel.isInsideOf(annoSel);
  };

  // When there's some overlap with only a single annotation we do an expand
  this.canExpand = function(annos, sel) {
    if (annos.length !== 1) return false;
    var annoSel = annos[0].getSelection();
    return sel.overlaps(annoSel) && !sel.isInsideOf(annoSel);
  };

  this.canTruncate = function(annos, sel) {
    if (annos.length !== 1) return false;
    var annoSel = annos[0].getSelection();
    return (sel.isLeftAlignedWith(annoSel) || sel.isRightAlignedWith(annoSel)) && !sel.equals(annoSel);
  };

  this.update = function(surface, sel) {
    this.surface = surface;
    if ( (this.needsEnabledSurface && !surface.isEnabled()) ||
          sel.isNull() ) {
      return this.setDisabled();
    }
    var doc = this.getDocument();
    var annotationType = this.getAnnotationType();
    var isContainerAnno = this.isContainerAnno();
    // Extract range and matching annos of current selection
    var annos;
    if (isContainerAnno) {
      annos = doc.getContainerAnnotationsForSelection(sel, this.getContainer(), {
        type: annotationType
      });
    } else {
      // Don't react on container selections if the associated annotation type
      // is a property annotation.
      // In future we could introduce a multi-annotation (multiple property selections)
      // and create multiple annotations at once.
      if (sel.isContainerSelection() && !this.splitContainerSelections) {
        return this.setDisabled();
      }
      annos = doc.getAnnotationsForSelection(sel, { type: annotationType });
    }

    var newState = {
      surface: surface,
      enabled: true,
      selected: false,
      mode: null,
      sel: sel,
      annos: annos
    };

    if (this.canCreate(annos, sel)) {
      newState.mode = "create";
    } else if (this.canFusion(annos, sel)) {
      newState.mode = "fusion";
    } else if (this.canTruncate(annos, sel)) {
      newState.selected = true;
      newState.mode = "truncate";
    } else if (this.canRemove(annos, sel)) {
      newState.selected = true;
      newState.mode = "remove";
    } else if (this.canExpand(annos, sel)) {
      newState.mode = "expand";
    }
    // Verifies if the detected mode has been disabled by the concrete implementation
    if (!newState.mode || Substance.includes(this.disabledModes, newState.mode)) {
      return this.setDisabled();
    } else {
      this.setToolState(newState);
    }
  };

  this.performAction = function() {
    var state = this.getToolState();
    // TODO: is this really necessary? better just check if the toolstate does not have a proper mode
    if (!state.sel || !state.mode || state.sel.isNull()) return;
    switch (state.mode) {
      case "create":
        return this.handleCreate(state);
      case "fusion":
        return this.handleFusion(state);
      case "remove":
        return this.handleRemove(state);
      case "truncate":
        return this.handleTruncate(state);
      case "expand":
        return this.handleExpand(state);
    }
  };

  this.handleCreate = function(state) {
    var sel = state.sel;
    if (sel.isNull()) return;
    var doc = this.getDocument();
    var tx = doc.startTransaction({ selection: sel });
    try {
      var anno = this.createAnnotationForSelection(tx, sel);
      tx.save({ selection: sel });
      this.afterCreate(anno);
    } finally {
      tx.cleanup();
    }
  };

  this.getAnnotationData = function() {
    return {};
  };

  this.isContainerAnno = function() {
    var doc = this.getDocument();
    var schema = doc.getSchema();
    return schema.isInstanceOf(this.getAnnotationType(), "container_annotation");
  };

  this._createPropertyAnnotations = function(tx, sel) {
    var sels;
    var annotationType = this.getAnnotationType();
    if (sel.isPropertySelection()) {
      sels = [];
    } else if (sel.isContainerSelection()) {
      sels = sel.splitIntoPropertySelections();
    }
    for (var i = 0; i < sels.length; i++) {
      var anno = {
        id: Substance.uuid(annotationType),
        type: annotationType
      };
      Substance.extend(anno, this.getAnnotationData());
      anno.path = sels[i].getPath();
      anno.startOffset = sels[i].getStartOffset();
      anno.endOffset = sels[i].getEndOffset();
      tx.create(anno);
    }
  };

  this.createAnnotationForSelection = function(tx, sel) {
    if (this.splitContainerSelections && sel.isContainerSelection()) {
      return this._createPropertyAnnotations(tx, sel);
    }
    var annotationType = this.getAnnotationType();
    var anno = {
      id: Substance.uuid(annotationType),
      type: annotationType,
    };
    Substance.extend(anno, this.getAnnotationData());
    if (this.isContainerAnno()) {
      anno.startPath = sel.start.path;
      anno.endPath = sel.end.path;
      // HACK: where to get the container id from when sel is a property selection
      anno.container = "content";
    } else if (sel.isPropertySelection()) {
      anno.path = sel.getPath();
    } else {
      throw new Error('Illegal state: can not apply ContainerSelection');
    }
    anno.startOffset = sel.getStartOffset();
    anno.endOffset = sel.getEndOffset();
    // start the transaction with an initial selection
    return tx.create(anno);
  };

  this.handleFusion = function(state) {
    var doc = this.getDocument();
    var sel = state.sel;
    var tx = doc.startTransaction({ selection: sel });
    try {
      Substance.each(state.annos, function(anno) {
        sel = sel.expand(anno.getSelection());
      });
      Substance.each(state.annos, function(anno) {
        tx.delete(anno.id);
      });

      this.createAnnotationForSelection(tx, sel);
      tx.save({ selection: sel });
      this.afterFusion();
    } finally {
      tx.cleanup();
    }
  };

  this.handleRemove = function(state) {
    var doc = this.getDocument();
    var sel = state.sel;
    var tx = doc.startTransaction({ selection: sel });
    try {
      var annoId = state.annos[0].id;
      tx.delete(annoId);
      tx.save({ selection: sel });
      this.afterRemove();
    } finally {
      tx.cleanup();
    }
  };

  this.handleTruncate = function(state) {
    var doc = this.getDocument();
    var sel = state.sel;
    var tx = doc.startTransaction({ selection: sel });
    try {
      var anno = state.annos[0];
      var annoSel = anno.getSelection(); // state.annoSels[0];
      var newAnnoSel = annoSel.truncate(sel);
      anno.updateRange(tx, newAnnoSel);
      tx.save({ selection: sel });
      this.afterTruncate();
    } finally {
      tx.cleanup();
    }
  };

  this.handleExpand = function(state) {
    var doc = this.getDocument();
    var sel = state.sel;
    var tx = doc.startTransaction({ selection: sel });
    try {
      var anno = state.annos[0];
      var annoSel = anno.getSelection(); // state.annoSels[0];
      var newAnnoSel = annoSel.expand(sel);
      anno.updateRange(tx, newAnnoSel);
      tx.save({ selection: sel });
      this.afterExpand();
    } finally {
      tx.cleanup();
    }
  };
};

Substance.inherit(AnnotationTool, Tool);

module.exports = AnnotationTool;

},{"../basics":115,"./tool":167}],156:[function(require,module,exports){
'use strict';

var NodeView = require('./node_view');

var AnnotationView = NodeView.extend({
  name: "annotation",

  tagName: 'span',

  getClassNames: function() {
    var classNames = this.node.getClassNames().replace('_', '-');
    if (this.props.classNames) {
      classNames += " " + this.props.classNames.join(' ');
    }
    return classNames;
  }
});

module.exports = AnnotationView;

},{"./node_view":162}],157:[function(require,module,exports){
"use strict";

var Substance = require('../basics');

// context must have a getSurface() method.
var Clipboard = function(htmlImporter, htmlExporter) {

  this.htmlImporter = htmlImporter;
  this.htmlExporter = htmlExporter;

  this._contentDoc = null;
  this._contentText = "";

  this._onKeyDown = Substance.bind(this.onKeyDown, this);
  this._onCopy = Substance.bind(this.onCopy, this);
  this._onCut = Substance.bind(this.onCut, this);

  this.isIe = (window.navigator.userAgent.toLowerCase().indexOf("msie") != -1 || window.navigator.userAgent.toLowerCase().indexOf("trident") != -1);
  this.isFF = window.navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

  if (this.isIe) {
    this._beforePasteShim = Substance.bind(this.beforePasteShim, this);
    this._pasteShim = Substance.bind(this.pasteShim, this);
  } else {
    this._onPaste = Substance.bind(this.onPaste, this);
  }

};

Clipboard.Prototype = function() {

  this.attach = function(rootElement) {
    this.el = window.document.createElement('div');
    this.$el = $(this.el);
    this.$el.prop("contentEditable", "true").addClass('clipboard');
    rootElement.appendChild(this.el);

    rootElement.addEventListener('keydown', this._onKeyDown, false);
    rootElement.addEventListener('copy', this._onCopy, false);
    rootElement.addEventListener('cut', this._onCut, false);

    if (this.isIe) {
      rootElement.addEventListener('beforepaste', this._beforePasteShim, false);
      rootElement.addEventListener('paste', this._pasteShim, false);
    } else {
      rootElement.addEventListener('paste', this._onPaste, false);
    }
  };

  this.detach = function(rootElement) {
    this.$el.remove();

    rootElement.removeEventListener('keydown', this._onKeyDown, false);
    rootElement.removeEventListener('copy', this._onCopy, false);
    rootElement.removeEventListener('cut', this._onCut, false);
    if (this.isIe) {
      rootElement.removeEventListener('beforepaste', this._beforePasteShim, false);
      rootElement.removeEventListener('paste', this._pasteShim, false);
    } else {
      rootElement.removeEventListener('paste', this._onPaste, false);
    }
  };

  this.setSurface = function(surface) {
    this.surface = surface;
  };

  this.getSurface = function() {
    return this.surface;
  };

  this.onCopy = function(event) {
    console.log("Clipboard.onCopy", arguments);
    this._copySelection();
    if (event.clipboardData && this._contentDoc) {
      var html = this.htmlExporter.toHtml(this._contentDoc, 'content');
      console.log('Stored HTML in clipboard', html);
      this._contentDoc.__id__ = Substance.uuid();
      var data = this._contentDoc.toJSON();
      data.__id__ = this._contentDoc.__id__;
      event.clipboardData.setData('application/substance', JSON.stringify(data));
      event.clipboardData.setData('text/plain', $(html).text());
      event.clipboardData.setData('text/html', html);
      event.preventDefault();
    }
  };

  // nothing special for cut.
  this.onCut = function(e) {
    console.log("Clipboard.onCut", arguments);
    this.onCopy(e);
    var surface = this.getSurface();
    var editor = surface.getEditor();
    editor.delete(editor.selection, 'left');
    e.preventDefault();
  };

  this.pasteSubstanceData = function(data) {
    var surface = this.getSurface();
    var editor = surface.getEditor();
    var logger = surface.getLogger();
    var doc = editor.getDocument();
    try {
      var content = doc.fromSnapshot(JSON.parse(data));
      var plainText = "";
      var pasteContent = content.get('content');
      if (pasteContent.nodes.length > 0) {
        var first = pasteContent.getFirstComponent();
        var last = pasteContent.getLastComponent();
        var lastLength = content.get(last.path).length;
        var sel = Substance.Document.Selection.create(pasteContent, first.path, 0, last.path, lastLength);
        plainText = content.getTextForSelection(sel);
      }
      editor.paste(editor.selection, {
        content: content,
        text: plainText
      });
    } catch (error) {
      console.error(error);
      logger.error(error);
    }
  };

  this.pasteHtml = function(html) {
    var surface = this.getSurface();
    var editor = surface.getEditor();
    var logger = surface.getLogger();
    var doc = editor.getDocument();
    try {
      var content = doc.newInstance();
      if (!content.get('content')) {
        content.create({
          id: 'content',
          type: 'container',
          nodes: []
        });
      }
      var htmlDoc = new window.DOMParser().parseFromString(html, "text/html");
      this.htmlImporter.convertDocument(htmlDoc, content, 'content');
      editor.paste(editor.selection, {
        content: content,
        text: htmlDoc.body.textContent
      });
    } catch (error) {
      console.error(error);
      logger.error(error);
    }
  };

  // Works on Safari/Chrome/FF
  this.onPaste = function(e) {
    var clipboardData = e.clipboardData;
    var surface = this.getSurface();
    var editor = surface.getEditor();
    var logger = surface.getLogger();
    var types = {};
    for (var i = 0; i < clipboardData.types.length; i++) {
      types[clipboardData.types[i]] = true;
    }

    // HACK: FF does not provide HTML coming in from other applications
    // so fall back to the paste shim
    if (this.isFF && !types['application/substance'] && !types['text/html']) {
      var sel = editor.selection;
      this.beforePasteShim();
      // restore selection which might got lost via Surface.onblur().
      editor.selection = sel;
      this.pasteShim();
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    console.log('Available types', types);
    if (types['application/substance']) {
      this.pasteSubstanceData(clipboardData.getData('application/substance'));
    } else if (types['text/html']) {
      this.pasteHtml(clipboardData.getData('text/html'));
    } else {
      try {
        var plainText = clipboardData.getData('text/plain');
        editor.insertText(plainText, editor.selection);
      } catch (error) {
        console.error(error);
        logger.error(error);
      }
    }
  };

  this.beforePasteShim = function() {
    console.log("Paste before...");
    this.$el.focus();
    var range = document.createRange();
    range.selectNodeContents(this.el);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  };

  this.pasteShim = function() {
    // var clipboardData = window.clipboardData;
    // var clipboardText = clipboardData.getData('Text');
    this.$el.empty();
    var self = this;
    var surface = this.getSurface();
    var editor = surface.getEditor();
    var sel = editor.selection;
    setTimeout(function() {
      editor.selection = sel;
      self.pasteHtml(self.$el.html());
      self.$el.empty();
    }, 0);
  };

  this.onKeyDown = function(e) {
    if (e.keyCode === 88 && (e.metaKey||e.ctrlKey)) {
      // console.log('Handle cut');
      // this.handleCut();
      // e.preventDefault();
      // e.stopPropagation();
    }
    else if (e.keyCode === 86 && (e.metaKey||e.ctrlKey)) {
      // console.log('Handle paste');
      this.handlePaste();
      // e.preventDefault();
      // e.stopPropagation();
    }
    else if (e.keyCode === 67 && (e.metaKey||e.ctrlKey)) {
      // console.log('Handle copy');
      // this.handleCopy(e);
      // e.preventDefault();
      // e.stopPropagation();
    }
  };

  this.handleCut = function() {
    console.log("Cutting into Clipboard...");
    var wSel = window.getSelection();
    // TODO: deal with multiple ranges
    // first extract the selected content into the hidden element
    var wRange = wSel.getRangeAt(0);
    var frag = wRange.cloneContents();
    this.el.innerHTML = "";
    this.el.appendChild(frag);
    this._copySelection();
    var surface = this.getSurface();
    try {
      console.log("...selection before deletion", surface.getSelection().toString());
      surface.getEditor().delete();
    } catch (error) {
      console.error(error);
      this.logger.error(error);
      return;
    }
    // select the copied content
    var wRangeNew = window.document.createRange();
    wRangeNew.selectNodeContents(this.el);
    wSel.removeAllRanges();
    wSel.addRange(wRangeNew);

    // hacky way to reset the selection which gets lost otherwise
    window.setTimeout(function() {
      // console.log("...restoring the selection");
      surface.rerenderDomSelection();
    }, 10);
  };

  this.handlePaste = function() {
  };

  this.handleCopy = function() {
    // Nothing here
  };

  this._copySelection = function() {
    var wSel = window.getSelection();
    this._contentText = "";
    this._contentDoc = null;
    var surface = this.getSurface();
    var sel = surface.getSelection();
    var editor = surface.getEditor();
    if (wSel.rangeCount > 0 && !sel.isCollapsed()) {
      var wRange = wSel.getRangeAt(0);
      this._contentText = wRange.toString();
      this._contentDoc = editor.copy(sel);
      console.log("Clipboard._copySelection(): created a copy", this._contentDoc);
    } else {
      this._contentDoc = null;
      this._contentText = "";
    }
  };

};

Substance.initClass(Clipboard);

module.exports = Clipboard;

},{"../basics":115}],158:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var Document = require('../document');
var FormEditor = require('./form_editor');
var Annotations = Document.AnnotationUpdates;
var Selection = Document.Selection;

function ContainerEditor(container) {
  FormEditor.call(this, container.getDocument());
  this.container = container;

  this.mergeBehavior = {};
  this.breakBehavior = {};
  this.deleteBehavior = {};
  this.defineBehavior();
}

ContainerEditor.Prototype = function() {

  // TODO: we should make paragraph the default type
  // as this seems to be a more natural choice
  this.defaultTextType = 'paragraph';

  // Define custom editing behavior
  //
  // Register custom handlers for merge and break.
  // Example:
  //
  //  To support text nodes being merged into a figure node:
  //    this.mergeBehavior.figure = { 'text': function() {...} }
  //
  //  To support breaking a figure's caption:
  //    this.breakBehavior.figure = function(doc, node, path, offset) {...}
  //
  this.defineBehavior = function() {};

  this.isContainerEditor = function() {
    return true;
  };

  this.getContainer = function() {
    return this.container;
  };

  this.getContainerName = function() {
    return this.container.id;
  };

  this.break = function(selection, info) {
    // console.log("Breaking at %s", selection.toString());
    info = info || {};
    var tx = this.document.startTransaction({ selection: selection });
    tx.selection = selection;
    try {
      if (!this.selection.isCollapsed()) {
        this._delete(tx);
      }
      this._break(tx);
      tx.save({ selection: tx.selection }, info);
      this.selection = tx.selection;
    } finally {
      tx.cleanup();
    }
  };

  this.insertNode = function(node) {
    var selection = this.selection;
    var tx = this.document.startTransaction({ selection: selection });
    tx.selection = selection;
    try {
      if (!this.selection.isCollapsed()) {
        this._delete(tx);
      }
      this._break(tx);
      var container = tx.get(this.container.id);
      if (!tx.get(node.id)) {
        node = tx.create(node);
      }
      var comp = container.getComponent(tx.selection.start.path);
      var pos = container.getPosition(comp.rootId);
      container.show(node.id, pos);
      tx.save({ selection: tx.selection });
    } finally {
      tx.cleanup();
    }
  };

  this.selectAll = function() {
    var container = this.container;
    var first = container.getFirstComponent();
    var last = container.getLastComponent();
    var lastText = this.document.get(last.path);
    this.selection = Selection.create(this.container, first.path, 0, last.path, lastText.length);
  };

  // create a document instance containing only the selected content
  this.copy = function(selection) {
    if (selection.isNull()) {
      return null;
    }
    // return a simplified version if only a piece of text is selected
    if (selection.isPropertySelection() || Substance.isEqual(selection.start.path, selection.end.path)) {
      return this._copyPropertySelection(selection);
    }
    else if (selection.isContainerSelection()) {
      return this._copyContainerSelection(selection);
    }
  };

  this.paste = function(selection, data) {
    if (selection.isNull()) {
      console.error("Can not paste, without selection.");
      return;
    }
    // plain text paste is simple
    if (!data.content) {
      return this.insertText(data.text, selection);
    }
    var pasteDoc = data.content;
    var tx = this.document.startTransaction({ selection: selection });
    tx.selection = selection;
    try {
      if (!selection.isCollapsed()) {
        this._delete(tx);
      }
      var nodes = pasteDoc.get('content').nodes;
      if (nodes.length > 0) {
        var first = pasteDoc.get(nodes[0]);
        if (nodes.length === 1 && first.type === "text") {
          this._pasteAnnotatedText(tx, pasteDoc);
        } else {
          this._pasteDocument(tx, pasteDoc);
        }
      }
      tx.save({selection: tx.selection});
      this.selection = tx.selection;
    } finally {
      tx.cleanup();
    }
  };

  this.switchType = function(selection, newType, data) {
    if (!selection.isPropertySelection()) {
      return;
    }
    // only text nodes can be changed at the moment
    var path = selection.start.path;
    var offset = selection.start.offset;
    var comp = this.container.getComponent(path);
    var node = this.document.get(comp.rootId);
    if (!(node.isInstanceOf('text')) || node.type === newType) {
      return;
    }
    var pos = this.container.getPosition(node.id);
    var tx = this.document.startTransaction({ selection: selection });
    tx.selection = selection;
    var container = tx.get(this.container.id);
    try {
      // create a new node
      var newNode = {
        id: Substance.uuid(newType),
        type: newType,
        content: node.content
      };
      Substance.extend(newNode, data);
      var newPath = [newNode.id, 'content'];
      tx.create(newNode);
      Annotations.transferAnnotations(tx, path, 0, newPath, 0);
      this._deleteNodeWithId(tx, node.id);
      container.show(newNode.id, pos);
      tx.selection = Selection.create(newPath, offset);
      tx.save({ selection: tx.selection });
      this.selection = tx.selection;
    } finally {
      tx.cleanup();
    }
  };

  this._copyPropertySelection = function(selection) {
    var copy = this.document.newInstance();
    var path = selection.start.path;
    var offset = selection.start.offset;
    var endOffset = selection.end.offset;
    var text = this.document.get(path);
    var containerNode = copy.create({
      type: 'container',
      id: 'content',
      nodes: []
    });
    copy.create({
      type: 'text',
      id: 'text',
      content: text.substring(offset, endOffset)
    });
    containerNode.show('text');
    var annotations = this.document.getIndex('annotations').get(path, offset, endOffset);
    Substance.each(annotations, function(anno) {
      var data = Substance.deepclone(anno.toJSON());
      data.path = ['text', 'content'];
      data.startOffset = Math.max(offset, anno.startOffset)-offset;
      data.endOffset = Math.min(endOffset, anno.endOffset)-offset;
      copy.create(data);
    });
    return copy;
  };

  this._copyContainerSelection = function(selection) {
    var doc = this.document;
    var copy = this.document.newInstance();
    var annotationIndex = doc.getIndex('annotations');

    var container = this.container;
    var startComp = container.getComponent(selection.start.path);
    var endComp = container.getComponent(selection.end.path);
    var containerNode = copy.create({
      type: 'container',
      id: 'content',
      nodes: []
    });

    // 1. Copy nodes and annotations.
    var i, comp;
    var created = {};
    for (i = startComp.getIndex(); i <= endComp.getIndex(); i++) {
      comp = container.getComponentAt(i);
      var nodeId = comp.parentNode.id;
      var node = doc.get(nodeId);
      if (!created[nodeId]) {
        created[nodeId] = copy.create(node.toJSON());
        containerNode.show(nodeId);
      }
      var annotations = annotationIndex.get(comp.path);
      for (var j = 0; j < annotations.length; j++) {
        copy.create(Substance.clone(annotations[j].toJSON()));
      }
    }
    // 2. Truncate properties according to the selection.
    // TODO: we need a more sophisticated concept when we introduce dynamic structures
    // such as lists or tables
    var startNodeComponent = startComp.parentNode;
    var text;
    for (i = 0; i < startNodeComponent.components.length; i++) {
      comp = startNodeComponent.components[i];
      if (comp === startComp) {
        if (selection.start.offset > 0) {
          text = doc.get(comp.path);
          copy.update(comp.path, {
            delete: { start: 0, end: selection.start.offset }
          });
          Annotations.deletedText(copy, comp.path, 0, selection.start.offset);
        }
        break;
      } else {
        copy.set(comp.path, "");
      }
    }
    var endNodeComponent = endComp.parentNode;
    for (i = 0; i < endNodeComponent.components.length; i++) {
      comp = endNodeComponent.components[i];
      if (comp === endComp) {
        text = doc.get(comp.path);
        if (selection.end.offset < text.length) {
          copy.update(comp.path, {
            delete: { start: selection.end.offset, end: text.length }
          });
          Annotations.deletedText(copy, comp.path, selection.end.offset, text.length);
        }
        break;
      } else {
        copy.set(comp.path, "");
      }
    }
    return copy;
  };

  this._pasteAnnotatedText = function(tx, copy) {
    // extract text from the copy
    var nodes = copy.get('content').nodes;
    var textPath = [nodes[0], 'content'];
    var text = copy.get(textPath);
    var annotations = copy.getIndex('annotations').get(textPath);
    // insert plain text
    var selection = tx.selection;
    var path = selection.start.path;
    var offset = selection.start.offset;
    tx.update(path, { insert: { offset: offset, value: text } } );
    Annotations.insertedText(tx, selection.start, text.length);
    tx.selection = Selection.create(selection.start.path, selection.start.offset+text.length);
    // copy annotations
    Substance.each(annotations, function(anno) {
      var data = anno.toJSON();
      data.path = path.slice(0);
      data.startOffset += offset;
      data.endOffset += offset;
      if (tx.get(data.id)) {
        data.id = Substance.uuid(data.type);
      }
      tx.create(data);
    });
  };

  this._pasteDocument = function(tx, doc) {
    var pasteDoc = doc;

    var container = tx.get(this.container.id);

    // Break, unless we are at the last character of a node,
    // then we can simply insert after the node
    var startComp = container.getComponent(tx.selection.start.path);
    var startNodeComp = startComp.parentNode;
    var insertPos;
    if ( startComp === Substance.last(startNodeComp.components) &&
      tx.get(startComp.path).length === tx.selection.start.offset )
    {
      insertPos = container.getPosition(tx.selection.start.path[0]) + 1;
    } else {
      this._break(tx);
      // _break() sets a new selection
      insertPos = container.getPosition(tx.selection.start.path[0]);
    }
    if (insertPos < 0) {
      console.error('Could not find insertion position in ContainerNode.');
    }
    // transfer nodes from content document
    // TODO: transfer annotations
    var nodeIds = pasteDoc.get("content").nodes;
    var annoIndex = pasteDoc.getIndex('annotations');
    var insertedNodes = [];
    for (var i = 0; i < nodeIds.length; i++) {
      var nodeId = nodeIds[i];
      var node = pasteDoc.get(nodeId).toJSON();
      // create a new id if the node exists already
      if (tx.get(nodeId)) {
        node.id = Substance.uuid(node.type);
      }
      tx.create(node);
      container.show(node.id, insertPos++);
      insertedNodes.push(node);

      // transfer annotations
      // what about nodes that are referenced by annotations?
      var annos = annoIndex.get(nodeId);
      for (var j = 0; j < annos.length; j++) {
        var data = annos[j].toJSON();
        if (node.id !== nodeId) {
          data.path[0] = node.id;
        }
        if (tx.get(data.id)) {
          data.id = Substance.uuid(data.type);
        }
        tx.create(data);
      }
    }

    if (insertedNodes.length === 0) return;

    // set a new selection
    var lastId = Substance.last(insertedNodes).id;
    var lastComp = Substance.last(container.getComponentsForNode(lastId));
    var lastLength = tx.get(lastComp.path).length;
    // This version turned out to be useful in some situations
    // as it hightlights the pasted content
    // we leave it here for debugging
    if (false) {
      var firstId = insertedNodes[0].id;
      var firstComp = container.getComponentsForNode(firstId)[0];
      tx.selection = Selection.create(container, firstComp.path, 0, lastComp.path, lastLength);
    } else {
      tx.selection = Selection.create(lastComp.path, lastLength);
    }
  };

  this._getBreakBehavior = function(node) {
    var behavior = null;
    if (this.breakBehavior[node.type]) {
      behavior = this.breakBehavior[node.type];
    } else if (node.isInstanceOf('text')) {
      behavior = this._breakTextNode;
    }
    if (!behavior) {
      console.info("No breaking behavior defined for %s", node.type);
    }
    return behavior;
  };

  this._break = function(tx) {
    var range = tx.selection.getRange();
    var container = tx.get(this.container.id);
    var component = container.getComponent(range.start.path);
    var node = tx.get(component.path[0]);
    var offset = range.start.offset;
    var breakBehavior = this._getBreakBehavior(node);
    if (breakBehavior) {
      breakBehavior.call(this, tx, node, component.path, offset);
    }
  };

  this._breakTextNode = function(tx, node, path, offset) {
    // split the text property and create a new paragraph node with trailing text and annotations transferred
    var text = node.content;
    var container = tx.get(this.container.id);
    var nodePos = container.getPosition(node.id);
    var id = Substance.uuid(node.type);
    var newPath = [id, 'content'];
    // when breaking at the first position, a new node of the same
    // type will be inserted.
    if (offset === 0) {
      tx.create({
        id: id,
        type: node.type,
        content: ""
      });
      // show the new node
      container.show(id, nodePos);
      tx.selection = Selection.create(path, 0);
    } else {
      // create a new node
      tx.create({
        id: id,
        type: this.defaultTextType,
        content: text.substring(offset)
      });
      if (offset < text.length) {
        // transfer annotations which are after offset to the new node
        Annotations.transferAnnotations(tx, path, offset, [id, 'content'], 0);
        // truncate the original property
        tx.update(path, {
          delete: { start: offset, end: text.length }
        });
      }
      // show the new node
      container.show(id, nodePos+1);
      // update the selection
      tx.selection = Selection.create(newPath, 0);
    }
  };

  this._getMergeBehavior = function(node, otherNode) {
    var merge = this.mergeBehavior;
    var behavior = null;
    if (merge[node.type] && merge[node.type][otherNode.type]) {
      behavior = merge[node.type][otherNode.type];
    }
    // special convenience to define behaviors when text nodes are involved
    // E.g., you might want to define how to merge a text node into a figure
    else if (node.isInstanceOf('text') && otherNode.isInstanceOf('text')) {
      behavior = this._mergeTextNodes;
    } else if (node.isInstanceOf('text') && merge['text']) {
      behavior = merge['text'][otherNode.type];
    } else if (otherNode.isInstanceOf('text') && merge[node.type]) {
      behavior = merge[node.type]['text'];
    }
    if (!behavior) {
      console.info("No merge behavior defined for %s <- %s", node.type, otherNode.type);
    }
    return behavior;
  };

  // low-level merge implementation
  this._merge = function(tx, path, dir) {
    var container = tx.get(this.container.id);
    var component = container.getComponent(path);
    if (dir === 'right' && component.next) {
      this._mergeComponents(tx, component, component.next);
    } else if (dir === 'left' && component.previous) {
      this._mergeComponents(tx, component.previous, component);
    } else {
      // No behavior defined for this merge
    }
  };

  this._mergeComponents = function(tx, firstComp, secondComp) {
    var firstNode = tx.get(firstComp.parentNode.id);
    var secondNode = tx.get(secondComp.parentNode.id);
    var mergeBehavior = this._getMergeBehavior(firstNode, secondNode);
    if (mergeBehavior) {
      mergeBehavior.call(this, tx, firstComp, secondComp);
    }
  };


  this._mergeTextNodes = function(tx, firstComp, secondComp) {
    var firstPath = firstComp.path;
    var firstText = tx.get(firstPath);
    var firstLength = firstText.length;
    var secondPath = secondComp.path;
    var secondText = tx.get(secondPath);
    var container = tx.get(this.container.id);
    if (firstLength === 0) {
      // hide the second node
      container.hide(firstPath[0]);
      // delete the second node
      tx.delete(firstPath[0]);
      // set the selection to the end of the first component
      tx.selection = Selection.create(secondPath, 0);
    } else {
      // append the second text
      tx.update(firstPath, { insert: { offset: firstLength, value: secondText } });
      // transfer annotations
      Annotations.transferAnnotations(tx, secondPath, 0, firstPath, firstLength);
      // hide the second node
      container.hide(secondPath[0]);
      // delete the second node
      tx.delete(secondPath[0]);
      // set the selection to the end of the first component
      tx.selection = Selection.create(firstPath, firstLength);
    }
  };

  this._getDeleteBehavior = function(node) {
    var behavior = null;
    if (this.deleteBehavior[node.type]) {
      behavior = this.deleteBehavior[node.type];
    }
    return behavior;
  };

  this._delete = function(tx, direction) {
    FormEditor.prototype._delete.call(this, tx, direction);
    var container = tx.get(this.container.id);
    if (container.nodes.length === 0) {
      var empty = {
        type: this.defaultTextType,
        id: Substance.uuid(this.defaultTextType),
        content: ""
      };
      tx.create(empty);
      container.show(empty.id, 0);
      tx.selection = Selection.create([empty.id, 'content'], 0);
    }
  };

  this._deleteContainerSelection = function(tx) {
    var sel = tx.selection.getRange();
    var nodeSels = this._getNodeSelection(tx, sel);
    var nodeSel;
    // apply deletion backwards so that we do not to recompute array positions
    for (var idx = nodeSels.length - 1; idx >= 0; idx--) {
      nodeSel = nodeSels[idx];
      if (nodeSel.isFully && !nodeSel.node.isResilient()) {
        this._deleteNode(tx, nodeSel);
      } else {
        this._deleteNodePartially(tx, nodeSel);
      }
    }

    // update the selection; take the first component which is not fully deleted
    if (!nodeSels[0].isFully) {
      tx.selection = Selection.create(sel.start);
    } else {
      tx.selection = Substance.Document.Selection.nullSelection;
      for (var i = 1; i < nodeSels.length; i++) {
        nodeSel = nodeSels[i];
        if (!nodeSel.isFully || nodeSel.node.isResilient()) {
          tx.selection = Substance.Document.Selection.create(nodeSel.components[0].path, 0);
          break;
        }
      }
    }

    // do a merge
    if (nodeSels.length>1) {
      var firstSel = nodeSels[0];
      var lastSel = nodeSels[nodeSels.length-1];
      if (firstSel.isFully || lastSel.isFully) {
        // TODO: think about if we want to merge in those cases
      } else {
        var firstComp = firstSel.components[0];
        var secondComp = Substance.last(lastSel.components);
        this._mergeComponents(tx, firstComp, secondComp);
      }
    }
  };

  this._deleteNode = function(tx, nodeSel) {
    var deleteBehavior = this._getDeleteBehavior(nodeSel.node);
    if (deleteBehavior) {
      deleteBehavior.call(this, tx, nodeSel);
    } else {
      this._deleteNodeWithId(tx, nodeSel.node.id);
    }
  };

  this._deleteNodeWithId = function(tx, nodeId) {
    var container = tx.get(this.container.id);
    var node = tx.get(nodeId);
    // only hide a node if it is managed externally
    if (node.isExternal()) {
      container.hide(nodeId);
      return;
    }
    // remove all associated annotations
    var annos = tx.getIndex('annotations').get(nodeId);
    var i;
    for (i = 0; i < annos.length; i++) {
      tx.delete(annos[i].id);
    }
    // We need to transfer anchors of ContainerAnnotations
    // to previous or next node
    var anchors = tx.getIndex('container-annotations').get(nodeId);
    for (i = 0; i < anchors.length; i++) {
      var anchor = anchors[i];
      // Note: during the course of this loop we might have deleted the node already
      // so, do not do it again
      if (!tx.get(anchor.id)) continue;
      var comp = container.getComponent(anchor.path);
      if (anchor.isStart) {
        if (comp.hasNext()) {
          tx.set([anchor.id, 'startPath'], comp.next.path);
          tx.set([anchor.id, 'startOffset'], 0);
        } else {
          tx.delete(anchor.id);
        }
      } else {
        if (comp.hasPrevious()) {
          var prevLength = tx.get(comp.previous.path).length;
          tx.set([anchor.id, 'endPath'], comp.previous.path);
          tx.set([anchor.id, 'endOffset'], prevLength);
        } else {
          tx.delete(anchor.id);
        }
      }
    }
    // remove from view first
    container.hide(nodeId);
    // and then permanently delete
    tx.delete(nodeId);
  };

  this._deleteNodePartially = function(tx, nodeSel) {
    var deleteBehavior = this._getDeleteBehavior(nodeSel.node);
    if (deleteBehavior) {
      deleteBehavior.call(this, tx, nodeSel);
    } else {
      // Just go through all components and apply a property deletion
      var components = nodeSel.components;
      var length = components.length;
      for (var i = 0; i < length; i++) {
        var comp = components[i];
        var startOffset = 0;
        var endOffset = tx.get(comp.path).length;
        if (i === 0) {
          startOffset = nodeSel.startOffset;
        }
        if (i === length-1) {
          endOffset = nodeSel.endOffset;
        }
        this._deleteProperty(tx, comp.path, startOffset, endOffset);
      }
    }
  };

  this._getNodeSelection = function(doc, range) {
    var result = [];
    var groups = {};
    var container = doc.get(this.container.id);
    var components = container.getComponentsForRange(range);
    for (var i = 0; i < components.length; i++) {
      var comp = components[i];
      var node = doc.get(comp.rootId);
      if (!node) {
        throw new Error('Illegal state: expecting a component to have a proper root node id set.');
      }
      var nodeId = node.id;
      var nodeGroup;
      if (!groups[nodeId]) {
        nodeGroup = {
          node: node,
          isFully: true,
          components: []
        };
        groups[nodeId] = nodeGroup;
        result.push(nodeGroup);
      }
      nodeGroup = groups[nodeId];
      nodeGroup.components.push(comp);
    }
    // finally we analyze the first and last node-selection
    // if these
    var startComp = components[0];
    var endComp = components[components.length-1];
    var startNodeSel = result[0];
    var endNodeSel = result[result.length-1];
    var startLen = doc.get(startComp.path).length;
    var endLen = doc.get(endComp.path).length;
    if (range.start.offset > 0 ||
      (startComp.hasPrevious() && startComp.getPrevious().rootId === startComp.rootId))
    {
      startNodeSel.isFully = false;
      startNodeSel.startOffset = range.start.offset;
      if (result.length === 1) {
        startNodeSel.endOffset = range.end.offset;
      } else {
        startNodeSel.endOffset = startLen;
      }
    }
    if (result.length > 1 &&
        (range.end.offset < endLen ||
          (endComp.hasNext() && endComp.getNext().rootId === endComp.rootId))
       ) {
      endNodeSel.isFully = false;
      endNodeSel.startOffset = 0;
      endNodeSel.endOffset = range.end.offset;
    }
    return result;
  };

};

Substance.inherit(ContainerEditor, FormEditor);

module.exports = ContainerEditor;

},{"../basics":115,"../document":141,"./form_editor":160}],159:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var Document = require('../document');

// Helper to map selection between model and DOM
// @params:
//    rootElement: typically the Surface root element
//    container: instance of Substance.Document.Container; optional
function DomSelection(rootElement, container) {
  this.rootElement = rootElement;
  this.nativeSelectionData = null;
  this.modelSelection = null;
  this.container = container;
}

var _findDomPosition = function(element, offset) {
  var text = $(element).text();
  // not in this element
  if (text.length < offset) {
    return {
      node: null,
      offset: offset - text.length
    };
  // at the right boundary
  } else if (element.nodeType === document.TEXT_NODE) {
    return {
      node: element,
      offset: offset,
      boundary: (text.length === offset)
    };
  // HACK: for empty elements
  } else if (text.length === 0) {
    return {
      node: element,
      offset: offset,
      boundary: true
    };
  // within the node or a child node
  } else {
    for (var child = element.firstChild; child; child = child.nextSibling) {
      var pos = _findDomPosition(child, offset);
      if (pos.node) {
        return pos;
      } else {
        // not found in this child; then pos.offset contains the translated offset
        offset = pos.offset;
      }
    }
    throw new Error("Illegal state: we should not have reached here!");
  }
};

var _getPathFromElement = function(el, options) {
  var current = el;

  var direction;
  if (options.left || options.up) {
    direction = 'previous';
  } else if (options.right || options.down) {
    direction = 'next';
  }

  function _result(el, data) {
    var path = el.dataset.path.split('.');
    return Substance.extend({
      path: path,
      element: el
    }, data);
  }

  // First pass: try to find an element with data-path going up the tree
  // Note: most often the click happens on a TextNode, where its parentNode
  // is a text-property
  while(current) {
    var $current = $(current);
    // if available extract a path fragment
    if (current.dataset && current.dataset.path) {
      return _result(current);
    } else {
      current = $current.parent()[0];
    }
  }

  // TODO: this needs to be rethought. Instead of guessing so much
  // we should do a more expensive search.
  // Second pass: If the previous lookup did not succeed
  // go search for a sibling first
  // and finally catch using the node's first property
  current = el;
  var charPos;
  while(current) {
    // HACK: CE is difficult to handle in presence of non-editable
    // elements. CE creates cursor positions between those elements
    // To solve this we need to look for the next appropriate
    // element
    if (current.dataset && current.dataset.path) {
      charPos = 0;
      if (direction === 'previous') {
        charPos = $(current).text().length;
      } else if (direction === 'next') {
        charPos = 0;
      }
      return _result(current, {
        override: true,
        charPos: charPos
      });
    }
    if (current.parentNode && current.parentNode.dataset.path) {
      charPos = 0;
      if (direction === 'previous') {
        charPos = $(current.parentNode).text().length;
      } else if (direction === 'next') {
        charPos = 0;
      }
      return _result(current.parentNode, {
        override: true,
        charPos: charPos
      });
    }
    if (direction === 'previous' && current.previousSibling) {
      current = current.previousSibling;
      continue;
    } else if (direction === 'next' && current.nextSibling) {
      current = current.nextSibling;
      continue;
    }
    // check for the previous and next
    else if (current.previousSibling && current.previousSibling.dataset &&
      current.previousSibling.dataset.path) {
      return _result(current.previousSibling, {
        override: true,
        charPos: $(current.previousSibling).text().length
      });
    }
    else if (current.nextSibling && current.nextSibling.dataset &&
      current.nextSibling.dataset.path) {
      return _result(current.nextSibling, {
        override: true,
        charPos: 0
      });
    }
    // it does also happen that the click target is the node
    // itself (e.g, when property is empty)
    // Then we set the selection to the first position
    else if (current.dataset && current.dataset.id) {
      // try to take the first property
      var properties = current.querySelectorAll('*[data-path]');
      if (properties.length>0) {
        charPos = 0;
        if (direction === 'previous') {
          charPos = $(properties[0]).text().length;
        } else if (direction === 'next') {
          charPos = 0;
        }
        return _result(properties[0], {
          override: true,
          charPos: charPos
        });
      }
    } else {
      current = $(current).parent()[0];
    }
  }

  // Eventually give up
  return null;
};

var _modelCoordinateFromDomPosition = function(domNode, offset, options) {
  options = options || {};
  var found = _getPathFromElement(domNode, options);
  if (!found) return null;
  var path = found.path;
  var element = found.element;
  var charPos = 0;
  if (found.override) {
    charPos = found.charPos;
  } else {
    var range = window.document.createRange();
    range.setStart(element, 0);
    range.setEnd(domNode, offset);
    charPos = range.toString().length;
    // HACK: in presence of
    charPos = Math.min(element.textContent.length, charPos);
  }
  // TODO: this needs more experiments, at the moment we do not detect these cases correctly
  // var after = (options.left && offset === domNode.length) ||
  //   (options.right && offset === 0) ;
  return {
    domNode: element,
    // Note: deactivated 'after' feature which is basically an interesting concept
    // but ATM with the delayed rerender this looks strange.
    // leaving it here for later discussion
    coordinate: new Document.Coordinate(path, charPos/*, after*/)
  };
};

var _modelCoordinateToDomPosition = function(rootElement, coordinate) {
  var componentElement = DomSelection.getDomNodeForPath(rootElement, coordinate.path);
  if (componentElement) {
    var pos = _findDomPosition(componentElement, coordinate.offset);
    if (pos.node) {
      return pos;
    } else {
      return null;
    }
  }
};

DomSelection.Prototype = function() {

  var selectionEquals = function(s1, s2) {
    return (s1.anchorNode === s2.anchorNode && s1.anchorOffset === s2.anchorOffset &&
        s1.focusNode === s2.focusNode && s1.focusOffset === s2.focusOffset);
  };

  var selectionData = function(s) {
    var data = {
      anchorNode: s.anchorNode,
      anchorOffset: s.anchorOffset,
      focusNode: s.focusNode,
      focusOffset: s.focusOffset,
      range: null
    };
    if (s.rangeCount > 0) {
      data.range = s.getRangeAt(0);
    }
    return data;
  };

  this.get = function(options) {
    options = options || {};
    var sel = window.getSelection();
    if (this.nativeSelectionData && selectionEquals(sel, this.nativeSelectionData)) {
      return this.modelSelection;
    }
    var result;
    this.nativeSelectionData = selectionData(sel);
    var rangeCount = sel.rangeCount;
    if (rangeCount === 0) {
      result = Document.nullSelection;
    } else if (rangeCount > 1) {
      throw new Error('Multi-Selections not supported yet!');
    } else {
      options.container = this.container;
      result = DomSelection.getSelectionForDomSelection(sel, options);
    }
    this.modelSelection = result;
    return result;
  };

  this.set = function(modelSelection) {
    var sel = window.getSelection();
    if (modelSelection.isNull()) {
      sel.removeAllRanges();
      return;
    }
    var ranges = modelSelection.getRanges();
    var domRanges = [];
    var i, range;
    for (i = 0; i < ranges.length; i++) {
      range = ranges[i];
      var startPosition = _modelCoordinateToDomPosition(this.rootElement, range.start);
      if (!startPosition) {
        // Not within this surface. Maybe it was in a different surface
        continue;
      }
      var endPosition;
      if (range.isCollapsed()) {
        endPosition = startPosition;
      } else {
        endPosition = _modelCoordinateToDomPosition(this.rootElement, range.end);
      }
      domRanges.push({ start: startPosition, end: endPosition });
    }
    // just do nothing if there is no mapping
    if (domRanges.length === 0) {
      return;
    }
    // if there is a range then set replace the window selection accordingly
    sel.removeAllRanges();
    for (i = 0; i < domRanges.length; i++) {
      var domRange = domRanges[i];
      range = window.document.createRange();
      range.setStart(domRange.start.node, domRange.start.offset);
      range.setEnd(domRange.end.node, domRange.end.offset);
      sel.addRange(range);
    }
  };

  this.clear = function() {
    var sel = window.getSelection();
    sel.removeAllRanges();
    this.nativeSelectionData = null;
  };

  this.isInside = function() {
    var sel = window.getSelection();
    if (sel.rangeCount === 0) {
      return false;
    }
    var range = sel.getRangeAt(0);
    // Note: Node.compareDocumentPosition has an inverse semantic
    // node1.compare(node2) === CONTAINS means 'node2 contains node1'
    var inside = (range.startContainer.compareDocumentPosition(this.rootElement)&window.Node.DOCUMENT_POSITION_CONTAINS);
    if (inside && !range.collapsed) {
      inside = (range.endContainer.compareDocumentPosition(this.rootElement)&window.Node.DOCUMENT_POSITION_CONTAINS);
    }
    return inside;
  };

};

Substance.initClass(DomSelection);

DomSelection.getDomNodeForPath = function(rootElement, path) {
  var componentElement = rootElement.querySelector('*[data-path="'+path.join('.')+'"]');
  if (!componentElement) {
    console.warn('Could not find DOM element for path', path);
    return null;
  }
  return componentElement;
};

DomSelection.findDomPosition = function(rootElement, path, offset) {
  var domNode = DomSelection.getDomNodeForPath(rootElement, path);
  if (domNode) {
    var pos = _findDomPosition(domNode, offset);
    if (pos.node) {
      return pos;
    } else {
      return null;
    }
  }
};

DomSelection.getSelectionForDomSelection = function(sel, options) {
  options = options || {};
  var anchorNode = sel.anchorNode;
  var anchorOffset = sel.anchorOffset;
  var focusNode = sel.focusNode;
  var focusOffset = sel.focusOffset;
  var wRange = sel.getRangeAt(0);
  var isCollapsed = sel.isCollapsed;
  var isReverse = false;
  if (!isCollapsed && focusNode && anchorNode) {
    var cmp = focusNode.compareDocumentPosition(anchorNode);
    isReverse = (
      ( (cmp & (window.document.DOCUMENT_POSITION_FOLLOWING) ) > 0 ) ||
      (cmp === 0 && focusOffset < anchorOffset)
    );
  }
  if (!focusNode || !anchorNode) {
    return Document.nullSelection;
  }
  return DomSelection.getSelectionForDomRange(wRange, isReverse, options);
};

DomSelection.getSelectionForDomRange = function(wRange, isReverse, options) {
  options = options || {};
  var start = _modelCoordinateFromDomPosition(wRange.startContainer, wRange.startOffset, options);
  var end;
  if (wRange.collapsed) {
    end = start;
  } else {
    end = _modelCoordinateFromDomPosition(wRange.endContainer, wRange.endOffset, options);
  }
  if (!start || !end) {
    return;
  }
  var range = new Document.Range(start.coordinate, end.coordinate);
  if (Substance.isArrayEqual(range.start.path, range.end.path)) {
    return new Document.PropertySelection(range, isReverse);
  } else {
    if (!options.container) {
      console.warn('No container given, but selection is a container selection');
      window.getSelection().removeAllRanges();
      return Document.Selection.nullSelection;
    }
    return new Document.ContainerSelection(options.container, range, isReverse);
  }
};

module.exports = DomSelection;

},{"../basics":115,"../document":141}],160:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var Document = require('../document');
var Selection = Document.Selection;
var Annotations = Document.AnnotationUpdates;

function FormEditor(doc) {
  this.document = doc;
  this.selection = Document.nullSelection;
}

FormEditor.Prototype = function() {

  this.isContainerEditor = function() {
    return false;
  };

  this.getContainer = function() {
    return null;
  };

  this.setContainer = function() {};

  this.getDocument = function() {
    return this.document;
  };

  this.insertText = function(textInput, selection, info) {
    // console.log("Inserting text: '%s' at %s", textInput, selection.toString());
    var tx = this.document.startTransaction({ selection: selection });
    tx.selection = selection;
    try {
      if (!this.selection.isCollapsed()) {
        this._delete(tx, 'right');
      }
      var range = tx.selection.getRange();
      tx.update(range.start.path, { insert: { offset: range.start.offset, value: textInput } } );
      Annotations.insertedText(tx, range.start, textInput.length);
      tx.selection = Selection.create(range.start.path, range.start.offset + textInput.length);
      tx.save({ selection: tx.selection }, info);
      this.selection = tx.selection;
    } finally {
      tx.cleanup();
    }
  };

  // implements backspace and delete
  this.delete = function(selection, direction, info) {
    var tx = this.document.startTransaction({ selection: selection });
    tx.selection = selection;
    try {
      this._delete(tx, direction);
      tx.save({ selection: tx.selection }, info);
      this.selection = tx.selection;
    } finally {
      tx.cleanup();
    }
  };

  // Selecting all in FormEditor selects the current property.
  this.selectAll = function() {
    var sel = this.selection;
    if (sel.isNull()) return;
    if (sel.isPropertySelection()) {
      var path = sel.start.path;
      var text = this.document.get(path);
      this.selection = Selection.create(path, 0, text.length);
    }
  };

  this._delete = function(tx, direction) {
    var selection = tx.selection;
    var range = selection.getRange();
    var startChar, endChar;
    // if collapsed see if we are at the start or the end
    // and try to merge
    if (selection.isCollapsed()) {
      var prop = this.document.get(range.start.path);
      if ((range.start.offset === 0 && direction === 'left') ||
          (range.start.offset === prop.length && direction === 'right')) {
        this._merge(tx, range.start.path, direction);
      } else {
        // simple delete one character
        startChar = (direction === 'left') ? range.start.offset-1 : range.start.offset;
        endChar = startChar+1;
        tx.update(range.start.path, {
          delete: { start: startChar, end: endChar }
        });
        Annotations.deletedText(tx, range.start.path, startChar, endChar);
        tx.selection = Document.Selection.create(range.start.path, startChar);
      }
    } else if (selection.isPropertySelection()) {
      this._deleteProperty(tx, range.start.path, range.start.offset, range.end.offset);
      tx.selection = Document.Selection.create(range.start);
    } else {
      // deal with container deletes
      this._deleteContainerSelection(tx, direction);
    }
  };

  this._deleteProperty = function(tx, path, startOffset, endOffset) {
    // if a property selection but not collapsed
    // simply delete the selected area
    tx.update(path, {
      delete: { start: startOffset, end: endOffset }
    });
    Annotations.deletedText(tx, path, startOffset, endOffset);
  };

  this._deleteContainerSelection = function(/*tx, direction*/) {
    console.info('Deleting ContainerSelections in form-editor is not supported.');
  };

  // no breaking
  this.break = function(selection/*, info*/) {
    // just update the selection
    this.selection = selection;
  };

  this.softBreak = function(selection, info) {
    this.insertText('\n', selection, info);
  };

  this.paste = function(selection, data) {
    // TODO: for now only plain text is inserted
    // We could do some stitching however, preserving the annotations
    // received in the document
    if (data.text) {
      this.insertText(data.text, selection);
    }
  };

  // no merging, just move cursor when pressing backspace
  /* jshint unused: false */
  this._merge = function(tx, path, dir) {
    // not possible
  };

};

Substance.initClass(FormEditor);

module.exports = FormEditor;
},{"../basics":115,"../document":141}],161:[function(require,module,exports){

var Surface = require('./surface');
Surface.DomSelection = require('./dom_selection');

Surface.FormEditor = require('./form_editor');
Surface.ContainerEditor = require('./container_editor');
Surface.Clipboard = require('./clipboard');

Surface.NodeView = require('./node_view');
Surface.AnnotationView = require('./annotation_view');
Surface.TextProperty = require('./text_property');

Surface.Tool = require('./tool');
Surface.ToolProxy = require('./tool_proxy');
Surface.AnnotationTool = require('./annotation_tool');
Surface.SwitchTypeTool = require('./switch_type_tool');
Surface.ToolRegistry = require('./tool_registry');
Surface.ToolManager = require('./tool_manager');
Surface.Panel = require('./panel');

module.exports = Surface;

},{"./annotation_tool":155,"./annotation_view":156,"./clipboard":157,"./container_editor":158,"./dom_selection":159,"./form_editor":160,"./node_view":162,"./panel":163,"./surface":164,"./switch_type_tool":165,"./text_property":166,"./tool":167,"./tool_manager":168,"./tool_proxy":169,"./tool_registry":170}],162:[function(require,module,exports){
'use strict';

var Substance = require('../basics');

function NodeView(props) {
  this.props = props;
  this.doc = props.doc;
  this.node = props.node;
}

NodeView.Prototype = function() {

  this.tagName = 'div';

  this.createElement = function() {
    var element = document.createElement(this.getTagName());
    var classNames = this.getClassNames();
    $(element).addClass(classNames);
    element.dataset.id = this.node.id;
    return element;
  };

  this.getTagName = function() {
    return this.node.constructor.static.tagName || this.tagName;
  };

  this.getClassNames = function() {
    return [];
  };

  this.render = function() {
    var element = this.createElement();
    var children = this.props.children;
    if (children) {
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (Substance.isString(child)) {
          element.appendChild(document.createTextNode(child));
        } else if (child instanceof NodeView) {
          var el = child.render();
          element.appendChild(el);
        } else if (child instanceof window.Node) {
          element.appendChild(child);
        }
      }
    }
    return element;
  };

};

Substance.initClass(NodeView);

module.exports = NodeView;

},{"../basics":115}],163:[function(require,module,exports){
'use strict';

var Substance = require("../basics");

// Mixin with helpers to implement a scrollable panel
function Panel() {

}

Panel.Prototype = function() {

  // Get the current coordinates of the first element in the
  // set of matched elements, relative to the offset parent
  // Please be aware that it looks up until it finds a parent that has
  // position: relative|absolute set. So for now never set
  // position: relative somewhere in your panel
  this.getPanelOffsetForElement = function(el) {
    var offsetTop = $(el).position().top;
    return offsetTop;
  };

  this.scrollToNode = function(nodeId) {
    // var n = this.findNodeView(nodeId);
    // TODO make this generic
    var panelContentEl = this.getScrollableContainer();

    // Node we want to scroll to
    var targetNode = $(panelContentEl).find("*[data-id="+nodeId+"]")[0];

    if (targetNode) {
      $(panelContentEl).scrollTop(this.getPanelOffsetForElement(targetNode));
    } else {
      console.warn(nodeId, 'not found in scrollable container');
    }
  };

};

Substance.initClass(Panel);
module.exports = Panel;



},{"../basics":115}],164:[function(require,module,exports){
'use strict';

var Substance = require('../basics');

// DomSelection is used to map DOM to editor selections and vice versa
var DomSelection = require('./dom_selection');

var __id__ = 0;

function Surface(editor, options) {
  Substance.EventEmitter.call(this);

  options = options || {};

  this.__id__ = __id__++;

  // this.element must be set via surface.attach(element)
  this.element = null;
  this.$element = null;
  this.editor = editor;

  this.domSelection = null;

  this.logger = options.logger || window.console;

  // TODO: VE make jquery injectable
  this.$ = $;
  this.$window = this.$( window );
  this.$document = this.$( window.document );

  this.dragging = false;

  this._onMouseUp = Substance.bind( this.onMouseUp, this );
  this._onMouseDown = Substance.bind( this.onMouseDown, this );
  this._onMouseMove = Substance.bind( this.onMouseMove, this );

  this._onKeyDown = Substance.bind(this.onKeyDown, this);
  this._onTextInput = Substance.bind(this.onTextInput, this);
  this._onTextInputShim = Substance.bind( this.onTextInputShim, this );
  this._onCompositionStart = Substance.bind( this.onCompositionStart, this );

  this._onBlur = Substance.bind( this.onBlur, this );
  this._onFocus = Substance.bind( this.onFocus, this );

  this._onDomMutations = Substance.bind(this.onDomMutations, this);
  this.domObserver = new window.MutationObserver(this._onDomMutations);
  this.domObserverConfig = { subtree: true, characterData: true };
  this.skipNextObservation = false;

  // set when editing is enabled
  this.enabled = false;

  // surface usually gets frozen while showing a popup
  this.frozen = false;
  this.$caret = $('<span>').addClass('surface-caret');

  this.isIE = Surface.detectIE();
  this.isFF = window.navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

  this.undoEnabled = true;

  /*jshint eqnull:true */
  if (options.undoEnabled != null) {
    this.undoEnabled = options.undoEnabled;
  }
  if (options.contentEditable != null) {
    this.enableContentEditable = options.contentEditable;
  } else {
    this.enableContentEditable = true;
  }
  /*jshint eqnull:false */
}

Surface.Prototype = function() {

  this.getElement = function() {
    return this.element;
  };

  this.getContainerName = function() {
    if (this.editor.isContainerEditor()) {
      return this.editor.getContainerName();
    }
  };

  this.getContainer = function() {
    return this.editor.getContainer();
  };

  this.getEditor = function() {
    return this.editor;
  };

  this.getDocument = function() {
    return this.editor.getDocument();
  };

  this.dispose = function() {
    this.detach();
  };

  this.attach = function(element) {
    if (!element) {
      throw new Error('Illegal argument: Surface element is required. was ' + element);
    }
    var doc = this.editor.getDocument();

    // Initialization
    this.element = element;
    this.$element = $(element);
    if (this.enableContentEditable) {
      this.$element.prop('contentEditable', 'true');
    }
    this.domSelection = new DomSelection(element, this.editor.getContainer());

    this.$element.addClass('surface');

    // Keyboard Events
    //
    this.attachKeyboard();

    // Mouse Events
    //
    this.$element.on( 'mousedown', this._onMouseDown );
    this.$element.on('blur', this._onBlur);
    this.$element.on('focus', this._onFocus);

    // Document Change Events
    //
    // listen to updates so that we can set the selection (only for editing not for replay)
    doc.connect(this, { 'document:changed': this.onDocumentChange });

    this.domObserver.observe(element, this.domObserverConfig);

    this.attached = true;
  };

  this.attachKeyboard = function() {
    this.$element.on('keydown', this._onKeyDown);
    // OSX specific handling of dead-keys
    if (this.element.addEventListener) {
      this.element.addEventListener('compositionstart', this._onCompositionStart, false);
    }
    if (window.TextEvent && !this.isIE) {
      this.element.addEventListener('textInput', this._onTextInput, false);
    } else {
      this.$element.on('keypress', this._onTextInputShim);
    }
  };

  this.detach = function() {
    var doc = this.editor.getDocument();

    this.domObserver.disconnect();

    // Document Change Events
    //
    doc.disconnect(this);

    // Mouse Events
    //
    this.$element.off( 'mousedown', this._onMouseDown );
    this.$element.off('blur', this._onBlur);
    this.$element.off('focus', this._onFocus);

    // Keyboard Events
    //
    this.detachKeyboard();

    this.$element.removeClass('surface');

    // Clean-up
    //
    this.element = null;
    this.$element = null;
    this.domSelection = null;

    this.attached = false;
  };

  this.detachKeyboard = function() {
    this.$element.off('keydown', this._onKeyDown);
    if (this.element.addEventListener) {
      this.element.removeEventListener('compositionstart', this._onCompositionStart, false);
    }
    if (window.TextEvent && !this.isIE) {
      this.element.removeEventListener('textInput', this._onTextInput, false);
    } else {
      this.$element.off('keypress', this._onTextInputShim);
    }
  };

  this.isAttached = function() {
    return this.attached;
  };

  this.enable = function() {
    if (this.enableContentEditable) {
      this.$element.prop('contentEditable', 'true');
    }
    this.enabled = true;
  };

  this.isEnabled = function() {
    return this.enabled;
  };

  this.disable = function() {
    if (this.enableContentEditable) {
      this.$element.removeAttr('contentEditable');
    }
    this.enabled = false;
  };

  this.freeze = function() {
    console.log('Freezing surface...');
    if (this.enableContentEditable) {
      this.$element.removeAttr('contentEditable');
    }
    this.$element.addClass('frozen');
    this.domObserver.disconnect();
    this.frozen = true;
  };

  this.unfreeze = function() {
    if (!this.frozen) {
      return;
    }
    console.log('Unfreezing surface...');
    if (this.enableContentEditable) {
      this.$element.prop('contentEditable', 'true');
    }
    this.$element.removeClass('frozen');
    this.domObserver.observe(this.element, this.domObserverConfig);
    this.frozen = false;
  };

  // ###########################################
  // Keyboard Handling
  //

  /**
   * Handle document key down events.
   */
  this.onKeyDown = function( e ) {
    if (this.frozen) {
      return;
    }
    if ( e.which === 229 ) {
      // ignore fake IME events (emitted in IE and Chromium)
      return;
    }
    switch ( e.keyCode ) {
      case Surface.Keys.LEFT:
      case Surface.Keys.RIGHT:
        return this.handleLeftOrRightArrowKey(e);
      case Surface.Keys.UP:
      case Surface.Keys.DOWN:
        return this.handleUpOrDownArrowKey(e);
      case Surface.Keys.ENTER:
        return this.handleEnterKey(e);
      case Surface.Keys.BACKSPACE:
      case Surface.Keys.DELETE:
        return this.handleDeleteKey(e);
      default:
        break;
    }

    // Built-in key combos
    // console.log('####', e.keyCode, e.metaKey, e.ctrlKey, e.shiftKey);
    // Ctrl+A: select all
    var handled = false;
    if ( (e.ctrlKey||e.metaKey) && e.keyCode === 65 ) {
      console.log('Selecting all...');
      this.editor.selectAll();
      var sel = this.editor.selection;
      this.setSelection(sel);
      this.domSelection.set(sel);
      this.emit('selection:changed', sel, this);
      handled = true;
    }
    // Undo/Redo: cmd+z, cmd+shift+z
    else if (this.undoEnabled && e.keyCode === 90 && (e.metaKey||e.ctrlKey)) {
      if (e.shiftKey) {
        this.redo();
      } else {
        this.undo();
      }
      handled = true;
    }

    if (handled) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  this.undo = function() {
    var doc = this.getDocument();
    if (doc.done.length>0) {
      doc.undo();
    }
  };

  this.redo = function() {
    var doc = this.getDocument();
    if (doc.undone.length>0) {
      doc.redo();
    }
  };


  this.onTextInput = function(e) {
    if (this.frozen) {
      return;
    }
    if (!e.data) return;
    // console.log("TextInput:", e);
    this.skipNextObservation=true;
    var sel = this.editor.selection;
    var range = sel.getRange();
    var el = DomSelection.getDomNodeForPath(this.element, range.start.path);
    // When the cursor is collapsed we can be brave
    // and let CE do the incremental update.
    // This increases speed while typing as we do not rerender so eagerly
    if (sel.isCollapsed()) {
      this.editor.insertText(e.data, sel, {surface: this, source: el, typing: true});
    }
    // In case of typing-over we do not trust CE, thus
    // we do not store the source info, and stop the default event behavior.
    else {
      var self = this;
      this.editor.insertText(e.data, sel, {surface: this});
      setTimeout(function() {
        self.rerenderDomSelection();
      });
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // Handling Dead-keys under OSX
  this.onCompositionStart = function() {
    // just tell DOM observer that we have everything under control
    this.skipNextObservation = true;
  };

  // a shim for textInput events based on keyPress and a horribly dangerous dance with the CE
  this.onTextInputShim = function( e ) {
    if (this.frozen) {
      return;
    }
    // Filter out non-character keys. Doing this prevents:
    // * Unexpected content deletion when selection is not collapsed and the user presses, for
    //   example, the Home key (Firefox fires 'keypress' for it)
    // * Incorrect pawning when selection is collapsed and the user presses a key that is not handled
    //   elsewhere and doesn't produce any text, for example Escape
    if (
      // Catches most keys that don't produce output (charCode === 0, thus no character)
      e.which === 0 || e.charCode === 0 ||
      // Opera 12 doesn't always adhere to that convention
      e.keyCode === Surface.Keys.TAB || e.keyCode === Surface.Keys.ESCAPE ||
      // prevent combinations with meta keys, but not alt-graph which is represented as ctrl+alt
      !!(e.metaKey) || (!!e.ctrlKey^!!e.altKey)
    ) {
      return;
    }
    var character = String.fromCharCode(e.which);
    var sel, range, el;
    this.skipNextObservation=true;
    sel = this.editor.selection;
    if (!e.shiftKey) {
      character = character.toLowerCase();
    }
    if (character.length>0) {
      sel = this.editor.selection;
      range = sel.getRange();
      el = DomSelection.getDomNodeForPath(this.element, range.start.path);
      this.editor.insertText(character, sel, {surface: this, source: el, typing: true});
      if (sel.isContainerSelection()) {
        e.preventDefault();
        e.stopPropagation();
      }
      return;
    } else {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  this.handleLeftOrRightArrowKey = function ( e ) {
    var self = this;
    window.setTimeout(function() {
      self._updateModelSelection({
        left: (e.keyCode === Surface.Keys.LEFT),
        right: (e.keyCode === Surface.Keys.RIGHT)
      });
    });
  };

  this.handleUpOrDownArrowKey = function ( e ) {
    var self = this;
    window.setTimeout(function() {
      self._updateModelSelection({
        up: (e.keyCode === Surface.Keys.UP),
        down: (e.keyCode === Surface.Keys.DOWN)
      });
    });
  };

  this.handleEnterKey = function( e ) {
    e.preventDefault();
    var selection = this.domSelection.get();
    if (e.shiftKey) {
      this.editor.softBreak(selection, {surface: this});
    } else {
      this.editor.break(selection, {surface: this});
    }
  };

  this.handleDeleteKey = function ( e ) {
    var direction = (e.keyCode === Surface.Keys.BACKSPACE) ? 'left' : 'right';
    var sel = this.editor.selection;
    var range = sel.getRange();
    // minor optimization: in simple cases we can let CE do the delete
    if (range.isCollapsed() && direction === 'left' && range.start.offset !== 0) {
      this.skipNextObservation = true;
      var el = DomSelection.getDomNodeForPath(this.element, range.start.path);
      this.editor.delete(sel, direction, {surface: this, source: el, typing: true});
    } else {
      e.preventDefault();
      this.editor.delete(sel, direction, {surface: this});
    }
  };

  // ###########################################
  // Mouse Handling
  //

  this.onMouseDown = function(e) {
    if (this.frozen) {
      this.unfreeze();
    }
    if ( e.which !== 1 ) {
      return;
    }
    // Bind mouseup to the whole document in case of dragging out of the surface
    this.dragging = true;
    this.$document.on( 'mouseup', this._onMouseUp );
    this.$document.on( 'mousemove', this._onMouseMove );
  };

  this.onMouseUp = function(/*e*/) {
    // ... and unbind the temporary handler
    this.$document.off( 'mouseup', this._onMouseUp );
    this.$document.off( 'mousemove', this._onMouseMove );
    this.dragging = false;
    // HACK: somehow the DOM selection is not ready yet
    var self = this;
    setTimeout(function() {
      if (self.domSelection) {
        self._setModelSelection(self.domSelection.get());  
      }
    });
  };

  this.onMouseMove = function() {
    if (this.dragging) {
      // TODO: do we want that?
      // update selection during dragging
      // this._setModelSelection(this.domSelection.get());
    }
  };

  // There is now a problem with non-editable elements at the boundary
  // of elements, as illustrated by this example:
  //
  //  <div>
  //    <label contenteditable="false">Label:</label>
  //    <span>Value</span>
  //  </div>
  //
  // CE allows to set the cursor before the label, and without intervention
  // would even allow to delete it.
  // Particularly in FormEditors we could solve this by making
  // only the text-properties editable.

  // TODO: native blur and focus does only work if the root element
  // is contenteditable.

  this.onBlur = function() {
    // set this when you want to deabug selection related issues
    // otherwise the developer console will draw the focus, which
    // leads to an implicit deselection in the surface.
    if (!Substance.Surface.DISABLE_BLUR && !this.frozen) {
      // console.log('Blurring surface', this.name, this.__id__);
      this.isFocused = false;
      this.setSelection(Substance.Document.nullSelection);
    }
  };

  this.onFocus = function() {
    // console.log('Focusing surface', this.name, this.__id__);
    this.isFocused = true;
  };

  this.onDomMutations = function() {
    if (this.skipNextObservation) {
      this.skipNextObservation = false;
      return;
    }
    // Known use-cases:
    //  - Context-menu:
    //      - Delete
    //      - Note: copy, cut, paste work just fine
    console.info("We want to enable a DOM MutationObserver which catches all changes made by native interfaces (such as spell corrections, etc). Lookout for this message and try to set Surface.skipNextObservation=true when you know that you will mutate the DOM.");
  };

  // ###########################################
  // Document and Selection Changes
  //

  this.onDocumentChange = function(change, info) {
    if (!this.isFocused) {
      return;
    }
    if ( (this.undoEnabled|| !info.replay) && !info.typing) {
      var self = this;
      window.setTimeout(function() {
        // GUARD: For cases where the panel/or whatever has been disposed already
        // after changing the doc
        if (!self.domSelection) return;
        var sel = change.after.selection;
        self.editor.selection = sel;
        self.domSelection.set(sel);
        self.emit('selection:changed', sel, self);
      });
    }
  };

  this.getSelection = function() {
    return this.editor.selection;
  };

  /**
   * Set the model selection and update the DOM selection accordingly
   */
  this.setSelection = function(sel) {
    if (this._setModelSelection(sel)) {
      if (this.domSelection) {
        // also update the DOM selection
        this.domSelection.set(sel);
      }
    }
  };

  this.rerenderDomSelection = function() {
    this.domSelection.set(this.getSelection());
  };

  this.getDomNodeForId = function(nodeId) {
    return this.element.querySelector('*[data-id='+nodeId+']');
  };

  this._updateModelSelection = function(options) {
    this._setModelSelection(this.domSelection.get(options));
  };

  /**
   * Set the model selection only (without DOM selection update).
   *
   * Used internally if we derive the model selection from the DOM selcection.
   */
  this._setModelSelection = function(sel) {
    sel = sel || Substance.Document.nullSelection;
    if (!this.editor.selection.equals(sel)) {
      // console.log('Surface.setSelection: %s', sel.toString());
      this.editor.selection = sel;
      this.emit('selection:changed', sel, this);
      // FIXME: ATM rerendering an expanded selection leads
      // to a strante behavior. So do not do that for now
      if (sel.isCollapsed()) {
        this.rerenderDomSelection();
      }
    }
  };

  this.getLogger = function() {
    return this.logger;
  };

  this.placeCaretElement = function() {
    var sel = this.editor.selection;
    if (sel.isNull()) {
      throw new Error('Selection is null.');
    }
    var $caret = this.$caret;
    $caret.empty().remove();
    var pos = DomSelection.findDomPosition(this.element, sel.start.path, sel.start.offset);
    if (pos.node.nodeType === window.Node.TEXT_NODE) {
      var textNode = pos.node;
      if (textNode.length === pos.offset) {
        $caret.insertAfter(textNode);
      } else {
        // split the text node into two pieces
        var wsel = window.getSelection();
        var wrange = window.document.createRange();
        var text = textNode.textContent;
        var frag = window.document.createDocumentFragment();
        var textFrag = window.document.createTextNode(text.substring(0, pos.offset));
        frag.appendChild(textFrag);
        frag.appendChild($caret[0]);
        frag.appendChild(document.createTextNode(text.substring(pos.offset)));
        $(textNode).replaceWith(frag);
        wrange.setStart(textFrag, pos.offset);
        wsel.removeAllRanges();
        wsel.addRange(wrange);
      }
    } else {
      pos.node.appendChild($caret[0]);
    }
    return $caret;
  };

  this.removeCaretElement = function() {
    this.$caret.remove();
  };

  this.updateCaretElement = function() {
    this.$caret.remove();
    this.placeCaretElement();
  };

};

Substance.inherit( Surface, Substance.EventEmitter );

Surface.Keys =  {
  UNDEFINED: 0,
  BACKSPACE: 8,
  DELETE: 46,
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
  ENTER: 13,
  END: 35,
  HOME: 36,
  TAB: 9,
  PAGEUP: 33,
  PAGEDOWN: 34,
  ESCAPE: 27,
  SHIFT: 16,
  SPACE: 32
};

Surface.detectIE = function() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }
  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }
  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
     // IE 12 => return version number
     return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }
  // other browser
  return false;
};

module.exports = Surface;

},{"../basics":115,"./dom_selection":159}],165:[function(require,module,exports){
var Substance = require("../basics");
var Tool = require('./tool');

function SwitchTypeTool() {
  Tool.call(this);
}

SwitchTypeTool.Prototype = function() {

  // Provides the type of the associated annotation node.
  // The default implementation uses the Tool's static name.
  // Override this method to customize.
  this.getNodeType = function() {
    if (this.constructor.static.name) {
      return this.constructor.static.name;
    } else {
      throw new Error('Contract: SwitchTypeTool.static.name should be associated to a document annotation type.');
    }
  };

  this.getData = function() {
    return {};
  };

  this.matchNode = function(node) {
    return (node.type === this.getNodeType());
  };

  this.update = function(surface, sel) {
    this.surface = surface;
    if (!surface.isEnabled() || sel.isNull() || sel.isContainerSelection() ||
        !surface.getEditor().isContainerEditor()) {
      return this.setDisabled();
    }
    var container = surface.getEditor().getContainer();
    var node = container.getNodeForComponentPath(sel.start.path);
    if (this.matchNode(node)) {
      return this.setToolState({
        enabled: true,
        selected: true
      });
    } else if (node.isInstanceOf('text')) {
      return this.setToolState({
        enabled: true,
        selected: true,
        sel: sel,
        node: node,
        mode: "switch"
      });
    }
  };

  this.performAction = function() {
    var state = this.getToolState();
    if (state.mode === "switch") {
      this.surface.getEditor().switchType(state.sel, this.getNodeType(), this.getData());
    }
  };
};

Substance.inherit(SwitchTypeTool, Tool);

module.exports = SwitchTypeTool;

},{"../basics":115,"./tool":167}],166:[function(require,module,exports){
var Substance = require('../basics');
var Document = require('../document');
var NodeView = require('./node_view');
var AnnotationView = require('./annotation_view');
var Annotator = Document.Annotator;

// Basic implementation of a text property.
//

function TextProperty() {}

TextProperty.Prototype = function() {

  this.getSurface = function() {
    throw new Error('This is abstract');
  };

  this.getDocument = function() {
    var surface = this.getSurface();
    if (!surface) {
      return null;
    } else {
      return surface.getDocument();
    }
  };

  this.getPath = function() {
    throw new Error('This is abstract');
  };

  /*
    Add these when creating the element
      class: 'text-property'
      style: "whiteSpace: pre-wrap;"
      'data-path': path.join('.')
   */
  this.getElement = function() {
    throw new Error('This is abstract');
  };

  // Override this if you want to add app-specific annotations, such as highlights
  this.getAnnotations = function() {
    var doc = this.getDocument();
    var path = this.getPath();
    return doc.getIndex('annotations').get(path);
  };

  this.attach = function() {
    var doc = this.getDocument();
    var path = this.getPath();
    doc.getEventProxy('path').add(path, this, this.propertyDidChange);
  };

  this.detach = function() {
    var doc = this.getDocument();
    var path = this.getPath();
    doc.getEventProxy('path').remove(path, this);
  };

  this.renderContent = function() {
    var doc = this.getDocument();
    var domNode = this.getElement();
    if (!domNode) { return; }
    var contentView = new TextProperty.ContentView({
      doc: doc,
      children: this.renderChildren()
    });
    var fragment = contentView.render();
    // Add a <br> so that the node gets rendered when empty and Contenteditable will stop when moving the cursor.
    // TODO: probably this is not good when using the property inline.
    fragment.appendChild(document.createElement('br'));
    domNode.innerHTML = "";
    domNode.appendChild(fragment);
  };

  this.renderChildren = function() {
    var doc = this.getDocument();
    var path = this.getPath();
    var text = doc.get(path) || "";

    var annotations = this.getAnnotations();

    var annotator = new Annotator();
    annotator.onText = function(context, text) {
      context.children.push(text);
    };
    annotator.onEnter = function(entry) {
      var node = entry.node;
      // TODO: we need a component factory, so that we can create the appropriate component
      var ViewClass = AnnotationView;
      var classNames = [];
      return {
        ViewClass: ViewClass,
        props: {
          doc: doc,
          node: node,
          classNames: classNames,
        },
        children: []
      };
    };
    annotator.onExit = function(entry, context, parentContext) {
      var props = context.props;
      props.children = context.children;
      var view = new context.ViewClass(props);
      parentContext.children.push(view);
    };
    var root = { children: [] };
    annotator.start(root, text, annotations);
    return root.children;
  };

  this.propertyDidChange = function(change, info) {
    // Note: Surface provides the source element as element
    // whenever editing is done by Contenteditable (as opposed to programmatically)
    // In that case we trust in CE and do not rerender.
    if (info.source === this.getElement()) {
      console.log('Skipping update...');
      // NOTE: this hack triggers a rerender of the text-property
      // after a burst of changes. Atm, we let CE do incremental rendering,
      // which is important for a good UX. However CE sometimes does undesired
      // things which can lead to a slight diversion of model and view.
      // Using this hack we can stick to the trivial rerender based implementation
      // of TextProperty as opposed to an incremental version.
      if (info.surface && info.typing) {
        if (!this._debouncedRerender) {
          var INTERVAL = 200; //ms
          var self = this;
          this._debouncedRerender = Substance.debounce(function() {
            var doc = this.getDocument();
            // as this get called delayed it can happen
            // that this element has been deleted in the mean time
            if (doc) {
              self.renderContent();
              info.surface.rerenderDomSelection();
            }
          }, INTERVAL);
        }
        this._debouncedRerender();
        return;
      }
    }
    // For now, we stick to rerendering as opposed to incremental rendering.
    // As long the user is not editing this property this strategy is sufficient.
    // For the editing the above strategy is applied.
    this.renderContent();

    if (info.source === this.getElement() && info.surface) {
      setTimeout(function() {
        info.surface.rerenderDomSelection();
      });
    }
  };
};

Substance.initClass(TextProperty);

TextProperty.ContentView = NodeView.extend({
  createElement: function() {
    return document.createDocumentFragment();
  }
});

module.exports = TextProperty;

},{"../basics":115,"../document":141,"./annotation_view":156,"./node_view":162}],167:[function(require,module,exports){
var Substance = require("../basics");

function Tool() {
  Substance.EventEmitter.call(this);

  this.state = {
    // if the tool can be applied at all
    enabled: false,
    // if the tool has been applied and can be toggled
    selected: false
  };
}

Tool.Prototype = function() {

  this.needsEnabledSurface = true;

  this.getName = function() {
    return this.constructor.static.name;
  };

  this.getSurface = function() {
    return this.surface;
  };

  this.getDocument = function() {
    var surface = this.getSurface();
    if (surface) {
      return surface.getDocument();
    }
  };

  this.getContainer = function() {
    var surface = this.getSurface();
    if (surface) {
      var editor = surface.getEditor();
      if (editor.isContainerEditor()) {
        return editor.getContainer();
      }
    }
  };

  this.setToolState = function(newState) {
    var oldState = this.state;
    this.state = newState;
    this.emit('toolstate:changed', newState, this, oldState);
  };

  this.getToolState = function() {
    return this.state;
  };

  this.setEnabled = function() {
    this.setToolState({
      enabled: true,
      selected: false
    });
  };

  this.setDisabled = function() {
    this.setToolState({
      enabled: false,
      selected: false
    });
  };

  this.disableTool = function() {
    console.error('DEPRICATED: use tool.setDisabled()');
    this.setDisabled();
  };

  this.setSelected = function() {
    this.setToolState({
      enabled: true,
      selected: true
    });
  };

  /* jshint unused:false */
  this.update = function(surface, sel) {
    this.surface = surface;
    if (this.needsEnabledSurface && !surface.isEnabled()) {
      return this.setDisabled(false);
    }
  };
};

Substance.inherit(Tool, Substance.EventEmitter);

module.exports = Tool;

},{"../basics":115}],168:[function(require,module,exports){
"use strict";

var Substance = require('../basics');
var _ = require("../basics/helpers");

var ToolManager = function(doc, options) {
  this.doc = doc;
  this.tools = {};
  this.isToolEnabled = options.isToolEnabled;
};

ToolManager.Prototype = function() {

  this.registerTool = function(tool, name) {
    name = name || Substance.uuid();
    this.tools[name] = tool;
    if (tool.name) {
      throw new Error("Tool has already been registered");
    }
    // HACK! we store a name on the tool for later decision making
    tool.name = name;
  };

  this.unregisterTool = function(tool) {
    _.each(this.tools, function(t, name) {
      if (tool === t) {
        delete this.tools[name];
      }
    }, this);
  };

  this.updateTools = function(sel) {
    _.each(this.tools, function(tool) {
      if (this.isToolEnabled(tool.name)) {
        tool.updateToolState(sel);
      } else {
        tool.disableTool();
      }
    }.bind(this));
  };
};

Substance.initClass(ToolManager);

module.exports = ToolManager;

},{"../basics":115,"../basics/helpers":114}],169:[function(require,module,exports){
"use strict";

var Substance = require('../basics');

// ToolProxy is used by Tools to access the currently active Surface.
// Usually this is used as a mixin for an application managed class.
function ToolProxy() {}

ToolProxy.Prototype = function() {

  // Provides access to the currently active surface.
  //
  this.getSurface = function() {
    throw new Error('This method must be implemented.');
  };

  this.isToolDisabled = function(name) {
    return (this._disabledTools_ && Substance.includes(this._disabledTools_, name));
  };

  // Disable tools with given names.
  // Usually tools are enabled considering a current selection.
  // Disabling this way is like blacklisting a tool from that mechanism.
  this.disableTools = function(names) {
    this._disabledTools_ = names;
  };

};

Substance.initClass(ToolProxy);

module.exports = ToolProxy;

},{"../basics":115}],170:[function(require,module,exports){
"use strict";

var Substance = require('../basics');

var ToolRegistry = function() {
  Substance.Registry.call(this);
};

ToolRegistry.Prototype = function() {

  this.registerTools = function(toolClasses) {
    for (var i = 0; i < toolClasses.length; i++) {
      var name = toolClasses[i].static.name;
      if (!name) {
        throw new Error('Contract: a Tool class must have a name.');
      }
      this.add(name, toolClasses[i]);
    }
  };

};

Substance.inherit(ToolRegistry, Substance.Registry);

module.exports = ToolRegistry;

},{"../basics":115}],171:[function(require,module,exports){
(function() {
var Substance = require('./index');
/* global define, Ember */
define('substance', [], function() { return Substance; });
})();

},{"./index":1}]},{},[171]);
