import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowoutBtnsComponent } from './flowout-btns.component';

describe('FlowoutBtnsComponent', () => {
  let component: FlowoutBtnsComponent;
  let fixture: ComponentFixture<FlowoutBtnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowoutBtnsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowoutBtnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
