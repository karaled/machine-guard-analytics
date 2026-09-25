# Machine Guard Analytics

Build a complete, modern, professional web application called **MachineGuard — Predictive Maintenance System for Industrial Machines**.

The website is a college AI/ML project and should look like a real industrial/enterprise monitoring application rather than a generic AI landing page.

## 1. CORE REQUIREMENT

Build a **3-page website** with a persistent left-side navigation menu:

1. **Home**
2. **Assessment**
3. **About**

The pages must navigate smoothly through the left sidebar without full-page reloads.

The most important page is **Assessment**, where the user enters machine parameters and the website sends those values to my existing **Flask ML backend API** to get the actual prediction.

**Do NOT create fake/random predictions.**
The prediction displayed on the website must come from the backend API response.

---

# 2. VISUAL STYLE

Create a highly polished, professional industrial/enterprise design.

The website should feel like:

* Industrial monitoring software
* Predictive maintenance platform
* Engineering dashboard
* Professional enterprise application

Avoid making it look like:

* A generic AI website
* A gaming dashboard
* A neon cyber-security website
* A student template
* A flashy SaaS landing page

### Color palette

Use a restrained professional palette:

* Deep Navy: `#10253F`
* Dark Blue: `#173B5C`
* Professional Blue: `#2368A6`
* Muted Teal: `#177E89`
* Light Grey: `#F4F7FA`
* Border Grey: `#DCE4EB`
* White: `#FFFFFF`
* Dark Text: `#17283B`
* Secondary Text: `#667B8E`

Use white/light-grey backgrounds with navy and blue accents.

Do not use excessive gradients.

Use subtle shadows, thin borders, clean spacing, rounded corners, and professional typography.

---

# 3. LAYOUT

Use a **fixed left sidebar navigation** on desktop.

Example:

---

| MACHINEGUARD       |                         |
| Predictive        |       MAIN CONTENT       |
| Maintenance       |                         |
|                   |                         |
| 🏠 Home           |                         |
| ◈ Assessment      |                         |
| ⓘ About           |                         |
|                   |                         |
| ● System Ready    |                         |
-----------------------------------------------

Sidebar:

* Deep navy background
* MachineGuard logo/name at top
* Three navigation items
* Active page highlighted with a slightly lighter navy/blue background
* Small "System Ready" indicator at bottom
* Professional icons
* Smooth hover states

On mobile/tablet, convert the sidebar into a responsive navigation drawer or top navigation.

---

# 4. PAGE 1 — HOME

Create an attractive professional landing/dashboard-style Home page.

### Hero section

Large heading:

**Predict Machine Failure Before It Happens.**

Subtitle:

"MachineGuard evaluates current industrial machine operating parameters to identify potential failure risk and support preventive maintenance decisions."

Add a professional industrial machine image/illustration on the right side.

The image should look like:

* Industrial manufacturing machine
* CNC/industrial equipment
* Factory machinery
* Engineering environment

Do NOT use cartoon imagery.

Use a clean high-quality industrial visual.

### Hero buttons

Primary:

**Start Assessment →**

Clicking it navigates to the Assessment page.

Secondary:

**Explore System**

Navigates to About.

---

## Home page additional sections

### "How MachineGuard Works"

Create a clean 4-step visual flow:

**01 — Input**

Machine operating parameters

↓

**02 — Preprocess**

Data is transformed using the saved preprocessing pipeline

↓

**03 — Predict**

Machine learning model evaluates failure risk

↓

**04 — Maintain**

Result and maintenance guidance are displayed

Use elegant numbered cards with subtle connecting lines.

---

### "Why Predictive Maintenance?"

Create 3 or 4 professional cards:

**Early Risk Detection**

Identify potential failure conditions before unexpected downtime.

**Reduced Downtime**

Support preventive maintenance planning.

**Data-Driven Decisions**

Use machine operating parameters for prediction.

**Maintenance Guidance**

Provide actionable guidance based on the predicted condition.

Do not claim unrealistic benefits such as "100% accurate prediction."

---

### Home page final CTA

Create a clean section:

**Ready to assess your machine?**

Button:

**Run Machine Assessment →**

Navigate to Assessment.

---

# 5. PAGE 2 — ASSESSMENT

This is the **main functional ML page**.

Title:

**Machine Failure Assessment**

Subtitle:

"Enter the current operating parameters of the machine to generate a failure-risk prediction."

Create a professional form.

## INPUTS

The form must contain exactly these inputs:

### Machine Type

Dropdown:

* L — Low
* M — Medium
* H — High

Send the selected value as:

```text
L
M
H
```

Do NOT convert it manually in the frontend.

---

### Air Temperature [K]

Number input.

---

### Process Temperature [K]

Number input.

---

### Rotational Speed [rpm]

Number input.

---

### Torque [Nm]

Number input.

---

### Tool Wear [min]

Number input.

---

## Form design

