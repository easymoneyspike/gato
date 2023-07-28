import express from 'express';
import { addUsers, deleteUser, getUsers, getUsersByID, updateUser } from '../controller/userController.js';

const route = express.Router();

route
    .get('/', getUsers)
    .get('/:id', getUsersByID)
    .post('/', addUsers)
    .put('/:id', updateUser )
    .delete('/:id', deleteUser)

export default route;