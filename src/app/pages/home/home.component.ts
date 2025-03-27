import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NotesService } from '../../core/services/notes/notes.service';
import { ToastrService } from 'ngx-toastr';
import { INotes } from '../../shared/interfaces/inotes';
import { NoteData } from '../../shared/interfaces/note-data';
import { title } from 'process';


@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit
{

  private readonly _notesService = inject(NotesService)
  private readonly _toastrService = inject(ToastrService)

  notesData:INotes[] =[]
  notesId!:string

  addNoteForm: FormGroup = new FormGroup
    ({

      title: new FormControl('',
        [
          Validators.required,
          Validators.minLength(3),  
          Validators.maxLength(50) 
        ]),
      content: new FormControl('',
        [
          Validators.required,        
          Validators.minLength(10),   
          Validators.maxLength(500), 
          Validators.pattern('^[a-zA-Z0-9.,!?\\s]+$'), 
        ]),
    })
  

  
  updateNoteForm: FormGroup = new FormGroup
    ({
      title: new FormControl('',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]),
      content: new FormControl('',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
          Validators.pattern('^[a-zA-Z0-9.,!?\\s]+$'),
        ]),
    })
  
  ngOnInit(): void
  {
    this.getAllUserNotes()
  }

  getAllUserNotes(): void
  {
    this._notesService.getUserNotes().subscribe
      ({
        next: (res) =>
        {
          console.log(res.notes);
          this.notesData = res.notes
        },
        error: (err) =>
        {
          console.log(err);
          
        }
      })
  }
  
  submitAddNoteForm():void
  {
    console.log(this.addNoteForm.value);
    this._notesService.addNote(this.addNoteForm.value).subscribe
      ({
        next: (res) =>
        {
          console.log(res.note);
          this.getAllUserNotes()
          this._toastrService.success(res.msg)
        },
        error: (err) =>
        {
          console.log(err);
          
        }
      })
  }

  setUpdateData(note: INotes,id:string): void
  {
    this.notesId = id
    this.updateNoteForm.patchValue
      ({
        title: note.title,
        content: note.content
      })
  }

  submitUpdateNoteForm():void
  {
    this._notesService.updateNote(this.notesId, this.updateNoteForm.value).subscribe
      ({
        next: (res) =>
        {
          console.log(res.note);
          this.getAllUserNotes()
          this._toastrService.success(res.msg)
        },
        error: (err) =>
        {
          console.log(err);
          
        }
      })
  }

  deleteUserData(id: string): void
  {
    this._notesService.deleteNote(id).subscribe
      ({
        next: (res) =>
        {
          console.log(res);
          this.getAllUserNotes()
          this._toastrService.success(res.msg)
        },
        error: (err) =>
        {
          console.log(err);
          
        }
      })
  }

}
