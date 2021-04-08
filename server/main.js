import {Meteor} from 'meteor/meteor'
import {GitHubMethods} from '../imports/api/github'
import {ExperiencesCollection, ExperiencesMethods} from '/imports/api/experiences'

const EXPERIENCES_DATA = [
  {
    jobTitle: 'Full-stack developer',
    company: 'Pathable',
    startDate: '2021-03-22',
    endDate: null,
    location: 'Toledo, PR',
    keywords: 'meteor,react',
    description:
      'I am currently working in a international team in 5 different projects. Fugiat non proident consectetur labore. Deserunt fugiat tempor elit ex excepteur eu elit deserunt eu occaecat elit ex.',
  },
  {
    jobTitle: 'Front-end developer',
    company: 'Noverde',
    startDate: '2018-02-19',
    endDate: '2020-09-30',
    location: 'São Paulo, SP',
    keywords: 'gatsby,react',
    description:
      'Esse dolore labore laboris irure duis amet magna quis reprehenderit eu. Culpa sit elit nisi consectetur. Nostrud cupidatat nulla fugiat in do consectetur id cupidatat cupidatat. Laborum duis minim exercitation do magna ullamco veniam exercitation pariatur magna reprehenderit.',
  },
  {
    jobTitle: 'Web developer & Designer',
    company: 'Silcom',
    startDate: '2008-03-10',
    endDate: '2017-02-15',
    location: 'Curitiba, PR',
    keywords: 'php,jquery',
    description:
      'Nisi cupidatat cillum minim tempor nostrud officia aliqua dolor fugiat. Sit consequat veniam adipisicing quis ad reprehenderit amet cillum incididunt ullamco aute amet irure adipisicing. Duis sunt minim enim officia cupidatat dolore fugiat eiusmod deserunt et. Quis et do aute elit nostrud.',
  },
]

Meteor.methods({
  ...ExperiencesMethods,
  ...GitHubMethods,
})

Meteor.startup(() => {
  if (ExperiencesCollection.find().count()) return
  EXPERIENCES_DATA.forEach((experience) => ExperiencesCollection.insert(experience))
})
