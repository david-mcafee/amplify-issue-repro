import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

export default function MessageList() {
  // generate your data client using the Schema from your backend
  const client = generateClient<Schema>();

  async function createRecords() {
    // Create parent record:
    const { data: conversation } = await client.models.Conversation.create({
      title: `${Date.now()}`,
    });

    // Create Message, include parent for `hasMany` relationship:
    const { data: message } = await client.models.Message.create({
      content: "First Message",
      conversation,
    });

    // Update conversation with last message
    const { data: updatedConversation } =
      await client.models.Conversation.update({
        id: conversation.id,
        lastMessage: message,
      });

    // Retrieve `hasMany` messages:
    const { data: newMessages } = await updatedConversation.messages();

    console.log("retrieve messages:", newMessages);

    // Retrieve last message:
    const { data: lastMessage } = await updatedConversation.lastMessage();

    console.log("retrieve last message:", lastMessage);

    // Create second Message, include parent for `hasMany`
    const { data: secondMessage } = await client.models.Message.create({
      content: "Second Message",
      conversation,
    });

    // Update conversation with last message
    const { data: updatedConversation2 } =
      await client.models.Conversation.update({
        id: conversation.id,
        lastMessage: secondMessage,
      });

    // Retrieve `hasMany` messages after second update:
    const { data: newMessages2 } = await updatedConversation2.messages();

    console.log("retrieve messages after second update:", newMessages2);

    // Retrieve last message after second update:
    const { data: lastMessage2 } = await updatedConversation2.lastMessage();

    console.log("retrieve last message after second update:", lastMessage2);
  }

  return (
    <div>
      <h1>Messages</h1>

      {/* <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.content}</li>
        ))}
      </ul> */}

      <button onClick={createRecords}>Create / retrieve records</button>
    </div>
  );
}
