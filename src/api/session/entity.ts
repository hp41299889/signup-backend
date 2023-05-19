import {EntitySchema} from 'typeorm';

import {Session} from './interface';

export const sessionEntity = new EntitySchema<Session>({
  name: 'session',
  tableName: 'session',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
    },
    place: {
      type: String,
    },
    joinLimit: {
      type: Number,
    },
    isParking: {
      type: Boolean,
    },
    isShuttle: {
      type: Boolean,
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    },
    updatedAt: {
      type: 'timestamp',
      updateDate: true,
    },
  },
});
