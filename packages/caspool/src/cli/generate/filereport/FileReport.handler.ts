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
        const cmd = "CALL '" + HLQ + "(TSOCESF)' 'DF'";
        const response: IIssueResponse = await IssueTso.issueTsoCommand(
            this.mSession,
            params.arguments.account,
            cmd,
            this.mTsoStart);

        const slicedResponse = (response.commandResponse.slice(response.commandResponse.indexOf("*RESPONSES:") + "*RESPONSES:".length
            ,response.commandResponse.indexOf("READY")));

        const responseArray = slicedResponse.split("\n");
        const arr: string[] = [];
        for (let line of responseArray) {
            line = line.slice("10:56:16  ESF7304 ".length,line.indexOf("\n"));
            if(line.includes("SEQNO FILENAME DEST") || line.includes("END-OF-DISPLAY")){
                continue;
            }
            line = line.trim();
            line = line.substr(line.indexOf(" ") + 1);
            line = line.split(" ")[0];
            arr.push(line);
        }
        const arr2: string[] = arr.filter((el, i, a) => i === a.indexOf(el));
        if(arr2.length > 1){
            this.console.log("File,Total");
        }
        arr2.forEach((line) => {
            if(line){
                let num: number = 0;
                arr.forEach((element) => {
                    if(element === line){
                        num += 1;
                    }
                });
                this.console.log(line + "," + num.toString());
            }
        });
        // let partone = "";

          // if (line.indexOf("PRINTER") > -1) {
          //   partone = line.slice(line.indexOf("PRINTER") + "PRINTER(TCPIP   ) ".length,line.indexOf("EDRAINED") - "5blnk".length);
          // }

          // if (line.indexOf("I=") > -1) {
          //   const statusCode = line.slice(line.indexOf("I=") + "I=".length,line.indexOf("\n"));
          //   this.console.log(partone + statusCode);
          // }


        // Return as an object when using --response-format-json
        this.data.setObj(response);
    }
}
