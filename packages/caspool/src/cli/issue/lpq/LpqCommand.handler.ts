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
import { HLQ } from "../../CaSpool.constants";

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
        const cmd = "CALL '" + HLQ + "(TSOCESF)' 'D," + params.arguments.nodeName + "'";
        const response: IIssueResponse = await IssueTso.issueTsoCommand(
            this.mSession,
            params.arguments.account,
            cmd,
            this.mTsoStart);


        // If requested, suppress the startup
        /* if (!params.arguments.suppressStartupMessages) {
            this.console.log(response.startResponse.messages);
        } */
        /*         const slicedResponse = (response.commandResponse.slice(response.commandResponse.indexOf("*RESPONSES:") + "*RESPONSES:".length
                   ,response.commandResponse.indexOf("READY"))); */

        const responseArray = response.commandResponse.split("\n");

        const nodeName = params.arguments.nodeName;
        let nodeIP = "127.0.0.1";
        let remotePrinterName = "lpt1";

        for (const line of responseArray) {
            if (line.indexOf("TCPIP=") > -1) {
                nodeIP = line.slice(line.indexOf("TCPIP=") + "TCPIP=".length, line.indexOf("\n"));
                this.console.log("Issuing LPQ against node: " + nodeName +"\n" + "Node IP: " + nodeIP);
            }
            if (line.indexOf("TCPPRT=") > -1) {
                remotePrinterName = line.slice(line.indexOf("TCPPRT=") + "TCPPRT=".length, line.indexOf("\n"));
                this.console.log("Remote Printer Name: " + remotePrinterName + "\n");

                const lpqCmd = "LPQ (PRINTER " + remotePrinterName + " HOST " + nodeIP + "  ALL";

                const lpqResponse: IIssueResponse = await IssueTso.issueTsoCommand(
                    this.mSession,
                    params.arguments.account,
                    lpqCmd,
                    this.mTsoStart);

                this.console.log(lpqResponse.commandResponse.replace("READY",""));
            }
        }
    }

    // Return as an object when using --response-format-json
    // this.data.setObj(response);
}
