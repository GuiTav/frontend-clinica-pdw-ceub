import { Routes } from '@angular/router';
import { AgendamentosComponent } from './pages/agendamentos/agendamentos.component';
import { EspecialidadesComponent } from './pages/especialidades/especialidades.component';
import { OperacoesComponent } from './pages/operacoes/operacoes.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { ProfissionaisComponent } from './pages/profissionais/profissionais.component';

export const routes: Routes = [
    { path: 'profissionais', component: ProfissionaisComponent },
    { path: 'especialidades', component: EspecialidadesComponent },
    { path: 'operacoes', component: OperacoesComponent },
    { path: 'pacientes', component: PacientesComponent },
    { path: 'agendamentos', component: AgendamentosComponent },
    { path: '',   redirectTo: '/agendamentos', pathMatch: 'full' }
];
