import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend-clinica-pdw-ceub';
}

export let snackbarDefaultConfig: MatSnackBarConfig = { duration: 4000 };
