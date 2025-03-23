import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NotesService } from '../../core/services/notes/notes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent
{

  private readonly _notesService = inject(NotesService)
  private readonly _toastrService = inject(ToastrService)

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
  
  submitAddNoteForm():void
  {
    console.log(this.addNoteForm.value);
    this._notesService.addNote(this.addNoteForm.value).subscribe
      ({
        next: (res) =>
        {
          console.log(res.note);
          this._toastrService.success(res.msg,'Notify Team')
        },
        error: (err) =>
        {
          console.log(err);
          
        }
      })
  }

}
