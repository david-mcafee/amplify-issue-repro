import "./App.css";
import React, { useRef, useState } from "react";
import { Amplify, DataStore } from "aws-amplify";
import awsconfig from "./aws-exports";
import { useEffect } from "react";
import * as models from "./models";

window.DataStore = DataStore;
window.models = models;
Amplify.configure(awsconfig);

const fields = {
  timePickedUp: "Picked up",
  timeDroppedOff: "Delivered",
  timeRiderHome: "Rider home",
};

export const tasksStatus = {
  active: "ACTIVE",
  pickedUp: "PICKED_UP",
  droppedOff: "DROPPED_OFF",
  completed: "COMPLETED",
};

export function determineTaskStatus(task) {
  if (!!!task.timePickedUp) {
    return tasksStatus.active;
  } else if (!!task.timePickedUp && !!!task.timeDroppedOff) {
    return tasksStatus.pickedUp;
  } else if (
    !!task.timePickedUp &&
    !!task.timeDroppedOff &&
    !!!task.timeRiderHome
  ) {
    return tasksStatus.droppedOff;
  } else if (
    !!task.timePickedUp &&
    !!task.timeDroppedOff &&
    !!task.timeRiderHome
  ) {
    return tasksStatus.completed;
  }
}

async function saveTaskTimeWithKey(key, value, taskId) {
  let isoString = null;
  if (value) {
    isoString = new Date(value).toISOString();
  }
  const existingTask = await DataStore.query(models.Task, taskId);
  if (!existingTask) throw new Error("Task doesn't exist");
  const status = await determineTaskStatus({
    ...existingTask,
    [key]: isoString,
  });
  return DataStore.save(
    models.Task.copyOf(existingTask, (updated) => {
      updated[key] = value ? isoString : null;
      updated.status = status;
    })
  );
}

function App() {
  const [state, setState] = useState([]);
  const [task, setTask] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const taskObserver = useRef({ unsubscribe: () => {} });
  const timeSet = useRef(null);
  const taskId = "38b35b73-2b4a-406a-bcf0-de0bc56ee8d0";
  const prevVersion = useRef(null);

  function checkDisabled(key) {
    const stopped =
      state.includes("timeCancelled") || state.includes("timeRejected");
    if (key === "timeDroppedOff")
      return (
        state.includes("timeRiderHome") ||
        !state.includes("timePickedUp") ||
        stopped
      );
    else if (key === "timePickedUp") {
      return state.includes("timeDroppedOff") || stopped;
    } else if (key === "timeRiderHome") {
      if (task && task.status === tasksStatus.new) return true;
      return !state.includes("timeDroppedOff");
    } else if (key === "timeRejected") {
      if (state.includes("timeRejected")) return false;
      return (
        (state.includes("timePickedUp") && state.includes("timeDroppedOff")) ||
        stopped
      );
    } else if (key === "timeCancelled") {
      if (state.includes("timeCancelled")) return false;
      return (
        (state.includes("timePickedUp") && state.includes("timeDroppedOff")) ||
        stopped
      );
    } else return false;
  }

  async function setTimeWithKey(key, value) {
    try {
      setIsPosting(true);
      await saveTaskTimeWithKey(key, value, taskId);
      setIsPosting(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function getTaskAndUpdateState() {
    try {
      const task = await DataStore.query(models.Task, taskId);
      if (!task) throw new Error("Task not found");
      setTask(task);
      taskObserver.current.unsubscribe();
      taskObserver.current = DataStore.observe(models.Task, taskId).subscribe(
        async ({ opType, element }) => {
          if (
            ["INSERT", "UPDATE"].includes(opType)
            // uncomment for a fix that only works while online
            //&& element._version > prevVersion.current
          ) {
            console.log(element);
            setTask(element);
            prevVersion.current = element._version;
          }
        }
      );
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => getTaskAndUpdateState(), []);

  function calculateState() {
    if (!task) return;
    const result = Object.keys(fields).filter((key) => {
      return !!task[key];
    });
    setState(result);
  }
  useEffect(calculateState, [task]);

  function onClickToggle(key, checked) {
    timeSet.current = new Date();
    setTimeWithKey(key, !checked ? null : new Date());
  }

  return (
    <div>
      {task ? task.status : ""}
      <div>
        <form class="form">
          {Object.entries(fields).map(([key, label]) => {
            return (
              <label>
                {label}
                <input
                  type="checkbox"
                  disabled={isPosting || checkDisabled(key)}
                  onChange={(e) => onClickToggle(key, e.target.checked)}
                  checked={state.includes(key)}
                />
              </label>
            );
          })}
        </form>
      </div>
      <div sx={{ width: "100%" }} direction="column">
        {Object.entries(fields).map(([key, value]) => {
          const disabled = isPosting || checkDisabled(key);
          return !disabled && <div>{value.toUpperCase()}</div>;
        })}
      </div>
    </div>
  );
}

export default App;
