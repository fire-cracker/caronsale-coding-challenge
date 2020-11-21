import 'reflect-metadata';
import { expect } from 'chai'
import { createStubInstance } from 'sinon'

import { CarOnSaleClient } from './CarOnSaleClient'
import { Authentication } from '../../Authentication/classes/Authentication'
import { Logger } from '../../Logger/classes/Logger'

describe('retrieve the list of running auctions', () => {
  let stubLoggerInstance, stubAuthenticationInstance

  beforeEach(() => {
    stubLoggerInstance = createStubInstance(Logger)
    stubAuthenticationInstance = createStubInstance(Authentication)
    stubAuthenticationInstance.authenticate = () => {
      return(
        Promise.resolve({
          token:'token',
          authenticated: true,
          userId: 'peace@gmail.com',
          internalUserId: 1,
          internalUserUUID: 'ce5e3d7f-3a3d-4fde-96bc-9',
          type: 1,
          privileges: '{PUBLIC_USER}~{SALESMAN_USER}'
        })
      )
    }
    console.log('test>>>>', stubAuthenticationInstance)
  })

  it('should return a list of running auctions if user is authrorised', async() => {
    const user = await new CarOnSaleClient(stubAuthenticationInstance).getRunningAuctions()
  })
})
