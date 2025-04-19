import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackbarDefaultConfig } from '../../app.component';
import { catchError, EMPTY } from 'rxjs';
import { EspecialidadeReq, EspecialidadeRes } from './especialidades.model';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class EspecialidadesService {

	readonly http = inject(HttpClient);
	readonly snackbar = inject(MatSnackBar);

	listarEspecialidades() {
		return this.http.get<EspecialidadeRes[]>(`${environment.apiUrl}/especialidade`).pipe(
			catchError(() => {
				this.snackbar.open("Houve uma falha ao buscar pelas especialidades cadastradas", "Ok", snackbarDefaultConfig)
				return EMPTY;
			})
		);
	}

	cadastrarEspecialidade(especialidade: EspecialidadeReq) {
		return this.http.post(`${environment.apiUrl}/especialidade`, especialidade).pipe(
			catchError(() => {
				this.snackbar.open("Houve uma falha ao salvar especialidade", "Ok", snackbarDefaultConfig)
				return EMPTY;
			})
		);
	}

	editarEspecialidade(especialidade: EspecialidadeReq) {
		return this.http.put(`${environment.apiUrl}/especialidade/${especialidade.idEspecialidade}`, especialidade).pipe(
			catchError(() => {
				this.snackbar.open("Houve uma falha ao editar especialidade", "Ok", snackbarDefaultConfig)
				return EMPTY;
			})
		);
	}

	excluirEspecialidade(idEspecialidade: number) {
		return this.http.delete(`${environment.apiUrl}/especialidade/${idEspecialidade}`).pipe(
			catchError(() => {
				this.snackbar.open("Houve uma falha ao excluir especialidade", "Ok", snackbarDefaultConfig)
				return EMPTY;
			})
		);
	}

	buscarEspecialidadePorId(id: string) {
		return this.http.get<EspecialidadeRes>(`${environment.apiUrl}/especialidade/${id}`).pipe(
			catchError(() => {
				this.snackbar.open("Especialidade não encontrada", "Ok", snackbarDefaultConfig)
				return EMPTY;
			})
		);
	}

}
