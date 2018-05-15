/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

var _assign = require('object-assign');

var ReactUpdates = require('./ReactUpdates');
var Transaction = require('./Transaction');

var emptyFunction = require('fbjs/lib/emptyFunction');
// 重置事务
var RESET_BATCHED_UPDATES = {
  initialize: emptyFunction,
  // 事务结束，那么就是批量更新的结束
  close: function () {
    ReactDefaultBatchingStrategy.isBatchingUpdates = false;
  }
};
// 批量更新事务
var FLUSH_BATCHED_UPDATES = {
  initialize: emptyFunction,
  // 主要的更新逻辑在这里
  close: ReactUpdates.flushBatchedUpdates.bind(ReactUpdates)
};
// 组合wrapper
var TRANSACTION_WRAPPERS = [FLUSH_BATCHED_UPDATES, RESET_BATCHED_UPDATES];
// 调用事务的基类中reinitializeTransaction方法来初始化
function ReactDefaultBatchingStrategyTransaction() {
  this.reinitializeTransaction();
}

_assign(ReactDefaultBatchingStrategyTransaction.prototype, Transaction, {
  getTransactionWrappers: function () {
    return TRANSACTION_WRAPPERS;
  }
});
// 实例化事务
var transaction = new ReactDefaultBatchingStrategyTransaction();

var ReactDefaultBatchingStrategy = {
  isBatchingUpdates: false,

  /**
   * Call the provided function in a context within which calls to `setState`
   * and friends are batched such that components aren't updated unnecessarily.
   */
  // 首次渲染中，callback函数是挂载batchedMountComponentIntoNode，a是生成的真实dom，b是容器
  batchedUpdates: function (callback, a, b, c, d, e) {
    // 判断是否批量更新过，首次渲染肯定是false
    var alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates;

    ReactDefaultBatchingStrategy.isBatchingUpdates = true;

    // The code is written this way to avoid extra allocations
    if (alreadyBatchingUpdates) {
      return callback(a, b, c, d, e);
    } else {
      // // 首次渲染，肯定是false，执行事务，callback为batchedMountComponentIntoNode
      return transaction.perform(callback, null, a, b, c, d, e);
    }
  }
};

module.exports = ReactDefaultBatchingStrategy;