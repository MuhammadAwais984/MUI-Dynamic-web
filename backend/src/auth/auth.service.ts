import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(data: { email: string; password: string }) {
    const user = await this.usersService.findByEmail(data.email);
    if (!user) throw new UnauthorizedException('Invalid email');

    const match = await bcrypt.compare(data.password, user.password);
    if (!match) throw new UnauthorizedException('Wrong password');

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    const { password, ...safeUser } = user;

    return {
      access_token: token,
      user: safeUser,
    };
  }

  async register(data: {
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    password: string;
    phone: string;
    city: string;
  }) {
    const hashed = await bcrypt.hash(data.password, 10);
    const newUser = await this.usersService.create({
      ...data,
      password: hashed,
    });

    const { password, ...safeUser } = newUser;

    return {
      message: 'User created',
      user: safeUser,
    };
  }
  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload, { expiresIn: '15m' });

    const resetLink = `http://localhost:5173/reset-password?token=${token}`;

    // Send this reset link to email — or log it
    console.log(`Password reset link: ${resetLink}`);

    return {
      message: 'Password reset link has been sent (check console or email)',
    };
  }
  async resetPassword(token: string, newPassword: string) {
    try {
      const decoded = this.jwtService.verify(token);
      const userId = decoded.sub;

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.usersService.update(userId, { password: hashedPassword });

      return { message: 'Password has been reset successfully' };
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
