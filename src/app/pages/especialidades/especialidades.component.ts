import { CommonModule } from '@angular/common';
import { Component, inject, model, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackbarDefaultConfig } from '../../app.component';
import { DialogEspecialidadeComponent } from '../../components/dialog-especialidade/dialog-especialidade.component';
import { DialogExclusaoComponent } from '../../components/dialog-exclusao/dialog-exclusao.component';
import { EspecialidadesService } from './especialidades.service';
import { EspecialidadeReq, EspecialidadeRes } from './especialidades.model';

@Component({
	selector: 'app-especialidades',
	imports: [
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
	],
	templateUrl: './especialidades.component.html',
	styleUrl: './especialidades.component.scss'
})
export class EspecialidadesComponent implements OnInit {

	especialidades?: EspecialidadeRes[] = [];
	especialidadeSelecionada?: EspecialidadeRes;
	idBusca = model("");
	especialidadeBuscada?: EspecialidadeRes;

	readonly especialidadeService = inject(EspecialidadesService);
	readonly snackbar = inject(MatSnackBar);
	readonly dialog = inject(MatDialog);

	ngOnInit(): void {
		this.listarEspecialidades();
	}

	listarEspecialidades() {
		this.especialidadeService.listarEspecialidades().subscribe((resultado) => this.especialidades = resultado);
	}

	selecionarEspecialidade(especialidade: EspecialidadeRes) {
		this.especialidadeSelecionada = especialidade;
	}

	modalCadastrarEspecialidade() {
		let dialogRef = this.dialog.open(DialogEspecialidadeComponent, { data: { especialidade: null, isEdicao: false } });
		dialogRef.afterClosed().subscribe((especialidadeCadastrada: EspecialidadeReq) => {
			if (!especialidadeCadastrada) {
				return;
			}

			this.especialidadeService.cadastrarEspecialidade(especialidadeCadastrada).subscribe(() => {
				this.listarEspecialidades();
				this.snackbar.open("Sucesso", "Ok", snackbarDefaultConfig);
			});
		});
	}

	modalEditarEspecialidade(especialidade?: EspecialidadeRes) {
		if (!especialidade) {
			return;
		}

		let dialogRef = this.dialog.open(DialogEspecialidadeComponent, { data: { especialidade, isEdicao: true } });
		dialogRef.afterClosed().subscribe((especialidadeEditada: EspecialidadeReq) => {
			if (!especialidadeEditada) {
				return;
			}

			if (!especialidadeEditada.idEspecialidade) {
				this.snackbar.open("O campo ID está inválido", "Ok", snackbarDefaultConfig);
				return;
			}

			this.especialidadeService.editarEspecialidade(especialidadeEditada).subscribe(() => {
				this.especialidadeSelecionada = undefined;
				this.especialidadeBuscada = undefined;
				this.listarEspecialidades();
				this.snackbar.open("Sucesso", "Ok", snackbarDefaultConfig);
			});
		})
	}

	excluirEspecialidade(especialidade?: EspecialidadeRes) {
		if (!especialidade) {
			return;
		}

		let dialogRef = this.dialog.open(DialogExclusaoComponent);
		dialogRef.afterClosed().subscribe((confirmacao: boolean) => {
			if (!confirmacao) {
				return;
			}

			this.especialidadeService.excluirEspecialidade(especialidade.idEspecialidade).subscribe(() => {
				this.especialidadeSelecionada = undefined;
				this.especialidadeBuscada = undefined;
				this.listarEspecialidades();
				this.snackbar.open("Sucesso", "Ok", snackbarDefaultConfig);
			});
		})
	}

	buscarEspecialidadePorId() {
		this.especialidadeService.buscarEspecialidadePorId(this.idBusca()).subscribe((resultado) => this.especialidadeBuscada = resultado );
	}

}
