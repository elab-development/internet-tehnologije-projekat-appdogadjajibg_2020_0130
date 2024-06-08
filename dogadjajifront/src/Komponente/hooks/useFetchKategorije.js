import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchKategorije = () => {
  const [kategorije, setKategorije] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKategorije = async () => {
      const token = sessionStorage.getItem('token');

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/kategorije', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setKategorije(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchKategorije();
  }, []);

  return { kategorije, loading, error };
};

export default useFetchKategorije;
