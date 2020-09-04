import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserSevice';

export default class SessionsController {
    public async create(request: Request, response: Response): Promise<Response> {

        const { email, password } = request.body;

        const authenticateUser = container.resolve(AuthenticateUserService);

        const { user, token } = await authenticateUser.execute({ email, password});

        delete user.password; // é bom nunca retornar o password do user
        return response.json({ user, token });
    }
}