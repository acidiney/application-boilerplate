export interface Mapper <Entity, Db>{
  toDomain: (input: Db) => Entity
  toPersistence: (input: Entity) => Db
}
