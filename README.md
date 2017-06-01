# GitHub Battle #
<!-- MarkdownTOC bracket="round" autoanchor="flase" -->

- [Dependencies](#user-content-dependencies)
- [Getting Started](#user-content-getting-started)
	- [Locally](#user-content-locally)
	- [Build Project](#user-content-build-project)

<!-- /MarkdownTOC -->

A single page application built with React (using GitHub API and hosted on Firebase) that displays to users the most popular Repositories and allows users to filter Repositories by a specific language.

The application also has a **Battle** section where users can simulate a battle against 2 Github users. The result returns a winner and a loser, winners are determined by the numbers of stars and followers a Github User has.

[Live version can be found here.](https://github-battle-ec28a.firebaseapp.com/)

## Dependencies ##
- Axios
- Query-String
- React
- React-Dom
- React-Router-Dom

## Getting Started ##
### Locally ###
1. Clone this repository
2. In terminal, switch current working directory to repository
3. Make sure you have NPM installed. Simply install [NodeJs](https://nodejs.org/en/download/)
4. Install packages needed for project by typing in terminal ``` npm i ```
5. To view project locally start dev server by typing in terminal ``` npm run start ```

### Build Project ###
1. After following instructions for setting up the project locally, to build for production, in your terminal type ``` npm run build ```
2. (Optional) If you wish to host the project online, you can use Firebase as the build tool can automate this for you.
	1. Create a [Firebase Account](https://firebase.google.com/) 
	2. Create a Firebase project on your [Firebase console](https://console.firebase.google.com/)
	3. Initialize Firebase project from terminal by typing ``` npm run firebase-init ```
	4. When step iii. runs you will be asked a series of questions
	5. First question, select **Hosting**
	6. Second question, select the project name you created in step ii.
	7. Third question, type **dist** as your public directory to use (the production code)
	8. Forth question, type **Y** for firebase to configure project as a single page application
	9. Fifth questions, type **N** to not overwrite dist/index.html
	10. Firebase should now be initialized, to deploy project to Firebase, in your terminal type ``` npm run deploy ```
