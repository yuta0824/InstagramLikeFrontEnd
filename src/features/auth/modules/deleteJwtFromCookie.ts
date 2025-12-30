export const deleteJwtFromCookie = () => {
  document.cookie = 'jwt=; Max-Age=0; path=/; Secure; SameSite=Strict'
}
