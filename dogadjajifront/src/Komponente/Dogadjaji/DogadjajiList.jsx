import React, { useState } from 'react';
import DogadjajKartica from './DogadjajKartica';
import useFetchDogadjaji from '../hooks/useFetchDogadjaji';
import './DogadjajKartica.css';

const DogadjajiList = () => {
  const { dogadjaji, loading, error } = useFetchDogadjaji();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const filteredDogadjaji = dogadjaji
    .filter(dogadjaj =>
      dogadjaj.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.start_time);
      const dateB = new Date(b.start_time);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

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
        <select value={sortOrder} onChange={handleSortChange} className="sort-select">
          <option value="asc">Sortiraj po datumu: Uzlazno</option>
          <option value="desc">Sortiraj po datumu: Silazno</option>
        </select>
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
