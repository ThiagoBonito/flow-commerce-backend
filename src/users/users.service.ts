import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user";
import { PrismaService } from "prisma/prisma.service";
import { UpdateUserDTO } from "./dto/update-user";
import { hashPassword } from "src/auth/hash-password";

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: CreateUserDTO) {
		try {
			const hashedPassword = await hashPassword(data.password);
			const newUser = await this.prisma.user.create({
				data: {
					name: data.name,
					email: data.email,
					password: hashedPassword,
					phone: data.phone,
					city: data.city,
					address: data.address,
					state: data.state,
					zipCode: data.zipCode,
					isActive: data.isActive,
					roleId: data.roleId,
				},
			});

			return newUser;
		} catch (error) {
			throw new Error(error);
		}
	}

	async update(id: number, data: UpdateUserDTO) {
		try {
			const hashedPassword = await hashPassword(data.password);
			const updatedUser = await this.prisma.user.update({
				where: {
					id: id,
				},
				data: {
					name: data.name,
					email: data.email,
					password: hashedPassword,
					phone: data.phone,
					city: data.city,
					address: data.address,
					state: data.state,
					zipCode: data.zipCode,
					isActive: data.isActive,
					roleId: data.roleId,
				},
			});

			return updatedUser;
		} catch (error) {
			throw new Error(error);
		}
	}

	async delete(id: number) {
		try {
			const updatedUser = await this.prisma.user.update({
				where: {
					id: id,
				},
				data: { isActive: false },
			});

			return updatedUser;
		} catch (error) {
			throw new Error(error);
		}
	}
}
