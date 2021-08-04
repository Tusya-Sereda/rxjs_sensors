import { useEffect, useState } from "react";
import ViewObject from "./ViewObject";
import sensorsStore from "../store/sensors";
import { SENSORS_KEYS } from "../utils/constants";

export default function App() {
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    sensorsStore.init();
    sensorsStore.subscribeOnStore((state) => {
      const hasDataFromEachSensors = SENSORS_KEYS.every(
        (sensorKey) => state[sensorKey] !== null
      );
      setHasData(hasDataFromEachSensors);
    });
  }, []);

  if (!hasData) {
    return <div className="loader">Waiting for data...</div>;
  }

  return (
    <div className="view-object-list">
      {SENSORS_KEYS.map((sensorKey) => (
        <ViewObject key={sensorKey} sensorKey={sensorKey} />
      ))}
    </div>
  );
}
