import React from "react";
import "./App.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "aws-amplify";
import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";
import { GraphQLQuery } from "@aws-amplify/api";
import {
  ListRealEstatePropertiesQuery,
  RealEstateProperty,
  CreateRealEstatePropertyInput,
  CreateRealEstatePropertyMutation,
} from "./API";

function App() {
  // Access the client
  const queryClient = useQueryClient();

  // Simple GraphQL API query
  async function getRealEstateProperties() {
    const allRealEstateProperties = await API.graphql<
      GraphQLQuery<ListRealEstatePropertiesQuery>
    >({
      query: queries.listRealEstateProperties,
    });

    return allRealEstateProperties.data?.listRealEstateProperties?.items;
  }

  async function postRealEstateProperty(
    realEstatePropertyDetails: CreateRealEstatePropertyInput
  ) {
    const newRealEstateProperty = await API.graphql<
      GraphQLQuery<CreateRealEstatePropertyMutation>
    >({
      query: mutations.createRealEstateProperty,
      variables: { input: realEstatePropertyDetails },
    });

    console.log(newRealEstateProperty);
    return newRealEstateProperty;
  }

  // TanStack Queries
  const query = useQuery({
    queryKey: ["realEstateProperties"],
    queryFn: getRealEstateProperties,
  });

  // TanStack Mutations
  const mutation = useMutation({
    mutationFn: postRealEstateProperty,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["realEstateProperties"] });
    },
  });

  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {/* @ts-ignore */}
          {query.data?.map((realEstateProperty: RealEstateProperty) => (
            <li key={realEstateProperty.id}>{realEstateProperty.name}</li>
          ))}
        </ul>

        <button
          onClick={() => {
            mutation.mutate({
              name: "New Home 1",
              address: "12345 Main St",
            });
          }}
        >
          Add RealEstateProperty
        </button>
      </header>
    </div>
  );
}

export default App;
