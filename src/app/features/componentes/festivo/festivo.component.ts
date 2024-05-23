import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FestivoService } from '../../servicios/festivo/festivo.service';
import { CommonModule } from '@angular/common';
import { ResponseDialogComponent } from '../../../response-dialog/response-dialog.component';

@Component({
  selector: 'app-festivo',
  standalone: true,
  imports: [
    FormsModule,  // Añade FormsModule aquí
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './festivo.component.html',
  styleUrls: ['./festivo.component.css']
})

export class FestivoComponent {

  public fecha = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };

  constructor(private festivoServicio: FestivoService, private dialog: MatDialog)
  {

  };

  public verificarFestividad(year: number, month: number, day: number) {
    this.festivoServicio.verificar(year, month, day).subscribe({
      next: (response: string) => {
        this.openResponseDialog(response);
      },
      error: error => {
        window.alert(error.message);
      }
    });
  }

  private openResponseDialog(response: string) {
    const dialogRef = this.dialog.open(ResponseDialogComponent, {
      width: '250px',
      data: response
    });
  
    dialogRef.afterClosed().subscribe();
  }

}
