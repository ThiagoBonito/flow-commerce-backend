import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

describe("UsersController", () => {
	let controller: UsersController;
	let _service: UsersService;

	const mockService = {
		create: jest.fn(),
		update: jest.fn(),
		delete: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UsersController],
			providers: [{ provide: UsersService, useValue: mockService }],
		}).compile();

		controller = module.get<UsersController>(UsersController);
		_service = module.get<UsersService>(UsersService);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});

	it("createUser should call service.create", async () => {
		const dto = {
			name: "John",
			email: "john@test.com",
			password: "123",
			isActive: true,
			roleId: 1,
		};
		mockService.create.mockResolvedValue({ id: 1, ...dto });

		const result = await controller.createUser(dto);

		expect(result).toEqual({ id: 1, ...dto });
		expect(mockService.create).toHaveBeenCalledWith(dto);
	});

	it("updateUser should call service.update", async () => {
		const dto = {
			name: "Jane",
			email: "jane@test.com",
			password: "456",
			isActive: true,
			roleId: 2,
		};
		mockService.update.mockResolvedValue({ id: 1, ...dto });

		const result = await controller.updateUser(1, dto);

		expect(result).toEqual({ id: 1, ...dto });
		expect(mockService.update).toHaveBeenCalledWith(1, dto);
	});

	it("deleteUser should call service.delete", async () => {
		mockService.delete.mockResolvedValue({ id: 1, isActive: false });

		const result = await controller.deleteUser(1);

		expect(result).toEqual({ id: 1, isActive: false });
		expect(mockService.delete).toHaveBeenCalledWith(1);
	});
});
