import { Component } from '@angular/core';
import { PostsComponent } from "./posts/posts.component";
import { PagesPostComponent } from "./pages-post/pages-post.component";

@Component({
  selector: 'app-drawing',
  imports: [PostsComponent, PagesPostComponent],
  templateUrl: './drawing.component.html',
  styleUrl: './drawing.component.scss'
})
export class DrawingComponent {

}
