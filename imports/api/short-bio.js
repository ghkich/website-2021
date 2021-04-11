import {Mongo} from 'meteor/mongo'

const COLLECTION_NAME = 'short-bio'

const Collection = new Mongo.Collection(COLLECTION_NAME)

const MethodRequests = {
  FETCH: `${COLLECTION_NAME}.FETCH`,
}

const Methods = {
  [MethodRequests.FETCH]() {
    return Collection.find().fetch()[0]
  },
}

export const ShortBioCollection = Collection
export const ShortBioMethodRequests = MethodRequests
export const ShortBioMethods = Methods
