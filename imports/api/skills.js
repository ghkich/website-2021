import {Mongo} from 'meteor/mongo'

const COLLECTION_NAME = 'skills'

const Collection = new Mongo.Collection(COLLECTION_NAME)

const MethodRequests = {
  FETCH: `${COLLECTION_NAME}.FETCH`,
}

const Methods = {
  [MethodRequests.FETCH]() {
    return Collection.find().fetch()
  },
}

export const SkillsCollection = Collection
export const SkillsMethodRequests = MethodRequests
export const SkillsMethods = Methods
