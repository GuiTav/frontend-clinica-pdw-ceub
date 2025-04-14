import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEspecialidadeComponent } from './dialog-especialidade.component';

describe('DialogEspecialidadeComponent', () => {
  let component: DialogEspecialidadeComponent;
  let fixture: ComponentFixture<DialogEspecialidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEspecialidadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEspecialidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
