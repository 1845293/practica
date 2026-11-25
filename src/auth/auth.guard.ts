import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Falta el token de autorización');
    }

    const [tipo, token] = authHeader.split(' ');
    if (tipo !== 'Bearer' || !token) {
      throw new UnauthorizedException('Formato de token inválido');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      (request as any).user = payload;
    } catch {
      throw new UnauthorizedException('Token inválido o expirado');
    }

    return true;
  }
}
