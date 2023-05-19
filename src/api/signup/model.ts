import {postgres} from '../../database';
import {signupEntity} from './entity';
import {CreateSignupDto} from './interface';

const repo = postgres.getRepository(signupEntity);

export const createSignup = async (dto: CreateSignupDto) => {
  console.log(dto);

  return await repo.save(dto);
};
