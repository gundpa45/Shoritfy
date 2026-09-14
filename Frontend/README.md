## Creator Studio frontend

Run `npm run dev` from this folder. Visit `/studio`, `/signup`, or `/signin`.

- Appearance controls offer System, Light, and Dark. System follows `prefers-color-scheme`; explicit preferences persist in `localStorage` under `shoritfy.theme`. An inline startup script applies the choice before the app renders.
- UI colors live in `src/theme/theme.css` and are exposed to existing Tailwind components through semantic `app-*` colors in `src/index.css`. Video canvases retain their dark presentation.
- Sign up and Sign in are **frontend previews**. They validate fields and support password visibility, but never submit credentials, store passwords, or create accounts/sessions. The current backend login/register routes are placeholders. Replace the preview branch in `AuthPage.tsx` only after a real authentication contract is available.

Checks: `npm run build` and `npm run lint`.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
