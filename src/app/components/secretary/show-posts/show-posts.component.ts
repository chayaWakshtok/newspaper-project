import { Component, inject } from '@angular/core';
import { SizePost } from '../../../models/size-post.model';
import { Post } from '../../../models/post.model';
import { collection, Firestore } from '@angular/fire/firestore';
import { getDocs } from 'firebase/firestore';
import { CommonModule, NgStyle, NumberSymbol } from '@angular/common';
import { PostsService } from '../../../services/posts.service';


@Component({
  selector: 'app-show-posts',
  imports: [NgStyle,CommonModule ],
  templateUrl: './show-posts.component.html',
  styleUrl: './show-posts.component.scss'
})
export class ShowPostsComponent {
  private firestore: Firestore = inject(Firestore);
  private postService = inject(PostsService);
  items: SizePost[] = [];
  posts: Post[] = [];

  async ngOnInit() {
    await this.loadSizes();
    await this.loadPosts();
    this.postService.isChanged.subscribe(res => {
      this.loadPosts();
    })
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

  getPointer() {
    return (this.posts ?? []).reduce((sum, item) => sum + (item.sizePost?.countPoint ?? 0), 0) / 16;
  }

  getPointerNotExist() {
    return (this.posts ?? []).reduce((sum, item) => sum + (item.sizePost?.countPoint ?? 0), 0) % 16;
  }
}
