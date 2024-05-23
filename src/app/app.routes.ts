import { Routes } from '@angular/router';
import { FestivosComponent } from './features/componentes/festivos/festivos.component';
import { FestivoComponent } from './features/componentes/festivo/festivo.component';

export const routes: Routes = [
    {path:"festivos", component:FestivosComponent},
    {path:"festivo", component:FestivoComponent}
];
