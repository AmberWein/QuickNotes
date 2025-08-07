import { useState, useRef } from "react";
import "./QuickNotes.css";

function QuickNotes() {
  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const textareaRef = useRef(null);

  const formatDate = (date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();

    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;

    return `${month} ${day}${getOrdinalSuffix(
      day
    )} ${displayHours}:${minutes} ${ampm}`;
  };

  const addNote = () => {
    if (noteContent.trim() === "") return;

    const newNote = {
      id: Date.now(),
      title: noteTitle.trim() || null,
      content: noteContent,
      createdAt: new Date(),
    };

    setNotes([...notes, newNote]);
    setNoteContent("");
    setNoteTitle("");
  };

  const deleteNote = (noteId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your note?"
    );
    if (confirmDelete) {
      setNotes(notes.filter((note) => note.id !== noteId));
    }
  };

  const handleContentChange = (e) => {
    setNoteContent(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  return (
    <div className="QuickNotes-container">
      <h1>QuickNotes</h1>

      <div className="add-new-note-container">
        <h3>Add new note</h3>
        <input
          type="text"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          placeholder="Note title (optional)"
        />

        <textarea
          ref={textareaRef}
          value={noteContent}
          onChange={handleContentChange}
          placeholder="Write your note here..."
          rows={1}
          style={{ overflow: "hidden" }}
        />
        <button onClick={addNote}>Add</button>
      </div>

      <div className="notes-container">
        {notes.map((note) => (
          <div key={note.id} className="note-card">
            {note.title && <h4>{note.title}</h4>}
            <div className="note-content">{note.content}</div>
            <div className="note-footer">
              <span>{formatDate(note.createdAt)}</span>
              <button
                onClick={() => deleteNote(note.id)}
                className="delete-btn"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

      {notes.length === 0 && <div>No notes yet, add your first note.</div>}
    </div>
  );
}

export default QuickNotes;
