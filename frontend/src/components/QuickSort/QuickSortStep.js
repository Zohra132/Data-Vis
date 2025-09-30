export const quickSortStep = async (
  arr,
  onPassComplete,
  onComplete,  
  addHistory,
  delay = 500,
) => {
  let arrCopy = [...arr];
  let finalized = [];
  let pivotIndex = arrCopy.length-1;
  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  //recurse
  const sort = async (segments, depth = 0) => {
    if (segments.length === 0) return;

    const nextSegments = [];
    const pivotIndices = [];

    // #1 Identify pivot positions to highlight
    const pivotHighlights = segments
      .filter(([low, high]) => low <= high) //get all valid segments 
      .map(([low, high]) => high); //get the 'high' value (which are the new pivots)

      
    await sleep(delay);
    onPassComplete({
      array: [...arrCopy],
      pivotIndices: [...pivotHighlights],
      finalized: [...finalized],
      depth,
    });
    

    // #2 Perform partitioning (swaps)
    for (const [low, high] of segments) {
      if (low > high) continue;  

      if (low === high) {
        pivotIndex = high;
      }
      
      const pivot = arrCopy[high];
      addHistory?.("Pivot Selected", [high, pivot], arrCopy);
      let i = low - 1;
      for (let j = low; j < high; j++) {
        if (arrCopy[j] < pivot) {
          i++;
          [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
        }
      }

      [arrCopy[i + 1], arrCopy[high]] = [arrCopy[high], arrCopy[i + 1]];
      pivotIndex = i + 1;
      pivotIndices.push(pivotIndex);

      // Collect next segments
      nextSegments.push([low, pivotIndex - 1]);
      nextSegments.push([pivotIndex + 1, high]);
    }

    await sleep(delay);
    for (const pi of pivotIndices) {
      addHistory?.("Pivot Placed", [pi, arrCopy[pi]], arrCopy);
    }

    // #3 Finalize pivot(s) and show updated array
    finalized = [...finalized, ...pivotIndices];

    // Recurse deeper
    await sort(nextSegments, depth + 1);
  };

  await sort([[0, arrCopy.length - 1]], 0);  //start sort from the whole arrasy (aka index 0 to length-1), and initial depth is 0

  await sleep(delay);
  addHistory?.("Sorting Complete", [], arrCopy);
  onComplete?.(arrCopy);
};

