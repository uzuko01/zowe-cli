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
        const cmd = "CALL '" + HLQ + "(TSOCESF)' 'D,*ALL,P'";
        const response: IIssueResponse = await IssueTso.issueTsoCommand(
            this.mSession,
            params.arguments.account,
            cmd,
            this.mTsoStart);

        // Command response
        // const slicedResponse = (response.commandResponse.slice(response.commandResponse.indexOf("*RESPONSES:") +
        // "*RESPONSES:".length, response.commandResponse.indexOf("READY")));
        // const responseArray = slicedResponse.split("\n");
        // const header = "Node Name,Device Type,Device Status,Network Group,Form,FCB,Output Class,ASM,PM,SEP,RM,TRANS," +
        //               "IP Code,ALIAS,NJE,C-Form,Lines,Pages,TCPIP,TCPPRT,Location,OUTLIM,TRANSFRM,DRIVPRM1,DRIVPRM2,DRIVPRM3,DRIVPRM4";
        const header = "Node Name;Device Type;Device Status;Network Group;Form;" +
                       "ALIAS;NJE;C-Form;Lines;Pages;TCPIP;TCPPRT;Location;TRANSFRM;OUTLIM";
        let nodeName = "";
        let device = "";
        // const type = "";
        let deviceStatus = "";
        let networkGroup = "";
        let form = "";
        // const fcb = "";
        // const outputClass = "";
        // const asm = "";
        // const pm = "";
        // const sep = "";
        // const rm = "";
        // const trans = "";
        // const ipCode = "";
        let alias = "";
        let nje = "";
        let cForm = "";
        let lines = "";
        let pages = "";
        let tcpip = "";
        let tcpprt = "";
        let location = "";
        let outlim = "";
        let transfrm = "";
        // const drivprm1 = "";
        // const drivprm2 = "";
        // const drivprm3 = "";
        // const drivprm4 = "";

       // this.console.log(header);
       // let valueArray: string[] = [];

        const responseArray = response.commandResponse.split("\n");

        for (const line of responseArray) {
          if (line.indexOf("PRINTER") > -1) {
            if (device === ""){
                this.console.log(header);
            } else {
                this.console.log(nodeName.trim() + "\;" + device.trim() + "\;" + deviceStatus.trim() + "\;" +
                networkGroup.trim() + "\;" + form.trim() + "\;" +
                alias.trim() + "\;" + nje.trim() + "\;" + cForm.trim() + "\;" + lines.trim() + "\;" + pages.trim() +
                "\;" + tcpip.trim() + "\;" + tcpprt.trim() + "\;" +
                location.trim() + "\;" + transfrm.trim() + "\;" + outlim.trim() + "\;");
            }
            device = line.slice(line.indexOf("PRINTER(") + "PRINTER(".length,line.indexOf(")")) ;
            nodeName = line.slice(line.indexOf(") ") + ") ".length,line.indexOf(") ") + ") nodename".length) ;
            deviceStatus = line.slice(line.indexOf(") ") + ") nodename".length,line.indexOf("G=")) ;
            networkGroup = line.slice(line.indexOf("G=") + "G=".length,line.indexOf("\n")) ;
          }
          if (line.indexOf("F=") > -1) {
            form = line.slice(line.indexOf("F=") + "F=".length,line.indexOf("C=")) ;
          }
          if (line.indexOf("ALIAS:") > -1) {
            alias = line.slice(line.indexOf("ALIAS:") + "ALIAS:".length,line.indexOf("N=")) ;
            nje = line.slice(line.indexOf("N=") + "N=".length,line.indexOf("F8=")) ;
            cForm = line.slice(line.indexOf("F8=") + "F8=".length,line.indexOf("\n")) ;
          }
          if (line.indexOf("LINES:") > -1) {
            lines = line.slice(line.indexOf("LINES:") + "LINES:".length,line.indexOf("\n")) ;
          }
          if (line.indexOf("PAGES:") > -1) {
            pages = line.slice(line.indexOf("PAGES:") + "PAGES:".length,line.indexOf("\n")) ;
          }
          if (line.indexOf("TCPIP=") > -1) {
            tcpip = line.slice(line.indexOf("TCPIP=") + "TCPIP=".length,line.indexOf("\n")) ;
          }
          if (line.indexOf("TCPPRT=") > -1) {
            tcpprt = line.slice(line.indexOf("TCPPRT=") + "TCPPRT=".length,line.indexOf("\n")) ;
          }
          if (line.indexOf("LOCATION=") > -1) {
            location = line.slice(line.indexOf("LOCATION=") + "LOCATION=".length,line.indexOf("OUTLIM=")) ;
            outlim = line.slice(line.indexOf("OUTLIM=") + "OUTLIM=".length,line.indexOf("\n")) ;
          }
          if (line.indexOf("TRANSFRM=") > -1) {
            transfrm = line.slice(line.indexOf("TRANSFRM=") + "TRANSFRM=".length,line.indexOf("\n")) ;
          }
        //   if (line.indexOf("DRIVPRM1=") > -1) {
        //     drivprm1 = line.slice(line.indexOf("DRIVPRM1=") + "DRIVPRM1=".length,line.indexOf("\n")) ;
        //   }
        //   if (line.indexOf("DRIVPRM2=") > -1) {
        //     drivprm1 = line.slice(line.indexOf("DRIVPRM2=") + "DRIVPRM2=".length,line.indexOf("\n")) ;
        //   }
        //   if (line.indexOf("DRIVPRM3=") > -1) {
        //     drivprm1 = line.slice(line.indexOf("DRIVPRM3=") + "DRIVPRM3=".length,line.indexOf("\n")) ;
        //   }
        //   if (line.indexOf("DRIVPRM4=") > -1) {
        //     drivprm1 = line.slice(line.indexOf("DRIVPRM4=") + "DRIVPRM4=".length,line.indexOf("\n")) ;
        //   }

        //   if (line.indexOf(") ") > -1) {
        //     valueArray[2] = line.slice(line.indexOf("PRINTER(") + "PRINTER(".length,line.indexOf(")")) ;
        //   }

          if (line.indexOf("READY") > -1) {
           // const statusCode = line.slice(line.indexOf("I=") + "I=".length,line.indexOf("\n"));
            this.console.log(nodeName.trim() + "\;" + device.trim() + "\;" + deviceStatus.trim() + "\;" + networkGroup.trim() +
            "\;" + + form.trim() + "\;" +
            alias.trim() + "\;" + nje.trim() + "\;" + cForm.trim() + "\;" + lines.trim() + "\;" + pages.trim() + "\;" +
            tcpip.trim() + "\;" + tcpprt.trim() + "\;" +
            location.trim() + "\;" + transfrm.trim() + "\;" +
            outlim.trim() + "\;");
          }

        }

        // for (const line of responseArray) {
        //      this.console.log(line.slice("10:56:16  ESF7304 ".length,line.indexOf("\n")));
        //  }
        // Return as an object when using --response-format-json
        this.data.setObj(response);
    }
}
