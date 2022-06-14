import { CaptureErrorDecorator } from './capture-errors-decorator'
import { Controller, Input, Output } from '@core/ports'
import { internalServerError, ok } from '@core/hooks'

interface SutType {
  sut: CaptureErrorDecorator<any, any>
  controllerStub: Controller<any, any>
}

const makeSut = (): SutType => {
  class ControllerStub implements Controller<any, any> {
    async perform (_input: Input<any>): Promise<Output<any>> {
      return Promise.resolve(ok('valid_response'))
    }
  }

  const controllerStub = new ControllerStub()

  const sut = new CaptureErrorDecorator(controllerStub, {
    description: 'test-propose',
    operation: 'test-propose'
  })

  return { sut, controllerStub }
}

describe('Capture Error Decorator', () => {
  it('should returns internalServerError when controller throws', async () => {
    const { sut, controllerStub } = makeSut()

    jest.spyOn(controllerStub, 'perform').mockReturnValueOnce(Promise.reject(new Error()))

    const output = sut.perform({})

    expect(await output).toEqual(internalServerError())
  })

  it('should returns ok when controller succeed', async () => {
    const { sut } = makeSut()

    const output = await sut.perform({})

    expect(output).toEqual(ok('valid_response'))
  })
})
