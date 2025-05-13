import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesPostComponent } from './pages-post.component';

describe('PagesPostComponent', () => {
  let component: PagesPostComponent;
  let fixture: ComponentFixture<PagesPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
