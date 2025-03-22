import { AsyncPipe } from '@angular/common';
import { Component, Signal, signal, effect, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, query, where } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-size-post',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './add-size-post.component.html',
  styleUrl: './add-size-post.component.scss'
})
export class AddSizePostComponent {
  private firestore: Firestore = inject(Firestore);

  // מחליף Observable ב-Signal
  items = signal<any[]>([]);

  constructor() {
    this.loadSizes();
  }

  private loadSizes() {
    const aCollection = collection(this.firestore, 'sizes-post');
    const items$ = collectionData(aCollection, { idField: 'id' });

    // מעדכן את ה-signal בכל שינוי
    effect(() => {
      items$.subscribe((data) => this.items.set(data));
    });
  }

  async create() {
    const aCollection = collection(this.firestore, 'sizes-post');

    try {
      await addDoc(aCollection, {
        name: 'New Size',
        value: 'Large',
        createdAt: new Date()
      });
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
