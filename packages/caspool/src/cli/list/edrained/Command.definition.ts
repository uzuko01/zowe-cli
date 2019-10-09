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


export const CommandDefinition: ICommandDefinition = {
    name: "edrained",
    aliases: ["ed"],
    summary: "List the CA Spool edrained nodes",
    description: "List the CA Spool in edrained status",
    type: "command",
    handler: __dirname + "/Command.handler",
    profile: {
        optional: ["zosmf", "tso"],
    },
    /* positionals: [
        {
            name: "commandText",
            type: "string",
            description: "The CA Spool command to issue.",
            required: true,
        },
    ], */
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
            description: 'Issue the CA spool command "DS" to display information.',
            options: "\"DS\"",
        }
    ],
};
