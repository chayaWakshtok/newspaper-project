import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSizePostComponent } from './add-size-post.component';

describe('AddSizePostComponent', () => {
  let component: AddSizePostComponent;
  let fixture: ComponentFixture<AddSizePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSizePostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSizePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
