export interface ValidatorError {
  hasError: boolean
  errors: Error
}

export interface Validator <T> {
  validate: (params: T) => Promise<ValidatorError>
}
