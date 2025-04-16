import { CommonModule } from '@angular/common';
import { Component, inject, model, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OperacaoReq, OperacaoRes } from '../../pages/operacoes/operacoes.model';
import { snackbarDefaultConfig } from '../../app.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { EspecialidadeRes } from '../../pages/especialidades/especialidades.model';
import { EspecialidadesService } from '../../pages/especialidades/especialidades.service';

@Component({
	selector: 'app-dialog-operacao',
	imports: [
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		MatButtonModule,
		MatDialogTitle,
		MatDialogContent,
		MatDialogActions,
		MatAutocompleteModule,
	],
	templateUrl: './dialog-operacao.component.html',
	styleUrl: './dialog-operacao.component.scss'
})
export class DialogOperacaoComponent implements OnInit {

	readonly especialidadeService = inject(EspecialidadesService);
	readonly dialogRef = inject(MatDialogRef<DialogOperacaoComponent>);
	readonly data = inject<DialogOperacaoData>(MAT_DIALOG_DATA);
	readonly snackbar = inject(MatSnackBar);
	isEdicao = this.data.isEdicao;
	idOperacao = model(this.data.operacao?.idOperacao);
	nomeOperacao = model(this.data.operacao?.nomeOperacao);
	descricaoOperacao = model(this.data.operacao?.descricaoOperacao);
	duracaoOperacao = model(this.data.operacao?.duracaoMinutosOperacao);
	idEspecialidade = model(this.data.operacao?.especialidade.idEspecialidade);
	nomeEspecialidade = model(this.data.operacao?.especialidade.nomeEspecialidade);

	especialidades: EspecialidadeRes[] = [];

	ngOnInit(): void {
		this.especialidadeService.listarEspecialidades().subscribe(resultado => this.especialidades = resultado);
	}

	fechar(operacao?: OperacaoReq | OperacaoRes) {
		this.dialogRef.close(operacao);
	}

	salvar() {
		let nomeFiltro = this.nomeOperacao();
		let descricaoFiltro = this.descricaoOperacao();
		let duracaoFiltro = this.duracaoOperacao();
		let idEspecialidadeFiltro = this.idEspecialidade();

		if (!nomeFiltro || !descricaoFiltro || !duracaoFiltro || !idEspecialidadeFiltro) {
			this.snackbar.open("Não podem haver campos vazios", "Ok", snackbarDefaultConfig);
			return;
		}

		this.fechar({ idOperacao: this.idOperacao(), nomeOperacao: nomeFiltro, descricaoOperacao: descricaoFiltro, duracaoMinutosOperacao: duracaoFiltro, idEspecialidade: idEspecialidadeFiltro });
	}

}

export interface DialogOperacaoData {
	operacao?: OperacaoRes,
	isEdicao: boolean
}
