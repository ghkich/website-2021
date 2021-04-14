import {Mongo} from 'meteor/mongo'

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
    if (!data) {
      console.warn('Blog Collection could not be updated')
      return
    }

    const posts = data.items?.map(({guid, title, description, categories, link}) => {
      // TODO: improve the following code to get content of first paragraph
      const htmlTagsRemoved = description.replace(/<[^>]+>/g, '')
      const shorterDescription = htmlTagsRemoved.substr(0, 150) + '...'

      return {
        guid,
        title,
        description: shorterDescription,
        categories,
        link,
      }
    })

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
