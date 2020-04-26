import React, { FC, useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import withApollo from '../lib/withApollo';

interface HomePageProps {
}

const GET_ME = gql`
    {
        me {
            id
        }
    }
`;

const LOGIN = gql`
    mutation($email:String!, $password:String!) {
        login(email:$email, password:$password) {
            token
        }
    }
`

const HomePage:FC<HomePageProps> = ({}) => {
    const { loading, error, data } = useQuery(GET_ME);
    return (
        <div>
            <Login/>
            <p>{loading ? 'loading' : 'done loading'}</p>
            <p>{ error ? error.message : 'no errors' }</p>
            <p> Hi i good lol</p>
            <p>meh id: { data ? data.me.id : ''}</p>
        </div>
    );
};

const Login:FC = () => {
    const [email, setEmail] = useState('');
    const [ password, setPassword ] = useState('');

    const [ login, { data } ] = useMutation(LOGIN);

    useEffect(() => {
        console.log('login data', data);
        if(data && data.login)
            localStorage.setItem('token', data.login.token);
    }, [data]);
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                login({ variables: { email, password } })
            }}
        >
            <input type="text" value={ email } onChange={e => setEmail(e.target.value)}/>
            <input type="password" value={ password } onChange={ e=> setPassword(e.target.value) }/>
            <button type="submit">Login</button>
        </form>
    )
}

export default withApollo(HomePage);
