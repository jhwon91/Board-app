import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import {v1 as uuid} from 'uuid';
import { CreateBoardDot } from './dto/create-board.dto';

//@Injectable 다른 컴포넌트 어디에서나 사용 할 수 있도록 해줌
@Injectable()
export class BoardsService {
	private boards: Board[] = [];

	//return type 정의 : Board[]
	getAllBoards(): Board[] {
		return this.boards;
	}

	// createBoard(title: string, description: string) {
	// 	const board: Board =  {
	// 		id: uuid(),
	// 		title,
	// 		description,
	// 		status: BoardStatus.PUBLIC
	// 	};

	// 	this.boards.push(board);
	// 	return board;
	// }

	createBoard(createBoardDto: CreateBoardDot) {
		// const title = createBoardDto.title
		const { title, description } = createBoardDto
		const board: Board =  {
			id: uuid(),
			title,
			description,
			status: BoardStatus.PUBLIC
		};

		this.boards.push(board);
		return board;
	}

	getBoardById(id: string): Board {
		const found = this.boards.find((board) => board.id === id);

		if(!found) {
			throw new NotFoundException(`Can't find Board with id ${id}`);
		}

		return found;
	}

	//void retrun 없음
	deleteBoard(id: string): void {
		const found = this.getBoardById(id);
		this.boards = this.boards.filter((board) => board.id !== found.id);
	}

	updateBoardStatus(id: string, status: BoardStatus): Board {
		const board = this.getBoardById(id);
		board.status = status;
		return board;
	}
}
