import { useState, useLayoutEffect, useRef } from "react";
import sensorsStore from "../store/sensors";

export default function ViewObject({ sensorKey }) {
  const [sensorData, setSensorData] = useState(0);
  const availabilityTimeout = useRef();

  useLayoutEffect(() => {
    sensorsStore.subscribeOnSensor((sensorValue) => {
      clearTimeout(availabilityTimeout.current);
      setSensorData(sensorValue);
      availabilityTimeout.current = setTimeout(() => {
        setSensorData(0);
      }, 1300);
    }, sensorKey);

    return () => {
      clearTimeout(availabilityTimeout.current);
    };
  }, [sensorKey]);

  return (
    <div className="view-object">
      <div className="view-object-title">{sensorKey}</div>
      <div className="view-object-data">{sensorData || "No data"}</div>
    </div>
  );
}
