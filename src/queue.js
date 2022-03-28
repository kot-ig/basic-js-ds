const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  constructor() {
    this._queue = null;
    this._pointer = this._queue;
  }

  getUnderlyingList() {
    return this._queue;
  }

  enqueue(value) {
    const node = new ListNode(value);
    this._queue = this._queue || node;

    if (this._pointer) {
      this._pointer.next = node;
    }
    this._pointer = node;
  }

  dequeue() {
    if (!this._queue) {
      throw Error('the Queue is empty');
    }

    const value = this._queue.value;
    this._queue = this._queue.next;
    return value;
  }
}

module.exports = {
  Queue
};
