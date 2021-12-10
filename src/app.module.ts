import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { FilmesModule } from './filmes/filmes.module';



@Module({
  imports: [UserModule, FilmesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
