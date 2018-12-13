import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as BearerStrategy } from "passport-http-bearer";
import search from "./db";
import { encode, decode } from "../utils/tokens";
import { checkPassword } from "../utils/hashing";

function configurePassport(app) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        sessions: false
      },
      (email, password, done) => {
        search(`SELECT id, hash FROM Users WHERE email = '${email}';`)
          .then(res => res[0])
          .then(user => {
            console.log(user.hash);
            if (user && user.hash) {
              checkPassword(password, user.hash)
                .then(matches => {
                  if (matches) {
                    console.log("it matches");
                    search(`INSERT INTO Tokens (userId) VALUES (${user.id})`)
                      .then(id => encode(id))
                      .then(tok => done(null, { token: tok }));
                  } else {
                    return done(null, false, {
                      message: "Invalid Login attaemnpt"
                    });
                  }
                })
                .catch(err => {
                  throw err;
                });
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
      let tokenId = decode(token);

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
