import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      NAME: "",
      COURSES: "",
      status: "paid",
      DATE:"",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.NAME && formState.COURSES && formState.status) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (DATE) => {
    setSelectedDate(DATE);
  };
  

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
          <div className="form-group">
            <label htmlFor="NAME">NAME</label>
            <input name="NAME" onChange={handleChange} value={formState.NAME} />
          </div>
          <div className="form-group">
            <label htmlFor="COURSES">COURSES</label>
            <textarea
              name="COURSES"
              onChange={handleChange}
              value={formState.COURSES}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              onChange={handleChange}
              value={formState.status}
            >
              <option value="paid">paid</option>
              <option value="partiallypaid">partially paid</option>
              <option value="unpaid">unpaid</option>
            </select>
          </div>
          
      <div>
        <label>Date:</label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy/MM/dd" // You can customize the date format
        />
      </div>
  <br></br>
  

          {errors && <div className="error">{`Please include: ${errors}`}</div>}
 <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
