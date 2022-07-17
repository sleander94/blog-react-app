export type post = {
  author: String;
  authorId: String;
  isPublic: Boolean;
  text: String;
  timestamp: String;
  title: String;
  __v: Number;
  _id: String;
};

export type comment = {
  author: String;
  authorId: String;
  text: String;
  timestamp: String;
  post: String;
  __v: Number;
  _id: String;
};

export type signupUser = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  'confirm-password': string;
};

export type loginUser = {
  email: string;
  password: string;
};

export type formErrors = {
  firstname?: boolean;
  lastname?: boolean;
  email: boolean;
  password: boolean;
  'confirm-password'?: boolean;
};

export type userProps = {
  loggedIn?: boolean;
  token?: string;
  checkToken: Function;
  username?: string;
};
