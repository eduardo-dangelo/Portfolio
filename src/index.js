import React from 'react'
import ReactDOM from 'react-dom'
import Application from './Application'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink} from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import 'tachyons'

const httpLink = createHttpLink({ uri: process.env.REACT_APP_API_KEY })

const middlewareLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('graphcoolToken')
  const authorizationHeader = token ? `Bearer ${token}` : null
  operation.setContext({
    headers: {
      authorization: authorizationHeader
    }
  })
  return forward(operation)
})

const httpLinkWithAuthToken = middlewareLink.concat(httpLink)

const client = new ApolloClient({
  link: httpLinkWithAuthToken,
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
})

ReactDOM.render((
    <ApolloProvider client={client}>
      <Application/>
    </ApolloProvider>
  ),
  document.getElementById('root')
)