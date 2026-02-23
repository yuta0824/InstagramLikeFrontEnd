export const setJwtCookie = (jwt: string, exp: number) => {
  const currentTime = Math.floor(Date.now() / 1000)
  const maxAge = Math.max(exp - currentTime, 0)
  const secureFlag = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `jwt=${jwt}; Max-Age=${maxAge}; SameSite=Strict; Path=/${secureFlag}`
}
