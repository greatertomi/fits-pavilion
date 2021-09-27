import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import Error from './ErrorMessage';

const RESET_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

const Reset = ({ token }) => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token
  });
  const [reset, { data, error }] = useMutation(RESET_MUTATION, {
    variables: inputs
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await reset().catch(console.error);
    console.log('login', res);
    resetForm();
  };

  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken?.code
    : undefined;

  return (
    <div>
      <Form method="POST" onSubmit={handleSubmit}>
        <h2>Reset you password</h2>
        <Error error={error || successfulError} />
        <fieldset>
          {data?.redeemUserPasswordResetToken === null && (
            <p>Success! You can now sign in.</p>
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
          <button type="submit">Request Reset</button>
        </fieldset>
      </Form>
    </div>
  );
};

export default Reset;
