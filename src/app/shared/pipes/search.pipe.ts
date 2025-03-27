import { Pipe, PipeTransform } from '@angular/core';
import { INotes } from '../interfaces/inotes';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform
{
  transform(notes: INotes[], value: string): INotes[]
    {
    if (!notes || !value)
    {
        return notes;
    }

    return notes.filter((note) =>
      typeof note?.title === 'string' && note.title.toLowerCase().includes(value.toLowerCase())
    );
  }

}
