import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProfissionalComponent } from './dialog-profissional.component';

describe('DialogProfissionalComponent', () => {
  let component: DialogProfissionalComponent;
  let fixture: ComponentFixture<DialogProfissionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogProfissionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogProfissionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
