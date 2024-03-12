export type Bindings = {
  DATABASE_URL: string;
  JWT_SECRET: string;
};

export type userContext = {
  Bindings: Bindings;
  Variables: {
    body: {
      name?: string;
      email: string;
      password: string;
    };
  };
};

export type blogContext = {
  Bindings: Bindings;
  Variables: {
    userId: string;
    body: {
      id?: string;
      title: string;
      content: string;
    };
  };
};
