import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../features/api/apiSlice';

import styles from '../../styles/Category.module.css';
import Products from '../Products/Products';
import { useSelector } from 'react-redux';

const Category = () => {
  const { id } = useParams();
  const { list } = useSelector(({ categories }) => categories);

  const defaultValues = {
    title: '',
    price_min: 0,
    price_max: 0,
  };

  const defaultParams = {
    categoryId: id,
    limit: 5,
    offset: 0,
    ...defaultValues,
  };

  const [values, setValues] = useState(defaultValues);
  const [params, setParams] = useState(defaultParams);
  const [cat, setCat] = useState(null);
  const [items, setItems] = useState([]);
  const [isEnd, setEnd] = useState(false);

  const { data = [], isLoading, isSuccess } = useGetProductsQuery(params);

  useEffect(() => {
    if (isLoading) return;

    if (!data.length) return setEnd(true);

    const products = Object.values(data);

    if (!products.length) return;

    setItems((_items) => [..._items, ...products]);
  }, [isLoading, data]);

  useEffect(() => {
    if (!id || !list.length) return;

    const category = list.find((item) => item.id === id * 1);

    setCat(category);
  }, [list, id]);

  useEffect(() => {
    if (!id) return;

    setItems([]);
    setEnd(false);
    setValues(defaultValues);
    setParams({ ...defaultParams, categoryId: id });
  }, [id]);

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setItems([]);
    setEnd(false);
    setParams({ ...defaultParams, ...values });
  };

  const handleReset = () => {
    setValues(defaultValues);
    setValues(defaultParams);
    setEnd(false);
  };

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{cat?.name}</h2>

      <form className={styles.filters} onSubmit={handleSubmit}>
        <div className={styles.filter}>
          <input
            value={values.title}
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="Product name"
          />
        </div>
        <div className={styles.filter}>
          <input
            value={values.price_min}
            type="number"
            name="price_min"
            onChange={handleChange}
            placeholder="0"
          />
          <span>Price from</span>
        </div>

        <div className={styles.filter}>
          <input
            value={values.price_max}
            type="number"
            name="price_max"
            onChange={handleChange}
            placeholder="0"
          />
          <span>Price to</span>
        </div>

        <button type="submit" hidden />
      </form>

      {isLoading ? (
        <div className={styles.preloader}>Loading...</div>
      ) : !isSuccess || !items.length ? (
        <div className={styles.back}>
          <span>No results</span>
          <button onClick={handleReset}>Reset</button>
        </div>
      ) : (
        <Products title="" products={items} style={{ padding: 0 }} amount={items.length} />
      )}

      {!isEnd && (
        <div className={styles.more}>
          <button onClick={() => setParams({ ...params, offset: params.offset + params.limit })}>
            See more
          </button>
        </div>
      )}
    </section>
  );
};

export default Category;
