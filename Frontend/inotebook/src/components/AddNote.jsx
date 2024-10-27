import React, { useContext, useState } from "react";
import notesContext from "../context/notes/noteContext";
import AlertContext from "../context/alert/alertContext";
function AddNote() {
  const context = useContext(notesContext);
  const { addNote } = context;
  const[note,setNote] = useState( { title:"" , description : "" , tag : ""})

  const alertContext = useContext(AlertContext);
  const {showAlert} = alertContext;

  const handleClick = (e) => {

    e.preventDefault();
    addNote(note.title , note.description , note.tag);
   
    setNote({ title:"" , description : "" , tag : ""});
    showAlert("success" , "Note Added Successfully");

  };
  const onChange = (e) => {

    console.log(`${e.target.name} : ${e.target.value}`);
    setNote({...note , [e.target.name] : e.target.value     })
  };
  return (
    <>
      <div className="container my-3">
        <h2>Add a Note</h2>
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
              value={note.title}
              aria-describedby="emailHelp"
              onChange={onChange}
              minLength={5}
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
              value={note.tag}
              onChange={onChange}
              minLength={3}
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
              value={note.description}
              onChange={onChange}
              minLength={5}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
            disabled ={ note.title.trim() === ""||
              note.description.trim() === ""||
              note.title.length < 5 ||
              note.description.length < 5 ||
              note.tag.length < 3
            }
          >
            Add Note
          </button>
        </form>
      </div>
    </>
  );
}

export default AddNote;
