'use client';

import React, { useEffect, useState } from 'react';

interface dataArrayType {
  id: number;
  attributes: {
    Category: string;
    Name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

const ProductDataTable = ({ dataList }: { dataList: dataArrayType }) => {
  const [labelData, setLabelData] = useState<any>([]);
  const [categoryBoxActive, setCategoryBoxActive] = useState(0);
  // const [dataList, setDataList] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = async (checked: any, list: any, id: any) => {
    const listIndex = labelData
      .map((e: any) => e?.label)
      .indexOf(list?.attributes?.Category);
    const getSingleData: any = await fetch(
      `${process.env.apiKey}/products/${id + 1}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((res: any) => res?.json());
    const { data } = getSingleData;

    if (checked) {
      setLoading(true);
      const updatedSingleData = { data: { ...data, checked: true } };

      await fetch(`${process.env.apiKey}/products/${id + 1}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSingleData),
      });

      setLabelData((prevLabelData: any) => {
        const updatedLabelData = [...prevLabelData];
        updatedLabelData[listIndex] = {
          ...updatedLabelData[listIndex],
          children: [
            ...(updatedLabelData[listIndex]?.children || []),
            { name: list?.attributes?.Name },
          ],
        };
        return updatedLabelData;
      });
      setLoading(false);
    } else {
      setLoading(true);
      const updatedSingleData = { data: { ...data, checked: false } };

      await fetch(`${process.env.apiKey}/products/${id + 1}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSingleData),
      });
      setLabelData((prevLabelData: any) => {
        const updatedLabelData = [...prevLabelData];
        updatedLabelData[listIndex] = {
          ...updatedLabelData[listIndex],
          children: (updatedLabelData[listIndex]?.children || []).filter(
            (e: any) => e?.name !== list?.attributes?.Name
          ),
        };
        return updatedLabelData;
      });
      setLoading(false);
    }
  };

  const getdata = async () => {
    try {
      const response: any = await fetch(`${process.env.apiKey}/products`).then(
        (res: any) => res.json()
      );
      const { data: productData } = response;
      setCategoryData(productData);

      const newData: any = [];

      productData?.forEach((e: any) => {
        const labelIndex = newData.findIndex(
          (item: any) => item.label === e?.attributes?.Category
        );

        if (e?.attributes?.checked === true) {
          if (labelIndex === -1) {
            newData.push({
              label: e?.attributes?.Category,
              children: [
                { name: e?.attributes?.Name, price: e?.attributes?.price },
              ],
            });
          } else {
            newData[labelIndex].children.push({
              name: e?.attributes?.Name,
              price: e?.attributes?.price,
            });
          }
        }
      });

      setLabelData(newData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    categoryData?.map((el: any) => {
      if (
        !labelData?.map((e: any) => e?.label).includes(el?.attributes?.Category)
      ) {
        setLabelData([
          ...labelData,
          {
            label: el?.attributes?.Category,
            children: [],
          },
        ]);
      }
    });
  }, [categoryData, labelData]);

  useEffect(() => {
    getdata();
  }, [loading]);

  // todo need to change

  // const handleCategoryBox = (id: number) => {
  //   setCategoryBoxActive(id);
  // };

  return (
    <div className='table-wrapper'>
      <table>
        <thead>
          <tr>
            <th>
              <input type='checkbox' />
            </th>
            <th>Food Id</th>
            <th>Category</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {categoryData?.map((list: any, index: any) => (
            <tr key={index}>
              <td>
                <input
                  type='checkbox'
                  onChange={(e) => handleChange(e.target.checked, list, index)}
                  checked={list?.attributes?.checked === true ? true : false}
                />
              </td>
              <td>{list?.id}</td>
              <td>{list?.attributes?.Category}</td>
              <td>{list?.attributes?.Name}</td>
              <td>{list?.attributes?.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='sidebar-table-data'>
        <div className='reminder'>
          <span>Notes:</span>
          <span>All Prices is as per KG and L !</span>
        </div>
        {labelData?.map((item: any, index: number) => {
          const priceInfo = item?.children.map((e: any) => e?.price);

          const totalPrice = priceInfo.reduce((accu: any, current: any) => {
            return accu + current;
          }, 0);

          return (
            <div
              key={index}
              className={`category-wrapper ${
                item?.children?.length > 0 ? 'active' : ''
              }`}
              // onClick={() => handleCategoryBox(index)}
            >
              <div className='title'>
                <span>{item?.label}</span>
                <span className='count'>{item?.children?.length}</span>
              </div>
              {item?.children?.length > 0 && (
                <ul>
                  {item?.children?.length === 0 && <span>No choosen Data</span>}
                  {item?.children?.map((child: any, ind: number) => (
                    <li key={ind}>
                      <span>{child?.name}</span>
                      <span>{child?.price}</span>
                    </li>
                  ))}
                  {item?.children?.length > 0 && (
                    <div className='total'>
                      <span>Total</span>
                      <span>₹ {totalPrice}</span>
                    </div>
                  )}
                </ul>
              )}
            </div>
          );
        })}
        <div className='main-total'>
          <span>Main Total</span>
          <span>
            ₹{' '}
            {labelData
              ?.map((item: any) =>
                item?.children
                  ?.map((e: any) => e?.price)
                  .reduce((accu: any, current: any) => accu + current, 0)
              )
              .reduce((accu: any, current: any) => accu + current, 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductDataTable;
