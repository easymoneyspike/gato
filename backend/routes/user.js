import express from 'express';
import { addUsers, deleteUser, getUsers, getUsersByID, loginUser, updateUser } from '../controller/userController.js';

const route = express.Router();

route
    .post('/login', loginUser)
    .get('/', getUsers)
    .get('/:id', getUsersByID)
    .post('/', addUsers)
    .put('/:id', updateUser )
    .delete('/:id', deleteUser)

export default route;