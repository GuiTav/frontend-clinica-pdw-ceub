import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY } from 'rxjs';
import { snackbarDefaultConfig } from '../../app.component';
import { AgendamentoReq, AgendamentoRes } from './agendamentos.model';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AgendamentosService {

	readonly http = inject(HttpClient);
	readonly snackbar = inject(MatSnackBar);

	listarAgendamentos() {
		return this.http.get<AgendamentoRes[]>(`${environment.apiUrl}/agendamento`).pipe(
			catchError(() => {
				this.snackbar.open("Houve uma falha ao buscar pelos agendamentos cadastrados", "Ok", snackbarDefaultConfig)
				return EMPTY;
			})
		);
	}

	cadastrarAgendamento(agendamento: AgendamentoReq) {
		return this.http.post(`${environment.apiUrl}/agendamento`, agendamento);
	}

	editarAgendamento(agendamento: AgendamentoReq) {
		return this.http.put(`${environment.apiUrl}/agendamento/${agendamento.idAgendamento}`, agendamento);
	}

	excluirAgendamento(idAgendamento: number) {
		return this.http.delete(`${environment.apiUrl}/agendamento/${idAgendamento}`).pipe(
			catchError(() => {
				this.snackbar.open("Houve uma falha ao excluir agendamento", "Ok", snackbarDefaultConfig)
				return EMPTY;
			})
		);
	}

	buscarAgendamentoPorId(id: string) {
		return this.http.get<AgendamentoRes>(`${environment.apiUrl}/agendamento/${id}`).pipe(
			catchError(() => {
				this.snackbar.open("Agendamento não encontrado", "Ok", snackbarDefaultConfig)
				return EMPTY;
			})
		);
	}

}
