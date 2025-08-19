/**
 * Uses async/await and iterative loops
 */
export const bubbleSortStep = async (
    arr,
    onStep,
    onPassComplete,
    onFinish,
    addHistory
  ) => {
    const n = arr.length;
    let arrCopy = [...arr];
  
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        //compare
        addHistory("compare", [j, j + 1], arrCopy);
        onStep([...arrCopy], [j, j + 1], n - i);
        await new Promise((res) => setTimeout(res, 400));
  
        // Swap if needed
        if (arrCopy[j] > arrCopy[j + 1]) {
          [arrCopy[j], arrCopy[j + 1]] = [arrCopy[j + 1], arrCopy[j]];
          addHistory("swap", [j, j + 1], arrCopy);
          onStep([...arrCopy], [j, j + 1], n - i);
          await new Promise((res) => setTimeout(res, 400));
        }
      }

      if (onPassComplete) {
        onPassComplete([...arrCopy], i);
      }
    }
  
    if (onFinish) {
      onFinish([...arrCopy]);
    }
  };
  