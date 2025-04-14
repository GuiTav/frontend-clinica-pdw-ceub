import { Component, inject, model, OnInit } from '@angular/core';
import { Especialidade } from './especialidade.model';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { snackbarDefaultConfig } from '../../app.component';
import { DialogEspecialidadeComponent } from '../../components/dialog-especialidade/dialog-especialidade.component';
import { DialogExclusaoComponent } from '../../components/dialog-exclusao/dialog-exclusao.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

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

	especialidades?: Especialidade[] = [];
	especialidadeSelecionada?: Especialidade;
	idBusca = model("");
	especialidadeBuscada?: Especialidade;

	readonly http = inject(HttpClient);
	readonly snackbar = inject(MatSnackBar);
	readonly dialog = inject(MatDialog);

	ngOnInit(): void {
		this.listarEspecialidades();
	}

	listarEspecialidades() {
		this.http.get<Especialidade[]>("/api/especialidade").subscribe({
			next: (resultado) => { this.especialidades = resultado },
			error: () => { this.snackbar.open("Houve uma falha ao buscar pelas especialidades cadastradas", "Ok", snackbarDefaultConfig) }
		});
	}

	selecionarEspecialidade(especialidade: Especialidade) {
		this.especialidadeSelecionada = especialidade;
	}

	modalCadastrarEspecialidade() {
		let dialogRef = this.dialog.open(DialogEspecialidadeComponent, { data: { especialidade: null, isEdicao: false } });
		dialogRef.afterClosed().subscribe((especialidadeCadastrada: Especialidade) => {
			if (!especialidadeCadastrada) {
				return;
			}

			this.http.post("/api/especialidade", especialidadeCadastrada).subscribe({
				next: () => {
					this.listarEspecialidades();
					this.snackbar.open("Sucesso", "Ok", snackbarDefaultConfig);
				},
				error: () => { this.snackbar.open("Houve uma falha ao salvar especialidade", "Ok", snackbarDefaultConfig) }
			});
		});
	}

	modalEditarEspecialidade(especialidade?: Especialidade) {
		if (!especialidade) {
			return;
		}

		let dialogRef = this.dialog.open(DialogEspecialidadeComponent, { data: { especialidade: especialidade, isEdicao: true } });
		dialogRef.afterClosed().subscribe((especialidadeEditada: Especialidade) => {
			if (!especialidadeEditada) {
				return;
			}

			this.http.put("/api/especialidade", especialidadeEditada).subscribe({
				next: () => {
					this.especialidadeSelecionada = undefined;
					this.especialidadeBuscada = undefined;
					this.listarEspecialidades();
					this.snackbar.open("Sucesso", "Ok", snackbarDefaultConfig);
				},
				error: () => { this.snackbar.open("Houve uma falha ao editar especialidade", "Ok", snackbarDefaultConfig) }
			});
		})
	}

	excluirEspecialidade(especialidade?: Especialidade) {
		if (!especialidade) {
			return;
		}

		let dialogRef = this.dialog.open(DialogExclusaoComponent);
		dialogRef.afterClosed().subscribe((confirmacao: boolean) => {
			if (!confirmacao) {
				return;
			}

			this.http.delete(`/api/especialidade/${especialidade.idEspecialidade}`).subscribe({
				next: () => {
					this.especialidadeSelecionada = undefined;
					this.especialidadeBuscada = undefined;
					this.listarEspecialidades();
					this.snackbar.open("Sucesso", "Ok", snackbarDefaultConfig);
				},
				error: () => { this.snackbar.open("Houve uma falha ao excluir especialidade", "Ok", snackbarDefaultConfig) }
			});
		})
	}

	buscarEspecialidadePorId() {
		this.http.get<Especialidade>(`/api/especialidade/${this.idBusca()}`).subscribe({
			next: (resultado) => {
				this.especialidadeBuscada = resultado;
			},
			error: () => { this.snackbar.open(`Especialidade não encontrada`, "Ok", snackbarDefaultConfig) }
		});
	}

}
