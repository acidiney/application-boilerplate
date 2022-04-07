import { Output } from '../ports'

const responseBaseHelper = (statusCode: number, body: any): Output => ({
  statusCode,
  body
})

export const ok = (body: any): Output => responseBaseHelper(200, body)

export const badRequest = (body: any): Output => responseBaseHelper(400, body)

export const notFound = (body: any): Output => responseBaseHelper(404, body)

export const unauthorized = (body: any): Output => responseBaseHelper(401, body)

export const forbidden = (body: any): Output => responseBaseHelper(403, body)

export const internalServerError = (error: Error): Output => responseBaseHelper(500, error)
