import * as dotenv from 'dotenv';

export const jwtConstants = {
    secret: dotenv.config().parsed?.SECRET_KEY
}