---
"bohoauth": patch
---

Make the `password` and `secret` options optional in `BohoAuthOptions`. They already fell back to the `BOHO_PASSWORD` and `BOHO_SECRET` environment variables, but the types required them.
