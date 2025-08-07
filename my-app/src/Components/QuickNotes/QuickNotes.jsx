import { useState } from "react";

function QuickNotes() {
  const [notes, setNotes] = useState([]);
  const [noteContent, setNoteContent] = useState("");

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

  return (
    <div>
      <h1>QuickNotes</h1>

      <div>
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "15px",
        }}
      >
        {notes.map((note) => (
          <div key={note.id}>
            <div>{note.content}</div>
            <div
              style={{
                fontSize: "12px",
                color: "#666",
                paddingTop: "8px",
              }}
            >
              {note.createdAt.toString()}
            </div>
          </div>
        ))}
      </div>

      {notes.length === 0 && <div>No notes yet, add your first note.</div>}
    </div>
  );
}

export default QuickNotes;
