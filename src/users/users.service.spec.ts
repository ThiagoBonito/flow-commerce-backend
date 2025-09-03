import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { PrismaService } from "prisma/prisma.service";

jest.mock("src/auth/hash-password", () => ({
	hashPassword: jest
		.fn()
		.mockImplementation((p) => Promise.resolve(`hashed-${p}`)),
}));

describe("UsersService", () => {
	let service: UsersService;
	let prisma: PrismaService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersService,
				{
					provide: PrismaService,
					useValue: {
						user: { create: jest.fn(), update: jest.fn() },
					},
				},
			],
		}).compile();

		service = module.get<UsersService>(UsersService);
		prisma = module.get<PrismaService>(PrismaService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("create should call prisma.user.create and hash password", async () => {
		const dto = {
			name: "John",
			email: "john@test.com",
			password: "123",
			isActive: true,
			roleId: 1,
		};
		(prisma.user.create as jest.Mock).mockResolvedValue({
			id: 1,
			...dto,
			password: "hashed-123",
		});

		const result = await service.create(dto);

		expect(prisma.user.create).toHaveBeenCalledWith({
			data: { ...dto, password: "hashed-123" },
		});
		expect(result.password).toBe("hashed-123");
	});

	it("update should call prisma.user.update and hash password", async () => {
		const dto = {
			name: "Jane",
			email: "jane@test.com",
			password: "456",
			isActive: true,
			roleId: 2,
		};
		(prisma.user.update as jest.Mock).mockResolvedValue({
			id: 1,
			...dto,
			password: "hashed-456",
		});

		const result = await service.update(1, dto);

		expect(prisma.user.update).toHaveBeenCalledWith({
			where: { id: 1 },
			data: { ...dto, password: "hashed-456" },
		});
		expect(result.password).toBe("hashed-456");
	});

	it("delete should call prisma.user.update to set isActive false", async () => {
		(prisma.user.update as jest.Mock).mockResolvedValue({
			id: 1,
			isActive: false,
		});

		const result = await service.delete(1);

		expect(prisma.user.update).toHaveBeenCalledWith({
			where: { id: 1 },
			data: { isActive: false },
		});
		expect(result.isActive).toBe(false);
	});
});
