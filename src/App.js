import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { InMemoryCache, makeVar, gql, useQuery } from "@apollo/client";

// Create a reactive variable and initialize it to false,
// which also allows TypeScript to infer the type of
// the variable (boolean).
const darkModeVar = makeVar(false);

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                // Similar to AC2 local resolvers, this field policy
                // controls how the Query.darkModeEnabled field
                // gets read from the cache:
                darkModeEnabled() {
                    return darkModeVar();
                },
            },
        },
    },
});

// Query the darkModeEnabled field using an @client
// directive, as in AC2:
function App() {
    const { data, loading } = useQuery(
        gql`
            query {
                darkModeEnabled @client
            }
        `
    );
    return loading ? (
        <h1>loading</h1>
    ) : (
        <div className={data.darkModeEnabled ? "dark" : "light"}>
            <h1>hello</h1>
            <button onClick={toggleDarkMode}>Click it</button>
        </div>
    );
}

// Change the value of the variable at any time by
// calling it as a function with one argument (the new
// value). Call the function with zero arguments to
// get the current value.
function toggleDarkMode() {
    darkModeVar(!darkModeVar());
}

export default App;
