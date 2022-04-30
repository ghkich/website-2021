import {Meteor} from 'meteor/meteor'
import {WorkExperienceCollection, WorkExperienceMethods} from '/imports/api/work-experience'
import {ShortBioCollection, ShortBioMethods} from '../imports/api/short-bio'
import {GitHubMethods} from '../imports/api/github'
import {SkillsCollection, SkillsMethods} from '../imports/api/skills'
import {WorldMapCollection, WorldMapMethods} from '../imports/api/world-map'
import {BlogMethods} from '../imports/api/blog'
import {WORK_EXPERIENCE_DATA} from '../imports/infra/data/work-experience'
import {SHORT_BIO_DATA} from '../imports/infra/data/short-bio'
import {SKILLS_DATA} from '../imports/infra/data/skills'
import {WORLD_MAP_DATA} from '../imports/infra/data/world-map'

Meteor.methods({
  ...WorkExperienceMethods,
  ...GitHubMethods,
  ...ShortBioMethods,
  ...SkillsMethods,
  ...WorldMapMethods,
  ...BlogMethods,
})

Meteor.startup(() => {
  // TODO: improve the way the data is populated / initialized
  if (WorkExperienceCollection.find().count()) return
  ShortBioCollection.insert(SHORT_BIO_DATA)
  WORK_EXPERIENCE_DATA.forEach((experience) => WorkExperienceCollection.insert(experience))
  SKILLS_DATA.forEach((skill) => SkillsCollection.insert(skill))
  WORLD_MAP_DATA.forEach((location) => WorldMapCollection.insert(location))
})
