import 'reflect-metadata'
import { expect } from 'chai'
import axios from 'axios'
import { createStubInstance, stub } from 'sinon'

import { CarOnSaleClient } from './CarOnSaleClient'
import { Authentication } from '../../Authentication/classes/Authentication'
import { Logger } from '../../Logger/classes/Logger'
import { baseUrl } from '../../../fixtures'
import { userMock } from '../../../_mocks_/users.mocks'
import { auctionsMock } from '../../../_mocks_/auctions.mocks'

describe('retrieve the list of running auctions', () => {
  let stubLoggerInstance
  let stubAuthenticationInstance
  let stubAxios

  beforeEach(() => {
    stubLoggerInstance = createStubInstance(Logger)
    stubAuthenticationInstance = createStubInstance(Authentication)
    stubAuthenticationInstance.authenticate = () => Promise.resolve(userMock)
    stubAxios = stub(axios, 'get')
    stubAxios.callsFake((url, _args) => {
      if (url === `${baseUrl}/v2/auction/buyer/`) {
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

  it('should return a list of running auctions', async () => {
    const auctions = await new CarOnSaleClient(
      stubLoggerInstance,
      stubAuthenticationInstance
    ).getRunningAuctions()
    expect(auctions)
      .to.be.an.instanceOf(Object)
      .and.that.includes.all.keys('items', 'page', 'total')
      .and.to.have.property('items')
      .and.to.be.an.instanceOf(Array)
      .and.to.have.deep.property('0')
      .and.that.includes.all.keys('numBids', 'minimumRequiredAsk', 'currentHighestBidValue')
      .and.to.have.property('numBids')
      .and.to.equal(0)
    expect(auctions.total).to.equal(2)
  })

  it('should throw an error if request fails', async () => {
    stubAuthenticationInstance.authenticate = () =>
      Promise.reject({ response: { data: { message: 'Request fails' } } })
    await new CarOnSaleClient(stubLoggerInstance, stubAuthenticationInstance)
      .getRunningAuctions()
      .catch((error) => {
        expect(error)
          .to.be.an.instanceOf(Object)
          .and.to.have.property('response')
          .and.to.have.deep.property('data')
          .and.to.have.deep.property('message')
          .and.to.have.equal('Request fails')
      })
  })
})
