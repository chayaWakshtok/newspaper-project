import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  isChanged :Subject<boolean> = new Subject<boolean>();

  constructor() { }
}
