import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDot } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
	constructor(private boardsService: BoardsService) {}

	@Get('/:id')
	getBoardById(@Param('id') id: number): Promise<Board> {
		return this.boardsService.getBoardById(id);
	}

	@Get()
	getAllTask(): Promise<Board[]> {
		return this.boardsService.getAllBoard();
	}

	@Post()
	@UsePipes(ValidationPipe)
	createBOard(@Body() CreateBoardDot: CreateBoardDot): Promise<Board> {
		return this.boardsService.createBoard(CreateBoardDot);
	}

	@Patch('/:id/status')
	updateBoardStatus(
		@Param('id', ParseIntPipe) id: number,
		@Body('status', BoardStatusValidationPipe) status: BoardStatus,
	):Promise<Board> {
		return this.boardsService.updateBoardStatus(id,status);
	}

	@Delete('/:id')
	deleteBoard(@Param('id', ParseIntPipe) id): Promise<void> {
		return this.boardsService.deleteBoard(id);
	}
}
