import {Strategy,ExtractJwt} from 'passport-jwt'
import  { PassportStatic } from 'passport';

export const passportConfig= (passport:PassportStatic)=> {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: 'nodeauthsecret',
  };
  passport.use('jwt', new Strategy(opts, async (jwtPayload, done) =>{
    done(null, {
      name: jwtPayload.name,
      id: jwtPayload._id,
      email: jwtPayload.email,
      country: jwtPayload.country
    })
  }));
};