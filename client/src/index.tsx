import React from 'react'
import ReactDOM from 'react-dom'
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split} from '@apollo/client'
import {getMainDefinition} from '@apollo/client/utilities'
import {WebSocketLink} from '@apollo/client/link/ws'

import {Provider} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {store} from './store'

const httpLink = new HttpLink({
    uri: `http://localhost:3001/graphql`,
})

const wsLink = new WebSocketLink({
    uri: 'ws://localhost:3001/graphql',
    options: {
        reconnect: true,
    },
})

const splitLink = split(
    ({query}) => {
        const definition = getMainDefinition(query)
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        )
    },
    wsLink,
    httpLink,
)

const client: ApolloClient<object> = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
})

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ApolloProvider client={client}>
                <App/>
            </ApolloProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
)

reportWebVitals()
