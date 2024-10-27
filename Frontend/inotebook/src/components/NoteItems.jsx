import React, { useContext } from "react";
import notesContext from "../context/notes/noteContext";
import AlertContext from "../context/alert/alertContext";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

function NoteItems(props) {
  const context = useContext(notesContext);
  const { deleteNote } = context;
  const { note , editNote} = props;

  const alertContext = useContext(AlertContext);
  const {showAlert} = alertContext;
  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
        <div className="d-flex justify-content-between align-items-centre">
            <h5 className="card-title">{note.title}</h5>
            <div className="icons ">
              <MdDelete
              style={{cursor : 'pointer'}}
                className="mx-1"
                onClick={() => {
                  deleteNote(note._id);
                  showAlert("success" , "Note Deleted Successfully")
                }}
              />
              <FaRegEdit style={{cursor : 'pointer'}} className="mx-1" 
              onClick={()=>{ showAlert("warning" , "Your are editing a note"); editNote({note})
              }}/>
            </div>
          </div>
          <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}

export default NoteItems;
