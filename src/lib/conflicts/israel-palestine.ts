import type { Beat, ConflictMeta } from "../types";

import oct7 from "@content/israel-palestine/beats/2023-october-7.json";
import gaza from "@content/israel-palestine/beats/2005-gaza-disengagement.json";
import campDavid from "@content/israel-palestine/beats/2000-camp-david.json";
import oslo from "@content/israel-palestine/beats/1993-oslo-accords.json";
import intifada from "@content/israel-palestine/beats/1987-first-intifada.json";
import sixDay from "@content/israel-palestine/beats/1967-six-day-war.json";
import nakba from "@content/israel-palestine/beats/1948-independence-nakba.json";
import balfour from "@content/israel-palestine/beats/1917-balfour-declaration.json";
import meta from "@content/israel-palestine/meta.json";

export const conflict = {
  meta: meta as ConflictMeta,
  beats: [
    oct7 as Beat,
    gaza as Beat,
    campDavid as Beat,
    oslo as Beat,
    intifada as Beat,
    sixDay as Beat,
    nakba as Beat,
    balfour as Beat,
  ],
};
