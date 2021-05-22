import {Meteor} from 'meteor/meteor'
import {GitHubMethods} from '../imports/api/github'
import {WorkExperiencesCollection, WorkExperiencesMethods} from '/imports/api/work-experiences'
import {ShortBioCollection, ShortBioMethods} from '../imports/api/short-bio'
import {BlogMethods} from '../imports/api/blog'
import {SHORT_BIO_DATA} from '../imports/infra/data/short-bio'
import {WORK_EXPERIENCES_DATA} from '../imports/infra/data/work-experiences'
import {SkillsCollection, SkillsMethods} from '../imports/api/skills'
import {SKILLS_DATA} from '../imports/infra/data/skills'

Meteor.methods({
  ...WorkExperiencesMethods,
  ...GitHubMethods,
  ...ShortBioMethods,
  ...SkillsMethods,
  ...BlogMethods,
})

Meteor.startup(() => {
  // populate initial data
  if (WorkExperiencesCollection.find().count()) return
  ShortBioCollection.insert(SHORT_BIO_DATA)
  SKILLS_DATA.forEach((skill) => SkillsCollection.insert(skill))
  WORK_EXPERIENCES_DATA.forEach((experience) => WorkExperiencesCollection.insert(experience))
})
