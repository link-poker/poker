import {
  ICreateTableAsUserRequest,
  ISitDownAsUserRequest,
  ICreateTableAsGuestRequest,
  ISitDownAsGuestRequest,
  IGetTableRequest,
} from '@link-poker/constants';
import { FastifyReply, FastifyRequest } from 'fastify';
import { httpHandleError } from '../../../error';
import { AuthTokenData } from '../../dtos/AuthTokenData';
import { PlayerPrivateInfoData } from '../../dtos/PlayerPrivateInfoData';
import { TableInfoForPlayersData } from '../../dtos/TableInfoForPlayersData';
import { UserData } from '../../dtos/UserData';
import { AuthenticateApplicationService } from '../../services/AuthenticateApplicationService';
import { TableApplicationService } from '../../services/TableApplicationService';
import { UserApplicationService } from '../../services/UserApplicationService';

export class TableHttpController {
  constructor(
    private readonly authenticateApplicationService: AuthenticateApplicationService,
    private readonly tableApplicationService: TableApplicationService,
    private readonly userApplicationService: UserApplicationService,
  ) {}

  async createAsUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { currency, smallBlind, bigBlind, buyIn } = request.body as ICreateTableAsUserRequest['body'];
      const authToken = request.headers.authorization;
      const user = this.authenticateApplicationService.authenticate(authToken);
      const table = await this.tableApplicationService.createTable(user, currency, smallBlind, bigBlind, buyIn);
      const tableData = new TableInfoForPlayersData(table.getTableInfoForPlayers());
      reply.send({ table: tableData });
    } catch (error) {
      httpHandleError(error, request, reply);
    }
  }

  async sitDownAsUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { tableId } = request.params as ISitDownAsUserRequest['params'];
      const { stack, seatNumber } = request.body as ISitDownAsUserRequest['body'];
      const authToken = request.headers.authorization;
      const user = this.authenticateApplicationService.authenticate(authToken);
      const table = await this.tableApplicationService.sitDown(tableId, user, stack, seatNumber);
      const tableData = new TableInfoForPlayersData(table.getTableInfoForPlayers());
      const playerPrivateInfo = table.getPlayerPrivateInfo(user.id);
      const playerPrivateInfoData = new PlayerPrivateInfoData(playerPrivateInfo!);
      reply.send({ table: tableData, playerPrivateInfo: playerPrivateInfoData });
    } catch (error) {
      httpHandleError(error, request, reply);
    }
  }

  async createAsGuest(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, currency, smallBlind, bigBlind, buyIn } = request.body as ICreateTableAsGuestRequest['body'];
      const { user, authToken } = await this.userApplicationService.createUser(name);
      const table = await this.tableApplicationService.createTable(user, currency, smallBlind, bigBlind, buyIn);
      const userData = new UserData(user);
      const authTokenData = new AuthTokenData(authToken);
      const tableData = new TableInfoForPlayersData(table.getTableInfoForPlayers());
      reply.send({ user: userData, authToken: authTokenData, table: tableData });
    } catch (error) {
      httpHandleError(error, request, reply);
    }
  }

  async sitDownAsGuest(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { tableId } = request.params as ISitDownAsGuestRequest['params'];
      const { name, stack, seatNumber } = request.body as ISitDownAsGuestRequest['body'];
      const { user, authToken } = await this.userApplicationService.createUser(name);
      const table = await this.tableApplicationService.sitDown(tableId, user, stack, seatNumber);
      const userData = new UserData(user);
      const authTokenData = new AuthTokenData(authToken);
      const tableData = new TableInfoForPlayersData(table.getTableInfoForPlayers());
      const playerPrivateInfo = table.getPlayerPrivateInfo(user.id);
      const playerPrivateInfoData = new PlayerPrivateInfoData(playerPrivateInfo!);
      reply.send({
        user: userData,
        authToken: authTokenData,
        table: tableData,
        playerPrivateInfo: playerPrivateInfoData,
      });
    } catch (error) {
      httpHandleError(error, request, reply);
    }
  }

  async getTable(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { tableId } = request.params as IGetTableRequest['params'];
      const authToken = request.headers.authorization;
      const table = await this.tableApplicationService.getTable(tableId);
      const tableData = new TableInfoForPlayersData(table.getTableInfoForPlayers());
      if (authToken) {
        const user = this.authenticateApplicationService.authenticate(authToken);
        const playerPrivateInfo = table.getPlayerPrivateInfo(user.id);
        if (playerPrivateInfo) {
          const playerPrivateInfoData = new PlayerPrivateInfoData(playerPrivateInfo);
          return reply.send({ table: tableData, playerPrivateInfo: playerPrivateInfoData });
        }
      }
      reply.send({ table: tableData });
    } catch (error) {
      httpHandleError(error, request, reply);
    }
  }
}
