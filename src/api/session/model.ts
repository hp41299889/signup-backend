import {postgres} from '../../database';
import {sessionEntity} from './entity';
import {CreateSessionDto, UpdateSessionDto} from './interface';
import {loggerFactory} from '../../util';

const logger = loggerFactory('Model session');
const repo = postgres.getRepository(sessionEntity);

export const createSession = async (dto: CreateSessionDto) => {
  logger.debug('createSession');
  return await repo.save(dto);
};

export const readAll = async () => {
  logger.debug('readAll');
  return await repo.find();
};

export const readAllWithSignup = async () => {
  logger.debug('readAllWithSignup');
  return await repo.find({
    relations: {
      signups: true,
    },
    order: {
      id: 'ASC',
    },
  });
};

export const readById = async (id: number) => {
  logger.debug('readById');
  return await repo.findOne({
    where: {
      id: id,
    },
  });
};

export const updateById = async (id: number, dto: UpdateSessionDto) => {
  return await repo.update(
    {
      id: id,
    },
    dto
  );
};

export const deleteById = async (id: number) => {
  return await repo.delete({id: id});
};
