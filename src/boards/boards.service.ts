import { Injectable } from '@nestjs/common';
import { Board } from './board.model';


//@Injectable 다른 컴포넌트 어디에서나 사용 할 수 있도록 해줌
@Injectable()
export class BoardsService {
	private boards: Board[] = [];

	//return type 정의 : Board[]
	getAllBoards(): Board[] {
		return this.boards;
	}
}
