import { Component } from '@angular/core';
import { SelectSizeComponent } from "./select-size/select-size.component";
import { ShowPostsComponent } from './show-posts/show-posts.component';

@Component({
  selector: 'app-secretary',
  imports: [SelectSizeComponent,ShowPostsComponent],
  templateUrl: './secretary.component.html',
  styleUrl: './secretary.component.scss'
})
export class SecretaryComponent {


}
