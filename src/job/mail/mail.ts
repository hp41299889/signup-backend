import {createTransport} from 'nodemailer';
import google from 'googleapis';
import {OAuth2Client} from 'google-auth-library';

import {MailOption} from './interface';
import {mailerConfig} from '../../config/config';

const scope = ['https://www.googleapis.com/auth/gmail.send'];
// const oauthClient = new google.Auth.OAuth2Client({
//   clientId: mailerConfig.clientId,
//   clientSecret: mailerConfig.clientSecret,
//   redirectUri: 'http://localhost:8000',
// });
// const url = oauthClient.generateAuthUrl({
//   access_type: 'offline',
//   scope: scope,
// });

export const sendMail = async (option: MailOption) => {
  await googleAuth();
  // const transport = createTransport({
  //   service: 'Gmail',
  //   auth: {
  //     type: 'OAuth2',
  //     user: mailerConfig.user,
  //     clientId: mailerConfig.clientId,
  //     clientSecret: mailerConfig.clientSecret,
  //     refreshToken: mailerConfig.refreshToken,
  //     accessToken: '',
  //   },
  // });

  // return await transport.sendMail(option);
};

const googleAuth = async () => {
  const oAuthClient = new OAuth2Client({
    clientId: mailerConfig.clientId,
    clientSecret: mailerConfig.clientSecret,
    redirectUri: 'http://localhost:8000',
  });

  const url = oAuthClient.generateAuthUrl({
    access_type: 'offline',
    scope: scope,
  });
  console.log(await oAuthClient.getAccessToken());
};
