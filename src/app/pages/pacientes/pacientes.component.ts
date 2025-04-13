import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, model, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
	MatDialog
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { snackbarDefaultConfig } from '../../app.component';
import { DialogPacientesComponent } from '../../components/dialog-paciente/dialog-paciente.component';
import { Paciente } from './pacientes.model';
import { DialogExclusaoComponent } from '../../components/dialog-exclusao/dialog-exclusao.component';

@Component({
	selector: 'app-pacientes',
	imports: [
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		NgxMaskDirective
	],
	templateUrl: './pacientes.component.html',
	styleUrl: './pacientes.component.scss',
	providers: [provideNgxMask({ dropSpecialCharacters: false })]
})
export class PacientesComponent implements OnInit {

	pacientes?: Paciente[] = [];
	pacienteSelecionado?: Paciente;
	cpfBusca = model("");
	pacienteBuscado?: Paciente;

	readonly http = inject(HttpClient);
	readonly snackbar = inject(MatSnackBar);
	readonly dialog = inject(MatDialog);

	ngOnInit(): void {
		this.listarPacientes();
	}

	listarPacientes() {
		this.http.get<Paciente[]>("/api/paciente").subscribe({
			next: (resultado) => { this.pacientes = resultado },
			error: () => { this.snackbar.open("Houve uma falha ao buscar pelos pacientes cadastrados", "Ok", snackbarDefaultConfig) }
		});
	}

	selecionarPaciente(paciente: Paciente) {
		this.pacienteSelecionado = paciente;
	}

	modalCadastrarPaciente() {
		let dialogRef = this.dialog.open(DialogPacientesComponent, { data: { paciente: null, isEdicao: false} });
		dialogRef.afterClosed().subscribe((pacienteCadastrado: Paciente) => {
			if (!pacienteCadastrado) {
				return;
			}

			this.http.post("/api/paciente", pacienteCadastrado).subscribe({
				next: () => {
					this.listarPacientes();
					this.snackbar.open("Sucesso", "Ok", snackbarDefaultConfig);
				},
				error: () => { this.snackbar.open("Houve uma falha ao salvar paciente", "Ok", snackbarDefaultConfig) }
			});
		});
	}

	modalEditarPaciente(paciente?: Paciente) {
		if (!paciente) {
			return;
		}

		let dialogRef = this.dialog.open(DialogPacientesComponent, { data: { paciente: paciente, isEdicao: true} });
		dialogRef.afterClosed().subscribe((pacienteEditado: Paciente) => {
			if (!pacienteEditado) {
				return;
			}

			this.http.put("/api/paciente", pacienteEditado).subscribe({
				next: () => {
					this.pacienteSelecionado = undefined;
					this.pacienteBuscado = undefined;
					this.listarPacientes();
					this.snackbar.open("Sucesso", "Ok", snackbarDefaultConfig);
				},
				error: () => { this.snackbar.open("Houve uma falha ao editar paciente", "Ok", snackbarDefaultConfig) }
			});
		})
	}

	excluirPaciente(paciente?: Paciente) {
		if (!paciente) {
			return;
		}

		let dialogRef = this.dialog.open(DialogExclusaoComponent);
		dialogRef.afterClosed().subscribe((confirmacao: boolean) => {
			if (!confirmacao) {
				return;
			}

			let body = { cpf: paciente.cpfPaciente };
		
			this.http.delete("/api/paciente", { body }).subscribe({
				next: () => {
					this.pacienteSelecionado = undefined;
					this.pacienteBuscado = undefined;
					this.listarPacientes();
					this.snackbar.open("Sucesso", "Ok", snackbarDefaultConfig);
				},
				error: () => { this.snackbar.open("Houve uma falha ao excluir paciente", "Ok", snackbarDefaultConfig) }
			});
		})
	}
	
	buscarPacientePorCpf() {
		if (this.cpfBusca().length !== 14) {
			this.snackbar.open("Campo CPF inválido", "Ok", snackbarDefaultConfig);
			return;
		}
		
		this.http.post<Paciente>("/api/paciente/encontrar", { cpf: this.cpfBusca() }).subscribe({
			next: (resultado) => {
				this.pacienteBuscado = resultado;
			},
			error: () => { this.snackbar.open(`Paciente não encontrado`, "Ok", snackbarDefaultConfig) }
		});
	}

}
