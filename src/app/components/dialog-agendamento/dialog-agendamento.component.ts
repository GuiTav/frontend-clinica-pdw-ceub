import { CommonModule } from '@angular/common';
import { Component, inject, model } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackbarDefaultConfig } from '../../app.component';
import { AgendamentoReq, AgendamentoRes } from '../../pages/agendamentos/agendamentos.model';
import { OperacaoRes } from '../../pages/operacoes/operacoes.model';
import { OperacoesService } from '../../pages/operacoes/operacoes.service';
import { Paciente } from '../../pages/pacientes/pacientes.model';
import { PacientesService } from '../../pages/pacientes/pacientes.service';
import { ProfissionalRes } from '../../pages/profissionais/profissionais.model';
import { ProfissionaisService } from '../../pages/profissionais/profissionais.service';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatTimepickerModule } from '@angular/material/timepicker';

@Component({
	selector: 'app-dialog-agendamento',
	imports: [
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		MatButtonModule,
		MatDialogTitle,
		MatDialogContent,
		MatDialogActions,
		MatSelectModule,
		MatDatepickerModule,
		MatTimepickerModule
	],
	templateUrl: './dialog-agendamento.component.html',
	styleUrl: './dialog-agendamento.component.scss',
})
export class DialogAgendamentoComponent {

	readonly pacienteService = inject(PacientesService);
	readonly operacaoService = inject(OperacoesService);
	readonly profissionalService = inject(ProfissionaisService);
	readonly dialogRef = inject(MatDialogRef<DialogAgendamentoComponent>);
	readonly data = inject<DialogAgendamentoData>(MAT_DIALOG_DATA);
	readonly snackbar = inject(MatSnackBar);
	readonly dataMinima = new Date();

	isEdicao = this.data.isEdicao;
	idAgendamento = model(this.data.agendamento?.idAgendamento);
	dataHoraAgendamento = model(this.data.agendamento?.dataHoraAgendamento);
	paciente = model<Paciente>();
	operacao = model<OperacaoRes>();
	profissional = model<ProfissionalRes>();

	pacientesDisponiveis: Paciente[] = [];
	operacoesDisponiveis: OperacaoRes[] = [];
	profissionaisDisponiveis: ProfissionalRes[] = [];

	ngOnInit(): void {
		this.listaPacientes();
		this.listaOperacoes();

		this.operacao.subscribe(valor => {
			if (!valor) {
				return;
			}

			this.listaProfissionaisPorEspecialidade(valor.especialidade.idEspecialidade);
		})
	}

	listaPacientes() {
		this.pacienteService.listarPacientes().subscribe(resultado => {
			this.pacientesDisponiveis = resultado;
			this.paciente.set(this.pacientesDisponiveis.find(
				valor => valor.cpfPaciente == this.data.agendamento?.paciente.cpfPaciente
			));
		});
	}

	listaOperacoes() {
		this.operacaoService.listarOperacoes().subscribe(resultado => {
			this.operacoesDisponiveis = resultado;
			this.operacao.set(this.operacoesDisponiveis.find(
				valor => valor.idOperacao == this.data.agendamento?.operacao.idOperacao
			));
		});
	}

	listaProfissionaisPorEspecialidade(idEspecialidade: number) {
		this.profissionalService.listarProfissionaisPorEspecialidade(idEspecialidade).subscribe(resultado => {
			this.profissionaisDisponiveis = resultado;
			this.profissional.set(this.profissionaisDisponiveis.find(
				valor => valor.idProfissional == this.data.agendamento?.profissional.idProfissional
			));
		});
	}
	
	fechar(agendamento?: AgendamentoReq) {
		this.dialogRef.close(agendamento);
	}

	salvar() {
		let cpfPacienteFiltro = this.paciente()?.cpfPaciente;
		let dataHoraAgendamentoFiltro = this.dataHoraAgendamento();
		let idOperacaoFiltro = this.operacao()?.idOperacao;
		let idProfissionalFiltro = this.profissional()?.idProfissional;

		if (!cpfPacienteFiltro || !dataHoraAgendamentoFiltro || !idOperacaoFiltro || !idProfissionalFiltro) {
			this.snackbar.open("Não podem haver campos vazios", "Ok", snackbarDefaultConfig);
			return;
		}

		this.fechar({
			idAgendamento: this.idAgendamento(),
			cpfPaciente: cpfPacienteFiltro,
			dataHoraAgendamento: this.ajusteTimezone(dataHoraAgendamentoFiltro),
			idOperacao: idOperacaoFiltro,
			idProfissional: idProfissionalFiltro
		});
	}

	ajusteTimezone(dataString: string) {
		let data = new Date(dataString);
		const offset = data.getTimezoneOffset() * 60000;
		return new Date(data.valueOf() - offset)
			.toISOString()
			.slice(0, -1);
	}

}

export interface DialogAgendamentoData {
	agendamento?: AgendamentoRes,
	isEdicao: boolean
}
