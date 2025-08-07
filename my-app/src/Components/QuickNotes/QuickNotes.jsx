import { useState } from "react";

function QuickNotes() {
  const [notes, setNotes] = useState([]);
  const [noteContent, setNoteContent] = useState("");

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
      content: noteContent,
      createdAt: new Date(),
    };

    setNotes([...notes, newNote]);
    setNoteContent("");
  };

  const deleteNote = (noteId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your note?"
    );
    if (confirmDelete) {
      setNotes(notes.filter((note) => note.id !== noteId));
    }
  };

  return (
    <div className="QuickNotes-container">
      <h1>QuickNotes</h1>

      <div className="add-new-note-container">
        <h3>Add new note</h3>
        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="Write your note here..."
          rows={4}
          style={{
            width: "100%",
            fontSize: "14px",
            borderRadius: "4px",
          }}
        />
        <br />
        <button onClick={addNote}>Add</button>
      </div>

      <div className="notes-container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "15px",
        }}
      >
        {notes.map((note) => (
          <div
            key={note.id}
            style={{
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <div className="note-content">{note.content}</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "12px",
                color: "#666",
                paddingTop: "8px",
                borderTop: "1px solid #eee",
                marginTop: "10px",
              }}
            >
              <span>{formatDate(note.createdAt)}</span>
              <button
                onClick={() => deleteNote(note.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#dc3545",
                  fontSize: "16px",
                  cursor: "pointer",
                  padding: "2px 6px",
                }}
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
