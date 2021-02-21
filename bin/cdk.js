const cdk = require('@aws-cdk/core');
const dynamodb = require('@aws-cdk/aws-dynamodb');


class DynamoStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // https://docs.aws.amazon.com/cdk/api/latest/docs/aws-dynamodb-readme.html
    // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadWriteCapacityMode.html
    new dynamodb.Table(this, 'Player', {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST, // Use on-demand billing mode
      // sortKey: { name: "id", type: dynamodb.AttributeType.STRING },
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
    });
  }
}


const app = new cdk.App();
new DynamoStack(app, 'DynamoStack');// todo change to bedder next time
