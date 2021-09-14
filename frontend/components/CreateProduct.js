import React from 'react';
import useForm from '../lib/useForm';
import Form from './styles/Form';

const initialValue = {
  name: 'Shoes',
  price: 8000,
  description: 'The best shoe ever',
  image: ''
};

const CreateProduct = () => {
  const { inputs, handleChange, clearForm } = useForm(initialValue);
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(inputs);
      }}
    >
      <fieldset disabled={false}>
        <label htmlFor="name">
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="name">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          <input
            type="number"
            id="price"
            name="price"
            placeholder="price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
      </fieldset>

      <button type="submit" onClick={clearForm}>
        + Add Product
      </button>
    </Form>
  );
};

export default CreateProduct;
