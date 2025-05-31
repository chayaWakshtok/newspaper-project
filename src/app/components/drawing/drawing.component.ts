import { Component, inject } from '@angular/core';
import { collection, Firestore } from '@angular/fire/firestore';
import { getDocs } from 'firebase/firestore';
import { NgStyle } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { PostsService } from '../../services/posts.service';
import { SizePost } from '../../models/size-post.model';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-drawing',
  imports: [DragDropModule, NgStyle],
  templateUrl: './drawing.component.html',
  styleUrl: './drawing.component.scss'
})
export class DrawingComponent {
  private firestore: Firestore = inject(Firestore);
  private postService = inject(PostsService);
  items: SizePost[] = [];
  posts: Post[] = [];
  targetDropListIds: string[] = [];
  assignedPosts: { [key: number]: Post[] } = {};


  async ngOnInit() {
    await this.loadSizes();
    await this.loadPosts();
    this.postService.isChanged.subscribe(res => {
      this.loadPosts();
    })
    this.generateDropListIds();

  }

  generateDropListIds() {
    this.targetDropListIds = [];
    const totalBoxes = this.pairs.flat().length + 1;

    for (let i = 1; i <= totalBoxes; i++) {
      this.assignedPosts[i] = [];
      this.targetDropListIds.push('target-' + i);
    }
  }


  private async loadSizes() {
    try {
      const aCollection = collection(this.firestore, 'sizes-post');
      const snapshot = await getDocs(aCollection);
      this.items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SizePost));
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  }

  private async loadPosts() {
    try {
      const aCollection = collection(this.firestore, 'posts');
      const snapshot = await getDocs(aCollection);
      this.posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
      this.posts.forEach(p => {
        p.sizePost = this.items.find(s => s.id == p.sizePostId);
      });
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  }

  pagesShow = Array.from({ length: 39 }, (_, i) => i + 1); // 1 to 50

  get pairs() {
    const pairs = [];
    for (let i = 1; i < this.pagesShow.length; i += 2) {
      const pair = [this.pagesShow[i]];
      if (i + 1 < this.pagesShow.length) {
        pair.push(this.pagesShow[i + 1]);
      }
      pairs.push(pair);
    }
    return pairs;
  }

  onDrop(event: CdkDragDrop<any>, index: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const destinationList = event.container.data;
      const sourceList = event.previousContainer.data;
      transferArrayItem(
        sourceList,
        destinationList,
        event.previousIndex,
        destinationList.length
      );
    }
    // const droppedPost: Post = event.item.data;
    // this.posts = this.posts.filter(p => p.id !== droppedPost.id);
    // this.assignedPosts[index].push(droppedPost);

    // const draggedData = event.item.data.name;
    // console.log(`Dropped ${draggedData} into box ${index}`);
    // כאן אפשר לעדכן את הנתונים או לשנות צבע, להוסיף לרשימה וכו'
  }
}
