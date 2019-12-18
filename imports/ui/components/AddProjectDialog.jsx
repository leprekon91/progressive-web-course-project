/* eslint-disable react/jsx-fragments */
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import $ from 'jquery';
import 'react-datepicker/dist/react-datepicker.css';

function AddProjectDialog() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setdueDate] = useState(new Date());
  const onSubmit = (e) => {
    e.preventDefault();
    Meteor.call('projects.new', { title, description, dueDate }, (err) => {
      if (err) {
        alert(err);
      } else {
        $('#exampleModal').modal('hide');
      }
    });
  };
  return (
    <React.Fragment>
      <button
        type="button"
        className="btn btn-primary w-100"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Create New Project
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create New Project
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={onSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Project Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Project Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <DatePicker
                    style={{ width: '100%' }}
                    selected={dueDate}
                    onChange={(val) => setdueDate(val)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeCaption="time"
                    dateFormat="dd/MM/yyyy h:mm aa"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AddProjectDialog;
