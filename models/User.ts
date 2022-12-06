/**
 * A model representation of a single user in our application.
 * 
 * @property {String} username The username of the user.
 * @property {String} password The password of the user.
 * @property {String} firstName The first name of the user.
 * @property {String} lastName The last name of the user.
 * @property {String} email The email of the user.
 * @property {String} profilePhoto The profile photo of the user.
 * @property {String} headerImage The header image of the user.
 * @property {String} biography The biography of the user.
 * @property {Date} dateOfBirth The user's birthdate.
 * @property {Date} joined The date on which the user joined.
 * @property {Number} followersCount The total followers count.
 * @property {Number} followingCount The count of total users whom I'm following.
 * 
 * @see AccountType
 * @see MaritalStatus
 */
export default interface User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
  headerImage: string;
  biography: string;
  dateOfBirth: Date;
  joined: Date;
  followersCount: Number,
  followingCount: Number,
}