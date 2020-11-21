export const userMock = {
  token:'token',
  authenticated: true,
  userId: 'peace@gmail.com',
  internalUserId: 1,
  internalUserUUID: 'ce5e3d7f-3a3d-4fde-96bc',
  type: 1,
  privileges: '{PUBLIC_USER}~{SALESMAN_USER}'
}

export const auctionsMock = {
  "items": [
      {
          "id": 14646,
          "label": "Opel Corsa Edition [DE - LimS3 1.2 EU4, Edition, 2006 - 2010] test",
          "endingTime": "2020-11-23T11:00:00.000Z",
          "state": 2,
          "minimumRequiredAsk": 700,
          "currentHighestBidValue": 0,
          "numBids": 0
      },
      {
          "id": 14483,
          "label": "Abarth 500 595 Turismo [DE - LimS3 1.4 T-Jet 16V EU5, Turismo, 2012 - 2013]",
          "endingTime": "2020-11-25T11:00:00.000Z",
          "state": 2,
          "minimumRequiredAsk": 1000,
          "currentHighestBidValue": 0,
          "numBids": 0
      }
  ],
  "page": 1,
  "total": 2
}