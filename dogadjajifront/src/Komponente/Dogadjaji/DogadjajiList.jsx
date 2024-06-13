import React, { useState } from 'react';
import DogadjajKartica from './DogadjajKartica';
import useFetchDogadjaji from '../hooks/useFetchDogadjaji';
import Pagination from './Pagination';
import './DogadjajKartica.css';

const DogadjajiList = () => {
  const { dogadjaji, loading, error } = useFetchDogadjaji();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const filteredDogadjaji = dogadjaji
    .filter(dogadjaj =>
      dogadjaj.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.start_time);
      const dateB = new Date(b.start_time);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  const currentPosts = filteredDogadjaji.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        {currentPosts.map(dogadjaj => (
          <DogadjajKartica key={dogadjaj.id} dogadjaj={dogadjaj} />
        ))}
      </div>
      <Pagination
        totalPosts={filteredDogadjaji.length}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default DogadjajiList;
