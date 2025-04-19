import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY } from 'rxjs';
import { snackbarDefaultConfig } from '../../app.component';
import { Paciente } from './pacientes.model';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class PacientesService {

	readonly http = inject(HttpClient);
	readonly snackbar = inject(MatSnackBar);

	listarPacientes() {
		return this.http.get<Paciente[]>(`${environment.apiUrl}/paciente`).pipe(
			catchError(() => {
				this.snackbar.open("Houve uma falha ao buscar pelos pacientes cadastrados", "Ok", snackbarDefaultConfig)
				return EMPTY;
			})
		);
	}

	cadastrarPaciente(paciente: Paciente) {
		return this.http.post(`${environment.apiUrl}/paciente`, paciente).pipe(
			catchError(() => {
				this.snackbar.open("Houve uma falha ao salvar paciente", "Ok", snackbarDefaultConfig)
				return EMPTY;
			})
		);
	}

	editarPaciente(paciente: Paciente) {
		return this.http.put(`${environment.apiUrl}/paciente`, paciente).pipe(
			catchError(() => {
				this.snackbar.open("Houve uma falha ao editar paciente", "Ok", snackbarDefaultConfig)
				return EMPTY;
			})
		);
	}

	excluirPaciente(cpf: string) {
		return this.http.delete(`${environment.apiUrl}/paciente`, { body: { cpf: cpf } }).pipe(
			catchError(() => {
				this.snackbar.open("Houve uma falha ao excluir paciente", "Ok", snackbarDefaultConfig)
				return EMPTY;
			})
		);
	}

	buscarPacientePorCpf(cpf: string) {
		return this.http.post<Paciente>(`${environment.apiUrl}/paciente/encontrar`, { cpf }).pipe(
			catchError(() => {
				this.snackbar.open("Paciente não encontrado", "Ok", snackbarDefaultConfig)
				return EMPTY;
			})
		);
	}

}
