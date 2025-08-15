const ArrayCodeSnippets = {
    Python: {
      append: "array.append(value)",
      insert: "array.insert(index, value)",
      remove: "array.pop(index)",
      clear: "array.clear()",
      access: "element = array[index]",
    },
    JavaScript: {
      append: "array.push(value);",
      insert: "array.splice(index, 0, value);",
      remove: "array.splice(index, 1);",
      clear: "array = [];",
      access: "const element = array[index];",
    },
    Java: {
      append: "arrayList.add(value);",
      insert: "arrayList.add(index, value);",
      remove: "arrayList.remove(index);",
      clear: "arrayList.clear();",
      access: "String element = arrayList.get(index);",
    },
    Cpp: {
      append: "array.push_back(value);",
      insert: "array.insert(array.begin() + index, value);",
      remove: "array.erase(array.begin() + index);",
      clear:
        "// Clear all elements\narray.clear();",
      access: "int element = array[index];",
    },
  };
  
  export default ArrayCodeSnippets;
  