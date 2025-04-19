import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY } from 'rxjs';
import { snackbarDefaultConfig } from '../../app.component';
import { OperacaoReq, OperacaoRes } from './operacoes.model';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class OperacoesService {

	readonly http = inject(HttpClient);
	readonly snackbar = inject(MatSnackBar);

	listarOperacoes() {
		return this.http.get<OperacaoRes[]>(`${environment.apiUrl}/operacao`).pipe(
			catchError(() => {
				this.snackbar.open("Houve uma falha ao buscar pelas operações cadastradas", "Ok", snackbarDefaultConfig)
				return EMPTY;
			})
		);
	}

	cadastrarOperacao(operacao: OperacaoReq) {
		return this.http.post(`${environment.apiUrl}/operacao`, operacao).pipe(
			catchError(() => {
				this.snackbar.open("Houve uma falha ao salvar operação", "Ok", snackbarDefaultConfig)
				return EMPTY;
			})
		);
	}

	editarOperacao(operacao: OperacaoReq) {
		return this.http.put(`${environment.apiUrl}/operacao/${operacao.idOperacao}`, operacao).pipe(
			catchError(() => {
				this.snackbar.open("Houve uma falha ao editar operação", "Ok", snackbarDefaultConfig)
				return EMPTY;
			})
		);
	}

	excluirOperacao(idOperacao: number) {
		return this.http.delete(`${environment.apiUrl}/operacao/${idOperacao}`).pipe(
			catchError(() => {
				this.snackbar.open("Houve uma falha ao excluir operação", "Ok", snackbarDefaultConfig)
				return EMPTY;
			})
		);
	}

	buscarOperacaoPorId(id: string) {
		return this.http.get<OperacaoRes>(`${environment.apiUrl}/operacao/${id}`).pipe(
			catchError(() => {
				this.snackbar.open("Operação não encontrada", "Ok", snackbarDefaultConfig)
				return EMPTY;
			})
		);
	}

}
