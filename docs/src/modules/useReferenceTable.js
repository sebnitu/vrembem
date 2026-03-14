import { ReferenceTable } from "./ReferenceTable";
import { attrConfig } from "@vrembem/core";

let referenceTable = null;

if (typeof window !== "undefined") {
  referenceTable = new ReferenceTable({
    plugins: [attrConfig()]
  });
  window["referenceTable"] = await referenceTable.mount();
}

export { referenceTable };
