import {S3} from "@aws-sdk/client-s3";

const {key, secret, region} = Meteor.settings.private.aws;
const TEN_SECONDS = 10000;
const RETRY_COUNT = 3;

export const s3 = new S3({
  credentials: {
    accessKeyId: key,
    secretAccessKey: secret,
  },
  region: region,
  maxRetries: RETRY_COUNT,
  // sslEnabled: true, // optional
  httpOptions: {
    connectTimeout: TEN_SECONDS,
    timeout: TEN_SECONDS * RETRY_COUNT,
    // agent: false
  }
});
