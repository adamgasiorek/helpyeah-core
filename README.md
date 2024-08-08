# Helpyeah


## Configuration
1. Set secrets in repository `FIREBASE_TOKEN` by `firebase login:ci` and `CYPRESS_RECORD_KEY`

## Workflow
1. Install in main directory
2. Run unit tests
3. Run e2e tests
4. Build client and server
5. Prepare to deploy (Install functions, Copy /dist folder and typescript compile functions)
6. Remove index.html from main folder ! Important (thats why routing might not work)
7. Deploy hosting
8. Deploy functions

## stripe
1. firebase functions:config:set stripe.testkey=""
1. firebase functions:config:set algolia.app=""
1. firebase functions:config:set algolia.key=""
4. firebase functions:config:set sendgrid.key=&quot;&quot; sendgrid.template=&quot;&quot;

## ICONS
<fa-icon [icon]="['fab', 'github']"></fa-icon>
<fa-icon [icon]="['fas', 'book']"></fa-icon>


## Universal TODO

    "build:ssr": "ng build --prod && ng run helpyeah:server:production",
    "predeploy": "npm --prefix ./functions run build && rm -rf ./dist/browser/index.html",
    "deploy:manual:ssr:prod": "npm run build:ssr && npm run predeploy && firebase deploy -P production --only hosting,functions:ssr",
    "deploy:manual:ssr:dev": "npm run build:ssr && npm run predeploy && firebase deploy -P dev --only hosting,functions:ssr"
