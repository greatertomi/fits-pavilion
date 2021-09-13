import React from 'react';
import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';

const Product = ({ product }) => {
  const { photo, name, id, price, description } = product;
  return (
    <ItemStyles>
      <img src={photo?.image?.publicUrlTransformed} alt={name} />
      <Title>
        <Link href={`/products/${id}`}>{name}</Link>
      </Title>
      <PriceTag>{formatMoney(price)}</PriceTag>
      <p>{description}</p>
    </ItemStyles>
  );
};

export default Product;
