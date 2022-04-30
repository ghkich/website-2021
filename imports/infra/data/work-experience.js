import {KeywordTypes} from '../../ui/components/KeywordIcon'

export const WORK_EXPERIENCE_DATA = [
  {
    jobTitle: 'Full-stack developer',
    company: 'Pathable',
    website: 'https://www.pathable.com',
    startDate: '2021-02-22',
    endDate: '2022-01-01',
    location: 'Toledo, PR',
    keywords: [KeywordTypes.METEOR, KeywordTypes.REACT],
    description:
      'I was working remotely in an agile international team. We were mainly using MeteorJS which I find amazing for full-stack development. I also had the opportunity to be the lead developer in one of the last features assigned to our team.',
  },
  {
    jobTitle: 'Front-end developer',
    company: 'Noverde',
    website: 'https://www.noverde.com.br',
    startDate: '2018-02-19',
    endDate: '2020-09-30',
    location: 'São Paulo, SP',
    keywords: [KeywordTypes.GATSBY, KeywordTypes.REACT],
    description:
      'I was mainly working with front-end stuff, but we were a fintech startup, sometimes we would change roles and help each other. My final task was to code the new UI of the app while the team were migrating our monolithic architecture to microservices with AWS (Lambdas, Step Functions and API Gateways).',
  },
  {
    jobTitle: 'Web developer & Designer',
    company: 'Silcom',
    website: 'https://www.silcom.com.br',
    startDate: '2008-03-10',
    endDate: '2017-02-15',
    location: 'Curitiba, PR',
    keywords: [KeywordTypes.PHP, KeywordTypes.JQUERY],
    description:
      "This was my first job in a tech company. Back then, I didn't know much about coding. I started as a Designer and slowly move towards a developer role. I helped design and develop a PPC (Production Planning and Control) system from scratch. That was fun and I learned a lot in the process.",
  },
]
