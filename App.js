import React from 'react';
import Navigator from './Navigator'
import { ApolloProvider } from "react-apollo";
import FaceClient from './FaceClient'

export default class App extends React.Component {
  render() {
    return <ApolloProvider client={FaceClient}>
      <Navigator />
    </ApolloProvider>
  }
}
