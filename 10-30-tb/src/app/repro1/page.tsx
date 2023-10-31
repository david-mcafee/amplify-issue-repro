"use client";

import Link from "next/link";
import { generateClient } from "aws-amplify/api";
import { Schema } from "../../../amplify/data/resource";
import { useEffect } from "react";

const client = generateClient<Schema>();

export default function Page({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    console.log("client", client.models);
  }, []);
  // const { todos } = client.models.query;
  return (
    <section>
      <h1>TypeBeast Testing</h1>
      <Link href="/">home</Link>
      {/* {todos.map((todo: any) => (
        <li key={todo.id}>{todo.content}</li>
      ))} */}
      {children}
    </section>
  );
}
