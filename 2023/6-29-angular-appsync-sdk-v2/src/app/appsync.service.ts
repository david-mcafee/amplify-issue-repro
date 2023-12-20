import { Injectable } from '@angular/core';
import AWSAppSyncClient from 'aws-appsync';
import aws_exports from '../aws-exports';
import { AUTH_TYPE } from 'aws-appsync-auth-link';

@Injectable({
  providedIn: 'root',
})
export class AppsyncService {
  hc: any;

  constructor() {
    // Set up AppSync client:
    const client = new AWSAppSyncClient({
      url: aws_exports.aws_appsync_graphqlEndpoint,
      region: aws_exports.aws_project_region,
      auth: {
        type: AUTH_TYPE.API_KEY,
        apiKey: aws_exports.aws_appsync_apiKey,
        // jwtToken: async () => token, // Required when you use Cognito UserPools OR OpenID Connect. Token object is obtained previously
        // credentials: async () => credentials, // Required when you use IAM-based auth.
      },
      disableOffline: true,
    });
    this.hc = client;
  }

  initClient() {
    return this.hc.hydrated();
  }
}
