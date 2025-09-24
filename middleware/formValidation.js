const { body } = require("express-validator");
const { getUserByUsername } = require("../db/queries");

const validatePost = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage(
      "Oh no no no, sweetie. You can't just sashay in here with a blank title. " +
        "This post needs a name that slaps harder than your eyeliner. " +
        "Give it a headline worthy of a standing ovation!"
    ),
  body("content").trim(),
];

const validateLogin = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage(
      "Trying to log in without a username? Sweetie, we need to know " +
        "who's knocking before we open the velvet rope."
    ),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(
      "No password? This isn't a casual stroll, it's a secured entrance. " +
        "Flash the credentials or sashay away!"
    ),
];

const validateSignup = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage(
      "You're registering, darling. That means choosing a name that slaps, " +
        "sparkles, and screams main character energy. Don't ghost us!"
    )
    .custom(async (value) => {
      const user = await getUserByUsername(value);
      if (user) {
        throw new Error(
          "That username's already booked and busy, darling. Try something with more sparkle!"
        );
      }
      return true;
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(
      "A new account without a password? That's like wearing heels with no attitude. " +
        "Lock it down, secure your sparkle, and strut into the system!"
    ),
];

const validateJoin = [
  body("passcode")
    .trim()
    .notEmpty()
    .withMessage(
      "Trying to join the club without the secret code? Sweetie, this isn't open mic night, " +
        "it's members only. Drop the passcode or keep dreaming!"
    )
    .equals(process.env.MEMBER_PASSCODE)
    .withMessage(
      "That passcode's not it, darling. The lounge doesn't open for typos and guesses. " +
        "Channel your inner VIP and try again"
    ),
];

const validateAdmin = [
  body("passcode")
    .trim()
    .notEmpty()
    .withMessage(
      "No admin passcode? Honey, you can't just waltz into power. " +
        "This throne requires credentials, charisma, and a little encrypted elegance."
    )
    .equals(process.env.ADMIN_PASSCODE)
    .withMessage(
      "That's not the crown jewel we're looking for. Admin access demands precision, " +
        "not improvisation. Check your code and come correct!"
    ),
];

module.exports = {
  validatePost,
  validateLogin,
  validateSignup,
  validateJoin,
  validateAdmin,
};
