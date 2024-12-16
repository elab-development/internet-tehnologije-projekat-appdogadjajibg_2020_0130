import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import useFetchMesta from '../hooks/useFetchMesta';
import useFetchKategorije from '../hooks/useFetchKategorije';
import './DogadjajForm.css';

const DogadjajForm = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { mesta, loading: loadingMesta, error: errorMesta } = useFetchMesta();
  const { kategorije, loading: loadingKategorije, error: errorKategorije } = useFetchKategorije();
  const [dogadjaj, setDogadjaj] = useState({
    title: '',
    description: '',
    start_time: '',
    end_time: '',
    mesto_id: '',
    kategorija_id: '',
    image: null,
    new_mesto_name: '',
    new_mesto_address: '',
    new_kategorija_name: ''
  });

  useEffect(() => {
    if (mode === 'update' && id) {
      const fetchDogadjaj = async () => {
        const token = sessionStorage.getItem('token');
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/dogadjaji/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setDogadjaj(response.data.data);
        } catch (error) {
          console.error('Greška prilikom učitavanja događaja:', error);
        }
      };
      fetchDogadjaj();
    }
  }, [mode, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDogadjaj({ ...dogadjaj, [name]: value });
  };

  const handleFileChange = (e) => {
    setDogadjaj({ ...dogadjaj, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(dogadjaj).forEach(key => {
      formData.append(key, dogadjaj[key]);
    });

    try {
      const token = sessionStorage.getItem('token');
      if (mode === 'add') {
        await axios.post('http://127.0.0.1:8000/api/dogadjaji', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Događaj uspešno kreiran');
      } else if (mode === 'update') {
        await axios.put(`http://127.0.0.1:8000/api/dogadjaji/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Događaj uspešno ažuriran');
      }
      navigate('/dogadjajiAdmin');
    } catch (error) {
      console.error('Greška prilikom dodavanja/ažuriranja događaja:', error);
    }
  };

  if (loadingMesta || loadingKategorije) return <p>Loading...</p>;
  if (errorMesta || errorKategorije) return <p>Greška prilikom učitavanja podataka</p>;

  return (
    <form onSubmit={handleSubmit} className="dogadjaj-form">
      <h2>{mode === 'add' ? 'Create New Event' : 'Update Event'}</h2>
      <input type="text" name="title" value={dogadjaj.title} onChange={handleInputChange} placeholder="Title" required />
      <textarea name="description" value={dogadjaj.description} onChange={handleInputChange} placeholder="Description" required />
      <input type="datetime-local" name="start_time" value={dogadjaj.start_time} onChange={handleInputChange} required />
      <input type="datetime-local" name="end_time" value={dogadjaj.end_time} onChange={handleInputChange} required />
      <select name="mesto_id" value={dogadjaj.mesto_id} onChange={handleInputChange}>
        <option value="">Select Mesto</option>
        {mesta.map(mesto => (
          <option key={mesto.id} value={mesto.id}>{mesto.name}</option>
        ))}
      </select>
      <input type="text" name="new_mesto_name" value={dogadjaj.new_mesto_name} onChange={handleInputChange} placeholder="New Mesto Name" />
      <input type="text" name="new_mesto_address" value={dogadjaj.new_mesto_address} onChange={handleInputChange} placeholder="New Mesto Address" />
      <select name="kategorija_id" value={dogadjaj.kategorija_id} onChange={handleInputChange}>
        <option value="">Select Kategorija</option>
        {kategorije.map(kategorija => (
          <option key={kategorija.id} value={kategorija.id}>{kategorija.name}</option>
        ))}
      </select>
      <input type="text" name="new_kategorija_name" value={dogadjaj.new_kategorija_name} onChange={handleInputChange} placeholder="New Kategorija Name" />
      <input type="file" name="image" onChange={handleFileChange} />
      <button type="submit">{mode === 'add' ? 'Create' : 'Update'}</button>
    </form>
  );
};

export default DogadjajForm;
