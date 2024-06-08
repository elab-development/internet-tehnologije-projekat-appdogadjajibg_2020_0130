import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchMesta = () => {
  const [mesta, setMesta] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMesta = async () => {
      const token = sessionStorage.getItem('token');

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/mesta', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMesta(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchMesta();
  }, []);

  return { mesta, loading, error };
};

export default useFetchMesta;
