import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDot } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

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

	// @Post('/')
	// createBoard(@Body() body) {
	// 	// @Body('title') tile 혹은 @Body('description') description 으로 사용가능
	// 	console.log('body',body);
	// }

	// @Post('/')
	// createBoard(
	// 	@Body('title') title: string,
	// 	@Body('description') description: string,
	// ): Board {
	// 	return this.boardsService.createBoard(title, description);
	// }

	@Post('/')
	@UsePipes(ValidationPipe)
	createBoard(
		@Body() createBoardDto: CreateBoardDot
	): Board {
		return this.boardsService.createBoard(createBoardDto);
	}

	@Get('/:id')
	getBoardById(@Param('id') id: string): Board {
		return this.boardsService.getBoardById(id);
	}

	@Delete('/:id')
	deleteBoard(@Param('id') id: string): void {
		this.boardsService.deleteBoard(id);
	}

	@Patch('/:id/status')
	updateBoardStatus(
		@Param('id') id: string,
		@Body('status', BoardStatusValidationPipe) status: BoardStatus 
	): Board {
		return this.boardsService.updateBoardStatus(id,status);
	}

}
