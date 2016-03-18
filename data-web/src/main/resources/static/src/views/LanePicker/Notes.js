import React from 'react';
import Note from './Note.js';

export default ({notes, move}) => {
    const withItems = {
        padding: "0px",
        margin: "0px",
        listStyle: "none",
    };

    const withoutItems = Object.assign({}, withItems, {
        margin: "20px"
    });

    const style = notes.length ? withItems : withoutItems;

    const notesRendered = notes.map(note => {
        return <Note className="note" id={note.key} key={note.key}
              onMove={move} note={note}>
        </Note>
    });

  return (
          <ul style={style}>{notesRendered}</ul>
  );
}
