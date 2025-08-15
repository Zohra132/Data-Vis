const SinglyLLCodeSnippets = {
    Python: {
      append: `
  # Append a node at the end
  new_node = Node(value)
  if head is None:
      head = new_node
  else:
      current = head
      while current.next:
          current = current.next
      current.next = new_node
      `,
      insert: `
  # Insert a node at a given position
  new_node = Node(value)
  if position == 0:
      new_node.next = head
      head = new_node
  else:
      current = head
      for _ in range(position - 1):
          current = current.next
      new_node.next = current.next
      current.next = new_node
      `,
      remove: `
  # Remove node at position
  if position == 0:
      head = head.next
  else:
      current = head
      for _ in range(position - 1):
          current = current.next
      current.next = current.next.next
      `,
      clear: "head = None  # Clear entire list",
      access: `
  # Access element at index
  current = head
  for _ in range(index):
      current = current.next
  element = current.data
      `,
    },
  
    JavaScript: {
      append: `
  // Append a node at the end
  const newNode = { data: value, next: null };
  if (!head) head = newNode;
  else {
    let current = head;
    while (current.next) current = current.next;
    current.next = newNode;
  }
      `,
      insert: `
  // Insert at position
  const newNode = { data: value, next: null };
  if (position === 0) {
    newNode.next = head;
    head = newNode;
  } else {
    let current = head;
    for (let i = 0; i < position - 1; i++) {
      current = current.next;
    }
    newNode.next = current.next;
    current.next = newNode;
  }
      `,
      remove: `
  // Remove at position
  if (position === 0) {
    head = head.next;
  } else {
    let current = head;
    for (let i = 0; i < position - 1; i++) {
      current = current.next;
    }
    current.next = current.next.next;
  }
      `,
      clear: "head = null; // Clear entire list",
      access: `
  // Access element at index
  let current = head;
  for (let i = 0; i < index; i++) {
    current = current.next;
  }
  const element = current.data;
      `,
    },
  
    Java: {
      append: `
  // Append node at end
  Node newNode = new Node(value);
  if (head == null) {
    head = newNode;
  } else {
    Node current = head;
    while (current.next != null) {
      current = current.next;
    }
    current.next = newNode;
  }
      `,
      insert: `
  // Insert node at position
  Node newNode = new Node(value);
  if (position == 0) {
    newNode.next = head;
    head = newNode;
  } else {
    Node current = head;
    for (int i = 0; i < position - 1; i++) {
      current = current.next;
    }
    newNode.next = current.next;
    current.next = newNode;
  }
      `,
      remove: `
  // Remove node at position
  if (position == 0) {
    head = head.next;
  } else {
    Node current = head;
    for (int i = 0; i < position - 1; i++) {
      current = current.next;
    }
    current.next = current.next.next;
  }
      `,
      clear: "head = null; // Clear entire list",
      access: `
  // Access element at index
  Node current = head;
  for (int i = 0; i < index; i++) {
    current = current.next;
  }
  int element = current.data;
      `,
    },
  
    Cpp: {
      append: `
  // Append node at end
  Node* newNode = new Node(value);
  if (head == nullptr) {
    head = newNode;
  } else {
    Node* current = head;
    while (current->next != nullptr) {
      current = current->next;
    }
    current->next = newNode;
  }
      `,
      insert: `
  // Insert node at position
  Node* newNode = new Node(value);
  if (position == 0) {
    newNode->next = head;
    head = newNode;
  } else {
    Node* current = head;
    for (int i = 0; i < position - 1; i++) {
      current = current->next;
    }
    newNode->next = current->next;
    current->next = newNode;
  }
      `,
      remove: `
  // Remove node at position
  if (position == 0) {
    Node* temp = head;
    head = head->next;
    delete temp;
  } else {
    Node* current = head;
    for (int i = 0; i < position - 1; i++) {
      current = current->next;
    }
    Node* temp = current->next;
    current->next = current->next->next;
    delete temp;
  }
      `,
      clear: `
  // Clear entire list
  while (head != nullptr) {
    Node* temp = head;
    head = head->next;
    delete temp;
  }
      `,
      access: `
  // Access element at index
  Node* current = head;
  for (int i = 0; i < index; i++) {
    current = current->next;
  }
  int element = current->data;
      `,
    },
  };
  
  export default SinglyLLCodeSnippets;
  