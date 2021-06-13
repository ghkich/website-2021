import {Mongo} from 'meteor/mongo'

const COLLECTION_NAME = 'world-map'

const Collection = new Mongo.Collection(COLLECTION_NAME)

const MethodRequests = {
  FETCH: `${COLLECTION_NAME}.FETCH`,
}

const Methods = {
  [MethodRequests.FETCH]() {
    return Collection.find().fetch()
  },
}

export const WorldMapCollection = Collection
export const WorldMapMethodRequests = MethodRequests
export const WorldMapMethods = Methods
