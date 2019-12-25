/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

function CreateTodoForm({ projectId }) {
  const [title, settitle] = useState('');
  const [description, setdescription] = useState('');
  const [dueDate, setdueDate] = useState(new Date());
  const [loading, setloading] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    Meteor.call('todo.create', { title, description, dueDate }, (err) => {
      if (err) {
        alert(err);
      } else {
        $('#createTodoForm').modal('hide');
      }
      setloading(false);
    });
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#createTodoForm"
      >
        <i className="fas fa-plus" />
        &nbsp;Add a todo task
      </button>
      <div
        className="modal fade"
        id="createTodoForm"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create a Todo
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={onSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="todoTitle">Email address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="todoTitle"
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                    required
                    aria-describedby="titleHelp"
                    placeholder="Buy groceries"
                  />
                  <small id="titleHelp" className="form-text text-muted">
                    Add a title for the task
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="todoDescription">Description</label>
                  <textarea
                    className="form-control"
                    id="todoDescription"
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                    rows="5"
                    aria-describedby="descriptionHelp"
                    placeholder="Buy Milk, Fruits and Veggies!"
                  />
                  <small id="descriptionHelp" className="form-text text-muted">
                    Add a short description of what needs to be done.
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="todoDueDate">Deadline</label>
                  <br />
                  <DatePicker
                    style={{ width: '100%' }}
                    id="todoDueDate"
                    selected={dueDate}
                    onChange={(val) => setdueDate(val)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeCaption="time"
                    dateFormat="dd/MM/yyyy HH:mm"
                  />
                  <small id="dueDateHelp" className="form-text text-muted">
                    Add a due date for the completion of the task
                  </small>
                </div>
              </div>
              <div className="modal-footer">
                {loading ? (
                  <div className="text-center w-100">
                    <i className="fas fa-spinner" />
                  </div>
                ) : (
                  <>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save changes
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateTodoForm;
