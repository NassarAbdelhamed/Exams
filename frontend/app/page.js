'use client'
import { useState, useEffect } from 'react';
import Cart from './component/cart';
import Link from 'next/link';
import './page.css';

export default function ClientSideFetching() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/exams');
        const jsonData = await response.json();
        setData(jsonData);
        setFilteredData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = data.filter(exam =>
      exam.sub.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!data.length) return <div className="no-data">No data found</div>;

  return (
    <div className="container">
      <h1 className="title">Exams List</h1>
      <input
        type="text"
        placeholder="Search by subject..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <ul className="exam-list">
        {filteredData.map((obj) => (
          <li key={obj._id} className="exam-item">
            <Link href={`/exams/${obj._id}`} className="link">
              <Cart prop={obj} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
