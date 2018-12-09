import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as BearerStrategy } from "passport-http-bearer";
import search from "./db";
import { encode, decode } from "../utils/tokens";

function configurePassport(app) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        sessions: false
      },
      (email, password, done) => {
        search(`SELECT id, password FROM Users WHERE email = '${email}';`)
          .then(res => res[0])
          .then(user => {
            if (user && user.password && user.password === password) {
              search(`INSERT INTO Tokens (userId) VALUES (${user.id})`)
                .then(id => encode(id))
                .then(tok => done(null, { token: tok }));
            } else {
              return done(null, false, { message: "Invalid Login" });
            }
          })
          .catch(err => done(err));
      }
    )
  );

  passport.use(
    new BearerStrategy((token, done) => {
      console.log(token);
      let tokenId = decode(token);
      console.log(decode(token));


      if (!tokenId) {
        return done(null, false, { message: "Invalid token" });
      }

      search(`SELECT userId FROM Tokens WHERE id = '${tokenId}';`)
        .then(user => {
          if (user) {
            delete user.password;
            return done(null, user);
          } else {
            done(null, false, { message: "Invalid token" });
          }
        })
        .catch(err => done(err));
    })
  );

  app.use(passport.initialize());
}

export default configurePassport;
