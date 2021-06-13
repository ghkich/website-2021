import {Meteor} from 'meteor/meteor'
import {WorkExperiencesCollection, WorkExperiencesMethods} from '/imports/api/work-experiences'
import {ShortBioCollection, ShortBioMethods} from '../imports/api/short-bio'
import {GitHubMethods} from '../imports/api/github'
import {SkillsCollection, SkillsMethods} from '../imports/api/skills'
import {WorldMapCollection, WorldMapMethods} from '../imports/api/world-map'
import {BlogMethods} from '../imports/api/blog'
import {WORK_EXPERIENCES_DATA} from '../imports/infra/data/work-experiences'
import {SHORT_BIO_DATA} from '../imports/infra/data/short-bio'
import {SKILLS_DATA} from '../imports/infra/data/skills'
import {WORLD_MAP_DATA} from '../imports/infra/data/world-map'

Meteor.methods({
  ...WorkExperiencesMethods,
  ...GitHubMethods,
  ...ShortBioMethods,
  ...SkillsMethods,
  ...WorldMapMethods,
  ...BlogMethods,
})

Meteor.startup(() => {
  // TODO: improve the way the data is populated / initialized
  if (WorkExperiencesCollection.find().count()) return
  ShortBioCollection.insert(SHORT_BIO_DATA)
  WORK_EXPERIENCES_DATA.forEach((experience) => WorkExperiencesCollection.insert(experience))
  SKILLS_DATA.forEach((skill) => SkillsCollection.insert(skill))
  WORLD_MAP_DATA.forEach((location) => WorldMapCollection.insert(location))
})
