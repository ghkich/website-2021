import {Meteor} from 'meteor/meteor'
import {GitHubMethods} from '../imports/api/github'
import {WorkExperiencesCollection, WorkExperiencesMethods} from '/imports/api/work-experiences'
import {ShortBioCollection, ShortBioMethods} from '../imports/api/short-bio'
import {ContactInfoCollection, ContactInfoMethods} from '../imports/api/contact-info'
import {BlogMethods} from '../imports/api/blog'

const WORK_EXPERIENCES_DATA = [
  {
    jobTitle: 'Full-stack developer',
    company: 'Pathable',
    startDate: '2021-03-22',
    endDate: null,
    location: 'Toledo, PR',
    keywords: ['meteor', 'react'],
    description:
      'I am currently working in a international team in 5 different projects. Fugiat non proident consectetur labore. Deserunt fugiat tempor elit ex excepteur eu elit deserunt eu occaecat elit ex.',
  },
  {
    jobTitle: 'Front-end developer',
    company: 'Noverde',
    startDate: '2018-02-19',
    endDate: '2020-09-30',
    location: 'São Paulo, SP',
    keywords: ['gatsby', 'react'],
    description:
      'Esse dolore labore laboris irure duis amet magna quis reprehenderit eu. Culpa sit elit nisi consectetur. Nostrud cupidatat nulla fugiat in do consectetur id cupidatat cupidatat. Laborum duis minim exercitation do magna ullamco veniam exercitation pariatur magna reprehenderit.',
  },
  {
    jobTitle: 'Web developer & Designer',
    company: 'Silcom',
    startDate: '2008-03-10',
    endDate: '2017-02-15',
    location: 'Curitiba, PR',
    keywords: ['php', 'jquery'],
    description:
      'Nisi cupidatat cillum minim tempor nostrud officia aliqua dolor fugiat. Sit consequat veniam adipisicing quis ad reprehenderit amet cillum incididunt ullamco aute amet irure adipisicing. Duis sunt minim enim officia cupidatat dolore fugiat eiusmod deserunt et. Quis et do aute elit nostrud.',
  },
]

const SHORT_BIO_DATA = {
  name: 'Gustavo Henrique Kich',
  birthdate: '1989-05-06',
  description:
    'Nisi cupidatat cillum minim tempor nostrud officia aliqua dolor fugiat. Sit consequat veniam adipisicing quis ad reprehenderit amet cillum incididunt ullamco aute amet irure adipisicing. Duis sunt minim enim officia cupidatat dolore fugiat eiusmod deserunt et. Quis et do aute elit nostrud.',
  keywords: ['gaming', 'traveling', 'coffee', 'animes'],
}

const CONTACT_INFO_DATA = {
  phone: '+55 41 99997-9819',
  email: 'gh.kich@gmail.com',
  networks: [
    {
      code: 'github',
      name: 'GitHub',
      url: 'https://github.com/ghkich',
    },
    {
      code: 'linkedin',
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/ghkich',
    },
    {
      code: 'instagram',
      name: 'Instagram',
      url: 'https://www.instagram.com/gustavo.kich',
    },
  ],
}

Meteor.methods({
  ...WorkExperiencesMethods,
  ...GitHubMethods,
  ...ShortBioMethods,
  ...ContactInfoMethods,
  ...BlogMethods,
})

Meteor.startup(() => {
  if (WorkExperiencesCollection.find().count()) return
  ShortBioCollection.insert(SHORT_BIO_DATA)
  ContactInfoCollection.insert(CONTACT_INFO_DATA)
  WORK_EXPERIENCES_DATA.forEach((experience) => WorkExperiencesCollection.insert(experience))
})
