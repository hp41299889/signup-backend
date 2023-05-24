import {createTransport} from 'nodemailer';

import {MailOption} from './interface';
import {mailerConfig} from '../../config/config';

export const sendMail = async (option: MailOption) => {
  const transport = createTransport({
    service: 'Gmail',
    auth: {
      type: 'OAuth2',
      user: mailerConfig.user,
      clientId: mailerConfig.clientId,
      clientSecret: mailerConfig.clientSecret,
      refreshToken: mailerConfig.refreshToken,
    },
  });

  await transport.sendMail(option);
};
