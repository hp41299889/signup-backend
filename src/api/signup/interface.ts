import {Session} from '../session';

export interface Signup {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  joinNumber: number;
  isParking: boolean;
  isShuttle: boolean;
  session: Session;
}

export interface CreateSignupDto {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  joinNumber: number;
  isParking: boolean;
  isShuttle: boolean;
  session: Session;
}

export interface PostSignup {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  joinNumber: number;
  isParking: boolean;
  isShuttle: boolean;
  sessionId: number;
}
