import React, { useContext, useEffect, useState, useRef } from "react";
import notesContext from "../context/notes/noteContext";
import AlertContext from "../context/alert/alertContext";
import NoteItems from "./NoteItems";
import AddNote from "./AddNote";
import Loader from "./Loader";
import {  useNavigate } from "react-router-dom";
function Notes() {
  const context = useContext(notesContext);
  const [enote, seteNote] = useState({
    title: "",
    description: "",
    tag: "",
    _id: "",
  });
  const buttonRef = useRef(null);
  const closeButton = useRef(null);
  const { notes, getNotes, updateNote } = context;
  const navigate = useNavigate();
  useEffect(() => {

    if(localStorage.getItem('token'))
    {
      getNotes();
    }
    else
    {
      navigate('/login');
    }
    
  }, []);

  const alertContext = useContext(AlertContext);
  const {showAlert} = alertContext;

  const modalOpen = (selnote) => {
    buttonRef.current.click();
    console.log(selnote);

    seteNote({
      title: selnote.note.title,
      description: selnote.note.description,
      tag: selnote.note.tag,
      _id: selnote.note._id,
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    console.log(enote);
    updateNote(enote);

    closeButton.current.click();
    showAlert("success" , "Note Updated Successfully");
    
  };
  const onChange = (e) => {
    console.log(`${e.target.name} : ${e.target.value}`);
    seteNote({ ...enote, [e.target.name]: e.target.value });
  };
  return (
    <>
      {!Array.isArray(notes) ? (
        <Loader />
      ) : (
        <>
        {notes == null ? (
          <Loader />
        ) : (
          <>
            <div className="container my-3">
              <AddNote />
            </div>
            <button
              type="button"
              style={{ display: "none" }}
              ref={buttonRef}
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Launch demo modal
            </button>
      
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                          Title
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="title"
                          name="title"
                          value={enote.title}
                          aria-describedby="emailHelp"
                          onChange={onChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="tag" className="form-label">
                          Tag
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="tag"
                          name="tag"
                          value={enote.tag}
                          onChange={onChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                          Description
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="description"
                          name="description"
                          value={enote.description}
                          onChange={onChange}
                        />
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                          ref={closeButton}
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleClick}
                          disabled={
                            !enote.title ||
                            !enote.description ||
                            enote.title.trim() === "" ||
                            enote.description.trim() === "" ||
                            enote.title.length < 5 ||
                            enote.description.length < 5 ||
                            enote.tag.length < 3
                          }
                        >
                          Update Note
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              {notes.length === 0 ? (
                <h2>No notes to display</h2>
              ) : (
                <div className="row my-3">
                  <h2>Your Notes</h2>
                  {notes.map((note) => (
                    <NoteItems key={note._id} note={note} editNote={modalOpen} />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </>
      )}
    </>
  );
}

export default Notes;
