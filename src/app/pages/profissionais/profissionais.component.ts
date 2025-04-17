import { CommonModule } from '@angular/common';
import { Component, inject, model, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProfissionalReq, ProfissionalRes } from './profissionais.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ProfissionaisService } from './profissionais.service';
import { DialogProfissionalComponent } from '../../components/dialog-profissional/dialog-profissional.component';
import { snackbarDefaultConfig } from '../../app.component';
import { DialogExclusaoComponent } from '../../components/dialog-exclusao/dialog-exclusao.component';
import { LimiteEspecialidadePipe } from '../../pipes/limite-especialidade.pipe';

@Component({
	selector: 'app-profissionais',
	imports: [
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		LimiteEspecialidadePipe
	],
	templateUrl: './profissionais.component.html',
	styleUrl: './profissionais.component.scss'
})
export class ProfissionaisComponent implements OnInit {

	profissionais?: ProfissionalRes[] = [];
	profissionalSelecionado?: ProfissionalRes;
	idBusca = model("");
	profissionalBuscado?: ProfissionalRes;
	limiteListaEspecialidade = 3;
	acrescimoLimiteListaEspecialidade = 3;

	readonly profissionalService = inject(ProfissionaisService);
	readonly snackbar = inject(MatSnackBar);
	readonly dialog = inject(MatDialog);

	ngOnInit(): void {
		this.listarProfissionais();
	}

	listarProfissionais() {
		this.profissionalService.listarProfissionais().subscribe((resultado) => this.profissionais = resultado);
	}

	selecionarProfissional(profissional: ProfissionalRes) {
		this.profissionalSelecionado = profissional;
	}

	modalCadastrarProfissional() {
		let dialogRef = this.dialog.open(DialogProfissionalComponent, { data: { profissional: null, isEdicao: false } });
		dialogRef.afterClosed().subscribe((profissionalCadastrado: ProfissionalReq) => {
			if (!profissionalCadastrado) {
				return;
			}

			this.profissionalService.cadastrarProfissional(profissionalCadastrado).subscribe(() => {
				this.listarProfissionais();
				this.snackbar.open("Sucesso", "Ok", snackbarDefaultConfig);
			});
		});
	}

	modalEditarProfissional(profissional?: ProfissionalRes) {
		if (!profissional) {
			return;
		}

		let dialogRef = this.dialog.open(DialogProfissionalComponent, { data: { profissional, isEdicao: true } });
		dialogRef.afterClosed().subscribe((profissionalEditado: ProfissionalReq) => {
			if (!profissionalEditado) {
				return;
			}

			if (!profissionalEditado.idProfissional) {
				this.snackbar.open("O campo ID está inválido", "Ok", snackbarDefaultConfig);
				return;
			}

			this.profissionalService.editarProfissional(profissionalEditado).subscribe(() => {
				this.profissionalSelecionado = undefined;
				this.profissionalBuscado = undefined;
				this.listarProfissionais();
				this.snackbar.open("Sucesso", "Ok", snackbarDefaultConfig);
			});
		})
	}

	excluirProfissional(profissional?: ProfissionalRes) {
		if (!profissional) {
			return;
		}

		let dialogRef = this.dialog.open(DialogExclusaoComponent);
		dialogRef.afterClosed().subscribe((confirmacao: boolean) => {
			if (!confirmacao) {
				return;
			}

			this.profissionalService.excluirProfissional(profissional.idProfissional).subscribe(() => {
				this.profissionalSelecionado = undefined;
				this.profissionalBuscado = undefined;
				this.listarProfissionais();
				this.snackbar.open("Sucesso", "Ok", snackbarDefaultConfig);
			});
		})
	}

	buscarProfissionalPorId() {
		this.profissionalService.buscarProfissionalPorId(this.idBusca()).subscribe((resultado) => this.profissionalBuscado = resultado);
	}

	mostrarMaisEspecialidades() {
		this.limiteListaEspecialidade += this.acrescimoLimiteListaEspecialidade;
	}

}
