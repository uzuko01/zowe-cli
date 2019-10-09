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
import { IIssueResponse, IssueTso, PingTso } from "../../../../../zostso";
import { ZosTsoBaseHandler } from "../../../../../zostso/src/ZosTsoBaseHandler";
import { DsDefinition } from "../../../../../zosfiles/src/cli/delete/ds/Ds.definition";
import { HLQ } from "../../CaSpool.constants";
import { notDeepStrictEqual } from "assert";


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
        const cmd = "CALL '" + HLQ + "(TSOCESF)' 'D,*ALL,ST=E' ";
        const response: IIssueResponse = await IssueTso.issueTsoCommand(
            this.mSession,
            params.arguments.account,
            cmd,
            this.mTsoStart);

        // If requested, suppress the startup
        /* if (!params.arguments.suppressStartupMessages) {
            this.console.log(response.startResponse.messages);
        } */

        const responseArray = response.commandResponse.split("\n");

        let nodeName = "none";
        let nodeIP = "127.0.0.1";

        for (const line of responseArray) {
            if (line.indexOf("PRINTER") > -1) {
                nodeName = line.slice(line.indexOf("PRINTER") + "PRINTER(TYPE    ) ".length,
                line.indexOf("PRINTER") + "PRINTER(TYPE    ) NODENAME".length);
                this.console.log(nodeName);
            }
            if (line.indexOf("TCPIP=") > -1) {
                nodeIP = line.slice(line.indexOf("TCPIP=") + "TCPIP=".length,line.indexOf("\n"));
                this.console.log(nodeIP);

                const pingCmd = "ping " + nodeIP;

                const pingResponse: IIssueResponse = await IssueTso.issueTsoCommand(
                    this.mSession,
                    params.arguments.account,
                    pingCmd,
                    this.mTsoStart);

                this.console.log(pingResponse.commandResponse);
            }
        }

        // this.console.log(response.commandResponse);


        // Return as an object when using --response-format-json
        this.data.setObj(response);
    }
}
