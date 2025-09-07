import { useState } from "react";
import monuments from "../data/monuments.json";

function Location() {
  const [selected, setSelected] = useState(monuments[0]);

  return (
    <section id="location" className="p-10 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-4">Find Monuments on Map</h2>

      <div className="flex flex-col items-center space-y-4">
        <select
          className="p-2 border rounded-md"
          value={selected.name}
          onChange={(e) =>
            setSelected(monuments.find((m) => m.name === e.target.value))
          }
        >
          {monuments.map((mon) => (
            <option key={mon.name} value={mon.name}>
              {mon.name}
            </option>
          ))}
        </select>

        <iframe
          title="map"
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            selected.location
          )}&output=embed`}
          className="w-full md:w-3/4 h-96 rounded-lg shadow-md"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}

export default Location;
