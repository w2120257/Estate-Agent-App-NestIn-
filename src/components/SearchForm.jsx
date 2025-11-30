import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './SearchForm.css'; 

const SearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    type: 'any',
    minPrice: '',
    maxPrice: '',
    minBeds: '',
    maxBeds: '',
    postcode: '',
    dateAfter: null,
    dateBefore: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(formData);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <h3>Filter Properties</h3>
      
      <div className="form-group">
        <label>Type</label>
        <select name="type" onChange={handleChange} className="form-control">
          <option value="any">Any</option>
          <option value="House">House</option>
          <option value="Flat">Flat</option>
        </select>
      </div>

      <div className="form-group">
        <label>Price Range (£)</label>
        <div className="form-row">
            <input type="number" name="minPrice" placeholder="Min" onChange={handleChange} className="form-control" />
            <input type="number" name="maxPrice" placeholder="Max" onChange={handleChange} className="form-control" />
        </div>
      </div>

      <div className="form-group">
        <label>Bedrooms</label>
        <div className="form-row">
            <input type="number" name="minBeds" placeholder="Min" onChange={handleChange} className="form-control" />
            <input type="number" name="maxBeds" placeholder="Max" onChange={handleChange} className="form-control" />
        </div>
      </div>

      <div className="form-group">
        <label>Postcode</label>
        <input type="text" name="postcode" placeholder="e.g. BR1" onChange={handleChange} className="form-control" />
      </div>

      <div className="form-group">
         <label>Date Added</label>
         <div className="form-row">
            <DatePicker 
              selected={formData.dateAfter} 
              onChange={date => setFormData({...formData, dateAfter: date})} 
              placeholderText="From" 
              className="date-input" 
            />
            <DatePicker 
              selected={formData.dateBefore} 
              onChange={date => setFormData({...formData, dateBefore: date})} 
              placeholderText="To" 
              className="date-input" 
            />
         </div>
      </div>

      <button type="submit" className="search-btn">
        Search Properties
      </button>
    </form>
  );
};

export default SearchForm;