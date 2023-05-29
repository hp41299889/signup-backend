import {type} from 'os';
import {Signup} from '../signup';

export interface Session {
  id: number;
  name: string;
  place: string;
  joinLimit: number;
  isParking: boolean;
  isShuttle: boolean;
  createdAt: Date;
  updatedAt: Date;

  signups: Signup[];
}

export interface SessionStatus {
  id: number;
  name: string;
  place: string;
  remainingNumber: number;
  isParking: boolean;
  isShuttle: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type PostSession = CreateSessionDto;

export type PatchSession = UpdateSessionDto;

export interface CreateSessionDto {
  name: string;
  place: string;
  joinLimit: number;
  isParking: boolean;
  isShuttle: boolean;
}

export interface UpdateSessionDto {
  name: string;
  place: string;
  joinLimit: number;
  isParking: boolean;
  isShuttle: boolean;
}
