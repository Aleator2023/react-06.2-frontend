const API_BASE_URL = 'http://localhost:7070/notes';

const api = {
  loadNotes: () => {
    return fetch(API_BASE_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка при загрузке заметок');
        }
        return response.json();
      });
  },
  addNote: (noteContent) => {
    return fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: noteContent }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Ошибка при добавлении заметки');
      }
      return response.json();
    });
  },
  deleteNote: (noteId) => {
    return fetch(`${API_BASE_URL}/${noteId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Ошибка при удалении заметки');
      }
    });
  }
};

export default api;
