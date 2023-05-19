import {postgres} from '../../database';
import {sessionEntity} from './entity';

const repo = postgres.getRepository(sessionEntity);

export const readAll = async () => {
  return await repo.find();
};

export const readById = async (id: number) => {
  return await repo.findOne({
    where: {
      id: id,
    },
  });
};
