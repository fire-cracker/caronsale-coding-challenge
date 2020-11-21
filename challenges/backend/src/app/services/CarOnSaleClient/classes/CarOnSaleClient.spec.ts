import 'reflect-metadata'
import { expect } from 'chai'
import axios from 'axios'
import { createStubInstance, stub } from 'sinon'

import { CarOnSaleClient } from './CarOnSaleClient'
import { Authentication } from '../../Authentication/classes/Authentication'
import { Logger } from '../../Logger/classes/Logger'
import config from '../../../helpers/config'
import { userMock, auctionsMock } from '../../../helpers/mocks'

describe('retrieve the list of running auctions', () => {
  let stubLoggerInstance, stubAuthenticationInstance, stubAxios

  beforeEach(() => {
    stubLoggerInstance = createStubInstance(Logger)
    stubAuthenticationInstance = createStubInstance(Authentication)
    stubAuthenticationInstance.authenticate = () => Promise.resolve(userMock)
    stubAxios = stub(axios, 'get')
    stubAxios.callsFake((url, _args) => {
      if (url === `${config.baseUrl}/v2/auction/buyer/`) {
        return Promise.resolve({
          data: auctionsMock
        })
      }
      return Promise.resolve()
    })
  })

  afterEach(() => {
    stubAxios.restore()
  })

  it('should return a list of running auctions if user is authrorised', async () => {
    const auctions = await new CarOnSaleClient(
      stubLoggerInstance,
      stubAuthenticationInstance
    ).getRunningAuctions()
    expect(auctions)
      .to.be.an.instanceOf(Object)
      .and.that.includes.all.keys('auctions', 'numOfAuctions')
      .and.to.have.property('auctions')
      .and.to.be.an.instanceOf(Array)
      .and.to.have.deep.property('0')
      .and.that.includes.all.keys('numBids', 'percentageOfAuctionProgress')
      .and.to.have.property('numBids')
      .and.to.equal(0)
      expect(auctions.numOfAuctions).to.equal(2)
  })
})
