import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
	selector: 'ha-code',
	templateUrl: './code.component.html',
	styleUrls: ['./code.component.scss']
})
export class CodeComponent {
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: {code: number; date: string},
		private readonly dialog: MatDialogRef<CodeComponent>
	) {}

	close(): void {
		this.dialog.close();
	}
}
