import {createTransport} from 'nodemailer';
import {OAuth2Client} from 'google-auth-library';

import {MailOption} from './interface';
import {mailerConfig} from '../../config/config';

const USER = mailerConfig.user;
const CLIENTID = mailerConfig.clientId;
const CLIENT_SECRET = mailerConfig.clientSecret;
const REFRESH_TOKEN = mailerConfig.refreshToken;
const REDIRECT_URI = mailerConfig.redirectUri;

const oAuthClient = new OAuth2Client({
  clientId: CLIENTID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI,
});

oAuthClient.setCredentials({
  refresh_token: REFRESH_TOKEN,
});

export const sendMail = async (option: MailOption) => {
  const accessToken = (await oAuthClient.getAccessToken()).token;
  if (accessToken) {
    const transport = createTransport({
      service: 'Gmail',
      auth: {
        type: 'OAuth2',
        user: USER,
        clientId: CLIENTID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    await transport.sendMail(option);
  }
};
