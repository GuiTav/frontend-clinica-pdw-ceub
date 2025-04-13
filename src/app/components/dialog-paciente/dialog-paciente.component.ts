import { CommonModule } from "@angular/common";
import { Component, inject, model } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { snackbarDefaultConfig } from "../../app.component";
import { Paciente } from "../../pages/pacientes/pacientes.model";

@Component({
	selector: 'app-dialog-paciente',
	imports: [
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		MatButtonModule,
		MatDialogTitle,
		MatDialogContent,
		MatDialogActions,
		NgxMaskDirective
	],
	templateUrl: './dialog-paciente.component.html',
	styleUrl: './dialog-paciente.component.scss',
	providers: [provideNgxMask({ dropSpecialCharacters: false })],
})
export class DialogPacientesComponent {

	readonly dialogRef = inject(MatDialogRef<DialogPacientesComponent>);
	readonly data = inject<DialogData>(MAT_DIALOG_DATA);
	readonly snackbar = inject(MatSnackBar);
	isEdicao = this.data.isEdicao;
	cpf = model(this.data.paciente?.cpfPaciente);
	nome = model(this.data.paciente?.nomePaciente);

	fechar(paciente?: Paciente) {
		this.dialogRef.close(paciente);
	}

	salvar() {
		let cpfFiltro = this.cpf();
		let nomeFiltro = this.nome();

		if (!cpfFiltro || !nomeFiltro) {
			this.snackbar.open("Não podem haver campos vazios", "Ok", snackbarDefaultConfig);
			return;
		}

		if (cpfFiltro.length !== 14) {
			this.snackbar.open("Campo CPF inválido", "Ok", snackbarDefaultConfig);
			return;
		}

		this.fechar({ cpfPaciente: cpfFiltro, nomePaciente: nomeFiltro });
	}

}

export interface DialogData {
	paciente?: Paciente,
	isEdicao: boolean
}