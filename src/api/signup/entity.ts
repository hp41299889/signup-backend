import {EntitySchema} from 'typeorm';

import {Signup} from './interface';

export const signupEntity = new EntitySchema<Signup>({
  name: 'signup',
  tableName: 'signup',
  columns: {
    id: {
      type: String,
      primary: true,
    },
    name: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
    },
    joinNumber: {
      type: Number,
    },
    isParking: {
      type: Boolean,
    },
    isShuttle: {
      type: Boolean,
    },
    isVerified: {
      type: Boolean,
    },
    isCheckin: {
      type: Boolean,
      default: false,
    },
  },
  relations: {
    session: {
      target: 'session',
      type: 'many-to-one',
      joinColumn: {
        name: 'sessionId',
      },
    },
  },
});
