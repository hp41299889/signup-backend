import {sessionInterface, sessionModel} from '../../api/session';
import {loggerFactory} from '../../util';

const logger = loggerFactory('Seed');

const sessionSeed: sessionInterface.CreateSessionDto[] = [
  {
    name: '台北一場',
    place: '準休閒農場',
    joinLimit: 1200,
    activityDate: new Date('2023-09-02 9:30'),
    isParking: true,
    isShuttle: true,
  },
  {
    name: '中彰場',
    place: '魔菇部落休閒農場',
    joinLimit: 1000,
    activityDate: new Date('2023-09-16 9:30'),
    isParking: true,
    isShuttle: true,
  },
  {
    name: '台北二場',
    place: '兒童新樂園',
    joinLimit: 4000,
    activityDate: new Date('2023-10-14 18:30'),
    isParking: true,
    isShuttle: false,
  },
  {
    name: '宜蘭場',
    place: '頭城農場',
    joinLimit: 800,
    activityDate: new Date('2023-10-28 9:30'),
    isParking: true,
    isShuttle: true,
  },
  {
    name: '高雄場',
    place: '橋頭糖廠(R23糖倉)',
    joinLimit: 1200,
    activityDate: new Date('2023-11-04 9:30'),
    isParking: true,
    isShuttle: false,
  },
  {
    name: '桃竹場',
    place: '新豐農場',
    joinLimit: 1000,
    activityDate: new Date('2023-11-18 09:30'),
    isParking: true,
    isShuttle: true,
  },
  {
    name: '台南場',
    place: '春園高爾夫農場',
    joinLimit: 1000,
    activityDate: new Date('2023-12-02 09:30'),
    isParking: true,
    isShuttle: true,
  },
];

export const seedSession = async () => {
  logger.debug('session');
  const sessions = await sessionModel.readAll();
  for (const seed of sessionSeed) {
    const exists = sessions.some(session => session.name === seed.name);
    if (!exists) {
      await sessionModel.createSession(seed);
    }
  }
};
