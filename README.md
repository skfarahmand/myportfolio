# SoraKF's Realm

## Run with Docker

From this directory, run `docker compose up --build`, then open
<http://localhost:8080>. Stop it with `docker compose down`.

The contact form reads `RESEND_API_KEY` at runtime. Set it in a local `.env`
file (see `.env.example`) before starting Compose if you want the form to work.
The `.env` file is excluded from the Docker image.

Redesign my personal portfolio website into a highly stylized fantasy JRPG experience inspired very strongly by Kingdom Hearts.

I want this site to feel much less like a generic IT / SaaS / cloud-tech portfolio and much more like a Kingdom Hearts-inspired title screen, menu system, and fantasy interface.

IMPORTANT OVERALL DIRECTION

The current version feels too “techy,” too corporate, too startup-like, and not personal enough.

Remove or heavily reduce:

- generic software-company visuals

- cloud-computing imagery

- corporate gradients

- SaaS dashboard feeling

- “building modern software” type messaging

- overly standard tech portfolio design language

Replace it with:

- dark castle / fantasy atmosphere

- Kingdom Hearts-inspired interface design

- more personality

- more emotion / nostalgia

- a dramatic and cinematic presentation

- elegant fantasy UI

- menu-based navigation similar to a game title screen

I want the site to feel like a playable title screen / menu for my portfolio.

BRAND / TITLE

The site title should be:

SoraKF

On the homepage, the title should be styled to resemble the Kingdom Hearts logo aesthetic as closely as possible in spirit:

- sharp, ornate fantasy lettering

- metallic silver / white interior

- dark blue / royal blue outlines

- dramatic elongated strokes

- elegant fantasy/JRPG logo feel

- crown / heart / keyhole / chain motifs can be included subtly

Under the title, where “Final Mix” would normally appear in the Kingdom Hearts logo layout, put:

PLACEHOLDER

This title treatment should be used as the main homepage title.

On every page besides the homepage, place a smaller SoraKF logo/title at the top-left that links back to the homepage.

HOMEPAGE LAYOUT

The homepage should feel like a game title screen.

Do NOT use a normal top-navbar on the homepage.

Homepage structure:

- Large SoraKF logo/title on the left or center-left

- PLACEHOLDER subtitle below it

- A vertical menu below the logo

- Atmospheric fantasy background

- Strong visual composition, with the right side being more scenic / artistic

- The layout should resemble a Kingdom Hearts-style title/menu screen

Homepage menu items:

- About

- Projects

- Resume

- Settings

- Downloadable Content

- Credits

The menu should feel like a Kingdom Hearts / JRPG menu:

- clean vertical list

- elegant spacing

- subtle separator lines

- glowing selection bar

- highlighted active option

- smooth hover and selection animation

- optional small orb / decorative selection indicator

Menu interaction:

- mouse support

- keyboard support (arrow keys, enter, escape where relevant)

- visible selected state

- smooth but not excessive transitions

Optional:

show a short description for the highlighted menu item near the bottom of the homepage.

THEME / VISUAL STYLE

I want two main visual themes:

1. DARK MODE

This should be based on the darker, more dramatic, castley side of the references.

Dark mode should include:

- dark castle atmosphere

- gothic fantasy mood

- deep navy, black, charcoal, indigo

- moonlight

- stars

- clouds / mist

- faint glow effects

- silver / steel highlights

- subtle blue accents

- decorative chains, keyholes, crown motifs, heart motifs

- stained-glass-inspired textures/details if appropriate

The feeling should be mysterious, dramatic, melancholy, elegant, and fantasy-like.

2. LIGHT MODE

This should be based on the brighter, softer side of the references.

Light mode should include:

- pale sky blue

- white / ivory

- soft silver

- light gold accents

- watercolor cloud atmosphere

- dreamy nostalgic feeling

- airy and hopeful mood

- still fantasy/JRPG, not generic modern minimal

The light mode should still feel connected to the same world as the dark mode.

SETTINGS PAGE

The Settings page should feel like an in-game settings/configuration menu.

Include the following sections:

DISPLAY

- Light Mode toggle

- Dark Mode toggle

- System Theme option

- Theme should switch instantly

- Save theme preference in localStorage

SOUND

- Music on/off

- Play / pause

- Previous track

- Next track

- Volume control

- Optional loop/shuffle if easy to implement

SOUNDTRACK

Include a soundtrack section with the top 5–10 songs I’ve been listening to.

For now, use editable placeholders.

Make this easy for me to update later.

Each soundtrack item can include:

- song title

- artist

- optional cover art

- optional external link (Spotify / Apple Music / YouTube)

Important:

- do NOT autoplay music on page load

- only play music after user interaction

- store music/player preferences if possible

ACCESSIBILITY / EXTRA SETTINGS

Include:

- reduced motion option or support prefers-reduced-motion

- clear focus states

- keyboard accessibility

PAGE STRUCTURE

The site pages should be:

1. ABOUT

2. PROJECTS

3. RESUME

4. SETTINGS

5. DOWNLOADABLE CONTENT

6. CREDITS

Do not make a separate Skills page.

Instead, include skills inside About.

GLOBAL INTERNAL PAGE HEADER

On every page except the homepage:

- put a smaller SoraKF title/logo in the top-left

- that title/logo should link back to homepage

