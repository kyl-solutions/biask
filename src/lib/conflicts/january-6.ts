import type { Beat, ConflictMeta } from "../types";

import supremeCourt from "@content/january-6/beats/2024-supreme-court-legacy.json";
import selectCommittee from "@content/january-6/beats/2022-select-committee.json";
import capitolBreach from "@content/january-6/beats/2021-capitol-breach.json";
import stopTheSteal from "@content/january-6/beats/2020-stop-the-steal.json";
import electionCount from "@content/january-6/beats/2020-election-count.json";
import mandate from "@content/january-6/beats/2016-mandate-discontents.json";
import meta from "@content/january-6/meta.json";

export const conflict = {
  meta: meta as ConflictMeta,
  beats: [
    supremeCourt as Beat,
    selectCommittee as Beat,
    capitolBreach as Beat,
    stopTheSteal as Beat,
    electionCount as Beat,
    mandate as Beat,
  ],
};
