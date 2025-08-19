// BSTTraversals.js

/** Preorder: Root -> Left -> Right */
export const preorderTraversal = (node, result = []) => {
    if (!node) return result;
    result.push(node.value);
    preorderTraversal(node.left, result);
    preorderTraversal(node.right, result);
    return result;
  };
  
  /** Inorder: Left -> Root -> Right */
  export const inorderTraversal = (node, result = []) => {
    if (!node) return result;
    inorderTraversal(node.left, result);
    result.push(node.value);
    inorderTraversal(node.right, result);
    return result;
  };
  
  /** Postorder: Left -> Right -> Root */
  export const postorderTraversal = (node, result = []) => {
    if (!node) return result;
    postorderTraversal(node.left, result);
    postorderTraversal(node.right, result);
    result.push(node.value);
    return result;
  };
  