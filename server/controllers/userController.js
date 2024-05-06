import * as userService from '../services/userService.js';

export const createUser = async (req, res) => {
  let response = {};

  try {
    const responseFromService = await userService.createUser(req.body);
    response.status = 200;
    response.message = 'User successfully created';
    response.body = responseFromService;
  } catch (error) {
    console.error('Something went wrong in userController.js', error);
    response.status = 400;
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

export const loginUser = async (req, res) => {
  let response = {};

  try {
    const responseFromService = await userService.loginUser(req.body);
    response.status = 200;
    response.message = 'User successfully logged in';
    response.body = responseFromService;
  } catch (error) {
    console.error('Error in loginUser (userController.js)', error);
    response.status = 400;
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

export const getUserProfile = async (req, res) => {
  let response = {};

  try {
    const responseFromService = await userService.getUserProfile(req);
    response.status = 200;
    response.message = 'Successfully got user profile data';
    response.body = responseFromService;
  } catch (error) {
    console.error('Error in getUserProfile (userController.js)', error);
    response.status = 400;
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

export const updateUserProfile = async (req, res) => {
  let response = {};

  try {
    const responseFromService = await userService.updateUserProfile(req);
    response.status = 200;
    response.message = 'Successfully updated user profile data';
    response.body = responseFromService;
  } catch (error) {
    console.error('Error in updateUserProfile (userController.js)', error);
    response.status = 400;
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};
