import { useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

export default function Customer4List() {
  const client = generateClient<Schema>();

  const [customer4Id, setCustomer4Id] = useState<string>('');

  async function getCustomer4() {
    const response = await client.models.Customer4.get({ id: customer4Id }, { 
      selectionSet: ["id", "name", "additionalInfo.*"],
    });
    console.log('response', response);
  }

  async function listCustomer4s() {
    const response = await client.models.Customer4.list({ 
      selectionSet: ["id", "name", "additionalInfo.*"],
    });
    console.log('response', response);
  }

  async function listCustomer4s2() {
    const response = await client.models.Customer4.list({
      sortDirection: 'ASC',
    });
    console.log('response', response);
  }

  /**
   * 
   */
  async function indexQueryWithSelectionSet() {
    const response = await client.models.Customer4.listByAccountRepresentative4Id({
      accountRepresentative4Id: "123"
    }, { 
      selectionSet: ["id", "name", "additionalInfo.*"],
    });

    console.log('response', response);
  }

  return (
    <div>
      <h1>test case: index query where both data and errors are returned</h1>
      <button onClick={async () => {
        const { data: note } = await client.models.Note.create({
          content: 'note content',
        });

        if (!note) {
          console.error('note is not created');
          return;
        }

        // create a new Customer4 with the following attributes
        const {data: customer4} = await client.models.Customer4.create({
          name: `${Date.now()}`,
          accountRepresentative4Id: '123',
          additionalInfo: note
        })

        console.log('customer4', customer4);
        console.log('note', note);

        if (!customer4) {
          console.error('customer4 is not created');
          return;
        }

        setCustomer4Id(customer4.id);
      }}>Create</button>
      <button onClick={getCustomer4}>get customer4 and note</button>
      <button onClick={listCustomer4s}>list customer4s and notes</button>
      <button onClick={indexQueryWithSelectionSet}>indexQueryWithSelectionSet</button>
    </div>
  );
}