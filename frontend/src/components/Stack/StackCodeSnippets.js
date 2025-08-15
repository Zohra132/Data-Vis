const StackCodeSnippets = {
    Python: {
      push: "stack.append(value)",
      pop: "stack.pop()",
      clear: "stack.clear()",
      top: "top = stack[-1]",
      resize: "# Resize is implicit in Python lists\nstack = []",
    },
    JavaScript: {
      push: "stack.push(value);",
      pop: "stack.pop();",
      clear: "stack = [];",
      top: "const top = stack[stack.length - 1];",
      resize: "// Resize is implicit in JS arrays\nstack = [];",
    },
    Java: {
      push: "stack.push(value);",
      pop: "stack.pop();",
      clear: "stack.clear();",
      top: "String top = stack.peek();",
      resize:
        "// Arrays are fixed size in Java.\n" +
        "// To resize, create a new array and copy elements:\n" +
        "int[] newArray = new int[newSize];\n" +
        "System.arraycopy(oldArray, 0, newArray, 0, Math.min(oldArray.length, newSize));\n" +
        "// Or use a resizable collection like ArrayList instead.",
    },
    Cpp: {
        push: "stack.push_back(value);",
        pop: "stack.pop_back();",
        clear: "stack.clear();",
        top: "int top = stack.back();",
        resize:
          "// Resize using std::vector:\n" +
          "stack.resize(newSize);",
    },
    
  };
  export default StackCodeSnippets;
  