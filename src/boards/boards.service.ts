import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import {v1 as uuid} from 'uuid';
import { CreateBoardDot } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

//@Injectable 다른 컴포넌트 어디에서나 사용 할 수 있도록 해줌
@Injectable()
export class BoardsService {
	constructor(
		@InjectRepository(BoardRepository)
		private boardRepository: BoardRepository,
	){}
	
	createBoard(createBoardDto: CreateBoardDot): Promise<Board> {
		return this.boardRepository.createBoard(createBoardDto);
	}

	async getBoardById(id: number): Promise<Board> {
		const found = await this.boardRepository.findOne(id);
		
		if(!found) {
			throw new NotFoundException(`Can't find Board with id ${id}`);
		}
		return found;
	}

	async getAllBoard(): Promise<Board[]> {
		return this.boardRepository.find();
	}

	async deleteBoard(id: number): Promise<void> {
		const result = await this.boardRepository.delete(id);

		//affected : 데이터 맞는 겟수
		if(result.affected === 0 ){
			throw new NotFoundException(`Can't not find Board with id ${id}`)
		}
	}

	async updateBoardStatus(id: number, status: BoardStatus):Promise<Board> {
		const board = await this.getBoardById(id);

		board.status = status;
		await this.boardRepository.save(board);

		return board;
	}
}
