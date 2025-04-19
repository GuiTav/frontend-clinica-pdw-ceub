import { CommonModule } from '@angular/common';
import { Component, inject, model, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackbarDefaultConfig } from '../../app.component';
import { DialogExclusaoComponent } from '../../components/dialog-exclusao/dialog-exclusao.component';
import { DialogOperacaoComponent } from '../../components/dialog-operacao/dialog-operacao.component';
import { OperacaoReq, OperacaoRes } from './operacoes.model';
import { OperacoesService } from './operacoes.service';

@Component({
	selector: 'app-operacoes',
	imports: [
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		FormsModule
	],
	templateUrl: './operacoes.component.html',
	styleUrl: './operacoes.component.scss'
})
export class OperacoesComponent implements OnInit {

	operacoes?: OperacaoRes[] = [];
	operacaoSelecionada?: OperacaoRes;
	idBusca = model("");
	operacaoBuscada?: OperacaoRes;

	readonly operacaoService = inject(OperacoesService);
	readonly snackbar = inject(MatSnackBar);
	readonly dialog = inject(MatDialog);

	ngOnInit(): void {
		this.listarOperacoes();
	}

	listarOperacoes() {
		this.operacaoService.listarOperacoes().subscribe((resultado) => this.operacoes = resultado);
	}

	selecionarOperacao(operacao: OperacaoRes) {
		this.operacaoSelecionada = operacao;
	}

	modalCadastrarOperacao() {
		let dialogRef = this.dialog.open(DialogOperacaoComponent, { data: { operacao: null, isEdicao: false } });
		dialogRef.afterClosed().subscribe((operacaoCadastrada: OperacaoReq) => {
			if (!operacaoCadastrada) {
				return;
			}

			this.operacaoService.cadastrarOperacao(operacaoCadastrada).subscribe(() => {
				this.listarOperacoes();
				this.snackbar.open("Sucesso", "Ok", snackbarDefaultConfig);
			});
		});
	}

	modalEditarOperacao(operacao?: OperacaoRes) {
		if (!operacao) {
			return;
		}

		let dialogRef = this.dialog.open(DialogOperacaoComponent, { data: { operacao, isEdicao: true } });
		dialogRef.afterClosed().subscribe((operacaoEditada: OperacaoReq) => {
			if (!operacaoEditada) {
				return;
			}

			if (!operacaoEditada.idOperacao) {
				this.snackbar.open("O campo ID está inválido", "Ok", snackbarDefaultConfig);
				return;
			}

			this.operacaoService.editarOperacao(operacaoEditada).subscribe(() => {
				this.operacaoSelecionada = undefined;
				this.operacaoBuscada = undefined;
				this.listarOperacoes();
				this.snackbar.open("Sucesso", "Ok", snackbarDefaultConfig);
			});
		})
	}

	excluirOperacao(operacao?: OperacaoRes) {
		if (!operacao) {
			return;
		}

		let dialogRef = this.dialog.open(DialogExclusaoComponent);
		dialogRef.afterClosed().subscribe((confirmacao: boolean) => {
			if (!confirmacao) {
				return;
			}

			this.operacaoService.excluirOperacao(operacao.idOperacao).subscribe(() => {
				this.operacaoSelecionada = undefined;
				this.operacaoBuscada = undefined;
				this.listarOperacoes();
				this.snackbar.open("Sucesso", "Ok", snackbarDefaultConfig);
			});
		})
	}

	buscarOperacaoPorId() {
		this.operacaoService.buscarOperacaoPorId(this.idBusca()).subscribe((resultado) => this.operacaoBuscada = resultado );
	}

}