Arrange the inputs in a clean 2-column grid on desktop.

On mobile use one column.

Each field should have:

* Label
* Unit
* Input
* Helpful placeholder/example
* Proper validation

Add a professional primary button:

**RUN FAILURE ASSESSMENT →**

While prediction is running, show:

**Assessing machine condition...**

Disable the button during the API request.

---

# 6. BACKEND API INTEGRATION

The frontend must communicate with my existing Flask backend.

Backend base URL:

```text
http://127.0.0.1:5000
```

Health endpoint:

```text
GET /health
```

Prediction endpoint:

```text
POST /predict
```

Send JSON in this exact format:

```json
{
  "type": "M",
  "air_temperature": 298.1,
  "process_temperature": 308.6,
  "rotational_speed": 1551,
  "torque": 42.8,
  "tool_wear": 100
}
```

The Flask backend already loads:

```text
predictive_model.pkl
preprocessor.pkl
```

The frontend must NOT contain the ML model.

The architecture must remain:

```text
React Frontend
       ↓
POST /predict
       ↓
Flask Backend
       ↓
preprocessor.pkl
       ↓
predictive_model.pkl
       ↓
Prediction
       ↓
JSON Response
       ↓
React Result
```

---

# 7. PREDICTION RESPONSE

The backend returns:

```json
{
  "failure": 0,
  "failure_probability": 8.42,
  "recommendation": "Continue normal monitoring..."
}
```

Interpret:

```text
failure = 0
→ Normal Operation
```

and:

```text
failure = 1
→ Failure Risk Detected
```

Do not invent another interpretation.

---

# 8. ASSESSMENT RESULT DESIGN

After the API responds, display a large professional result card.

## If failure = 0

Display:

**PREDICTION COMPLETE**

### NORMAL OPERATION

No failure predicted.

Display:

**Failure Probability**

Example:

```text
8.42%
```

Add a horizontal probability bar.

Then:

### Maintenance Guidance

Display the exact recommendation returned by the backend.

---

## If failure = 1

Display:

**FAILURE RISK DETECTED**

### Maintenance Attention Recommended

Display:

**Failure Probability**

Example:

```text
72.31%
```

Add a horizontal probability bar.

Then:

### Maintenance Guidance

Display the exact recommendation returned by the backend.

---

# 9. IMPORTANT — PROBABILITY

Do not create your own probability calculation.

Use the exact:

```text
failure_probability
```

returned by the Flask API.

Clearly label it:

**Model Failure Probability**

Do not describe it as a guaranteed probability that the machine will fail.

---

# 10. ERROR HANDLING

If Flask is unavailable, display a professional error message:

**Unable to connect to the prediction service.**

Then:

"Please make sure the Flask backend is running on port 5000."

Do not display a fake prediction.

If the user leaves fields empty, show proper validation.

If the API returns an error, show the error cleanly without breaking the page.

---

# 11. ASSESSMENT EXTRA FEATURES

Below the prediction result, add a small section called:

**Assessment Summary**

Display the values that the user entered:

| Parameter           | Value    |
| ------------------- | -------- |
| Machine Type        | M        |
| Air Temperature     | 298.1 K  |
| Process Temperature | 308.6 K  |
| Rotational Speed    | 1551 rpm |
| Torque              | 42.8 Nm  |
| Tool Wear           | 100 min  |

This makes the result easier to understand during a college demonstration.

Also add:

**Run New Assessment**

button that clears the previous result and allows another prediction.

---

# 12. PAGE 3 — ABOUT

Create a useful and visually attractive About page.

Do NOT make it just a boring paragraph.

Title:

**About MachineGuard**

Subtitle:

"An intelligent predictive maintenance application for industrial machine risk assessment."

---

## Section: Project Overview

Explain simply:

MachineGuard uses machine operating parameters and a trained machine-learning model to estimate whether a machine is at risk of failure.

The system is designed to support preventive maintenance by providing an early risk indication and maintenance guidance.

Keep the text concise and professional.

---

# 13. ABOUT — SYSTEM ARCHITECTURE

Create a visual architecture diagram:

```text
Industrial Machine Parameters
            ↓
       React Frontend
            ↓
        Flask API
            ↓
      Data Preprocessor
            ↓
       ML Prediction Model
            ↓
   Failure Risk Assessment
            ↓
 Maintenance Recommendation
```

Make this visually attractive using connected cards and arrows.

---

# 14. ABOUT — TECHNOLOGY STACK

Create professional technology cards:

### Frontend

React

### Backend

Python Flask

### Machine Learning

Scikit-learn

### Data Processing

Pandas / NumPy

### Model Persistence

Joblib

Use small icons where appropriate.

---

# 15. ABOUT — INPUT PARAMETERS

Show the six parameters used by the model:

**Machine Type**

L / M / H

**Air Temperature**

Kelvin

**Process Temperature**

Kelvin

**Rotational Speed**

RPM

**Torque**

