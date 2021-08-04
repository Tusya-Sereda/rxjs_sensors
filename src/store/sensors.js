import { Subject } from "rxjs";
import { pluck, distinctUntilChanged } from "rxjs/operators";
import setRandomInterval from "set-random-interval";
import { SENSORS_KEYS } from "../utils/constants";

const subject = new Subject();

const initialState = {};

SENSORS_KEYS.forEach((sensorKey) => {
  initialState[sensorKey] = 0;
});

let state = initialState;

const sensorsStore = {
  init: () => {
    mockServer(SENSORS_KEYS);
  },
  subscribeOnStore: (callback) => subject.subscribe(callback),
  subscribeOnSensor: (callback, sensorKey) => {
    subject
      .pipe(pluck(sensorKey), distinctUntilChanged())
      .subscribe((_state) => callback(_state, sensorKey));
  },
  updateSensorData: (sensorKey, sensorValue) => {
    state = {
      ...state,
      [sensorKey]: sensorValue,
    };
    subject.next(state);
  },
  initialState,
};

// mock server to emulate random data
function mockServer(sensors) {
  sensors.forEach((sensorKey) => {
    setRandomInterval(
      () => {
        sensorsStore.updateSensorData(sensorKey, Math.random());
      },
      200,
      1500
    );
  });
}

export default sensorsStore;
