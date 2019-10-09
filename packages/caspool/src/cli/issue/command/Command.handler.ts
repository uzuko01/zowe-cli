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

import { IHandlerParameters } from "@brightside/imperative";
import { IIssueResponse, IssueTso } from "../../../../../zostso";
import { ZosTsoBaseHandler } from "../../../../../zostso/src/ZosTsoBaseHandler";
import { HLQ } from "../../CASpool.constants";

/**
 * Handler to issue command to TSO address space
 * @export
 * @class Handler
 * @implements {ICommandHandler}
 */
export default class Handler extends ZosTsoBaseHandler {

    // Process the command and produce the TSO response
    public async processCmd(params: IHandlerParameters) {

        // Issue the TSO command
        const cmd = "CALL '" + HLQ + "(TSOCESF)' '" + params.arguments.commandText + "'";
        const response: IIssueResponse = await IssueTso.issueTsoCommand(
            this.mSession,
            params.arguments.account,
            cmd,
            this.mTsoStart);

        // If requested, suppress the startup
        /* if (!params.arguments.suppressStartupMessages) {
            this.console.log(response.startResponse.messages);
        } */
        const slicedResponse = (response.commandResponse.slice(response.commandResponse.indexOf("*RESPONSES:") + "*RESPONSES:".length
           ,response.commandResponse.indexOf("READY")));

        const responseArray = slicedResponse.split("\n");

        for (const line of responseArray) {
                this.console.log(line.slice("10:56:16  ESF7304 ".length,line.indexOf("\n")));
            }
        }

        // Return as an object when using --response-format-json
        // this.data.setObj(response);
}
