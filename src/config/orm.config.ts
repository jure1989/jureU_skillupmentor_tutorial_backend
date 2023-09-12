import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Permission } from 'entities/permission.entity'
import { Role } from 'entities/role.entity'
import { User } from 'entities/user.entity'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js'

type ConfigType = TypeOrmModuleOptions & PostgresConnectionOptions
type ConnectionOptions = ConfigType

export const ORMConfig = async (configService: ConfigService): Promise<ConnectionOptions> => ({
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USERNAME'),
  password: configService.get('DATABASE_PWD'),
  database: configService.get('DATABASE_NAME'),
  //entities: ['dist/**/*entity.{.ts,.js}'],
  entities: [User, Role, Permission],
  synchronize: true, // ONLY in the development!!
  ssl: true,
  extra: {
    ssl: { rejectUnauthorized: false },
  },
})
