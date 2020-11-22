export interface IAuction {
  id: number
  currentHighestBidValue: number
  minimumRequiredAsk: number
  numBids: number
  cummulativeBids?: number
  cummulativePercentProgress?: number
}

export interface IAuctions {
  items: IAuction[]
  page: number
  total: number
}

export interface IAggregate {
  avgNumOfBids: number
  avgPercentOfAuctionProgress: number
}
