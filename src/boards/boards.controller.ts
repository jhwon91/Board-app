import { Controller, Get } from '@nestjs/common';
import { Board } from './board.model';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
	// boardsService: BoardsService
	// constructor( boardsService: BoardsService) {
	// 	this.boardsService = boardsService
	// }
	//=> 접근 제한자 (public, protected, private)을 생성자 파라미터에 선언하면
	//접근 제한자가 사용된 생성자 파라미터는 암묵적으로 클래스 프로퍼티로 선언이 됨

	constructor(private boardsService: BoardsService) {}

	@Get('/')
	getAllBoard(): Board[] {
		return this.boardsService.getAllBoards();
	}
}
