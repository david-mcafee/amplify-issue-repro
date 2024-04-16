import { useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

export default function CustomerList() {
  // Intentional error:
  const client = generateClient<Schema>({ authMode: "iam" });

  const [customers, setCustomers] = useState<Schema["Customer"][]>([]);
  const [customerId, setCustomerId] = useState<string>('');

  async function listCustomers() {
    const response = await client.models.Customer.list();

    console.log('response', response);
    setCustomers(response?.data);
  }

  async function getCustomer() {
    const response = await client.models.Customer.get({ id: customerId });
    console.log('response', response);
  }

  async function indexQueryWithAuth() {
    const response = await client.models.Customer.listByAccountRepresentativeId({
      accountRepresentativeId: "123"
    });

    console.log('response', response);
  }

  return (
    <div>
      <h1>Testing: bad client config with auth access</h1>
      <button onClick={async () => {
        // create a new Customer with the following attributes
        const response = await client.models.Customer.create({
          name: `${Date.now()}`,
          phoneNumber: '+1234567890',
          accountRepresentativeId: '123'
        })

        console.log(response)

        const { data: customer } = response;
        
        if (!customer) {
          console.error('customer is not created');
          return;
        }

        setCustomerId(customer.id);
        
      }}>Create</button>
      <button onClick={listCustomers}>fetch customers</button>
      <button onClick={getCustomer}>get customer</button>
      <button onClick={indexQueryWithAuth}>index Query (auth access)</button>
      <ul>
        {customers && customers.length && customers.map((customer) => (
          <li key={customer.id}>{customer.name}</li>
        ))}
      </ul>
    </div>
  );
}