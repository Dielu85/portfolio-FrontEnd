import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraficoComponent} from './componentes/habilidades/grafico/grafico.component';

const routes: Routes = [
  {path: 'bar', component: GraficoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
