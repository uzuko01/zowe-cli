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
        const cmd = "CALL '" + HLQ + "(TSOCESF)' 'D,*ALL,ST=E'";
        const response: IIssueResponse = await IssueTso.issueTsoCommand(
            this.mSession,
            params.arguments.account,
            cmd,
            this.mTsoStart);

        // If requested, suppress the startup
     //   if (!params.arguments.suppressStartupMessages) {
     //       this.console.log(response.startResponse.messages);
     //   }

        const tcpipStatusCodeMapping = new Map();

        // Set entries
        tcpipStatusCodeMapping.set("0001","Get serv by name");
        tcpipStatusCodeMapping.set("0002","Get host by name");
        tcpipStatusCodeMapping.set("0003","Bind session");
        tcpipStatusCodeMapping.set("0067","Bind session timeout");
        tcpipStatusCodeMapping.set("0004","Get socket name");
        tcpipStatusCodeMapping.set("0005","Open file");
        tcpipStatusCodeMapping.set("0069","ESFOPEN failed CC=ss");
        tcpipStatusCodeMapping.set("0006","Receive print job command");
        tcpipStatusCodeMapping.set("0007","Pass 1 - count file length");
        tcpipStatusCodeMapping.set("0008","Get host by address");
        tcpipStatusCodeMapping.set("0009","Pass 2 - send data file");
        tcpipStatusCodeMapping.set("000A","Send data file");
        tcpipStatusCodeMapping.set("000B","Info Status pending");
        tcpipStatusCodeMapping.set("006F","Info Status timeout");
        tcpipStatusCodeMapping.set("000C","Page Status pending");
        tcpipStatusCodeMapping.set("0070","Page Status timeout");
        tcpipStatusCodeMapping.set("000D","Job End pending");
        tcpipStatusCodeMapping.set("0071","Job End timeout");
        tcpipStatusCodeMapping.set("0072","LPR reply timeout");
        tcpipStatusCodeMapping.set("000F","Print Copy End pending");

        const array = response.commandResponse.split("\n");
        let partone = "";
        for (const line of array) {
          if (line.indexOf("PRINTER") > -1) {
            partone = line.slice(line.indexOf("PRINTER") + "PRINTER(TCPIP   ) ".length,line.indexOf("EDRAINED") - "5blnk".length);
          }

          if (line.indexOf("I=") > -1) {
            const statusCode = line.slice(line.indexOf("I=") + "I=".length,line.indexOf("\n"));
            this.console.log(partone + statusCode + " " + tcpipStatusCodeMapping.get(statusCode));
          }

        }

        // Return as an object when using --response-format-json
        this.data.setObj(response);
    }
}
