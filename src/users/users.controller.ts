import {
	Body,
	Controller,
	Delete,
	Param,
	ParseIntPipe,
	Post,
	Put,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDTO } from "./dto/create-user";
import { UpdateUserDTO } from "./dto/update-user";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	createUser(@Body() data: CreateUserDTO) {
		return this.usersService.create(data);
	}

	@Put(":id")
	updateUser(
		@Param("id", ParseIntPipe) id: number,
		@Body() data: UpdateUserDTO,
	) {
		return this.usersService.update(id, data);
	}

	@Delete(":id")
	deleteUser(@Param("id", ParseIntPipe) id: number) {
		return this.usersService.delete(id);
	}
}
