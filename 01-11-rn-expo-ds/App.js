import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { Amplify } from "aws-amplify";
import amplifyconfig from "./src/amplifyconfiguration.json";
import { DataStore } from "aws-amplify/datastore";
import { ExpoSQLiteAdapter } from "@aws-amplify/datastore-storage-adapter/ExpoSQLiteAdapter";

Amplify.configure(amplifyconfig);

DataStore.configure({
  storageAdapter: ExpoSQLiteAdapter,
});

export default function App() {
  const [posts, setPosts] = useState([]);

  async function createPost() {
    try {
      const post = await DataStore.save(
        new Post({
          title: "My First Post",
        })
      );
      console.log("Post saved successfully!", post);
      setPosts([post]);
    } catch (error) {
      console.log("Error saving post", error);
    }
  }

  async function getPosts() {
    try {
      const posts = await DataStore.query(Post);
      console.log(
        "Posts retrieved successfully!",
        JSON.stringify(posts, null, 2)
      );
      setPosts(posts);
    } catch (error) {
      console.log("Error retrieving posts", error);
    }
  }

  return (
    <View style={styles.container}>
      <Button onPress={createPost}>Create Post</Button>
      <Button onPress={getPosts}>Get Posts</Button>
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
