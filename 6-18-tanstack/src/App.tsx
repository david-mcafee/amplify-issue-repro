import "./App.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "aws-amplify";
import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";
import { GraphQLQuery } from "@aws-amplify/api";
import {
  CreateRealEstatePropertyInput,
  CreateRealEstatePropertyMutation,
  DeleteRealEstatePropertyInput,
  DeleteRealEstatePropertyMutation,
  ListRealEstatePropertiesQuery,
  RealEstateProperty,
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

  // NOTE: For test / sample cleanup purposes only (not for docs example)
  async function deleteAll() {
    //region: delete realEstateProperties:
    const response = await API.graphql<
      GraphQLQuery<ListRealEstatePropertiesQuery>
    >({
      query: queries.listRealEstateProperties,
    });

    console.log(
      "RealEstateProperties to delete",
      response?.data?.listRealEstateProperties?.items
    );

    await response?.data?.listRealEstateProperties?.items.forEach(
      async (realEstateProperty) => {
        if (!realEstateProperty?.id) return;

        const todoDetails: DeleteRealEstatePropertyInput = {
          id: realEstateProperty?.id,
        };

        const deletedTodo = await API.graphql<
          GraphQLQuery<DeleteRealEstatePropertyMutation>
        >({
          query: mutations.deleteRealEstateProperty,
          variables: { input: todoDetails },
        });

        console.log("RealEstateProperty deleted: ", deletedTodo);
      }
    );
    //endregion

    //region verify all deletes were successful:
    const secondResponse = await API.graphql<
      GraphQLQuery<ListRealEstatePropertiesQuery>
    >({
      query: queries.listRealEstateProperties,
    });
    console.log(
      "RealEstateProperties should be empty:",
      secondResponse?.data?.listRealEstateProperties?.items
    );

    if (secondResponse?.data?.listRealEstateProperties?.items?.length === 0) {
      console.log("All deletes successful!");
    }
    //endregion
  }

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
        <button onClick={deleteAll}>Delete All</button>
      </header>
    </div>
  );
}

export default App;
