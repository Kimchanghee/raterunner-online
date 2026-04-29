#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import { BaseStaticSiteStack } from '../../../shared/infrastructure/BaseStack';

const app = new App();

new BaseStaticSiteStack(app, 'RateRunnerStack', {
  env: {
    account: process.env.AWS_ACCOUNT_ID,
    region: process.env.AWS_REGION || 'us-east-1',
  },
  domain: 'raterunner.online',
  buildOutputDir: '../.next/standalone',
  languages: ['ko', 'en'],
  description: 'RateRunner — Currency exchange & remittance comparison',
});

app.synth();
