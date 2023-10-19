import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  AdDeactivate,
  AdPut,
  BrokerageWithdrawal,
  OwnershipTransferred,
  PlatformEarning,
  PlatformRegistered,
  ReceivedMessage
} from "../generated/AdRoll/AdRoll"

export function createAdDeactivateEvent(
  param0: Address,
  adId: BigInt
): AdDeactivate {
  let adDeactivateEvent = changetype<AdDeactivate>(newMockEvent())

  adDeactivateEvent.parameters = new Array()

  adDeactivateEvent.parameters.push(
    new ethereum.EventParam("param0", ethereum.Value.fromAddress(param0))
  )
  adDeactivateEvent.parameters.push(
    new ethereum.EventParam("adId", ethereum.Value.fromUnsignedBigInt(adId))
  )

  return adDeactivateEvent
}

export function createAdPutEvent(
  advertisor: Address,
  adId: BigInt,
  clicks: BigInt,
  impressions: BigInt,
  isPermanent: boolean,
  param5: i32,
  cid: string,
  adName: string,
  chainId: BigInt
): AdPut {
  let adPutEvent = changetype<AdPut>(newMockEvent())

  adPutEvent.parameters = new Array()

  adPutEvent.parameters.push(
    new ethereum.EventParam(
      "advertisor",
      ethereum.Value.fromAddress(advertisor)
    )
  )
  adPutEvent.parameters.push(
    new ethereum.EventParam("adId", ethereum.Value.fromUnsignedBigInt(adId))
  )
  adPutEvent.parameters.push(
    new ethereum.EventParam("clicks", ethereum.Value.fromUnsignedBigInt(clicks))
  )
  adPutEvent.parameters.push(
    new ethereum.EventParam(
      "impressions",
      ethereum.Value.fromUnsignedBigInt(impressions)
    )
  )
  adPutEvent.parameters.push(
    new ethereum.EventParam(
      "isPermanent",
      ethereum.Value.fromBoolean(isPermanent)
    )
  )
  adPutEvent.parameters.push(
    new ethereum.EventParam(
      "param5",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(param5))
    )
  )
  adPutEvent.parameters.push(
    new ethereum.EventParam("cid", ethereum.Value.fromString(cid))
  )
  adPutEvent.parameters.push(
    new ethereum.EventParam("adName", ethereum.Value.fromString(adName))
  )
  adPutEvent.parameters.push(
    new ethereum.EventParam(
      "chainId",
      ethereum.Value.fromUnsignedBigInt(chainId)
    )
  )

  return adPutEvent
}

export function createBrokerageWithdrawalEvent(
  param0: BigInt
): BrokerageWithdrawal {
  let brokerageWithdrawalEvent = changetype<BrokerageWithdrawal>(newMockEvent())

  brokerageWithdrawalEvent.parameters = new Array()

  brokerageWithdrawalEvent.parameters.push(
    new ethereum.EventParam("param0", ethereum.Value.fromUnsignedBigInt(param0))
  )

  return brokerageWithdrawalEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPlatformEarningEvent(
  platformAddress: Address,
  platformIdx: BigInt,
  adId: BigInt,
  activeAdEarning: BigInt,
  totalEarning: BigInt
): PlatformEarning {
  let platformEarningEvent = changetype<PlatformEarning>(newMockEvent())

  platformEarningEvent.parameters = new Array()

  platformEarningEvent.parameters.push(
    new ethereum.EventParam(
      "platformAddress",
      ethereum.Value.fromAddress(platformAddress)
    )
  )
  platformEarningEvent.parameters.push(
    new ethereum.EventParam(
      "platformIdx",
      ethereum.Value.fromUnsignedBigInt(platformIdx)
    )
  )
  platformEarningEvent.parameters.push(
    new ethereum.EventParam("adId", ethereum.Value.fromUnsignedBigInt(adId))
  )
  platformEarningEvent.parameters.push(
    new ethereum.EventParam(
      "activeAdEarning",
      ethereum.Value.fromUnsignedBigInt(activeAdEarning)
    )
  )
  platformEarningEvent.parameters.push(
    new ethereum.EventParam(
      "totalEarning",
      ethereum.Value.fromUnsignedBigInt(totalEarning)
    )
  )

  return platformEarningEvent
}

export function createPlatformRegisteredEvent(
  platformAddress: Address,
  chainId: BigInt,
  platformId: BigInt,
  platformName: string
): PlatformRegistered {
  let platformRegisteredEvent = changetype<PlatformRegistered>(newMockEvent())

  platformRegisteredEvent.parameters = new Array()

  platformRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "platformAddress",
      ethereum.Value.fromAddress(platformAddress)
    )
  )
  platformRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "chainId",
      ethereum.Value.fromUnsignedBigInt(chainId)
    )
  )
  platformRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "platformId",
      ethereum.Value.fromUnsignedBigInt(platformId)
    )
  )
  platformRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "platformName",
      ethereum.Value.fromString(platformName)
    )
  )

  return platformRegisteredEvent
}

export function createReceivedMessageEvent(
  origin: BigInt,
  sender: Bytes,
  message: string
): ReceivedMessage {
  let receivedMessageEvent = changetype<ReceivedMessage>(newMockEvent())

  receivedMessageEvent.parameters = new Array()

  receivedMessageEvent.parameters.push(
    new ethereum.EventParam("origin", ethereum.Value.fromUnsignedBigInt(origin))
  )
  receivedMessageEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromFixedBytes(sender))
  )
  receivedMessageEvent.parameters.push(
    new ethereum.EventParam("message", ethereum.Value.fromString(message))
  )

  return receivedMessageEvent
}