- internal pages can have a compact top navigation on the right if needed

- maintain the same fantasy/JRPG visual identity

ABOUT PAGE

The About page should feel more personal and stylized, but still professional.

It should include sections such as:

- Profile / Introduction

- Education

- Technical Skills

- Tools

- Career Objective

- Interests

The design should feel like a profile/journal/status screen from a fantasy game, but still clean and readable.

Use decorative fantasy UI touches such as:

- thin silver borders

- ornamental corners

- faint glows

- subtle stained-glass or parchment-like panel styling

- elegant section dividers

Keep my writing readable and employer-appropriate.

PROJECTS PAGE

The Projects page should present my work in a much more interesting way than a generic card grid.

Possible feel:

- world selection

- journal entries

- mission / archive style

- save-file / record style

- elegant fantasy UI cards

Each project entry should support:

- project title

- short description

- technologies used

- image / screenshot / thumbnail

- GitHub link

- live demo link

- optional expanded details

Cards should have hover/focus effects that feel polished and game-like.

Do not make the project visuals look like random generic cybersecurity / cloud / analytics stock illustrations.

RESUME PAGE

The Resume page should remain practical and easy to use.

Include:

- a visible Download Resume button

- an Open Resume button / open in new tab

- embedded resume preview if possible on desktop

- mobile-friendly fallback

Style it within the fantasy theme, but do not make it hard to access.

DOWNLOADABLE CONTENT PAGE

This page should feel like an extras / DLC / bonus-content menu.

It should act as a library of downloadable resources.

Possible content:

- Resume PDF

- project documents

- project case studies

- code samples

- certificates if I add them later

- future items marked “Coming Soon”

Each item should show:

- title

- file type

- short description

- button to view/download

- optional file size

This page should not just duplicate the Resume page.

CREDITS PAGE

The Credits page should also serve as the Contact Me page.

I want it to feel like a game credits / ending screen mixed with a professional contact page.

Include:

- a thank-you message

- my name

- email

- GitHub

- LinkedIn

- optional contact form

Optional tone:

- subtle “thank you for visiting” / “end of journey” / “thanks for playing” feeling

- keep it tasteful and professional

If adding a contact form, include:

- Name

- Email

- Subject

- Message

- validation

- success/error state

KEYBLADE / FANTASY-WEAPON VISUAL DIRECTION

I want strong Kingdom Hearts-inspired weapon elements throughout the site.

Use prominent fantasy key-shaped weapon imagery and motifs throughout the design language:

- elegant key-shaped sword visual language

- chain details

- crown charm motifs

- heart motifs

- keyhole motifs

- metallic silver / gold / dark grip styling

- iconic fantasy key-weapon silhouette language

Use these in tasteful ways such as:

- homepage visual composition

- decorative divider elements

- menu selection accents

- transitions / small animated flourishes

- icons / ornamental UI details

The homepage should have the strongest presence of these elements.

Internal pages should use them more subtly.

If you need a visual direction:

- dark mode can lean toward a more dramatic dark key-weapon aesthetic

- light mode can lean toward a brighter, softer, elegant fantasy key-weapon aesthetic

TYPOGRAPHY

Use 3 tiers of typography:

1. MAIN TITLE / LOGO

- highly stylized fantasy/JRPG title treatment for SoraKF

2. HEADINGS / MENU TEXT

- elegant display font with a game-menu feel

3. BODY TEXT

- clean readable modern font

Important:

- do NOT use the decorative title styling for paragraphs

- keep paragraphs very readable

ANIMATIONS / TRANSITIONS

I want subtle, polished transitions that feel cinematic and game-like.

Possible ideas:

- fade transitions

- cloud dissolve

- soft blur

- glow transitions

- keyhole-like reveal

- gentle parallax on homepage background

- floating particles / stars / mist

Do NOT overdo the motion.

It should feel polished, not distracting.

Also support reduced motion where appropriate.

RESPONSIVE DESIGN

The site must work well on:

- desktop

- tablet

- mobile

On desktop:

- preserve the strong title-screen composition

On mobile:

- keep the title readable

- stack layout cleanly

- keep all homepage menu options easy to tap

- ensure internal pages remain readable

- avoid the artwork overpowering the content

CONTENT / DATA HANDLING

Please keep personal site content easy to edit later.

Use data-driven content where practical:

- projects array/data file

- soundtrack array/data file

- downloads array/data file

- social/contact data in one place

Do not hardcode everything across many components.

TECHNICAL REQUIREMENTS

Please build this within the existing React project structure if possible.

Use:

- reusable components

- accessible HTML

- good responsive design

- localStorage for settings

- clean routing

- good performance practices

- lazy-loading for large artwork if appropriate

Create reusable components for things like:

- homepage menu

- logo/title

- internal page header

- settings panel

- soundtrack player

- project cards

- download cards

- credits/contact section

FINAL GOAL

The website should feel like a Kingdom Hearts-inspired fantasy title screen and interactive menu, while still functioning as a real professional portfolio.

When someone visits, I want them to immediately understand:

- who I am

- what my projects are

- how to access my resume

- how to contact me

The site should feel much more personal, atmospheric, nostalgic, and visually unique than a standard IT portfolio.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3777b0c6-2705-4de0-87d1-c015beb2a807).

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
