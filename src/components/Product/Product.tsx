import React from 'react';
import ProductDataTable from './ProductDataTable';

const getProductData = async (): Promise<dataArrayType | undefined> => {
  try {
    const res = await fetch(`${process.env.apiKey}/products`);
    const response = await res.json();
    const data = response?.data;

    return {
      data,
    };
  } catch (err) {
    console.log(err);
  }
};

interface dataArrayType {
  data: {
    id: number;
    attributes: {
      Category: string;
      Name: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  }[];
}

const Product = async () => {
  const data: dataArrayType | undefined = await getProductData();

  const dataList = data?.data;

  console.log('getProductDatas', dataList);

  return (
    <div className='product-wrapper'>
      <ProductDataTable dataList={dataList} />
    </div>
  );
};

export default Product;
