import { IsNotEmpty } from 'class-validator';


export class CreateBoardDot {
	@IsNotEmpty()
	title: string;
	
	@IsNotEmpty()
	description: string;
}