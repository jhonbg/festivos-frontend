import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../share/modulos/referencias-material.module';
import { Festivo } from '../../../core/entidades/festivo';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FestivoService } from '../../servicios/festivo.service';
import { ResponseDialogComponent } from '../../../response-dialog/response-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-festivos',
  standalone: true,
  imports: [
    ReferenciasMaterialModule,
    NgxDatatableModule,
    FormsModule
  ],
  templateUrl: './festivos.component.html',
  styleUrls: ['./festivos.component.css']
})
export class FestivosComponent {

  public festivos: Festivo[]=[];
  public columnas=[
    {name:"Nombre", prop:"nombre", width: 250},
    {name:"Mes",prop:"mes"},
    {name:"Dia",prop:"dia"},
  ];

  public year: number = new Date().getFullYear();
  public fecha = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
  public tableContainerClass: string = 'table-container'; 

  constructor(private festivoServicio: FestivoService, private dialog: MatDialog){
    this.listar(this.year);
  }

  public listar(year: number) {
    this.festivoServicio.listar(year).subscribe({
      next: (response: any[]) => {
        this.festivos = response.map(item => ({
          id: item.id,
          nombre: item.nombre,
          mes: item.mes,
          dia: item.dia,
          idtipo: item.idtipo,
          diaspascua: item.diaspascua
        }));
      },
      error: error => {
        window.alert(error.message);
      }
    });
  }

  public onYearChange(newYear: number) {
    this.listar(newYear);
  }

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
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
