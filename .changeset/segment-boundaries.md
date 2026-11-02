---
"bohoauth": patch
---

Match plain `protectedPaths` at segment boundaries. `"/protected"` still protects `/protected` and everything under it, but no longer matches unrelated paths that share a prefix, like `/protected-foo`. A trailing slash in the URL is now ignored.
