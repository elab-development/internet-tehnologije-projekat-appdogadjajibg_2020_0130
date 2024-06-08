import React, { useState } from 'react';
import DogadjajKartica from './DogadjajKartica';
import useFetchDogadjaji from '../hooks/useFetchDogadjaji';
import './DogadjajKartica.css';

const DogadjajiList = () => {
  const { dogadjaji, loading, error } = useFetchDogadjaji();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDogadjaji = dogadjaji.filter(dogadjaj =>
    dogadjaj.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>There was an error loading the events: {error.message}</p>;

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Pretraži događaje..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div className="dogadjaji-list">
        {filteredDogadjaji.map(dogadjaj => (
          <DogadjajKartica key={dogadjaj.id} dogadjaj={dogadjaj} />
        ))}
      </div>
    </div>
  );
};

export default DogadjajiList;
