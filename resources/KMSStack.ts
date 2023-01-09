import { kmsKey, kmsAlias } from "@cdktf/provider-aws";
import { Construct } from "constructs";
import { TerraformStack } from "cdktf";

export default class KMSStack extends TerraformStack {
    constructor(scope: Construct, name: string) {
        super(scope, name);

        const key = new kmsKey.KmsKey(this, "TFStateKey", {
            description: "Key for encrypting Terraform Remote State Bucket",
            deletionWindowInDays: 10,
            enableKeyRotation: true
        });

        const alias = new kmsAlias.KmsAlias(this, "TFStateKeyAlias", {
            name: "alias/terraform-bucket-key",
            targetKeyId: key.id,
        });

    }
}