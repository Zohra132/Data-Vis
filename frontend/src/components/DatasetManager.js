import { useEffect, useState } from "react";
import { getDatasets, saveDataset } from "../utils/api";

export default function DatasetManager() {
  const [datasets, setDatasets] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetchDatasets();
  }, []);

  const fetchDatasets = async () => {
    const data = await getDatasets();
    setDatasets(data);
  };

  const handleSave = async () => {
    // Example dataset: random numbers
    const data = { values: [Math.random(), Math.random()] };
    await saveDataset(name, data);
    fetchDatasets();
  };

  return (
    <div>
      <input
        placeholder="Dataset Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSave}>Save Dataset</button>

      <ul>
        {datasets.map((ds) => (
          <li key={ds.id}>
            {ds.name}: {JSON.stringify(ds.data)}
          </li>
        ))}
      </ul>
    </div>
  );
}
