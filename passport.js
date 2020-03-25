const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

const client = require("./src/utils/mongo")

module.exports = function (passport) {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: 'nodeauthsecret',
  };
  passport.use('jwt', new JwtStrategy(opts, async function (jwt_payload, done) {
    done(null, {
      name: jwt_payload.name,
      id: jwt_payload._id,
      email: jwt_payload.email,
      country: jwt_payload.country
    })
  }));
};