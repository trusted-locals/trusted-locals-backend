import { Strategy, ExtractJwt } from 'passport-jwt'
import { PassportStatic } from 'passport';
import { User } from './database/models/user';


export const passportConfig = (passport: PassportStatic) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: 'nodeauthsecret',
  };
  passport.use('jwt', new Strategy(opts, async (jwtPayload, done) => {
    const user = await User.findOne({ username: jwtPayload.username })
    done(null, user)
  }));
};