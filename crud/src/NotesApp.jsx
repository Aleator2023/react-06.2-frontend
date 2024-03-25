import React, { useState, useEffect } from 'react';
import './NotesApp.css';

const NotesApp = () => {
  const [notes, setNotes] = useState([]);
  const [newNoteContent, setNewNoteContent] = useState('');

  // Загрузка заметок при инициализации и после нажатия кнопки обновить
  useEffect(() => {
    loadNotes();
  }, []);

  function loadNotes() {
    fetch('http://localhost:7070/notes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка сети');
        }
        return response.json();
      })
      .then(data => {
        setNotes(data);
      })
      .catch(err => console.error('Ошибка при загрузке заметок:', err));
  }

  // Добавление новой заметки
  const handleAddNote = () => {
    fetch('http://localhost:7070/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newNoteContent }),
    })
    .then(response => response.json())
    .then(newNote => {
      setNewNoteContent('');
      setNotes([...notes, newNote]); // Добавить новую заметку непосредственно в состояние без дополнительного GET запроса
    })
    .catch(err => console.error('Ошибка при добавлении заметки:', err));
  };

  // Удаление заметки
  const handleDeleteNote = (noteId) => {
    fetch(`http://localhost:7070/notes/${noteId}`, {
      method: 'DELETE',
    })
    .then(() => {
      setNotes(notes.filter(note => note.id !== noteId)); // Обновить состояние локально
    })
    .catch(err => console.error('Ошибка при удалении заметки:', err));
  };

  return (
    <div className="notes-container">
      <button className="refresh-btn" onClick={loadNotes}>⟳ Обновить</button>
      <div>
        {notes.map(note => (
          <div key={note.id} className="note-card">
            {note.content}
            <button className="delete-btn" onClick={() => handleDeleteNote(note.id)}>X</button>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newNoteContent}
        onChange={(e) => setNewNoteContent(e.target.value)}
        className="new-note-input"
      />
      <button onClick={handleAddNote} className="add-btn">Добавить</button>
    </div>
  );
};

export default NotesApp;
