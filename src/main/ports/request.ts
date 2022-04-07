import { Auth } from '../../core/ports'
import { Request } from 'express'

export interface AuthenticatedRequest extends Request {
  auth: Auth
}
