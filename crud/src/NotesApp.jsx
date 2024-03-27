import React, { useState, useEffect } from 'react';
import './NotesApp.css';
import api from './API'; 

const NotesApp = () => {
  const [notes, setNotes] = useState([]);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [error, setError] = useState('');

  // Загрузка заметок при инициализации и после нажатия кнопки обновить
  useEffect(() => {
    loadNotes();
  }, []);

  function loadNotes() {
    api.loadNotes()
      .then(data => {
        setNotes(data);
        setError(''); 
        setNewNoteContent('');
      })
      .catch(err => {
        console.error('Ошибка при загрузке заметок:', err);
        setError('Не удалось загрузить заметки. Попробуйте позже.');
      });
  }

  // Добавление новой заметки
  const handleAddNote = () => {
    if (!newNoteContent.trim()) {
      alert('Заметка не может быть пустой');
      return;
    }
    api.addNote(newNoteContent)
      .then(newNote => {
        setNewNoteContent('');
        setNotes([...notes, newNote]);
        setError(''); 
      })
      .catch(err => {
        console.error('Ошибка при добавлении заметки:', err);
        setError('Не удалось добавить заметку. Попробуйте позже.');
      });
  };

  // Удаление заметки
  const handleDeleteNote = (noteId) => {
    api.deleteNote(noteId)
      .then(() => {
        setNotes(notes.filter(note => note.id !== noteId));
        setError(''); 
      })
      .catch(err => {
        console.error('Ошибка при удалении заметки:', err);
        setError('Не удалось удалить заметку. Попробуйте позже.');
      });
  };

  return (
    <div className="notes-container">
      {error && <div className="error-message">{error}</div>} {}
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
