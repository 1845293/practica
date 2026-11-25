import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from './usuario.entity.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepo: Repository<Usuario>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existe = await this.usuarioRepo.findOneBy({ email: dto.email });
    if (existe) {
      throw new BadRequestException(`El email ${dto.email} ya está registrado`);
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const usuario = this.usuarioRepo.create({
      username: dto.username,
      email: dto.email,
      password: passwordHash,
    });
    const guardado = await this.usuarioRepo.save(usuario);
    return {
      mensaje: 'Usuario registrado correctamente',
      idUsuario: guardado.idUsuario,
      username: guardado.username,
      email: guardado.email,
    };
  }

  async login(dto: LoginDto) {
    const usuario = await this.usuarioRepo.findOneBy({ email: dto.email });
    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordValido = await bcrypt.compare(dto.password, usuario.password);
    if (!passwordValido) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: usuario.idUsuario, email: usuario.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
