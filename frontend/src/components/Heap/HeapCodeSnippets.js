const HeapCodeSnippets = {
    Python: {
      insert: `# Min Heap insert in Python
  import heapq
  heapq.heappush(heap, value)`,
      extract: `# Min Heap extract in Python
  import heapq
  min_val = heapq.heappop(heap)`,
      clear: `heap.clear()`,
    },
    JavaScript: {
      insert: `// Insert into heap
  heap.push(value);
  heapifyUp(heap);`,
      extract: `// Extract root from heap
  const root = heap[0];
  swap(heap, 0, heap.length - 1);
  heap.pop();
  heapifyDown(heap);`,
      clear: `heap = [];`,
    },
  };
  
  export default HeapCodeSnippets;
  