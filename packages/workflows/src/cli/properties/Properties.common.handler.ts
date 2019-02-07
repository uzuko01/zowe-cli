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

import { IHandlerParameters, ImperativeError } from "@brightside/imperative";
import { ZosmfBaseHandler } from "../../../../zosmf/src/ZosmfBaseHandler";

/**
 * Common Handler for listing proerties of a workflow instance in z/OSMF in zosworkflows package.
 * This is not something that is intended to be used outside of this npm package.
 */

export default class PropertiesCommonHandler extends ZosmfBaseHandler {
    /**
     * Command line arguments passed
     * @private
     * @type {*}
     * @memberof PropertiesCommonHandler
     */
    private arguments: any;

    /**
     * Command handler process - invoked by the command processor to handle the "zos-workflows list-properties"
     * @param {IHandlerParameters} params - Command handler parameters
     * @returns {Promise<void>} - Fulfilled when the command completes successfully OR rejected with imperative error
     * @memberof PropertiesCommonHandler
     */
    public async processCmd(params: IHandlerParameters): Promise<void> {
        this.arguments = params.arguments;

        let sourceType: string;
        if (this.arguments.workflowKey) {
            sourceType = "workfowKey";
        }

        let resp;
        let error;

        switch (sourceType) {
            case "workfowKey":
                //call API here
                break;

            default:
                throw new ImperativeError({
                    msg: `Internal create error: Unable to determine the the criteria by which to list workflow properties. ` +
                        `Please contact support.`,
                    additionalDetails: JSON.stringify(params)
                });
        }
    }
}
