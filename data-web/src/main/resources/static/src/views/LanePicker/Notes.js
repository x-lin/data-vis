import React from "react";
import Note from "./Note.js";

const Notes = ({ notes, move }) => {
    const withItems = {
        padding: "0px",
        margin: "0px",
        listStyle: "none"
    };

    const withoutItems = Object.assign({}, withItems, {
        margin: "20px"
    });

    const style = notes.length ? withItems : withoutItems;

    const notesRendered = notes.map(note => {
        return (
            <Note
              className="note"
              id={note.key}
              key={note.key}
              onMove={move}
              note={note}
            />
        );
    });

    return (
        <ul style={style}>
            {notesRendered}
        </ul>
    );
};

Notes.propTypes = {
    notes: React.PropTypes.array.isRequired,
    move: React.PropTypes.func.isRequired
};

export default Notes;
