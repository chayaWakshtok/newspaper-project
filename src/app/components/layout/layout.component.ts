import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FlowoutBtnsComponent } from './flowout-btns/flowout-btns.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent,FlowoutBtnsComponent,RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
