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
import { FileReport } from "./filereport/Filereport.definition";


export const Generate: ICommandDefinition = {
    name: "generate",
    aliases: ["gen"],
    type: "group",
    summary: "Generate CA Spool Reports.",
    description: "Generate CA Spool Reports.",
    children: [
        FileReport
    ],
};
