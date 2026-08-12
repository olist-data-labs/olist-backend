import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Configuração do TypeORM com PostgreSQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const portValue = configService.get<string | number>(
          'POSTGRES_PORT',
          5432,
        );

        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST') ?? 'localhost',
          port: typeof portValue === 'number' ? portValue : Number(portValue),
          username: configService.get<string>('POSTGRES_USER') ?? 'admin',
          password: configService.get<string>('POSTGRES_PASSWORD') ?? 'admin',
          database: configService.get<string>('POSTGRES_DB') ?? 'olist_db',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true, // Cria/atualiza as tabelas automaticamente em desenvolvimento
          logging: false, // Mostra os SQLs executados no terminal
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
