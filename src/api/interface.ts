import {Router} from 'express';

export interface ApiResponse {
  statusCode: number;
  message: string;
  data: string | number | object | [] | null | undefined;
}

export interface Routers {
  [routerPrefix: string]: Router;
}
