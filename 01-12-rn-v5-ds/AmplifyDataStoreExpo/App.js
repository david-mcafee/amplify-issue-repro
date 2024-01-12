import "core-js/full/symbol/async-iterator";

import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";

import { Amplify, DataStore, Predicates } from "aws-amplify";
import amplifyconfig from "./src/amplifyconfiguration.json";
// import { DataStore } from "aws-amplify/datastore";
// import { ExpoSQLiteAdapter } from "@aws-amplify/datastore-storage-adapter/ExpoSQLiteAdapter";
import { Todo } from "./src/models";

Amplify.Logger.LOG_LEVEL = "DEBUG";

Amplify.configure(amplifyconfig);

// DataStore.configure({
//   storageAdapter: ExpoSQLiteAdapter,
// });

export default function App() {
  const [todos, setTodos] = useState([]);

  async function createTodo() {
    try {
      const todo = await DataStore.save(
        new Todo({
          name: "My First Todo",
        })
      );
      console.log("Todo saved successfully!", todo);
      setTodos([todo]);
    } catch (error) {
      console.log("Error saving todo", error);
    }
  }

  async function getTodos() {
    try {
      const todos = await DataStore.query(Todo);
      console.log(
        "Todos retrieved successfully!",
        JSON.stringify(todos, null, 2)
      );
      setTodos(todos);
    } catch (error) {
      console.log("Error retrieving todos", error);
    }
  }

  async function deleteAllTodos() {
    try {
      await DataStore.delete(Todo, Predicates.ALL);
      console.warn("Delete Success");
    } catch (e) {
      console.warn("Error on delete");
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Button onPress={createTodo} title={"Create Todo"} />
        <Button onPress={getTodos} title={"Get Todos"} />
        <Text>{JSON.stringify(todos, null, 2)}</Text>
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
