import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import Error from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

const RequestReset = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: ''
  });
  const [signIn, { data, error }] = useMutation(REQUEST_RESET_MUTATION, {
    variables: inputs
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn().catch(console.error);
    console.log('login', res);
    resetForm();
  };

  return (
    <div>
      <Form method="POST" onSubmit={handleSubmit}>
        <h2>Request a password reset</h2>
        <Error error={error} />
        <fieldset>
          {data?.sendUserPasswordResetLink === null && (
            <p>Success! Check your email for a link!</p>
          )}
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
          <button type="submit">Request Reset</button>
        </fieldset>
      </Form>
    </div>
  );
};

export default RequestReset;
