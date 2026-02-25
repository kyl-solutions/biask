// Cloudflare Pages Function: POST /api/review
// Creates a GitHub Issue from a structured review submission

interface Env {
  GITHUB_TOKEN: string;
}

interface ReviewPayload {
  target: string;
  targetType: string;
  stance: "agree" | "disagree" | "nuance";
  basisType: string;
  sources: string;
  perspective: string;
  beatId: string;
  beatTitle: string;
}

const REPO_OWNER = "kyl-solutions";
const REPO_NAME = "biask";

function buildIssueTitle(data: ReviewPayload): string {
  const stanceEmoji =
    data.stance === "agree" ? "✅" : data.stance === "disagree" ? "❌" : "🔄";
  const truncatedTarget =
    data.target.length > 60
      ? data.target.substring(0, 60) + "…"
      : data.target;
  return `${stanceEmoji} Review: ${truncatedTarget}`;
}

function buildIssueBody(data: ReviewPayload): string {
  const stanceLabel =
    data.stance === "agree"
      ? "**Strengthen** — I have additional evidence that supports this."
      : data.stance === "disagree"
        ? "**Challenge** — I have evidence that contradicts or complicates this."
        : "**Nuance** — The claim isn't wrong, but it's missing critical context.";

  return `## Review Submission

### Beat
**${data.beatTitle}** (\`${data.beatId}\`)

### Claim Under Review
> ${data.target}

**Claim type:** \`${data.targetType}\`

### Stance
${stanceLabel}

### Basis
**${data.basisType}**

### Sources
${data.sources}

### Contributor Perspective
${data.perspective}

---
*Submitted via biask review flow*`;
}

function getLabels(data: ReviewPayload): string[] {
  const labels: string[] = [];

  // Stance label
  if (data.stance === "agree") labels.push("review:agree");
  else if (data.stance === "disagree") labels.push("review:disagree");
  else if (data.stance === "nuance") labels.push("review:nuance");

  // Basis label
  if (data.basisType) labels.push(`basis:${data.basisType}`);

  // Perspective label
  const perspLower = data.perspective.toLowerCase();
  if (perspLower.includes("both")) labels.push("perspective:both");
  else if (perspLower.includes("neither") || perspLower.includes("outside"))
    labels.push("perspective:outside");
  // Side A/B detection happens dynamically in the client — we pass it through

  return labels;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    const data: ReviewPayload = await context.request.json();

    // Validate required fields
    if (!data.target || !data.stance || !data.sources || !data.beatId) {
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
          "User-Agent": "biask-review-flow",
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
    console.error("Review submission error:", err);
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
