import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerEditorComponent } from './datepicker-editor.component';

describe('DatepickerEditorComponent', () => {
  let component: DatepickerEditorComponent;
  let fixture: ComponentFixture<DatepickerEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatepickerEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatepickerEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
