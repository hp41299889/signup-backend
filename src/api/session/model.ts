import {postgres} from '../../database';
import {sessionEntity} from './entity';

const repo = postgres.getRepository(sessionEntity);

export const readAllWithSignup = async () => {
  return await repo.find({
    relations: {
      signups: true,
    },
  });
};

export const readById = async (id: number) => {
  return await repo.findOne({
    where: {
      id: id,
    },
  });
};
