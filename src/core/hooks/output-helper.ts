import { Output } from '../ports'

const responseBaseHelper = (statusCode: number, body: any): Output<any> => ({
  statusCode,
  body
})

export const ok = (body: any): Output<any> => responseBaseHelper(200, body)

export const created = (body: any): Output<any> => responseBaseHelper(201, body)

export const badRequest = (body: any): Output<any> => responseBaseHelper(400, body)

export const notFound = (body: any): Output<any> => responseBaseHelper(404, body)

export const unauthorized = (body: any): Output<any> => responseBaseHelper(401, body)

export const forbidden = (body: any): Output<any> => responseBaseHelper(403, body)

export const internalServerError = (): Output<any> =>
  responseBaseHelper(500, { error: 'Oops, it is not good. An error occur, I already notified our engineers!' })
