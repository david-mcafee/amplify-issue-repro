// TODO: do final comparison against https://github.com/TanStack/query/tree/main/examples/react/optimistic-updates-typescript

import React, { useState } from "react";
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

// https://www.tanstack.com/query/v5/docs/react/guides/background-fetching-indicators#displaying-global-background-fetching-loading-state
import { useIsFetching } from "@tanstack/react-query";

/**
 * https://www.tanstack.com/query/v4/docs/react/guides/background-fetching-indicators#displaying-global-background-fetching-loading-state
 * For the purposes of this demo, we show a global loading indicator when *any*
 * queries are fetching (including in the background). See the docs for more on
 * showing an indicator for individual query loading states.
 */
function GlobalLoadingIndicator() {
  const isFetching = useIsFetching();

  // TODO: spinner?
  return isFetching ? (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        border: "2px solid blue",
        pointerEvents: "none",
        background: "rgba(255, 255, 255, 0.5)",
      }}
    ></div>
  ) : null;
}

function App() {
  const [currentRealEstatePropertyId, setCurrentRealEstatePropertyId] =
    useState<string | null>(null);
  const [isDetailView, setDetailView] = useState<boolean>(false);

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

      // TODO: type
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
    onMutate: async (newRealEstateProperty: CreateRealEstatePropertyInput) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["realEstateProperties"] });

      // Snapshot the previous value
      const previousRealEstateProperties = queryClient.getQueryData<any>([
        "realEstateProperties",
      ]);

      // Optimistically update to the new value
      if (previousRealEstateProperties) {
        queryClient.setQueryData<any>(["realEstateProperties"], (old: any) => [
          ...old,
          newRealEstateProperty,
        ]);
      }

      // Return a context object with the snapshotted value
      return { previousRealEstateProperties };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newRealEstateProperty, context) => {
      if (context?.previousRealEstateProperties) {
        queryClient.setQueryData(
          ["realEstateProperties"],
          context.previousRealEstateProperties
        );
      }
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
        if (context?.previousRealEstateProperty) {
          queryClient.setQueryData(
            // TODO: fix type
            ["realEstateProperties", context.newRealEstateProperty.id],
            // TODO: fix type
            context.previousRealEstateProperty
          );
        }
      },
      // Always refetch after error or success:
      onSettled: (newRealEstateProperty) => {
        console.log("does ID exist?", newRealEstateProperty);
        console.log("does ID exist?", newRealEstateProperty);
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
        if (context?.previousRealEstateProperty) {
          queryClient.setQueryData(
            ["realEstateProperties", context.newRealEstateProperty.id],
            context.previousRealEstateProperty
          );
        }
      },
      // Always refetch after error or success:
      onSettled: (newRealEstateProperty) => {
        console.log("does ID exist?", newRealEstateProperty);
        queryClient.invalidateQueries({
          // TODO: fix type
          // @ts-ignore
          queryKey: ["realEstateProperties", newRealEstateProperty.id],
        });
      },
    });

    return (
      <div style={{ border: "1px solid black", padding: "3rem" }}>
        <h2>Real Estate Property Detail View</h2>
        {isErrorQuery && <div>{"Problem loading Real Estate Property"}</div>}
        {isLoading && <div>{"Loading Real Estate Property..."}</div>}
        {isSuccess && realEstateProperty && (
          <div>
            <p>{realEstateProperty.name}</p>
            <p>{realEstateProperty.address}</p>
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Real Estate Properties:</h1>
      <button
        onClick={() => {
          createMutation.mutate({
            name: `New Home ${Date.now()}`,
            address: `${Math.floor(1000 + Math.random() * 9000)} Main St`,
          });
        }}
      >
        Add RealEstateProperty
      </button>
      <button onClick={deleteAll}>Delete All</button>
      {isLoading && <div>{"Loading Real Estate Properties..."}</div>}
      {isErrorQuery && <div>{"Problem loading Real Estate Properties"}</div>}
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "start",
          width: "50%",
          border: "1px solid black",
          padding: "1rem",
        }}
      >
        {/* TODO: make this work with isSuccess */}
        {isSuccess &&
          realEstateProperties?.map((realEstateProperty) => {
            if (!realEstateProperty) return null;
            return (
              <li
                style={{
                  border: "1px dotted grey",
                  padding: ".25rem",
                  margin: ".1rem",
                }}
                key={realEstateProperty.id}
              >
                {realEstateProperty.name}
                <button
                  style={{ marginLeft: "1rem" }}
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
      {currentRealEstatePropertyId && <RealEstatePropertyDetailView />}
      <GlobalLoadingIndicator />
    </div>
  );
}

export default App;
