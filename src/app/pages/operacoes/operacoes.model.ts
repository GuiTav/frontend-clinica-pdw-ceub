import { EspecialidadeRes } from "../especialidades/especialidades.model";

export interface OperacaoRes {
    idOperacao: number,
    nomeOperacao: string,
    descricaoOperacao: string,
    duracaoMinutosOperacao: number,
    especialidade: EspecialidadeRes
}

export interface OperacaoReq {
    idOperacao?: number,
    nomeOperacao: string,
    descricaoOperacao: string,
    duracaoMinutosOperacao: number,
    idEspecialidade: number
}
