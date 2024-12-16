import React, { useState } from 'react';
import DogadjajKartica from './DogadjajKartica';
import useFetchDogadjaji from '../hooks/useFetchDogadjaji';
import useFetchKategorije from '../hooks/useFetchKategorije';
import Pagination from './Pagination';
import './DogadjajKartica.css';

const DogadjajiList = () => {
  const { dogadjaji, loading, error } = useFetchDogadjaji();
  const { kategorije, loading: kategorijeLoading, error: kategorijeError } = useFetchKategorije();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const categoryId = parseInt(event.target.value);
    setSelectedCategories(prevSelectedCategories =>
      prevSelectedCategories.includes(categoryId)
        ? prevSelectedCategories.filter(id => id !== categoryId)
        : [...prevSelectedCategories, categoryId]
    );
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const filteredDogadjaji = dogadjaji
    .filter(dogadjaj =>
      dogadjaj.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategories.length === 0 || selectedCategories.includes(dogadjaj.kategorija.id))
    )
    .sort((a, b) => {
      const dateA = new Date(a.start_time);
      const dateB = new Date(b.start_time);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  const currentPosts = filteredDogadjaji.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading || kategorijeLoading) return <p>Loading...</p>;
  if (error || kategorijeError) return <p>There was an error loading the events: {error?.message || kategorijeError?.message}</p>;

  return (
    <div>
      <div className="filter-container">
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
        <div className="category-container">
          {kategorije.map(kategorija => (
            <div key={kategorija.id} className="category-item">
              <input
                type="checkbox"
                id={`category-${kategorija.id}`}
                value={kategorija.id}
                onChange={handleCategoryChange}
                checked={selectedCategories.includes(kategorija.id)}
              />
              <label htmlFor={`category-${kategorija.id}`}>{kategorija.name}</label>
            </div>
          ))}
        </div>
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
