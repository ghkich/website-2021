import {Mongo} from 'meteor/mongo'

const COLLECTION_NAME = 'github'

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
      console.warn('GitHub Collection could not be updated')
      return
    }

    const repos = data.map(({id, name, description, homepage, html_url, pushed_at}) => ({
      id,
      name,
      description,
      homepage,
      htmlUrl: html_url,
      pushedAt: pushed_at,
    }))

    return Collection.upsert(
      {
        _id: id,
      },
      {
        $set: {
          repos,
          updatedAt: new Date(),
        },
      },
    )
  },
}

export const GitHubCollection = Collection
export const GitHubMethodRequests = MethodRequests
export const GitHubMethods = Methods
