import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { FilmesModule } from './filmes/filmes.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [UserModule, FilmesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
