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

export const AddCommandDefinition: ICommandDefinition = {
    name: "add",
    aliases: [""],
    summary: "Add Node to CA Spool",
    description: "Add Node to CA Spool",
    type: "command",
    handler: __dirname + "/AddCommand.handler",
    profile: {
        optional: ["zosmf", "tso"],
    },
    positionals: [
        {
            name: "nodeParms",
            type: "string",
            description: "Specify the CA Spool node definition parameters.",
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
            description: 'Issue command "node add HACK,JES" to add HACK node',
            options: "\"HACK,JES\"",
        }
    ],
};
