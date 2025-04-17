import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY } from 'rxjs';
import { snackbarDefaultConfig } from '../../app.component';
import { ProfissionalReq, ProfissionalRes } from './profissionais.model';

@Injectable({
	providedIn: 'root'
})
export class ProfissionaisService {

	readonly http = inject(HttpClient);
	readonly snackbar = inject(MatSnackBar);

	listarProfissionais() {
		return this.http.get<ProfissionalRes[]>("/api/profissional").pipe(
			catchError(() => {
				this.snackbar.open("Houve uma falha ao buscar pelos profissionais cadastradas", "Ok", snackbarDefaultConfig)
				return EMPTY;
			})
		);
	}

	cadastrarProfissional(profissional: ProfissionalReq) {
		return this.http.post("/api/profissional", profissional).pipe(
			catchError(() => {
				this.snackbar.open("Houve uma falha ao salvar profissional", "Ok", snackbarDefaultConfig)
				return EMPTY;
			})
		);
	}

	editarProfissional(profissional: ProfissionalReq) {
		return this.http.put(`/api/profissional/${profissional.idProfissional}`, profissional).pipe(
			catchError(() => {
				this.snackbar.open("Houve uma falha ao editar profissional", "Ok", snackbarDefaultConfig)
				return EMPTY;
			})
		);
	}

	excluirProfissional(idProfissional: number) {
		return this.http.delete(`/api/profissional/${idProfissional}`).pipe(
			catchError(() => {
				this.snackbar.open("Houve uma falha ao excluir profissional", "Ok", snackbarDefaultConfig)
				return EMPTY;
			})
		);
	}

	buscarProfissionalPorId(id: string) {
		return this.http.get<ProfissionalRes>(`/api/profissional/${id}`).pipe(
			catchError(() => {
				this.snackbar.open("Profissional não encontrado", "Ok", snackbarDefaultConfig)
				return EMPTY;
			})
		);
	}

}
