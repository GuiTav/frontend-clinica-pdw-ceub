import { CommonModule } from '@angular/common';
import { Component, inject, model, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackbarDefaultConfig } from '../../app.component';
import { EspecialidadeRes } from '../../pages/especialidades/especialidades.model';
import { EspecialidadesService } from '../../pages/especialidades/especialidades.service';
import { ProfissionalReq, ProfissionalRes } from '../../pages/profissionais/profissionais.model';

@Component({
	selector: 'app-dialog-profissional',
	imports: [
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		MatButtonModule,
		MatDialogTitle,
		MatDialogContent,
		MatDialogActions,
		MatSelectModule
	],
	templateUrl: './dialog-profissional.component.html',
	styleUrl: './dialog-profissional.component.scss'
})
export class DialogProfissionalComponent implements OnInit {

	readonly especialidadeService = inject(EspecialidadesService);
	readonly dialogRef = inject(MatDialogRef<DialogProfissionalComponent>);
	readonly data = inject<DialogProfissionalData>(MAT_DIALOG_DATA);
	readonly snackbar = inject(MatSnackBar);

	inputEspecialidades = this.data.profissional?.especialidades;

	isEdicao = this.data.isEdicao;
	idProfissional = model(this.data.profissional?.idProfissional);
	nomeProfissional = model(this.data.profissional?.nomeProfissional);
	especialidadesSelecionadas = model<EspecialidadeRes[]>([]);

	especialidades: EspecialidadeRes[] = [];

	ngOnInit(): void {
		this.especialidadeService.listarEspecialidades().subscribe(resultado => {
			this.especialidades = resultado;
			let instanciasListaEspecialidades = this.especialidades.filter(e => this.inputEspecialidades?.some(eInput => eInput.idEspecialidade == e.idEspecialidade));
			this.especialidadesSelecionadas.set(instanciasListaEspecialidades);
		});
	}

	fechar(profissional?: ProfissionalReq) {
		this.dialogRef.close(profissional);
	}

	salvar() {
		let nomeFiltro = this.nomeProfissional();
		let idsEspecialidadesFiltro = this.especialidadesSelecionadas().map(e => e.idEspecialidade);

		if (!nomeFiltro) {
			this.snackbar.open("O campo 'Nome' não pode ser vazio", "Ok", snackbarDefaultConfig);
			return;
		}

		this.fechar({ idProfissional: this.idProfissional(), nomeProfissional: nomeFiltro, idsEspecialidades: idsEspecialidadesFiltro });
	}

}

export interface DialogProfissionalData {
	profissional?: ProfissionalRes,
	isEdicao: boolean
}
