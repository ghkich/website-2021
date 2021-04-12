import {Mongo} from 'meteor/mongo'
import {shouldUpdateCollection} from '../infra/shouldUpdateCollection'
import {fetchFromExternalApi} from '../infra/fetchFromSource'

const COLLECTION_NAME = 'blog'

const Collection = new Mongo.Collection(COLLECTION_NAME)

const MethodRequests = {
  FETCH: `${COLLECTION_NAME}.FETCH`,
  UPDATE: `${COLLECTION_NAME}.UPDATE`,
}

const Methods = {
  [MethodRequests.FETCH]() {
    return Collection.find().fetch()[0]
  },
  [MethodRequests.UPDATE]({id, data}) {
    const posts = data?.items?.map(({guid, title, description, categories, link}) => ({
      guid,
      title,
      description,
      categories,
      link,
    }))

    Collection.upsert(
      {
        _id: id,
      },
      {
        $set: {
          posts,
          updatedAt: new Date(),
        },
      },
    )
  },
}

export const BlogCollection = Collection
export const BlogMethodRequests = MethodRequests
export const BlogMethods = Methods
