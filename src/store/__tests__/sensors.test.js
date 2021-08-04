import { waitFor } from "@testing-library/react";
import sensorsStore from "../sensors";

test("Inited sensors store", async () => {
  sensorsStore.init();
  const callback = jest.fn();
  sensorsStore.subscribeOnSensor(callback, "A");
  await waitFor(() => expect(callback).toHaveBeenCalledTimes(1));
});
