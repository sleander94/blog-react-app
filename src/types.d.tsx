export type post = {
  author: string;
  authorId: string;
  problem: string;
  solution: string;
  timestamp: string;
  title: string;
  __v: Number;
  _id: string;
};

export type comment = {
  author: string;
  authorId: string;
  text: string;
  timestamp: string;
  post: string;
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
  admin?: boolean;
};

export type postCardProps = {
  title: String;
  id: String;
  date: String;
};

export type newPost = {
  title: String;
  problem: String;
  solution: String;
  adminPass: String;
};
