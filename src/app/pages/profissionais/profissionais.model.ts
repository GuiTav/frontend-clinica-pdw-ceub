import { EspecialidadeRes } from "../especialidades/especialidades.model"

export interface ProfissionalRes {
    idProfissional: number,
    nomeProfissional: string,
    especialidades: EspecialidadeRes[]
}

export interface ProfissionalReq {
    idProfissional?: number,
    nomeProfissional: string,
    idsEspecialidades: number[]
}