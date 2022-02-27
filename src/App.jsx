import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
// import {createHttpLink} from "apollo-link-http";
import "./index.css";
import { WebSocketLink } from "@apollo/client/link/ws";
import Chat from "./components/chat/index";
// muốn dùng websocket phải thêm thằng này
const link = new WebSocketLink({
    uri: `ws://localhost:4000/`, // ip address của server
    options: {
      reconnect: true,
    },
  });
  // client cách 1
const client = new ApolloClient({
  link,
  // uri cách 1
  uri: "http://localhost:4000/", // ip address của server
  cache: new InMemoryCache(),
  // header cách 1
  headers: {
    authorization: localStorage.getItem("token") || ""
  }
});
//||-==================
// uri cách 2
// const httpLink = createHttpLink({
//   uri: "http://localhost:4000/"
// });
// // header cách 2
// const authLink = () => {
//   const token =  localStorage.getItem("token");
//   return {
//     headers: {
//       Authorization: token ? `Bearer ${token}` : ""
//     }
//   }
// }
// // client cách 2
// const client2 = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// })
const App = () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById("app"));
