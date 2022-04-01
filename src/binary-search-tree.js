const {Node} = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const node = new Node(+data);
    this._root = this._root || node;

    let pointer = this._root;

    while (pointer) {
      if (pointer.data === node.data) {
        pointer = null;
      } else if (data < pointer.data) {
        pointer.left = pointer.left || node;
        pointer = pointer.left;
      } else {
        pointer.right = pointer.right || node;
        pointer = pointer.right;
      }
    }
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    let pointer = this._root;

    while (pointer) {
      if (pointer.data === data) return pointer;

      if (data < pointer.data) {
        pointer = pointer.left;
      } else {
        pointer = pointer.right;
      }
    }
    return null;
  }

  remove(data) {
    const SECTION = {
      left: 'left',
      right: 'right',
    };
    let parent = null,
      section,
      targetNode = null,
      leftBranch = null,
      rightBranch = null;

    let pointer = this._root;
    while (pointer) {
      if (pointer.data === data) {
        targetNode = pointer;
        pointer = null;
      } else if (data < pointer.data) {
        parent = pointer;
        section = SECTION.left;
        pointer = pointer.left;
      } else {
        parent = pointer;
        section = SECTION.right;
        pointer = pointer.right;
      }
    }

    //all preparations are done. We have parentNode, targetNode, left and right branches
    //eliminate target node from the tree
    if (targetNode) {
      ({left: leftBranch, right: rightBranch} = targetNode);
      targetNode.left = null;
      targetNode.right = null;
    }
    //

    //perform replacement
    if (targetNode) {
      let replacementNode = null;

      if (leftBranch && rightBranch) {
        //target has both branches
        //get min node at the right section
        let minParent = rightBranch;
        let rightMin = minParent.left;

        while (rightMin && rightMin.left) {
          minParent = rightMin;
          rightMin = rightMin.left;
        }

        if (rightMin) {
          replacementNode = rightMin;
          minParent.left = rightMin.right;
          replacementNode.left = leftBranch;
          replacementNode.right = rightBranch;
        } else {
          replacementNode = minParent;
          replacementNode.left = leftBranch;
        }
      } else if (leftBranch) {
        //target has only left branch
        replacementNode = leftBranch;
      } else if (rightBranch) {
        //target has only right branch
        replacementNode = rightBranch;
      }

      if (!parent) {
        this._root = replacementNode;
      } else if (parent) {
        parent[section] = replacementNode;
      }
    }
  }

  min() {
    let min;
    let pointer = this._root;

    while (pointer) {
      min = pointer.data;
      pointer = pointer.left;
    }

    return min;
  }

  max() {
    let pointer = this._root;
    let max = null;

    while (pointer) {
      max = pointer.data;
      pointer = pointer.right;
    }
    return max;
  }
}

module.exports = {
  BinarySearchTree,
};
