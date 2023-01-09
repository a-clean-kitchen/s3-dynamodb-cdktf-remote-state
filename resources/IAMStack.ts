import { iamPolicy, iamRole, iamRolePolicyAttachment, } from "@cdktf/provider-aws";
import { Construct } from "constructs";
import { TerraformStack } from "cdktf";

export default class IAMStack extends TerraformStack {
    constructor(scope: Construct, name: string) {
        super(scope, name);

        const role = new iamRole.IamRole(this, "TerraformRemoteStateRole",{
        });

    })
};