---
"bohoauth": patch
---

Fix package entry points. `main` now points to the CommonJS build and `module` to the ESM build, and `exports` provides separate `import` and `require` conditions with matching type declarations. Types now come from the built `.d.ts` files instead of the TypeScript source.
