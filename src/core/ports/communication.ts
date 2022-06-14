import { UniqueEntityID } from '../domain'

export interface Auth {
  userId: UniqueEntityID
}

export interface Input<Body> {
  body?: Body
}

export interface Output<Body> {
  statusCode: number
  body: Body
}

export interface Http {
  post: <B, O, H>(url: string, body: B, headers?: H[]) => Promise<O>
}
