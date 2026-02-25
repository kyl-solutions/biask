import type { Beat, ConflictMeta } from "../types";

import invasion from "@content/ukraine/beats/2022-full-scale-invasion.json";
import crimeaDonbas from "@content/ukraine/beats/2014-crimea-donbas.json";
import euromaidan from "@content/ukraine/beats/2013-euromaidan.json";
import bucharest from "@content/ukraine/beats/2008-bucharest-summit.json";
import orange from "@content/ukraine/beats/2004-orange-revolution.json";
import budapest from "@content/ukraine/beats/1994-budapest-memorandum.json";
import independence from "@content/ukraine/beats/1991-independence.json";
import meta from "@content/ukraine/meta.json";

export const conflict = {
  meta: meta as ConflictMeta,
  beats: [
    invasion as Beat,
    crimeaDonbas as Beat,
    euromaidan as Beat,
    bucharest as Beat,
    orange as Beat,
    budapest as Beat,
    independence as Beat,
  ],
};
