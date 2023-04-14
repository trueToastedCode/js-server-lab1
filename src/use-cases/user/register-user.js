export default function makeRegisterUser ({ userApi }) {
  return async function registerUser (info) {
    return await userApi.registerUser(info)
  }
}