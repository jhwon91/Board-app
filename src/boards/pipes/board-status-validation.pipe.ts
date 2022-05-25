import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../board.model';

export class BoardStatusValidationPipe implements PipeTransform {

	readonly StatusOptions = [
		BoardStatus.PRIVATE,
		BoardStatus.PUBLIC
	]

	transform(value: any) {
		// console.log('value', value);
		// console.log('metadata', metadata);
		// value [처리된 인자값]
		// metadata { metatype: [Function: String], type: 'body', data: 'status' }

		value = value.toUpperCase();

		if(!this.isStatusValid(value)) {
			throw new BadRequestException(`${value} isn't in the status options`)
		}
		return value; 
	}

	private isStatusValid(status: any) {
		const index = this.StatusOptions.indexOf(status)
		return index !== -1
	}
}