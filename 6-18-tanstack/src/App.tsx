import React, { useState } from "react";
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
  GetRealEstatePropertyQuery,
  ListRealEstatePropertiesQuery,
  RealEstateProperty,
  UpdateRealEstatePropertyInput,
  UpdateRealEstatePropertyMutation,
} from "./API";
import { Loader } from "@aws-amplify/ui-react";

// https://tanstack.com/query/v5/docs/react/guides/background-fetching-indicators#displaying-global-background-fetching-loading-state
import { useIsFetching } from "@tanstack/react-query";

function GlobalLoadingIndicator() {
  const isFetching = useIsFetching();

  return isFetching ? <Loader size="large" /> : null;
}

// For generating random address
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function App() {
  const [currentRealEstatePropertyId, setCurrentRealEstatePropertyId] =
    useState<string | null>(null);

  // Access the client
  const queryClient = useQueryClient();

  // TanStack Query for listing all realEstateProperties
  const {
    data: realEstateProperties,
    isLoading,
    isSuccess,
    isError: isErrorQuery,
  } = useQuery({
    queryKey: ["realEstateProperties"],
    // TODO: improve return type
    queryFn: async (): Promise<
      (RealEstateProperty | null | undefined)[] | null | undefined
    > => {
      const response = await API.graphql<
        GraphQLQuery<ListRealEstatePropertiesQuery>
      >({
        query: queries.listRealEstateProperties,
      });

      const allRealEstateProperties =
        response?.data?.listRealEstateProperties?.items;

      if (!allRealEstateProperties) return null;

      return allRealEstateProperties;
    },
  });

  // TanStack create mutation with optimistic updates
  const createMutation = useMutation({
    mutationFn: async (
      realEstatePropertyDetails: CreateRealEstatePropertyInput
    ) => {
      const newRealEstateProperty = await API.graphql<
        GraphQLQuery<CreateRealEstatePropertyMutation>
      >({
        query: mutations.createRealEstateProperty,
        variables: { input: realEstatePropertyDetails },
      });

      console.log(newRealEstateProperty);
      return newRealEstateProperty;
    },
    // When mutate is called:
    onMutate: async (newRealEstateProperty) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["realEstateProperties"] });

      // Snapshot the previous value
      const previousRealEstateProperties = queryClient.getQueryData([
        "realEstateProperties",
      ]);

      // Optimistically update to the new value
      // TODO: fix type
      // @ts-ignore
      queryClient.setQueryData(["realEstateProperties"], (old) => [
        // TODO: fix type
        // @ts-ignore
        ...old,
        newRealEstateProperty,
      ]);

      // Return a context object with the snapshotted value
      return { previousRealEstateProperties };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newRealEstateProperty, context) => {
      queryClient.setQueryData(
        ["realEstateProperties"],
        // TODO: fix type
        // @ts-ignore
        context.previousRealEstateProperties
      );
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["realEstateProperties"] });
    },
  });

  function RealEstatePropertyDetailView() {
    const {
      data: realEstateProperty,
      isLoading,
      isSuccess,
      isError: isErrorQuery,
    } = useQuery({
      queryKey: ["realEstateProperties", currentRealEstatePropertyId],
      // TODO: improve return type
      queryFn: async (): Promise<RealEstateProperty | null | undefined> => {
        const response = await API.graphql<
          GraphQLQuery<GetRealEstatePropertyQuery>
        >({
          query: queries.getRealEstateProperty,
          variables: { id: currentRealEstatePropertyId },
        });

        console.log("RealEstatePropertyDetailView queryFn response", response);
        return response.data?.getRealEstateProperty;
      },
    });

    // TanStack update mutation with optimistic updates
    const updateMutation = useMutation({
      mutationFn: async (
        realEstatePropertyDetails: UpdateRealEstatePropertyInput
      ) => {
        const updatedRealEstateProperty = await API.graphql<
          GraphQLQuery<UpdateRealEstatePropertyMutation>
        >({
          query: mutations.updateRealEstateProperty,
          variables: { input: realEstatePropertyDetails },
        });

        console.log(updatedRealEstateProperty);
        return updatedRealEstateProperty;
      },
      // When mutate is called:
      onMutate: async (newRealEstateProperty) => {
        console.log("on mutate", newRealEstateProperty);
        // Cancel any outgoing refetches
        // (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries({
          queryKey: ["realEstateProperties", newRealEstateProperty.id],
        });

        // Snapshot the previous value
        const previousRealEstateProperty = queryClient.getQueryData([
          "realEstateProperties",
          newRealEstateProperty.id,
        ]);

        // Optimistically update to the new value
        queryClient.setQueryData(
          ["realEstateProperties", newRealEstateProperty.id],
          newRealEstateProperty
        );

        // Return a context with the previous and new realEstateProperty
        return { previousRealEstateProperty, newRealEstateProperty };
      },
      // If the mutation fails, use the context we returned above
      onError: (err, newRealEstateProperty, context) => {
        console.log("on error", newRealEstateProperty);
        queryClient.setQueryData(
          // TODO: fix type
          // @ts-ignore
          ["realEstateProperties", context.newRealEstateProperty.id],
          // TODO: fix type
          // @ts-ignore
          context.previousRealEstateProperty
        );
      },
      // Always refetch after error or success:
      onSettled: (newRealEstateProperty) => {
        console.log("on settled", newRealEstateProperty);
        queryClient.invalidateQueries({
          // TODO: fix type
          // @ts-ignore
          queryKey: ["realEstateProperties", newRealEstateProperty.id],
        });
      },
    });

    // TODO: TanStack delete mutation with optimistic updates
    const deleteMutation = useMutation({
      mutationFn: async (
        realEstatePropertyDetails: DeleteRealEstatePropertyInput
      ) => {
        const deletedRealEstateProperty = await API.graphql<
          GraphQLQuery<DeleteRealEstatePropertyMutation>
        >({
          query: mutations.deleteRealEstateProperty,
          variables: { input: realEstatePropertyDetails },
        });

        console.log(deletedRealEstateProperty);
        return deletedRealEstateProperty;
      },
      // When mutate is called:
      onMutate: async (newRealEstateProperty) => {
        // Cancel any outgoing refetches
        // (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries({
          queryKey: ["realEstateProperties", newRealEstateProperty.id],
        });

        // Snapshot the previous value
        const previousRealEstateProperty = queryClient.getQueryData([
          "realEstateProperties",
          newRealEstateProperty.id,
        ]);

        // Optimistically update to the new value
        queryClient.setQueryData(
          ["realEstateProperties", newRealEstateProperty.id],
          newRealEstateProperty
        );

        // Return a context with the previous and new realEstateProperty
        return { previousRealEstateProperty, newRealEstateProperty };
      },
      // If the mutation fails, use the context we returned above
      onError: (err, newRealEstateProperty, context) => {
        queryClient.setQueryData(
          // TODO: fix type
          // @ts-ignore
          ["realEstateProperties", context.newRealEstateProperty.id],
          // TODO: fix type
          // @ts-ignore
          context.previousRealEstateProperty
        );
      },
      // Always refetch after error or success:
      onSettled: (newRealEstateProperty) => {
        queryClient.invalidateQueries({
          // TODO: fix type
          // @ts-ignore
          queryKey: ["realEstateProperties", newRealEstateProperty.id],
        });
      },
    });

    return (
      <div style={{ border: "1px solid black" }}>
        <div>Real Estate Property Detail View</div>
        {isErrorQuery && <div>{"Problem loading Real Estate Property"}</div>}
        {isLoading && <div>{"Loading Real Estate Property..."}</div>}
        {isSuccess && realEstateProperty && (
          <div>
            <h2>{realEstateProperty.name}</h2>
            <h3>{realEstateProperty.address}</h3>
          </div>
        )}
        {realEstateProperty && (
          <div>
            <button
              key={`update-${realEstateProperty.id}`}
              onClick={() =>
                updateMutation.mutate({
                  id: realEstateProperty.id,
                  name: `Updated Home ${Date.now()}`,
                })
              }
            >
              Update
            </button>
            <button
              key={`delete-${realEstateProperty.id}`}
              onClick={() =>
                deleteMutation.mutate({
                  id: realEstateProperty.id,
                })
              }
            >
              Delete
            </button>
          </div>
        )}
      </div>
    );
  }

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

        const realEstatePropertyDetails: DeleteRealEstatePropertyInput = {
          id: realEstateProperty?.id,
        };

        const deletedRealEstateProperty = await API.graphql<
          GraphQLQuery<DeleteRealEstatePropertyMutation>
        >({
          query: mutations.deleteRealEstateProperty,
          variables: { input: realEstatePropertyDetails },
        });

        console.log("RealEstateProperty deleted: ", deletedRealEstateProperty);
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
        {isErrorQuery && <div>{"Problem loading Real Estate Properties"}</div>}
        {isLoading && <div>{"Loading Real Estate Properties..."}</div>}
        <ul>
          {/* TODO: make this work with isSuccess */}
          {isSuccess &&
            realEstateProperties?.map((realEstateProperty) => {
              if (!realEstateProperty) return null;
              return (
                <li key={realEstateProperty.id}>
                  {realEstateProperty.name}
                  <button
                    onClick={() =>
                      setCurrentRealEstatePropertyId(realEstateProperty.id)
                    }
                  >
                    Detail View
                  </button>
                </li>
              );
            })}
        </ul>
        <button
          onClick={() => {
            createMutation.mutate({
              name: `New Home ${Date.now()}`,
              address: `${
                alphabet[Math.floor(Math.random() * alphabet.length)]
              } St`,
            });
          }}
        >
          Add RealEstateProperty
        </button>
        <button onClick={deleteAll}>Delete All</button>
        {/* @ts-ignore */}
        {currentRealEstatePropertyId && <RealEstatePropertyDetailView />}
        <GlobalLoadingIndicator />
      </header>
    </div>
  );
}

export default App;
