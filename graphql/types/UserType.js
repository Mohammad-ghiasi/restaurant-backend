exports.UserType = `
type UserType {
  id: ID
  username: String
  phonenumber: String
  password: String
  role: String
}
`;

exports.AuthType = `
type AuthType {
  token: String
  user: UserType
}
`;
