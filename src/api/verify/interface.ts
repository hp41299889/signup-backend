export interface VerifyState {
  [idOfSignup: string]: State;
}

interface State {
  hash: string;
  life: number;
}
