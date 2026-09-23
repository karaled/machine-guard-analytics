# MachineGuard implementation plan

## Goal
Build a polished three-page predictive-maintenance application that presents MachineGuard as credible industrial monitoring software and uses only the supplied Flask service for health and prediction data.

## Pages and navigation
- Add a persistent desktop sidebar and responsive mobile drawer with Home, Assessment, and About routes.
- Show the active page clearly and use client-side navigation without full reloads.
- Add a shared page header whose service indicator reflects the real `/health` response.

## Visual direction
- Define an industrial design system using the requested navy, blue, teal, grey, and white palette with restrained borders and shadows.
- Use professional typography, compact engineering-style labels, clear hierarchy, and subtle motion.
- Generate and use a realistic modern CNC/factory visual for Home and the About highlight.

## Home
- Build the requested headline, supporting copy, industrial visual, and links to Assessment and About.
- Add the four-step Input → Preprocess → Predict → Maintain flow.
- Add the four predictive-maintenance benefit cards and final assessment call to action.

## Assessment
- Create exactly six validated inputs in a responsive two-column form: machine type, air temperature, process temperature, rotational speed, torque, and tool wear.
- Send the exact JSON field names and selected L/M/H value to `http://127.0.0.1:5000/predict`.
- Add loading, disabled, validation, connection-error, and API-error states without fallback or fabricated predictions.
- Validate the response shape, then display the backend’s exact `failure`, `failure_probability`, and `recommendation` values.
- Show the requested normal/risk result treatment, probability bar, assessment summary, and reset action.

## About
- Add the project overview, connected system architecture, technology stack, six model inputs, predictive-maintenance explanation, and MachineGuard highlight.

## Technical details
- Use TanStack Router routes at `/`, `/assessment`, and `/about`, with shared navigation in the root layout.
- Keep API calls in the browser so they reach the locally running Flask service; no model or prediction logic will be added to the frontend.
- Add unique metadata for each page.
- Keep the health display honest: ready only when status is `ok` and both model and preprocessor are loaded; otherwise offline.

## Verification
- Check build diagnostics and browser console errors.
- Test all routes and links, form validation, request loading/error handling, health status, and result rendering against a controlled local test API that returns explicit fixtures only during verification.
- Review screenshots at desktop and mobile sizes for layout, navigation, legibility, and overlap.
