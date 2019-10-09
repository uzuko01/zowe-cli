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

import { ICommandDefinition, ICommandOptionDefinition } from "@brightside/imperative";
import { TSO_PROFILE_OPTIONS } from "../../../../../zostso/src/cli/constants/ZosTso.constants";

export const UpdateCommandDefinition: ICommandDefinition = {
    name: "update",
    aliases: ["mod"],
    summary: "Dynamically Update CA Spool Node Parameters",
    description: "Dynamically Update CA Spool Node Parameters",
    type: "command",
    handler: __dirname + "/UpdateCommand.handler",
    profile: {
        optional: ["zosmf", "tso"],
    },
    positionals: [
        {
            name: "nodeParms",
            type: "string",
            description: "Specify the CA Spool node parameters to modify.",
            required: true,
        },
    ],
    options: ([
        {
            name: "suppress-startup-messages",
            aliases: ["ssm"],
            type: "boolean",
            description: "Suppress console messages from start of address space."
        }
    ] as ICommandOptionDefinition[]).concat(TSO_PROFILE_OPTIONS),
    examples: [
        {
            description: 'Issue command "node update HACK,Q=ABC" to update parameters of HACK node',
            options: "\"HACK,Q=ABC\"",
        }
    ],
};
