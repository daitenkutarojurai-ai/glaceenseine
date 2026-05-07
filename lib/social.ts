// Single source of truth for the brand's public social URLs.
// Update here when handles change — every page + JSON-LD reads from this.
//
// Note: the brand handle is `glaceenseine` (no extra "s"). Earlier site code
// used `glacesenseine` which never resolved on Instagram — corrected on
// 2026-05-07 once the real accounts were confirmed by the owner.

export const SOCIAL = {
  instagram: {
    url: "https://www.instagram.com/glaceenseine",
    handle: "@glaceenseine",
  },
  facebook: {
    // No vanity URL yet — the account is still on /profile.php?id=...
    url: "https://www.facebook.com/profile.php?id=61589342042525",
    handle: "Glace en Seine",
  },
  google: {
    review: "https://g.page/r/CcKQvU-g5mpzEBM/review",
  },
} as const;
