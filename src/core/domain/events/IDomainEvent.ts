import { UniqueEntityID } from '../../../core/domain'

export interface IDomainEvent {
  dateTimeOccurred: Date
  getAggregateId: () => UniqueEntityID
}
