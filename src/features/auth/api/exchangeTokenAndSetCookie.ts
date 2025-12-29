type TokenExchangeResponse = {
  jwt: string
  exp: number
}

export const exchangeTokenAndSetCookie = async (authCode: string) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) {
    throw new Error('NEXT_PUBLIC_API_URL is not set')
  }

  const response = await fetch(`${apiUrl}/api/users/token_exchange?auth_code=${authCode}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error(`token_exchange failed: ${response.status}`)
  }

  const data = (await response.json()) as TokenExchangeResponse
  const currentTime = Math.floor(Date.now() / 1000)
  const maxAge = Math.max(data.exp - currentTime, 0)
  const secureFlag = window.location.protocol === 'https:' ? '; Secure' : ''

  document.cookie = `jwt=${data.jwt}; Max-Age=${maxAge}; SameSite=Strict; Path=/${secureFlag}`
}
