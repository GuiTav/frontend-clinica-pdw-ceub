import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAgendamentoComponent } from './dialog-agendamento.component';

describe('DialogAgendamentoComponent', () => {
  let component: DialogAgendamentoComponent;
  let fixture: ComponentFixture<DialogAgendamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAgendamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
