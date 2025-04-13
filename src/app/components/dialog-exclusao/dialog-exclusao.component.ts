import { Component, inject } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
	selector: 'app-dialog-exclusao',
	imports: [
		MatDialogTitle,
		MatDialogContent,
		MatDialogActions,
	],
	templateUrl: './dialog-exclusao.component.html',
	styleUrl: './dialog-exclusao.component.scss'
})
export class DialogExclusaoComponent {

	readonly dialogRef = inject(MatDialogRef<DialogExclusaoComponent>);

	fechar() {
		this.dialogRef.close(false);
	}
	
	excluir() {
		this.dialogRef.close(true);
	}

}
