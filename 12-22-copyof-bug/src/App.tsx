import React from "react";
import "./App.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Habit } from "./models";

function App() {
  // As we have it in the docs:
  const testAll = async () => {
    const newHabit = await DataStore.save(
      new Habit({ name: `original ${Date.now()}`, count: 1 })
    );
    console.log("newHabit", newHabit);

    const habitJustSaved = await DataStore.query(Habit, newHabit.id);
    console.log("habitJustSaved", habitJustSaved);

    if (habitJustSaved) {
      const updatedResult = await DataStore.save(
        Habit.copyOf(habitJustSaved, (updated) => {
          // Step 3
          updated.name = `updated ${Date.now()}`;
        })
      );
      console.log("updatedResult", updatedResult);
    } else {
      console.log("habitJustSaved is null");
    }
  };

  // Customer repro code:
  // https://github.com/aws-amplify/amplify-js/issues/12729
  const testAllRapid = async () => {
    const newHabit = await DataStore.save(
      new Habit({ name: `original ${Date.now()}`, count: 1 })
    );
    console.log("newHabit", newHabit);

    const habitJustSaved = await DataStore.query(Habit, newHabit.id);
    console.log("habitJustSaved", habitJustSaved);

    const updatedResult = await DataStore.save(
      Habit.copyOf(habitJustSaved!, (updated) => {
        // Step 3
        updated.name = `updated ${Date.now()}`;
      })
    );

    console.log("updatedResult", updatedResult);
  };

  const testAllRapidWithoutQuery = async () => {
    const newHabit = await DataStore.save(
      new Habit({ name: `original ${Date.now()}`, count: 1 })
    );
    console.log("newHabit", newHabit);

    // const habitJustSaved = await DataStore.query(Habit, newHabit.id);
    // console.log("habitJustSaved", habitJustSaved);

    const updatedResult = await DataStore.save(
      Habit.copyOf(newHabit!, (updated) => {
        // Step 3
        updated.name = `updated ${Date.now()}`;
      })
    );

    console.log("updatedResult", updatedResult);
  };

  const queryAll = async () => {
    const habits = await DataStore.query(Habit);
    console.log("habits", habits);
  };

  const deleteAll = async () => {
    await DataStore.delete(Habit, Predicates.ALL);
  };

  return (
    <div className="App">
      <button onClick={testAll}>test all</button>
      <button onClick={testAllRapid}>test all rapid</button>
      <button onClick={testAllRapidWithoutQuery}>
        test all rapid without query (will fail, see p1)
      </button>
      <button onClick={queryAll}>query all</button>
      <button onClick={deleteAll}>delete all</button>
    </div>
  );
}

export default withAuthenticator(App);
