import React, { useState, useEffect } from 'react';
import './NotesApp.css'

const NotesApp = () => {
  const [notes, setNotes] = useState([]);
  const [newNoteContent, setNewNoteContent] = useState('');

  // Загрузка заметок при инициализации
  useEffect(() => {
    loadNotes();
  }, []);

    function loadNotes() {
    fetch('http://localhost:7070/notes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка сети');
        }
        return response.text();
      })
      .then(data => {
        if (data) { // Проверка, не пустая ли строка
          setNotes(JSON.parse(data));
        }
      })
      .catch(err => console.error('Ошибка при загрузке заметок:', err));
  }
 

  // Добавление новой заметки
  const handleAddNote = () => {
    fetch('http://localhost:7070/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
    .then(response => response.json())
    .then(() => {
      setNotes(notes.filter(note => note.id !== noteId)); // Обновить состояние локально
    })
    .catch(err => console.error('Ошибка при удалении заметки:', err));
  };
  return (
    <div>
      <div>
        {notes.map(note => (
          <div key={note.id}>
            {note.content}
            <button onClick={() => handleDeleteNote(note.id)}>X</button>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newNoteContent}
        onChange={(e) => setNewNoteContent(e.target.value)}
      />
      <button onClick={handleAddNote}>Добавить</button>
    </div>
  );
};

export default NotesApp;
