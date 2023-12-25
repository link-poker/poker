import { Table } from '../../domain/entities/Table';
import { User } from '../../domain/entities/User';
import { TableFactory } from '../../domain/factories/TableFactory';
import { ITableRepository } from '../../infrastructure/interfaces/ITableRepository';
import { UserApplicationService } from './UserApplicationService';

export class TableApplicationService {
  constructor(
    private readonly tableFactory: TableFactory,
    private readonly tableRepository: ITableRepository,
    private readonly userApplicationService: UserApplicationService,
  ) {}

  async createTable(
    name: string,
    stack: number,
    currency: string,
    smallBlind: number,
    bigBlind: number,
    buyIn: number,
  ): Promise<{ user: User; table: Table }> {
    const user = await this.userApplicationService.createUser(name, stack);
    const table = this.tableFactory.create(user, currency, smallBlind, bigBlind, buyIn);
    await this.tableRepository.create(table);
    return { user, table };
  }
}
