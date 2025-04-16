import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY } from 'rxjs';
import { snackbarDefaultConfig } from '../../app.component';
import { OperacaoReq, OperacaoRes } from './operacoes.model';

@Injectable({
	providedIn: 'root'
})
export class OperacoesService {

	readonly http = inject(HttpClient);
	readonly snackbar = inject(MatSnackBar);

	listarOperacoes() {
		return this.http.get<OperacaoRes[]>("/api/operacao").pipe(
			catchError(() => {
				this.snackbar.open("Houve uma falha ao buscar pelas operações cadastradas", "Ok", snackbarDefaultConfig)
				return EMPTY;
			})
		);
	}

	cadastrarOperacao(operacao: OperacaoReq) {
		return this.http.post("/api/operacao", operacao).pipe(
			catchError(() => {
				this.snackbar.open("Houve uma falha ao salvar operação", "Ok", snackbarDefaultConfig)
				return EMPTY;
			})
		);
	}

	editarOperacao(operacao: OperacaoReq) {
		let body: OperacaoReq = {
			nomeOperacao: operacao.nomeOperacao,
			descricaoOperacao: operacao.descricaoOperacao,
			duracaoMinutosOperacao: operacao.duracaoMinutosOperacao,
			idEspecialidade: operacao.idEspecialidade
		}

		return this.http.put(`/api/operacao/${operacao.idOperacao}`, body).pipe(
			catchError(() => {
				this.snackbar.open("Houve uma falha ao editar operação", "Ok", snackbarDefaultConfig)
				return EMPTY;
			})
		);
	}

	excluirOperacao(idOperacao: number) {
		return this.http.delete(`/api/operacao/${idOperacao}`).pipe(
			catchError(() => {
				this.snackbar.open("Houve uma falha ao excluir operação", "Ok", snackbarDefaultConfig)
				return EMPTY;
			})
		);
	}

	buscarOperacaoPorId(id: string) {
		return this.http.get<OperacaoRes>(`/api/operacao/${id}`).pipe(
			catchError(() => {
				this.snackbar.open("Operação não encontrada", "Ok", snackbarDefaultConfig)
				return EMPTY;
			})
		);
	}

}