Newton-meter

**Tool Wear**

Minutes

---

# 16. ABOUT — PURPOSE

Create a section:

### What is Predictive Maintenance?

Briefly explain that predictive maintenance uses machine data and analytical/ML techniques to identify possible abnormal or failure conditions so maintenance can be planned before unexpected downtime.

Do not make exaggerated claims.

---

# 17. ABOUT — PROJECT HIGHLIGHT

Add a professional visual card:

**MachineGuard**

**Predict → Assess → Maintain**

with an industrial machine image.

Use a high-quality industrial machine image or illustration.

If external images are used, use appropriate royalty-free sources or create a clean vector-style industrial illustration.

---

# 18. GLOBAL UI DETAILS

Use:

* Smooth page transitions
* Subtle hover effects
* Professional icons
* Clean cards
* Consistent spacing
* Thin borders
* Subtle shadows
* Responsive layout
* Good typography hierarchy
* Accessible contrast
* Clear buttons
* Loading states

Do NOT use:

* Excessive animations
* Neon colors
* Glowing effects
* Huge gradients
* Excessive rounded cards
* Random statistics
* Fake performance metrics
* Fake accuracy percentages
* Fake testimonials
* Fake customer logos
* Fake charts
* Fake machine readings

This is an ML college project, so every displayed technical value should be meaningful.

---

# 19. RESPONSIVE DESIGN

Desktop:

```text
Sidebar | Main Content
```

Tablet:

Responsive sidebar/navigation.

Mobile:

Use a collapsible menu or top navigation.

The Assessment form should become a single-column layout on small screens.

The website must remain attractive and usable at:

* Desktop
* Laptop
* Tablet
* Mobile

---

# 20. PROFESSIONAL INDUSTRIAL VISUAL

Use one strong industrial-machine visual on the Home page and optionally a smaller related visual on the About page.

Preferred visual style:

* Modern factory
* CNC machine
* Industrial robotic machinery
* Manufacturing equipment
* Engineering environment
* Blue/grey industrial tones

Avoid generic business stock photos of people shaking hands.

The visual should support the industrial predictive-maintenance theme.

---

# 21. NAVIGATION

The left sidebar must always provide:

```text
MACHINEGUARD

⌂ Home
◈ Assessment
ⓘ About

● System Ready
```

The active page should be visually highlighted.

Navigation behavior:

```text
Home → Home page
Assessment → Assessment page
About → About page
```

The Home CTA must navigate to Assessment.

The Assessment CTA should work immediately.

---

# 22. HEADER

Main content header should include:

Left:

Page title

Right:

```text
● System Operational
```

Use the health API if practical.

If `/health` reports:

```json
{
  "status": "ok",
  "model_loaded": true,
  "preprocessor_loaded": true
}
```

show:

**System Ready**

If the backend cannot be reached, show:

**Service Offline**

Do not pretend the ML service is available.

---

# 23. TECHNICAL REQUIREMENTS

Use a clean component-based frontend architecture.

Suggested components:

```text
Sidebar
Header
Home
Assessment
About
InputField
PredictionResult
ArchitectureDiagram
TechnologyCard
```

Keep the code organized and readable.

Use React state for:

* Current page
* Form inputs
* Loading state
* Prediction result
* API errors
* Backend health status

---

# 24. DO NOT REWRITE MY ML MODEL

Very important:

Do not create a new machine-learning model.

Do not train a model in the frontend.

Do not replace my existing model.

Do not generate fake predictions.

Do not hardcode prediction outputs.

Use my existing Flask API.

The frontend is only responsible for collecting input, sending JSON, and displaying the real API response.

---

# 25. FINAL USER EXPERIENCE

The final experience should feel like a real product:

User opens MachineGuard
↓
Sees professional industrial Home page
↓
Clicks "Start Assessment"
↓
Enters machine parameters
↓
Clicks "Run Failure Assessment"
↓
React sends data to Flask
↓
Flask runs preprocessing + ML model
↓
Prediction returned
↓
Professional result displayed
↓
User can run another assessment
↓
User can navigate to About to understand the system

---

# 26. FINAL QUALITY EXPECTATION

Make the final website **visually impressive enough for a college project demonstration and viva**, but keep it professional and believable.

The first impression should be:

"Industrial predictive maintenance software."

Not:

"AI template generated by a website builder."

Prioritize:

1. Working ML prediction
2. Professional UI
3. Clear navigation
4. Attractive industrial visuals
5. Responsive design
6. Clean code
7. Easy explanation during viva

Before finishing, test that:

* All three pages navigate correctly
* Sidebar works
* Assessment inputs work
* POST `/predict` works
* Real backend prediction is displayed
* Loading state works
* Error handling works
* `/health` status is reflected correctly
* No fake data is shown
* Website works on desktop and mobile

Use the existing Flask API exactly as specified above.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ed54e1a3-d043-4ca3-b78c-db5cd703bc16).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
