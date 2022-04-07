import { Auth } from '../../core/ports'

export interface Authentication {
  encode: (auth: Auth) => string
  decode: (token: string) => Auth
  isValid: (token: string) => boolean
}
