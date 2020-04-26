import withApollo from 'next-with-apollo';
import { InMemoryCache, ApolloLink, HttpLink, ApolloClient } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const authLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('token');
    operation.setContext({
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    })
    return forward(operation);
});

const httpLink = new HttpLink({ uri:'http://localhost:4000' })

export default withApollo(
    ({ initialState }) => {
        return new ApolloClient({
            link:authLink.concat(httpLink),
            cache: new InMemoryCache().restore(initialState || {})
        });
    },
    {
        render: ({ Page, props }) => {
            return (
                <ApolloProvider client={props.apollo}>
                    <Page {...props} />
                </ApolloProvider>
            );
        }
    }
);
