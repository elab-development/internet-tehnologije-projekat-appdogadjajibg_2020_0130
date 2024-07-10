import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EventsScraper.css';

const EventsScraper = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(5); // Number of events per page

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = sessionStorage.getItem("token");

        // Check if events are cached in localStorage
        const cachedEvents = localStorage.getItem('events');
        if (cachedEvents) {
          setEvents(JSON.parse(cachedEvents));
          setLoading(false);
          return;
        }

        const response = await axios.get('http://127.0.0.1:8000/api/dogadjajiScraper', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setEvents(response.data);
        setLoading(false);

        // Cache the events in localStorage
        localStorage.setItem('events', JSON.stringify(response.data));
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  // Filter events based on search query
  const filteredEvents = events.filter(event => {
    const title = event.title ? event.title.toLowerCase() : '';
    const description = event.description ? event.description.toLowerCase() : '';
    const query = searchQuery.toLowerCase();
    return title.includes(query) || description.includes(query);
  });

  // Get current events for pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Events in Belgrade</h1>
      <input
        type="text"
        placeholder="Search events"
        value={searchQuery}
        onChange={handleSearch}
        className="search-bar"
      />
      <div className="events-list">
        {currentEvents.map((event) => (
          <div key={event.id} className="event-card">
            <h2 className="event-title">{event.title}</h2>
            <p className="event-description">{event.description}</p>
            {event.date && <p className="event-date">Date: {event.date}</p>}
            <p className="event-place">Place: {event.location}</p>
            <a href={event.link}>DETALJI</a>
          </div>
        ))}
      </div>
      <Pagination
        eventsPerPage={eventsPerPage}
        totalEvents={filteredEvents.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

const Pagination = ({ eventsPerPage, totalEvents, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalEvents / eventsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <a onClick={() => paginate(number)} href="#!" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default EventsScraper;
