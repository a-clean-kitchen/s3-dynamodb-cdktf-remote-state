import { Construct } from "constructs";
import { App, TerraformStack, S3Backend } from "cdktf";

import { KMSStack } from "./resources/"

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    // Store the state in the S3 bucket and
    // DynamoDB table created in this stack
    // 
    // Note: It will fail during first run
    // because the bucket and table do not exist yet
    try {
      new S3Backend(this, {
        bucket          : scope.node.tryGetContext("ResourceVars").bucketName,
        key             : "state/terraform.tfstate",
        region          : scope.node.tryGetContext("ResourceVars").region,
        encrypt         : true,
        kmsKeyId        : "alias/terraform-bucket-key",
        dynamodbTable   : "terraform-state"
      })
    } catch (error) {
      console.log(error)
      console.log("Defaulting to local backend")
    };
    
    const kms = new KMSStack(this, "KMSStack");
    
  }
}

const app = new App();
new MyStack(app, "tf-remote-state");
app.synth();
