Assignment 4 - Components
===

Due: September 25th, by 1:59 PM.

For this assignment you will re-implement the client side portion of *either* A2 or A3 using either React or Svelte components. If you choose A3 you only need to use components for the data display / updating; you can leave your login UI as is.

[Svelte Tutorial](https://github.com/cs-4241-26a/cs-4241-26a.github.io/blob/main/using.svelte.md)  
[React Tutorial](https://github.com/cs-4241-26a/cs-4241-26a.github.io/blob/main/using.react.md)  

This project can be implemented on any hosting service (Glitch, DigitalOcean, Heroku etc.), however, you must include all files in your GitHub repo so that the course staff can view them.

Deliverables
---

Do the following to complete this assignment:

1. Implement your project with the above requirements.
3. Test your project to make sure that when someone goes to your main page on Render/Heroku/etc., it displays correctly.
4. Ensure that your project has the proper naming scheme `a4-firstname-lastname` so we can find it.
5. Fork this repository and modify the README to the specifications below. Be sure to add *all* project files.
6. Create and submit a Pull Request to the original repo. Name the pull request using the following template: `a4-firstname-lastname`.

Sample Readme (delete the above when you're ready to submit, and modify the below so with your links and descriptions)
---

## Cookbook

your hosting link e.g. http://a4-charlieroberts.me

Include a very brief summary of your project here and what you changed / added to assignment #3. Briefly (3–4 sentences) answer the following question: did the new technology improve or hinder the development experience?

For this project, I took my Cookbook recipe manager website from A3, and rebuilt it using react. My app now uses a use state to conditionally display either the login or main page, so I had to change my login routes to send the login status from the session, rather than doing the redirects. I couldn't find another way with basic React to handle the Login page without at least integrating it somewhat, though I know we didn't need to use React for it. Otherwise, my website is structured similarly, though all the code is broken up into different componenets to organize it better.

I feel like the process of converting the assignment over to React does hinder things somewhat, with needing to decide how to break it into componenets, and getting use to useStates and whatnot. But once the conversion is done, I can see the benefit of doing future development in react. The component system is nice, especially to help organize the Javascript and not have a giant client .js file. And since my websites also constructs so much HTML in that code, the JSX does help to make that easier as well.