const BSTCodeSnippets = {
    Python: {
      insert: `class Node:
      def __init__(self, value):
          self.value = value
          self.left = None
          self.right = None
  
  def insert(root, value):
      if not root:
          return Node(value)
      if value < root.value:
          root.left = insert(root.left, value)
      elif value > root.value:
          root.right = insert(root.right, value)
      return root`,
      search: `def search(root, value):
      if not root:
          return False
      if root.value == value:
          return True
      elif value < root.value:
          return search(root.left, value)
      else:
          return search(root.right, value)`,
      delete: `def delete(root, value):
      if not root:
          return None
      if value < root.value:
          root.left = delete(root.left, value)
      elif value > root.value:
          root.right = delete(root.right, value)
      else:
          if not root.left:
              return root.right
          if not root.right:
              return root.left
          successor = root.right
          while successor.left:
              successor = successor.left
          root.value = successor.value
          root.right = delete(root.right, successor.value)
      return root`
    },
  
    JavaScript: {
      insert: `class Node {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
  
  function insert(root, value) {
    if (!root) return new Node(value);
    if (value < root.value) root.left = insert(root.left, value);
    else if (value > root.value) root.right = insert(root.right, value);
    return root;
  }`,
      search: `function search(root, value) {
    if (!root) return false;
    if (root.value === value) return true;
    return value < root.value 
      ? search(root.left, value) 
      : search(root.right, value);
  }`,
      delete: `function deleteNode(root, value) {
    if (!root) return null;
    if (value < root.value) root.left = deleteNode(root.left, value);
    else if (value > root.value) root.right = deleteNode(root.right, value);
    else {
      if (!root.left) return root.right;
      if (!root.right) return root.left;
      let successor = root.right;
      while (successor.left) successor = successor.left;
      root.value = successor.value;
      root.right = deleteNode(root.right, successor.value);
    }
    return root;
  }`
    },
  
    Java: {
      insert: `class Node {
      int value;
      Node left, right;
      Node(int value) { this.value = value; }
  }
  
  Node insert(Node root, int value) {
      if (root == null) return new Node(value);
      if (value < root.value) root.left = insert(root.left, value);
      else if (value > root.value) root.right = insert(root.right, value);
      return root;
  }`,
      search: `boolean search(Node root, int value) {
      if (root == null) return false;
      if (root.value == value) return true;
      return value < root.value 
          ? search(root.left, value) 
          : search(root.right, value);
  }`,
      delete: `Node delete(Node root, int value) {
      if (root == null) return null;
      if (value < root.value) root.left = delete(root.left, value);
      else if (value > root.value) root.right = delete(root.right, value);
      else {
          if (root.left == null) return root.right;
          if (root.right == null) return root.left;
          Node successor = root.right;
          while (successor.left != null) successor = successor.left;
          root.value = successor.value;
          root.right = delete(root.right, successor.value);
      }
      return root;
  }`
    }
  };
  
  export default BSTCodeSnippets;
  