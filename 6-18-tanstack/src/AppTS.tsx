import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useIsFetching } from "@tanstack/react-query";
import { API } from "aws-amplify";
import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";
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

/**
 * https://www.tanstack.com/query/v4/docs/react/guides/background-fetching-indicators#displaying-global-background-fetching-loading-state
 * For the purposes of this demo, we show a global loading indicator when *any*
 * queries are fetching (including in the background) in order to help visualize
 * what TanStack is doing in the background. This example also displays
 * indicators for individual query and mutation loading states.
 */
function GlobalLoadingIndicator() {
  const isFetching = useIsFetching();

  return isFetching ? <div style={styles.globalLoadingIndicator}></div> : null;
}

function App() {
  const [currentRealEstatePropertyId, setCurrentRealEstatePropertyId] =
    useState<string | null>(null);

  // Access the client
  const queryClient = useQueryClient();

  // TanStack Query for listing all real estate properties:
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

      // TODO: figure out return type
      if (!allRealEstateProperties) return null;

      return allRealEstateProperties;
    },
  });

  // TanStack create mutation with optimistic updates
  const createMutation = useMutation({
    mutationFn: async (
      realEstatePropertyDetails: CreateRealEstatePropertyInput
    ): Promise<RealEstateProperty | undefined | null> => {
      const response = await API.graphql<
        GraphQLQuery<CreateRealEstatePropertyMutation>
      >({
        query: mutations.createRealEstateProperty,
        variables: { input: realEstatePropertyDetails },
      });

      const newRealEstateProperty = response?.data?.createRealEstateProperty;
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
    // use the context returned from onMutate to rollback
    onError: (err, newRealEstateProperty, context) => {
      console.error("Error saving record:", err, newRealEstateProperty);
      if (context?.previousRealEstateProperties) {
        queryClient.setQueryData<RealEstateProperty>(
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

  /**
   * Note: this example does not return to the list view on delete in order
   * to demonstrate the optimistic update.
   */
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

        return updatedRealEstateProperty;
      },
      // When mutate is called:
      onMutate: async (
        newRealEstateProperty: UpdateRealEstatePropertyInput
      ) => {
        // Cancel any outgoing refetches
        // (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries({
          queryKey: ["realEstateProperties", newRealEstateProperty.id],
        });

        // Snapshot the previous value
        const previousRealEstateProperty =
          queryClient.getQueryData<RealEstateProperty>([
            "realEstateProperties",
            newRealEstateProperty.id,
          ]);

        // Optimistically update to the new value
        if (previousRealEstateProperty) {
          queryClient.setQueryData(
            ["realEstateProperties", newRealEstateProperty.id],
            /**
             * `newRealEstateProperty` will at first only include updated values for
             * the record. To avoid only rendering optimistic values for updated
             * fields on the UI, include the previous values for all fields:
             */
            { ...previousRealEstateProperty, ...newRealEstateProperty }
          );
        }

        // Return a context with the previous and new realEstateProperty
        return { previousRealEstateProperty, newRealEstateProperty };
      },
      // If the mutation fails, use the context we returned above
      onError: (err, newRealEstateProperty, context) => {
        console.error("Error updating record:", err, newRealEstateProperty);
        if (context?.previousRealEstateProperty) {
          queryClient.setQueryData<RealEstateProperty>(
            ["realEstateProperties", context.newRealEstateProperty.id],
            context.previousRealEstateProperty
          );
        }
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

    // TanStack delete mutation with optimistic updates
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

        return deletedRealEstateProperty;
      },
      // When mutate is called:
      onMutate: async (
        newRealEstateProperty: DeleteRealEstatePropertyInput
      ) => {
        // Cancel any outgoing refetches
        // (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries({
          queryKey: ["realEstateProperties", newRealEstateProperty.id],
        });

        // Snapshot the previous value
        const previousRealEstateProperty =
          queryClient.getQueryData<RealEstateProperty>([
            "realEstateProperties",
            newRealEstateProperty.id,
          ]);

        // Optimistically update to the new value
        if (previousRealEstateProperty) {
          queryClient.setQueryData<DeleteRealEstatePropertyInput>(
            ["realEstateProperties", newRealEstateProperty.id],
            newRealEstateProperty
          );
        }

        // Return a context with the previous and new realEstateProperty
        return { previousRealEstateProperty, newRealEstateProperty };
      },
      // If the mutation fails, use the context we returned above
      onError: (err, newRealEstateProperty, context) => {
        console.error("Error deleting record:", err, newRealEstateProperty);
        if (context?.previousRealEstateProperty) {
          queryClient.setQueryData<RealEstateProperty>(
            ["realEstateProperties", context.newRealEstateProperty.id],
            context.previousRealEstateProperty
          );
        }
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
      <div style={styles.detailViewContainer}>
        <h2>Real Estate Property Detail View</h2>
        {isErrorQuery && <div>{"Problem loading Real Estate Property"}</div>}
        {isLoading && (
          <div style={styles.loadingIndicator}>
            {"Loading Real Estate Property..."}
          </div>
        )}
        {isSuccess && (
          <div>
            <p>{`Name: ${realEstateProperty?.name}`}</p>
            <p>{`Address: ${realEstateProperty?.address}`}</p>
          </div>
        )}
        {realEstateProperty && (
          <div>
            <div>
              {updateMutation.isLoading ? (
                "Updating Real Estate Property..."
              ) : (
                <>
                  {updateMutation.isError &&
                  updateMutation.error instanceof Error ? (
                    <div>An error occurred: {updateMutation.error.message}</div>
                  ) : null}

                  {updateMutation.isSuccess ? (
                    <div>Real Estate Property updated!</div>
                  ) : null}

                  <button
                    onClick={() =>
                      updateMutation.mutate({
                        id: realEstateProperty.id,
                        name: `Updated Home ${Date.now()}`,
                      })
                    }
                  >
                    Update Name
                  </button>
                  <button
                    onClick={() =>
                      updateMutation.mutate({
                        id: realEstateProperty.id,
                        address: `${Math.floor(
                          1000 + Math.random() * 9000
                        )} Main St`,
                      })
                    }
                  >
                    Update Address
                  </button>
                </>
              )}
            </div>

            <div>
              {deleteMutation.isLoading ? (
                "Deleting Real Estate Property..."
              ) : (
                <>
                  {deleteMutation.isError &&
                  deleteMutation.error instanceof Error ? (
                    <div>An error occurred: {deleteMutation.error.message}</div>
                  ) : null}

                  {deleteMutation.isSuccess ? (
                    <div>Real Estate Property deleted!</div>
                  ) : null}

                  <button
                    onClick={() =>
                      deleteMutation.mutate({
                        id: realEstateProperty.id,
                      })
                    }
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        )}
        <button onClick={() => setCurrentRealEstatePropertyId(null)}>
          Back
        </button>
      </div>
    );
  }

  return (
    <div>
      {!currentRealEstatePropertyId && (
        <div style={styles.appContainer}>
          <h1>Real Estate Properties:</h1>
          <div>
            {createMutation.isLoading ? (
              "Adding Real Estate Property..."
            ) : (
              <>
                {createMutation.isError &&
                createMutation.error instanceof Error ? (
                  <div>An error occurred: {createMutation.error.message}</div>
                ) : null}

                {createMutation.isSuccess ? (
                  <div>Real Estate Property added!</div>
                ) : null}

                <button
                  onClick={() => {
                    createMutation.mutate({
                      name: `New Home ${Date.now()}`,
                      address: `${Math.floor(
                        1000 + Math.random() * 9000
                      )} Main St`,
                    });
                  }}
                >
                  Add RealEstateProperty
                </button>
              </>
            )}
          </div>
          <ul style={styles.propertiesList}>
            {isLoading && (
              <div style={styles.loadingIndicator}>
                {"Loading Real Estate Properties..."}
              </div>
            )}
            {isErrorQuery && (
              <div>{"Problem loading Real Estate Properties"}</div>
            )}
            {isSuccess &&
              realEstateProperties?.map((realEstateProperty, idx) => {
                if (!realEstateProperty) return null;
                return (
                  <li
                    style={styles.listItem}
                    key={`${idx}-${realEstateProperty.id}`}
                  >
                    <p>{realEstateProperty.name}</p>
                    <button
                      style={styles.detailViewButton}
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
        </div>
      )}
      {currentRealEstatePropertyId && <RealEstatePropertyDetailView />}
      <GlobalLoadingIndicator />
    </div>
  );
}

export default App;

const styles: any = {
  appContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  detailViewButton: { marginLeft: "1rem" },
  detailViewContainer: { border: "1px solid black", padding: "3rem" },
  globalLoadingIndicator: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: "4px solid blue",
    pointerEvents: "none",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    border: "1px dotted grey",
    padding: ".5rem",
    margin: ".1rem",
  },
  loadingIndicator: {
    border: "1px solid black",
    padding: "1rem",
    margin: "1rem",
  },
  propertiesList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "start",
    width: "50%",
    border: "1px solid black",
    padding: "1rem",
    listStyleType: "none",
  },
};
