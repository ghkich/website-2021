import {Mongo} from 'meteor/mongo'

const COLLECTION_NAME = 'work-experiences'

const Collection = new Mongo.Collection(COLLECTION_NAME)

const MethodRequests = {
  FETCH: `${COLLECTION_NAME}.FETCH`,
}

const Methods = {
  [MethodRequests.FETCH]() {
    return Collection.find().fetch()
  },
}

export const WorkExperiencesCollection = Collection
export const WorkExperiencesMethodRequests = MethodRequests
export const WorkExperiencesMethods = Methods
