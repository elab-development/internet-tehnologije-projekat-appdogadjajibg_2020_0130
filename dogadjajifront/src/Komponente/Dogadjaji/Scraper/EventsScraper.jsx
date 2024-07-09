import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EventsScraper.css';

const EventsScraper = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = sessionStorage.getItem("token");

        const response = await axios.get('http://127.0.0.1:8000/api/dogadjajiScraper', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Events in Belgrade</h1>
      <div className="events-list">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h2 className="event-title">{event.title}</h2>
            <p className="event-description">{event.description}</p>
            {event.date && <p className="event-date">Date: {event.date}</p>}
            <p className="event-place">Place: {event.place}</p>
            <p className="event-category">Category: {event.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsScraper;
