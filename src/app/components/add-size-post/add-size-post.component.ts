import { AsyncPipe } from '@angular/common';
import { Component, Signal, signal, effect, inject, NgModule } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, query, where, CollectionReference, DocumentReference } from '@angular/fire/firestore';
import { SizePost } from '../../models/size-post.model';
import { FormsModule, NgModel } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-add-size-post',
  standalone: true,
  imports: [AsyncPipe,FormsModule ],
  templateUrl: './add-size-post.component.html',
  styleUrl: './add-size-post.component.scss'
})
export class AddSizePostComponent {
  private firestore: Firestore = inject(Firestore);

  // מחליף Observable ב-Signal
  items = signal<any[]>([]);
  sizePost:SizePost=new SizePost();

  items$: Observable<SizePost[]>;

  constructor() {
    const aCollection = collection(this.firestore, 'sizes-post')
    this.items$ = collectionData(aCollection) as Observable<SizePost[]>;;
  }

  async create() {

    const aCollection = collection(this.firestore, 'sizes-post');
    const sizePostData = { ...this.sizePost };

   delete sizePostData.id;

    try {

      await addDoc(aCollection, sizePostData);
      this.sizePost = new SizePost();
      console.log('Document added successfully');
    } catch (error) {
      console.error('Error adding document:', error);
    }
  }

  getPostsBySizePost(sizePostId: string): Signal<any[]> {
    const postsCollection = collection(this.firestore, 'posts');
    const q = query(postsCollection, where('sizePostId', '==', sizePostId));
    const postsSignal = signal<any[]>([]);

    const posts$ = collectionData(q, { idField: 'id' });

    // מאזין לשינויים ומעדכן את ה-signal
    effect(() => {
      posts$.subscribe((data) => postsSignal.set(data));
    });

    return postsSignal;
  }
}
