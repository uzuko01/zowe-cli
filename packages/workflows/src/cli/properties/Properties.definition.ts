/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright Contributors to the Zowe Project.
*
*/

import { ICommandDefinition } from "@brightside/imperative";
import { WorkflowKey } from "./workflowkey/WorkflowKey.definition";


/**
 * This object defines the command to list workflow properties group within zosworkflows. This is not
 * something that is intended to be used outside of this npm package.
 *
 * @private
 */
export const PropertiesDefinition: ICommandDefinition = {
    name: "list-properties",
    aliases: ["lp"],
    type: "group",
    description: "Get the properties of a workflow instance in z/OSMF",
    children: [
        WorkflowKey
    ]
};
