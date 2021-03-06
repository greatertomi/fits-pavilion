import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import Error from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;

const SignUp = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    name: ''
  });
  const [signUp, { data, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs
    // refetchQueries: [{ query: CURRENT_USER_QUERY }]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signUp().catch(console.error);
    console.log('login', res);
    resetForm();
  };

  return (
    <div>
      <Form method="POST" onSubmit={handleSubmit}>
        <h2>Sign up for an Account</h2>
        <Error error={error} />
        <fieldset>
          {data?.createUser && (
            <p>
              Signed up with {data.createUser.email} - Please Go Head and Sign
              In!
            </p>
          )}
          <label htmlFor="name">
            Name
            <input
              type="name"
              name="name"
              placeholder="Your Name"
              autoComplete="name"
              value={inputs.name}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              autoComplete="email"
              value={inputs.email}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="password"
              value={inputs.password}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Sign In</button>
        </fieldset>
      </Form>
    </div>
  );
};

export default SignUp;
