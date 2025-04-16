import { CommonModule } from '@angular/common';
import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackbarDefaultConfig } from '../../app.component';
import { EspecialidadeReq, EspecialidadeRes } from '../../pages/especialidades/especialidades.model';

@Component({
	selector: 'app-dialog-especialidade',
	imports: [
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		MatButtonModule,
		MatDialogTitle,
		MatDialogContent,
		MatDialogActions,
	],
	templateUrl: './dialog-especialidade.component.html',
	styleUrl: './dialog-especialidade.component.scss'
})
export class DialogEspecialidadeComponent {

	readonly dialogRef = inject(MatDialogRef<DialogEspecialidadeComponent>);
	readonly data = inject<DialogEspecialidadeData>(MAT_DIALOG_DATA);
	readonly snackbar = inject(MatSnackBar);
	isEdicao = this.data.isEdicao;
	idEspecialidade = model(this.data.especialidade?.idEspecialidade);
	nomeEspecialidade = model(this.data.especialidade?.nomeEspecialidade);

	fechar(especialidade?: EspecialidadeReq) {
		this.dialogRef.close(especialidade);
	}

	salvar() {
		let nomeFiltro = this.nomeEspecialidade();

		if (!nomeFiltro) {
			this.snackbar.open("Não podem haver campos vazios", "Ok", snackbarDefaultConfig);
			return;
		}
		
		this.fechar({ idEspecialidade: this.idEspecialidade(), nomeEspecialidade: nomeFiltro });
	}

}

export interface DialogEspecialidadeData {
	especialidade?: EspecialidadeRes,
	isEdicao: boolean
}