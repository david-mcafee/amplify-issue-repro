import "@azure/core-asynciterator-polyfill";

import { Amplify } from "aws-amplify";
import { DataStore } from "aws-amplify/datastore";
import amplifyconfig from "./src/amplifyconfiguration.json";
Amplify.configure(amplifyconfig);

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { Todo } from "./src/models";

export default function App() {
  async function createTodo() {
    try {
      const todo = await DataStore.save(
        new Todo({
          name: "My First Todo",
        })
      );
      console.log("Todo saved successfully!", todo);
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
    } catch (error) {
      console.log("Error retrieving todos", error);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button onPress={createTodo} title="Create Todo" />
      <Button onPress={getTodos} title="Get Todos" />
      <StatusBar style="auto" />
    </View>
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
