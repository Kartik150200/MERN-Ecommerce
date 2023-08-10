import React from 'react';
import { Helmet } from 'react-helmet-async';

const Meta = ({ title, desscription, keywords }) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name='description' content={desscription} />
        <meta name='keywords' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
    title: 'Welcome to Kosells',
    keywords: 'Electronics, Kosells, Ecommerce, Kartik',
    desscription: 'Buy the best products at the lowest prices',
};

export default Meta