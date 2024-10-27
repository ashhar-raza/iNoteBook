import React, { useState } from "react";

import noteContext from "./noteContext";

const host = "http://localhost:5000";
const auth_token = localStorage.getItem('token');
const NoteState = (props) => {
  const [notes, setNotes] = useState(null);

  //Get Notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "auth-token": auth_token,
      },
    });

    const json = await response.json();
    console.log(json);
    setNotes(json);
  };
  //Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "auth-token": auth_token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        tag: tag,
      }),
    });

    const json = await response.json();
    console.log(json);
    setNotes((prev) => {
      return [...prev, json];
    });
  };

  //Delete a Note

  const deleteNote = async (id) => {
    const newNotes = notes.filter((note) => note._id !== id); // Return boolean value
    setNotes(newNotes);

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token": auth_token,
        "Content-Type": "application/json",
      },
    });

    console.log(response);
  };

  //Update a Note

  const updateNote = async (enote) => {
    // Update the local state first
    const updatedNotes = notes.map((note) =>
      note._id === enote._id
        ? {
            ...note,
            title: enote.title,
            description: enote.description,
            tag: enote.tag,
          }
        : note
    );
    setNotes(updatedNotes); // Update the state

    // Send the update to the server
    const response = await fetch(`${host}/api/notes/updatenote/${enote._id}`, {
      method: "PUT",
      headers: {
        "auth-token": auth_token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: enote.title,
        description: enote.description,
        tag: enote.tag,
      }), // Stringify the body
    });

    // Check for errors in the response
    const result = await response.json();
    if (!response.ok) {
      console.error("Error updating note:", result);
      return;
    }

    console.log("Note updated successfully:", result);
  };

  return (
    <noteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, updateNote, getNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};
export default NoteState;
