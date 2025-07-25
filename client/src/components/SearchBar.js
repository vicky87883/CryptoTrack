import React from 'react';
import { Form } from 'react-bootstrap';

const SearchBar = ({ search, setSearch }) => (
  <Form className="mb-3">
    <Form.Control
      type="text"
      placeholder="Search by name or symbol"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    
  </Form>
);

export default SearchBar;
