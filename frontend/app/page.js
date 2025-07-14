'use client'
import { useState, useEffect } from 'react';
import Cart from './component/cart';
import Link from 'next/link';

export default function ClientSideFetching() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/exams');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No data found</div>;

  return (
    <div>
      <ul>
        {data.map((obj) => (
          <li key={obj._id}>
             <Link href={`/exams/${obj._id}`}>
            <Cart prop={obj} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}