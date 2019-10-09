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

export const PingCommandDefinition: ICommandDefinition = {
    name: "ping",
    aliases: ["pg"],
    summary: "Issue ping to a CA Spool node",
    description: "Issue ping to a CA Spool node",
    type: "command",
    handler: __dirname + "/PingCommand.handler",
    profile: {
        optional: ["zosmf", "tso"],
    },
    positionals: [
        {
            name: "nodeName",
            type: "string",
            description: "Target CA Spool node name.",
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
            description: "Issue the PING against CA spool node PRINT01 to display information.",
            options: "PRINT01",
        }
    ],
};
