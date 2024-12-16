import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './Admin.css';

const Admin = () => {
  const [statistics, setStatistics] = useState({
    eventsByCategory: [],
    eventsByDay: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      const token = sessionStorage.getItem('token');
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/statistike', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setStatistics(response.data);
        setLoading(false);
      } catch (error) {
        setError('Greška prilikom učitavanja statistika');
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="admin-container">
      <h1>Statistike događaja</h1>
      <div className="chart-container">
        <h2>Broj događaja po kategorijama</h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie data={statistics.eventsByCategory} dataKey="count" nameKey="category" cx="50%" cy="50%" outerRadius={150} fill="#8884d8">
              {statistics.eventsByCategory.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-container">
        <h2>Broj događaja po danima</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={statistics.eventsByDay} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Admin;
