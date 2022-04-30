import {Mongo} from 'meteor/mongo'

const COLLECTION_NAME = 'work-experience'

const Collection = new Mongo.Collection(COLLECTION_NAME)

const MethodRequests = {
  FETCH: `${COLLECTION_NAME}.FETCH`,
}

const Methods = {
  [MethodRequests.FETCH]() {
    return Collection.find().fetch()
  },
}

export const WorkExperienceCollection = Collection
export const WorkExperienceMethodRequests = MethodRequests
export const WorkExperienceMethods = Methods
