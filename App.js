import React, { useState, useEffect } from 'react';
import './App.css';
const Note = ({ note, onDelete, onColorChange }) => {
  return (
    <div className="note" style={{ backgroundColor: note.color }}>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <p>Created: {note.createdAt}</p>
      <button onClick={() => onDelete(note.id)}>Delete</button>
      <button onClick={() => onColorChange(note.id)}>Change Color</button>
    </div>
  );
};
const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    title: '',
    body: '',
    color: '#ffffff',
    createdAt: '',
  });

  useEffect(() => {
   
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
   
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const updatedNotes = [...notes, { ...newNote, id: Date.now() }];
    setNotes(updatedNotes);
    setNewNote({
      title: '',
      body: '',
      color: '#ffffff',
      createdAt: new Date().toLocaleString(),
    });
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const changeColor = (id) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, color: getRandomColor() } : note
    );
    setNotes(updatedNotes);
  };

  const getRandomColor = () => {
    const colors = ['#ffcccb', '#c2f0c2', '#cbf0f8', '#d9f5d9', '#f8d7da'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  return (
    <div className="app">
      <h1>Notes App</h1>
      <div className="note-form">
        <input
          type="text"
          placeholder="Title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
        <textarea
          placeholder="Body"
          value={newNote.body}
          onChange={(e) => setNewNote({ ...newNote, body: e.target.value })}
        />
        <button onClick={addNote}>Add Note</button>
      </div>
      <div className="notes-list">
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            onDelete={deleteNote}
            onColorChange={changeColor}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
