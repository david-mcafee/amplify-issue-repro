import { useEffect, useState } from "react";
import "./App.css";
import { DataStore } from "aws-amplify/datastore";
import { Post, PostStatus } from "./models";
// import { ConsoleLogger } from "aws-amplify/utils";
// ConsoleLogger.LOG_LEVEL = "DEBUG";

//@ts-expect-error - test
window.LOG_LEVEL = "DEBUG";

// const start = Date.now();

// Example showing how to observe the model and keep state updated before
// performing a save. This uses the useEffect React hook, but you can
// substitute for a similar mechanism in your application lifecycle with
// other frameworks.

//@ts-expect-error - testing
let sub;

function App() {
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    /**
     * This keeps `post` fresh.
     */
    sub = DataStore.observeQuery(Post).subscribe((msg) => {
      console.log("------------------------------------------");
      console.log("------------------------------------------");
      console.log("------------------------------------------");
      // console.log(`Time elapsed: ${Date.now() - start} ms`);
      const date = new Date();
      console.log(date.toLocaleString());
      console.log(msg);
      console.log("------------------------------------------");
      console.log("------------------------------------------");
      console.log("------------------------------------------");
    });

    return () => {
      //@ts-expect-error - testing
      sub.unsubscribe();
    };
  }, []);

  /**
   * Create a new Post
   */
  async function onCreate() {
    const post = await DataStore.save(
      new Post({
        title: `New title ${Date.now()}`,
        rating: Math.floor(Math.random() * (8 - 1) + 1),
        status: PostStatus.ACTIVE,
      })
    );

    setPost(post);
  }

  async function dsClear() {
    await DataStore.clear();
  }

  async function dsStop() {
    await DataStore.stop();
  }

  async function dsStart() {
    await DataStore.start();
    sub = DataStore.observeQuery(Post).subscribe((msg) => {
      console.log("SUBSCRIPTION MESSAGE-------------------");
      console.log(`Time elapsed: ${Date.now() - start} ms`);
      console.log(msg);
    });
  }

  return (
    <>
      <h1>{post?.title}</h1>
      <input type="button" value="NEW POST" onClick={onCreate} />
      <input
        disabled={!post}
        type="text"
        value={post?.title ?? ""}
        onChange={({ target: { value } }) => {
          /**
           * Each keypress updates the post in local React state.
           */
          setPost(
            Post.copyOf(post as Post, (draft) => {
              draft.title = value;
            })
          );
        }}
      />
      <input
        disabled={!post}
        type="button"
        value="Save"
        onClick={async () => {
          /**
           * This post is already up-to-date because `observeQuery` updated it.
           */
          if (!post) return;
          await DataStore.save(post);
          console.log("Post saved");
        }}
      />
      <button onClick={dsClear}>ds clear</button>
      <button onClick={dsStop}>ds stop</button>
      <button onClick={dsStart}>ds start</button>
    </>
  );
}

export default App;
