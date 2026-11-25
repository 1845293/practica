import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalasModule } from './salas/salas.module.js';
import { GenerosModule } from './generos/generos.module.js';
import { PeliculasModule } from './peliculas/peliculas.module.js';
import { FuncionesModule } from './funciones/funciones.module.js';
import { ClientesModule } from './clientes/clientes.module.js';
import { BoletosModule } from './boletos/boletos.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<string>('DB_PORT')),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    AuthModule,
    SalasModule,
    GenerosModule,
    PeliculasModule,
    FuncionesModule,
    ClientesModule,
    BoletosModule,
  ],
})
export class AppModule {}
