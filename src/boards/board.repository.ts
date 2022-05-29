import {  EntityRepository, Repository } from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { CreateBoardDot } from './dto/create-board.dto';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
	async createBoard(createBoardDto: CreateBoardDot): Promise<Board> {
		const {title, description} = createBoardDto;

		//create 객체 생성
		const board = this.create({
			title,
			description,
			status: BoardStatus.PUBLIC
		})
		
		//객체 데이터베이스 생성
		await this.save(board);

		return board;
	}
}