import jwt from 'jsonwebtoken';
import process from 'process';

const validateToken = (req, res, next) => {
  let response = {};

  try {
    if (!req.headers.authorization) {
      throw new Error('Token is missing from header');
    }

    const userToken = req.headers.authorization.split('Bearer')[1].trim();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const decodedToken = jwt.verify(
      userToken,
      process.env.SECRET_KEY || 'default-secret-key'
    );
    return next();
  } catch (error) {
    console.error('Error in tokenValidation.js', error);
    response.status = 401;
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

export default validateToken;
