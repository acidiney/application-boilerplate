import { UniqueEntityID } from '../domain'

export interface Auth {
  userId: UniqueEntityID
}

export interface Input<Body> {
  body?: Body
  params?: any
  auth?: Auth
}

export interface Output {
  statusCode: number
  body: any
}
