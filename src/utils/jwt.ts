import jwt from "jsonwebtoken";

const secret: any = process.env.JWT_SECRET;
const createJWT = ({ payload }: any) => {
  const token = jwt.sign(payload, secret, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const isTokenValid = ({ token }: any) => jwt.verify(token, secret);

const attachCookiesToResponse = ({ res, user }: any) => {
  const token = createJWT({ payload: user });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

export { createJWT, isTokenValid, attachCookiesToResponse };
