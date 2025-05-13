import { Component } from '@angular/core';

@Component({
  selector: 'app-pages-post',
  imports: [],
  templateUrl: './pages-post.component.html',
  styleUrl: './pages-post.component.scss'
})
export class PagesPostComponent {
  items = Array.from({ length: 39 }, (_, i) => i + 1); // 1 to 50

  get pairs() {
    const pairs = [];
    for (let i = 1; i < this.items.length; i += 2) {
      const pair = [this.items[i]];
      if (i + 1 < this.items.length) {
        pair.push(this.items[i + 1]);
      }
      pairs.push(pair);
    }
    return pairs;
  }
}
