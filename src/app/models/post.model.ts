import { SizePost } from './size-post.model';
export class Post {
  id?: string;
  name!: string;
  sizePostId!: string;
  sizePost?: SizePost;
}
