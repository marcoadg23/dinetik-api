import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/user.entity';

const users = []; // Simulación de base de datos

@Injectable()
export class AuthService {

    private JWT_SECRET = 'dinetik_super_secreta';
    private users: User[] = []; //simula usuarios


    register(body: { email: string; password: string }) {
        const { email, password } = body;
        const hashed = bcrypt.hashSync(password, 10);
        this.users.push({ email, password: hashed });
        return { msg: 'Usuario registrado' };
    }

    login(body: { email: string; password: string }) {
        const { email, password } = body;
        const user = this.users.find(u => u.email === email);
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return { error: 'Credenciales inválidas' };
        }
        const token = jwt.sign({ sub: email }, this.JWT_SECRET, { expiresIn: '1h' });
        return { msg: "Bienvenido, tu token es:" + token };
    }

    verify(auth: string) {
        try {
            const token = auth.replace('Bearer ', '');
            const decoded = jwt.verify(token, this.JWT_SECRET);
            return { msg: 'Token válido', user: decoded };
        } catch (err) {
            return { error: 'Token inválido o expirado' };
        }
    }
}
