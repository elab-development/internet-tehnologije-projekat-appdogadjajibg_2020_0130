import React from 'react';
import DogadjajKartica from './DogadjajKartica';
import useFetchDogadjaji from '../hooks/useFetchDogadjaji';
import './DogadjajKartica.css';

const DogadjajiList = () => {
  const { dogadjaji, loading, error } = useFetchDogadjaji();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>There was an error loading the events: {error.message}</p>;

  return (
    <div className="dogadjaji-list">
      {dogadjaji.map(dogadjaj => (
        <DogadjajKartica key={dogadjaj.id} dogadjaj={dogadjaj} />
      ))}
    </div>
  );
};

export default DogadjajiList;
