import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPacienteComponent } from './dialog-paciente.component';

describe('DialogPacienteComponent', () => {
  let component: DialogPacienteComponent;
  let fixture: ComponentFixture<DialogPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogPacienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
