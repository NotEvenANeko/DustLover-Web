interface UserInfoForSession {
  username: string,
  userRole: number,
  userId: number,
  accessToken: string
}

interface UserInfoForLocal {
  username: string,
  userRole: number,
  userId: number,
  refreshToken: string
}


export const getLocalStorage = (key: string): UserInfoForLocal | null => {
  const value: string | null = localStorage.getItem(key)
  if(!value) return null
  return value.startsWith('{') || value.startsWith('[') ? JSON.parse(value) : value
}

export const getSessionStorage = (key: string): UserInfoForSession | null => {
  const value: string | null = sessionStorage.getItem(key)
  if(!value) return null
  return value.startsWith('{') || value.startsWith('[') ? JSON.parse(value) : value  
}

export const saveLocalStorage = (key: string, value: UserInfoForLocal | string): void => {
  if(typeof value === 'object') value = JSON.stringify(value)
  localStorage.setItem(key, value as string)
}

export const saveSessionStorage = (key: string, value: UserInfoForSession | string): void => {
  if(typeof value === 'object') value = JSON.stringify(value)
  sessionStorage.setItem(key, value as string)
}

export const removeLocalStorage = (key: string): void => {
  localStorage.removeItem(key)
}

export const removeSessionStorage = (key: string): void => {
  sessionStorage.removeItem(key)
}

export const clearLocalStorage = (): void => {
  localStorage.clear()
}

export const clearSessionStorage = (): void => {
  sessionStorage.clear()
}