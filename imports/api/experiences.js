import {Mongo} from 'meteor/mongo'

const COLLECTION_NAME = 'experiences'

const Collection = new Mongo.Collection(COLLECTION_NAME)

const MethodRequests = {
  FETCH: `${COLLECTION_NAME}.FETCH`,
}

const Methods = {
  [MethodRequests.FETCH]() {
    return Collection.find().fetch()
  },
}

export const ExperiencesCollection = Collection
export const ExperiencesMethodRequests = MethodRequests
export const ExperiencesMethods = Methods
