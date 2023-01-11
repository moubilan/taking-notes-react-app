import React from "react"

export default function Sidebar(props) { // var regex = /[a-zA-Z0-9]/
    const noteElements = props.notes.slice(0,5).map((note, index) => (
        <div key={note.id}>
            <div
                className={`title ${
                    note.id === props.currentNote.id ? "selected-note" : ""
                }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className="text-snippet">{  note.body.slice(0, note.body.indexOf('\n')) || 'empty note'}</h4>
                <button className="delete-btn" onClick={(event) => {props.deleteNote(event, note.id)}}> 
                    <i className="gg-trash trash-icon"></i>
                </button>
            </div>
        </div>
    ))

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Ocean Notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}
