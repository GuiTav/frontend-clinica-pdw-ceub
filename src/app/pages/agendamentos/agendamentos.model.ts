import { OperacaoRes } from "../operacoes/operacoes.model";
import { Paciente } from "../pacientes/pacientes.model";
import { ProfissionalRes } from "../profissionais/profissionais.model";

export interface AgendamentoRes {
    idAgendamento: number,
    dataHoraAgendamento: string,
    paciente: Paciente,
    operacao: OperacaoRes,
    profissional: ProfissionalRes
}

export interface AgendamentoReq {
    idAgendamento?: number,
    dataHoraAgendamento: string,
    cpfPaciente: string,
    idOperacao: number,
    idProfissional: number,
}
