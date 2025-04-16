import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOperacaoComponent } from './dialog-operacao.component';

describe('DialogOperacaoComponent', () => {
  let component: DialogOperacaoComponent;
  let fixture: ComponentFixture<DialogOperacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogOperacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogOperacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
