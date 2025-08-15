const ListCodeSnippets = {
    Python: {
      append: "my_list.append(value)",
      insert: "my_list.insert(index, value)",
      remove: "my_list.pop(index)  # or my_list.remove(value)",
      clear: "my_list.clear()",
      access: "element = my_list[index]",
    },
    JavaScript: {
      append: "list.push(value); // JavaScript only has arrays as lists",
      insert: "list.splice(index, 0, value);",
      remove: "list.splice(index, 1);",
      clear: "list.length = 0;",
      access: "const element = list[index];",
    },
    Java: {
      append: "list.add(value);",
      insert: "list.add(index, value);",
      remove: "list.remove(index);",
      clear: "list.clear();",
      access: "String element = list.get(index);",
    },
    Cpp: {
      append: "list.push_back(value);",
      insert: "auto it = list.begin();\nstd::advance(it, index);\nlist.insert(it, value);",
      remove: "auto it = list.begin();\nstd::advance(it, index);\nlist.erase(it);",
      clear: "list.clear();",
      access: "// std::list doesn't support direct indexing\n"
            + "auto it = list.begin();\nstd::advance(it, index);\nint element = *it;",
    },
  };
  
  export default ListCodeSnippets;
  