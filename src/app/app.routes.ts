import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfissionaisComponent } from './pages/profissionais/profissionais.component';
import { EspecialidadesComponent } from './pages/especialidades/especialidades.component';
import { OperacoesComponent } from './pages/operacoes/operacoes.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { AgendamentosComponent } from './pages/agendamentos/agendamentos.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'profissionais', component: ProfissionaisComponent },
    { path: 'especialidades', component: EspecialidadesComponent },
    { path: 'operacoes', component: OperacoesComponent },
    { path: 'pacientes', component: PacientesComponent },
    { path: 'agendamentos', component: AgendamentosComponent },
    { path: '',   redirectTo: '/home', pathMatch: 'full' }
];
