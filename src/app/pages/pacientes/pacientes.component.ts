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
import { PacientesService } from './pacientes.service';

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

	readonly pacienteService = inject(PacientesService);
	readonly snackbar = inject(MatSnackBar);
	readonly dialog = inject(MatDialog);

	ngOnInit(): void {
		this.listarPacientes();
	}

	listarPacientes() {
		this.pacienteService.listarPacientes().subscribe((resultado) => this.pacientes = resultado);
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

			this.pacienteService.cadastrarPaciente(pacienteCadastrado).subscribe(() => {
				this.listarPacientes();
				this.snackbar.open("Sucesso", "Ok", snackbarDefaultConfig);
			});
		});
	}

	modalEditarPaciente(paciente?: Paciente) {
		if (!paciente) {
			return;
		}

		let dialogRef = this.dialog.open(DialogPacientesComponent, { data: { paciente, isEdicao: true} });
		dialogRef.afterClosed().subscribe((pacienteEditado: Paciente) => {
			if (!pacienteEditado) {
				return;
			}

			this.pacienteService.editarPaciente(pacienteEditado).subscribe(() => {
				this.pacienteSelecionado = undefined;
				this.pacienteBuscado = undefined;
				this.listarPacientes();
				this.snackbar.open("Sucesso", "Ok", snackbarDefaultConfig);
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
		
			this.pacienteService.excluirPaciente(paciente.cpfPaciente).subscribe(() => {
				this.pacienteSelecionado = undefined;
				this.pacienteBuscado = undefined;
				this.listarPacientes();
				this.snackbar.open("Sucesso", "Ok", snackbarDefaultConfig);
			});
		})
	}
	
	buscarPacientePorCpf() {
		if (this.cpfBusca().length !== 14) {
			this.snackbar.open("Campo CPF inválido", "Ok", snackbarDefaultConfig);
			return;
		}
		
		this.pacienteService.buscarPacientePorCpf(this.cpfBusca()).subscribe((resultado) => this.pacienteBuscado = resultado);
	}

}
