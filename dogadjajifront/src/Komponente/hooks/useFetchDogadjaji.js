import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchDogadjaji = () => {
  const [dogadjaji, setDogadjaji] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDogadjaji = async () => {
      const token = sessionStorage.getItem('token');

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/dogadjaji', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setDogadjaji(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchDogadjaji();
  }, []);

  return { dogadjaji, loading, error };
};

export default useFetchDogadjaji;
