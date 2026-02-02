import React from "react";
import { createRoot } from "react-dom/client";
import GlobalStyles from "./styles";
import Pages from "./pages";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://odysee-liftoff-typescript-server-production.up.railway.app/",
  cache: new InMemoryCache(),
});

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <GlobalStyles />
      <Pages />
    </ApolloProvider>
  </React.StrictMode>,
);
