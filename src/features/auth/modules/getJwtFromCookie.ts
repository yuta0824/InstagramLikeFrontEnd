export const getJwtFromCookie = (): string | undefined => {
  if (typeof window === 'undefined') {
    return
  }

  const jwtCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('jwt='))
    ?.split('=')[1]

  return jwtCookie
}
