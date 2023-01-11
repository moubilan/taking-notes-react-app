import React, { useEffect } from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import {nanoid} from "nanoid"


export default function App() {
    const [notes, setNotes] = React.useState(
        () => JSON.parse(localStorage.getItem("notes")) || [])
    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || "" )

    function createNewNote() {
        if (notes.length < 5){
            const newNote = {
                id: nanoid(),
                body: `Note Title`
            }
            setNotes(prevNotes => [newNote, ...prevNotes])
            setCurrentNoteId(newNote.id)
        } else {
            window.alert('tu atteint le maximum de 5 notes')
        }
    }
    
    function updateNote(text) {
        // var string = text.slice(text.indexOf('\n'))
        // var stringLength = (text!==0) ? string.match(/[a-zA-Z0-9]/g).length : 0
        // if(stringLength <= 30){
            setNotes( (oldNotes) => {
                const newArray = [];
                for(let i=0; i < oldNotes.length; i++){
                    const oldNote = oldNotes[i]
                    if(oldNote.id === currentNoteId){
                        newArray.unshift({...oldNote, body: text})
                    } else{
                        newArray.push(oldNote)
                    }
                }
                return newArray
            })
            console.log(notes[0].body)
    }
    
    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }

    function deleteNote(event, noteId) {
        event.stopPropagation()
        setNotes( 
            oldNotes => oldNotes.filter(note => note.id !== noteId)
        )
    }

    useEffect( ()=>{
        localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])
    
    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}