import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import useFetchDogadjaji from '../hooks/useFetchDogadjaji';
import { Link, useNavigate } from 'react-router-dom';
import './Dogadjaji.css';

const Dogadjaji = () => {
  const { dogadjaji, loading, error } = useFetchDogadjaji();
  const [localDogadjaji, setLocalDogadjaji] = useState(dogadjaji);

  // Sinhronizacija lokalnog stanja sa učitanim događajima
  useEffect(() => {
    setLocalDogadjaji(dogadjaji);
  }, [dogadjaji]);

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem('token');
    try {
      await axios.delete(`http://127.0.0.1:8000/api/dogadjaji/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLocalDogadjaji(localDogadjaji.filter(dogadjaj => dogadjaj.id !== id));
      alert('Događaj uspešno obrisan');
    } catch (error) {
      console.error('Greška prilikom brisanja događaja:', error);
      alert('Greška prilikom brisanja događaja');
    }
  };

  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Title', accessor: 'title' },
      { Header: 'Description', accessor: 'description' },
      { Header: 'Start Time', accessor: 'start_time' },
      { Header: 'End Time', accessor: 'end_time' },
      { Header: 'Mesto ID', accessor: 'mesto_id' },
      { Header: 'Kategorija ID', accessor: 'kategorija_id' },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => (
          <>
            <Link to={`/dogadjaji/update/${row.original.id}`}>Edit</Link>
            <button onClick={() => handleDelete(row.original.id)}>Delete</button>
          </>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data: localDogadjaji,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter, pageIndex } = state;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="dogadjaji-container">
      <h1>Događaji</h1>
      <input
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search"
        className="search-input"
      />
      <table {...getTableProps()} className="dogadjaji-table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
      </div>
      <Link to="/dogadjaji/add" className="add-dogadjaj-button">Add New Event</Link>
    </div>
  );
};

export default Dogadjaji;
