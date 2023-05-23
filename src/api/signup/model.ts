import {postgres} from '../../database';
import {signupEntity} from './entity';
import {CreateSignupDto} from './interface';

const repo = postgres.getRepository(signupEntity);

export const createSignup = async (dto: CreateSignupDto) => {
  return await repo.save(dto);
};

export const readSignupById = async (id: string) => {
  return await repo.findOne({
    where: {
      id: id,
    },
  });
};

export const updateSignupToVerifiedById = async (id: string) => {
  return await repo.update({isVerified: true}, {id: id});
};
