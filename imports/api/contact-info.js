import {Mongo} from 'meteor/mongo'

const COLLECTION_NAME = 'contact-info'

const Collection = new Mongo.Collection(COLLECTION_NAME)

const MethodRequests = {
  FETCH: `${COLLECTION_NAME}.FETCH`,
}

const Methods = {
  [MethodRequests.FETCH]() {
    return Collection.find().fetch()[0]
  },
}

export const ContactInfoCollection = Collection
export const ContactInfoMethodRequests = MethodRequests
export const ContactInfoMethods = Methods
