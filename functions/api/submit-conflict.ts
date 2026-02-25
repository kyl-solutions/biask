// Cloudflare Pages Function: POST /api/submit-conflict
// Creates a GitHub Issue from a new conflict submission

interface Env {
  GITHUB_TOKEN: string;
}

interface ConflictPayload {
  name: string;
  region: string;
  parties: string;
  biasGap: string;
  turningPoints: string;
  sources: string;
  perspective: string;
  willContribute: boolean;
}

const REPO_OWNER = "kyl-solutions";
const REPO_NAME = "biask";

function buildIssueTitle(data: ConflictPayload): string {
  return `📋 New Conflict: ${data.name}`;
}

function buildIssueBody(data: ConflictPayload): string {
  return `## New Conflict Submission

### Conflict
**${data.name}**
**Region:** ${data.region || "Not specified"}
**Primary parties:** ${data.parties}

### The biask Hook — What Most People Get Wrong
${data.biasGap}

### Key Turning Points
${data.turningPoints}

### Suggested Sources
${data.sources}

### Contributor Profile
**Perspective:** ${data.perspective}
**Willing to contribute content:** ${data.willContribute ? "Yes ✅" : "No"}

---
*Submitted via biask conflict submission flow*

### Editorial Board Checklist
- [ ] Review submission for scope and feasibility
- [ ] Verify bias gap is real and substantive
- [ ] Identify potential contributors for Side A
- [ ] Identify potential contributors for Side B
- [ ] Draft initial beat structure from turning points
- [ ] Begin sourcing and fact-checking
- [ ] Create conflict page draft`;
}

function getLabels(data: ConflictPayload): string[] {
  const labels: string[] = ["conflict-submission"];

  const perspLower = data.perspective.toLowerCase();
  if (perspLower.includes("both")) labels.push("perspective:both");
  else if (perspLower.includes("can't contribute") || perspLower.includes("just want to suggest"))
    labels.push("perspective:outside");
  else if (perspLower.includes("one side")) labels.push("perspective:side-a"); // Generic — refine later
  else if (perspLower.includes("researcher") || perspLower.includes("academic"))
    labels.push("perspective:outside");

  return labels;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    const data: ConflictPayload = await context.request.json();

    // Validate required fields
    if (!data.name || !data.parties || !data.biasGap) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const token = context.env.GITHUB_TOKEN;
    if (!token) {
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const title = buildIssueTitle(data);
    const body = buildIssueBody(data);
    const labels = getLabels(data);

    const ghResponse = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
          "User-Agent": "biask-submit-conflict-flow",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        body: JSON.stringify({ title, body, labels }),
      }
    );

    if (!ghResponse.ok) {
      const errBody = await ghResponse.text();
      console.error("GitHub API error:", ghResponse.status, errBody);
      return new Response(
        JSON.stringify({ error: "Failed to create issue", detail: ghResponse.status }),
        { status: 502, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const issue = await ghResponse.json() as { number: number; html_url: string };

    return new Response(
      JSON.stringify({
        success: true,
        issueNumber: issue.number,
        issueUrl: issue.html_url,
      }),
      { status: 201, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (err) {
    console.error("Conflict submission error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

// Handle CORS preflight
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
