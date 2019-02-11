import { ICommandDefinition } from "@brightside/imperative";

describe("zos-workflows list-properties definition", () => {
    it ("should not have changed", () => {
        const definition: ICommandDefinition = require("../../../src/cli/properties/Properties.definition").PropertiesDefinition;
        expect(definition).toBeDefined();
        expect(definition.children.length).toBe(1);
        delete definition.children;
        expect(definition).toMatchSnapshot();
    });
});
