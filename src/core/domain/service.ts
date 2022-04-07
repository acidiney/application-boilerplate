export interface Service<O> {
  perform: () => Promise<O>
}
