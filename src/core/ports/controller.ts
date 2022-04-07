import { Input, Output } from './communication'

export interface Controller<T> {
  perform: (input: Input<T>) => Promise<Output>
}
