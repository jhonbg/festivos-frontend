import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../share/modulos/referencias-material.module';
import { Festivo } from '../../../core/entidades/festivo';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FestivosService } from '../../servicios/festivos/festivos.service'


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
  public tableContainerClass: string = 'table-container'; 

  constructor(private festivoServicio: FestivosService){
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
}
