# Discord-image-link-generator

This is a very barebones website designed to give the discord version of an image link to the user

## How does it work?

Step 1: Input the link you want a discord version of

Step 2: It checks if the link exists in its json file, if yes skip to step 5

Step 3: The bot embeded in the website sends the link in a discord channel

Step 4: The bot then copies the link's embed and is added to its json database

Step 5: The bot displays the discord link to the user

## To-Do (Improvements)

- Return an additional value with the link split at "external/"
- Replace GET with POST to prevent problems with long URLS
- Improve the website UI (keep simple)
- Add a prettified json webpage
