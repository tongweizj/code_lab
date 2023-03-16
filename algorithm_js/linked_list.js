class ListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor(head = null) {
    this.head = head;
  }
  // 该方法返回链表中存在的节点数：
  size() {
    let count = 0;
    let node = this.head;
    while (node) {
      count++;
      node = node.next;
    }
    return count;
  }
  // 该方法清空链表
  clear() {
    this.head = null;
  }
  // 该方法返回链表的最后一个节点
  getLast() {
    let lastNode = this.head;
    if (lastNode) {
      while (lastNode.next) {
        lastNode = lastNode.next;
      }
    }
    return lastNode;
  }

  // 该方法返回链表第一个节点：
  getFirst() {
    return this.head;
  }

  //遍历链表
  traverseList() {
    let node = this.head;
    while (node) {
      console.log(node.data);
      node = node.next;
    }
  }
}

let node1 = new ListNode(2);
let node2 = new ListNode(5);
node1.next = node2;

let list = new LinkedList(node1);

console.log(list.head.next.data); //returns 5

console.log(list.size());

list.traverseList();

// In JavaScript, a linked list looks like this:
// const list = {
//   head: {
//     value: 6,
//     next: {
//       value: 10,
//       next: {
//         value: 12,
//         next: {
//           value: 3,
//           next: null
//         }
//       }
//     }
//   }
// }
// };
