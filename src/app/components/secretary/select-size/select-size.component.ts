import { Component, effect, inject, signal, TemplateRef, WritableSignal } from '@angular/core';
import { SizePost } from '../../../models/size-post.model';
import { addDoc, collection, collectionData, Firestore, getDocs } from '@angular/fire/firestore';
import { NgStyle } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Post } from '../../../models/post.model';
import { PostsService } from '../../../services/posts.service';

@Component({
  selector: 'app-select-size',
  imports: [NgStyle, FormsModule],
  templateUrl: './select-size.component.html',
  styleUrl: './select-size.component.scss'
})
export class SelectSizeComponent {
  private firestore: Firestore = inject(Firestore);
  items: SizePost[] = [];
  post: Post = new Post();
  private modalService = inject(NgbModal);
  private postService = inject(PostsService);

  open(content: TemplateRef<any>, size: SizePost) {
    this.modalService.open(content).result.then(
      async (result) => {
        this.post.sizePost = size;
        await this.createPost();
      },
      (reason) => {
        this.post = new Post();
      },
    );
  }

  async createPost() {

    const aCollection = collection(this.firestore, 'posts');
    const postData = { ...this.post };
    postData.sizePostId = this.post.sizePost?.id || "";
    delete postData.sizePost;
    delete postData.id;

    try {

      await addDoc(aCollection, postData);
      this.postService.isChanged.next(true);
      this.post = new Post();
      console.log('Document added successfully');
    } catch (error) {
      console.error('Error adding document:', error);
    }
  }


  ngOnInit() {
    this.loadSizes();
  }

  private async loadSizes() {
    try {
      const aCollection = collection(this.firestore, 'sizes-post');
      const snapshot = await getDocs(aCollection);
      this.items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SizePost));
    } catch (error) {
      console.error('Error fetching Firestore data:', error);
    }
  }

}
