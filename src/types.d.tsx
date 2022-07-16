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
