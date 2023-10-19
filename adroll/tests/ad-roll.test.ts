import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { AdDeactivate } from "../generated/schema"
import { AdDeactivate as AdDeactivateEvent } from "../generated/AdRoll/AdRoll"
import { handleAdDeactivate } from "../src/ad-roll"
import { createAdDeactivateEvent } from "./ad-roll-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let param0 = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let adId = BigInt.fromI32(234)
    let newAdDeactivateEvent = createAdDeactivateEvent(param0, adId)
    handleAdDeactivate(newAdDeactivateEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AdDeactivate created and stored", () => {
    assert.entityCount("AdDeactivate", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AdDeactivate",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "param0",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AdDeactivate",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "adId",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
