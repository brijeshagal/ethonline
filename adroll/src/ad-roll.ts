import {
  AdDeactivate as AdDeactivateEvent,
  AdPut as AdPutEvent,
  BrokerageWithdrawal as BrokerageWithdrawalEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  PlatformEarning as PlatformEarningEvent,
  PlatformRegistered as PlatformRegisteredEvent,
  ReceivedMessage as ReceivedMessageEvent
} from "../generated/AdRoll/AdRoll"
import {
  AdDeactivate,
  AdPut,
  BrokerageWithdrawal,
  OwnershipTransferred,
  PlatformEarning,
  PlatformRegistered,
  ReceivedMessage
} from "../generated/schema"

export function handleAdDeactivate(event: AdDeactivateEvent): void {
  let entity = new AdDeactivate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.param0 = event.params.param0
  entity.adId = event.params.adId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAdPut(event: AdPutEvent): void {
  let entity = new AdPut(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.advertisor = event.params.advertisor
  entity.adId = event.params.adId
  entity.clicks = event.params.clicks
  entity.impressions = event.params.impressions
  entity.isPermanent = event.params.isPermanent
  entity.param5 = event.params.param5
  entity.cid = event.params.cid
  entity.adName = event.params.adName
  entity.chainId = event.params.chainId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBrokerageWithdrawal(
  event: BrokerageWithdrawalEvent
): void {
  let entity = new BrokerageWithdrawal(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.param0 = event.params.param0

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePlatformEarning(event: PlatformEarningEvent): void {
  let entity = new PlatformEarning(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.platformAddress = event.params.platformAddress
  entity.platformIdx = event.params.platformIdx
  entity.adId = event.params.adId
  entity.activeAdEarning = event.params.activeAdEarning
  entity.totalEarning = event.params.totalEarning

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePlatformRegistered(event: PlatformRegisteredEvent): void {
  let entity = new PlatformRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.platformAddress = event.params.platformAddress
  entity.chainId = event.params.chainId
  entity.platformId = event.params.platformId
  entity.platformName = event.params.platformName

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleReceivedMessage(event: ReceivedMessageEvent): void {
  let entity = new ReceivedMessage(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.origin = event.params.origin
  entity.sender = event.params.sender
  entity.message = event.params.message

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
