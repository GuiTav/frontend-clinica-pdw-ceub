import { CommonModule } from '@angular/common';
import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AgendamentoReq, AgendamentoRes } from './agendamentos.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AgendamentosService } from './agendamentos.service';
import { snackbarDefaultConfig } from '../../app.component';
import { DialogAgendamentoComponent } from '../../components/dialog-agendamento/dialog-agendamento.component';
import { DialogExclusaoComponent } from '../../components/dialog-exclusao/dialog-exclusao.component';
import { catchError, EMPTY } from 'rxjs';

@Component({
	selector: 'app-agendamentos',
	imports: [
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
	],
	templateUrl: './agendamentos.component.html',
	styleUrl: './agendamentos.component.scss'
})
export class AgendamentosComponent {

	agendamentos?: AgendamentoRes[] = [];
	agendamentoSelecionado?: AgendamentoRes;
	idBusca = model("");
	agendamentoBuscado?: AgendamentoRes;

	readonly agendamentoService = inject(AgendamentosService);
	readonly snackbar = inject(MatSnackBar);
	readonly dialog = inject(MatDialog);

	ngOnInit(): void {
		this.listarAgendamentos();
	}

	listarAgendamentos() {
		this.agendamentoService.listarAgendamentos().subscribe((resultado) => this.agendamentos = resultado);
	}

	selecionarAgendamento(agendamento: AgendamentoRes) {
		this.agendamentoSelecionado = agendamento;
	}

	modalCadastrarAgendamento() {
		let dialogRef = this.dialog.open(DialogAgendamentoComponent, { data: { agendamento: null, isEdicao: false } });
		dialogRef.afterClosed().subscribe((agendamentoCadastrado: AgendamentoReq) => {
			if (!agendamentoCadastrado) {
				return;
			}

			this.agendamentoService.cadastrarAgendamento(agendamentoCadastrado)
				.pipe(
					catchError(e => {
						this.snackbar.open(e.error, "OK", snackbarDefaultConfig);
						return EMPTY;
					})
				).subscribe(() => {
					this.listarAgendamentos();
					this.snackbar.open("Sucesso", "Ok", snackbarDefaultConfig);
				});
		});
	}

	modalEditarAgendamento(agendamento?: AgendamentoRes) {
		if (!agendamento) {
			return;
		}

		let dialogRef = this.dialog.open(DialogAgendamentoComponent, { data: { agendamento, isEdicao: true } });
		dialogRef.afterClosed().subscribe((agendamentoEditado: AgendamentoReq) => {
			if (!agendamentoEditado) {
				return;
			}

			if (!agendamentoEditado.idAgendamento) {
				this.snackbar.open("O campo ID está inválido", "Ok", snackbarDefaultConfig);
				return;
			}

			this.agendamentoService.editarAgendamento(agendamentoEditado)
				.pipe(
					catchError(e => {
						this.snackbar.open(e.error, "OK", snackbarDefaultConfig);
						return EMPTY;
					})
				).subscribe(() => {
					this.agendamentoSelecionado = undefined;
					this.agendamentoBuscado = undefined;
					this.listarAgendamentos();
					this.snackbar.open("Sucesso", "Ok", snackbarDefaultConfig);
				});
		})
	}

	excluirAgendamento(agendamento?: AgendamentoRes) {
		if (!agendamento) {
			return;
		}

		let dialogRef = this.dialog.open(DialogExclusaoComponent);
		dialogRef.afterClosed().subscribe((confirmacao: boolean) => {
			if (!confirmacao) {
				return;
			}

			this.agendamentoService.excluirAgendamento(agendamento.idAgendamento).subscribe(() => {
				this.agendamentoSelecionado = undefined;
				this.agendamentoBuscado = undefined;
				this.listarAgendamentos();
				this.snackbar.open("Sucesso", "Ok", snackbarDefaultConfig);
			});
		})
	}

	buscarAgendamentoPorId() {
		this.agendamentoService.buscarAgendamentoPorId(this.idBusca()).subscribe((resultado) => this.agendamentoBuscado = resultado);
	}

}
