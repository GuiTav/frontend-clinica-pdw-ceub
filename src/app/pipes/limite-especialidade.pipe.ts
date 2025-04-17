import { Pipe, PipeTransform } from '@angular/core';
import { EspecialidadeRes } from '../pages/especialidades/especialidades.model';

@Pipe({
	name: 'limiteEspecialidade'
})
export class LimiteEspecialidadePipe implements PipeTransform {

	transform(listaEspecialidade: EspecialidadeRes[], limite: number): string {
		if (listaEspecialidade.length > limite) {
			let stringEspecialidadesLimitadas = listaEspecialidade.slice(0, limite).map(e => e.nomeEspecialidade).join(", ");
			
			return stringEspecialidadesLimitadas.concat(`... [+${listaEspecialidade.length - limite}]`);
		}

		return listaEspecialidade.map(e => e.nomeEspecialidade).join(", ");
	}

}
