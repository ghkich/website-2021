module.exports = {
  app: {
    type: 'aws-beanstalk',
    name: 'personal-website',
    path: '../',
    env: {
      ROOT_URL: 'https://www.gustavokich.com',
      MONGO_URL: process.env.MONGO_URL,
    },
    auth: {
      id: process.env.AWS_MUP_ID,
      secret: process.env.AWS_MUP_SECRET,
    },
    instanceType: 't3a.nano',
    customBeanstalkConfig: [
      {
        namespace: 'aws:autoscaling:updatepolicy:rollingupdate',
        option: 'RollingUpdateEnabled',
        value: 'false',
      },
      {
        namespace: 'aws:ec2:instances',
        option: 'EnableSpot',
        value: 'false',
      },
      {
        namespace: 'aws:elasticbeanstalk:environment',
        option: 'EnvironmentType',
        value: 'SingleInstance',
      },
    ],
  },
  plugins: ['mup-aws-beanstalk'],
}
