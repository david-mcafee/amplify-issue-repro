import { useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

export default function Customer2List() {
  const client = generateClient<Schema>();

  const [customer2s, setCustomer2s] = useState<Schema["Customer2"][]>([]);
  const [customer2Id, setCustomer2Id] = useState<string>('');

  async function listCustomer2s() {
    const response = await client.models.Customer2.list();

    console.log('response', response);
    setCustomer2s(response?.data);
  }

  async function getCustomer2() {
    const response = await client.models.Customer2.get({ id: customer2Id });
    console.log('response', response);
  }

  /**
   * Unlike `list`, index query does not return a populated `data` object with a `null` result
   * so flattening is not required.
   */
  async function indexQueryWithoutAuth() {
    const response = await client.models.Customer2.listByAccountRepresentative2Id({
      accountRepresentative2Id: "123"
    });

    console.log('response', response);
  }

  return (
    <div>
      <h1>Testing: correct client config with incorrect auth access</h1>
      <button onClick={async () => {
        // create a new Customer2 with the following attributes
        const response = await client.models.Customer2.create({
          name: `${Date.now()}`,
          phoneNumber: '+1234567890',
          accountRepresentative2Id: '123'
        })

        console.log(response)

        const { data: customer2 } = response;
        
        if (!customer2) {
          console.error('customer2 is not created');
          return;
        }

        setCustomer2Id(customer2.id);
        
      }}>Create</button>
      <button onClick={listCustomer2s}>fetch customer2s</button>
      <button onClick={getCustomer2}>get customer2</button>
      <button onClick={indexQueryWithoutAuth}>index Query (without auth access)</button>
      <ul>
        {customer2s && customer2s.length && customer2s.map((customer2) => (
          <li key={customer2.id}>{customer2.name}</li>
        ))}
      </ul>
    </div>
  );
}