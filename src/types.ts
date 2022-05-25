export type TokenTypes = {
  code: string | undefined;
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
  ssrCode: string | undefined;
  items: [
    {
      name: string;
    }
  ];
};
