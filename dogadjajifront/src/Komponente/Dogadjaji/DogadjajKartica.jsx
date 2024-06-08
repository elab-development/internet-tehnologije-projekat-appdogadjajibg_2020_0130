import React from 'react';
import './DogadjajKartica.css';

const DogadjajKartica = ({ dogadjaj }) => {
  return (
    <div className="dogadjaj-kartica">
      <img src={`http://127.0.0.1:8000/storage/${dogadjaj.image}`} alt={dogadjaj.title} className="dogadjaj-image" />
      <div className="dogadjaj-info">
        <h2 className="dogadjaj-title">{dogadjaj.title}</h2>
        <p className="dogadjaj-description">{dogadjaj.description}</p>
        <p className="dogadjaj-time">
          {new Date(dogadjaj.start_time).toLocaleString()} - {new Date(dogadjaj.end_time).toLocaleString()}
        </p>
        <p className="dogadjaj-mesto">Mesto: {dogadjaj.mesto.name}</p>
        <p className="dogadjaj-kategorija">Kategorija: {dogadjaj.kategorija.name}</p>
      </div>
    </div>
  );
};

export default DogadjajKartica;
