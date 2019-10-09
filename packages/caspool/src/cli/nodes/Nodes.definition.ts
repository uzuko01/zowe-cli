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
import {
    AddCommandDefinition
} from "./add/AddCommand.definition";
import {
    UpdateCommandDefinition
} from "./update/UpdateCommand.definition";
import {
    DeleteCommandDefinition
} from "./delete/DeleteCommand.definition";

export const Nodes: ICommandDefinition = {
    name: "nodes",
    aliases: ["nd"],
    type: "group",
    summary: "Modify CA Spool Nodes",
    description: "Modify CA Spool Nodes",
    children: [
        AddCommandDefinition,
        UpdateCommandDefinition,
        DeleteCommandDefinition,
    ],
};
