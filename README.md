<h1>Movie App</h1>
<p>This is a movie app that allows users to view information about movies and add them to their favorites list. The app is built using React and Bootstrap, and the data is provided by a REST API. Feel free to test it <a href="https://gleans-moviedb.netlify.app/">here</a>.</p>

<img width="800" alt="mainview" src="https://user-images.githubusercontent.com/112701190/224073189-6af3eaca-cdd0-48f5-a4dd-8c4c287f468c.png">

<h2>Table of Contents</h2>
<ul>
  <li><a href="https://github.com/wentdavid/myFlix-client#setup">Setup</a></li>
  <li><a href="https://github.com/wentdavid/myFlix-client#components">Components</a></li>
  <li><a href="https://github.com/wentdavid/myFlix-client#dependencies">Dependencies</a></li>
  <li><a href="https://github.com/wentdavid/myFlix-client#features">Features</a></li>
  <li><a href="https://github.com/wentdavid/myFlix-client#license">License</a></li>
</ul>
<h2 id="setup">Setup</h2>
<p>To run the app, clone the repository and run <code>npm install</code> to install the dependencies. Then, run <code>npm start</code> to start the app in development mode.</p>
<h2>Technologies</h2>
<p>This app is built with:</p>
<ul>
  <li>React</li>
  <li>Bootstrap</li>
  <li>React Bootstrap</li>
  <li>React Router</li>
  <li>Netlify</li>
  <li>Heroku</li>
</ul>
<h2 id="features">Features</h2>
<ul>
  <li>User can log in to the application using their username and password.</li>
  <li>User can view a list of movies and movie details.</li>
  <li>User can add movies to their list of favorites.</li>
  <li>User can filter movies by genre and search for movies by title, genre, and director.</li>
  <li>User can view their profile page and update their information.</li>
</ul>
<h2 id="components">Components</h2>
<p>This application is composed of several React components that work together to provide the functionality described above. The main components are:</p>
<ul>
  <li><strong>MainView</strong>: The MainView component is the main entry point of the application. It is responsible for fetching the list of movies from the API and rendering the navigation bar, search and filter inputs, and the list of movie cards. It also handles user authentication and routing to other components.</li>
  <li><strong>MovieCard</strong>: The MovieCard component is responsible for rendering a single movie card with a thumbnail image, title, and release year. It also displays buttons to view the movie details and add/remove it from the user's list of favorites.</li>
  <li><strong>MovieView</strong>: The MovieView component displays the details of a single movie, including the poster image, title, description, genre, director, and list of actors. It also allows the user to add/remove the movie from their list of favorites.</li>
  <li><strong>LoginView</strong>: The LoginView component displays a form for the user to log in to the application using their username and password. It sends a request to the API to authenticate the user and store their authentication token in local storage.</li>
  <li><strong>SignupView</strong>: The SignupView component displays a form for the user to create a new account with a username, password, email address, and birthdate. It sends a request to the API to create the new user and store their authentication token in local storage.</li>
  <li><strong>ProfileView</strong>: The ProfileView component displays the user's profile information, including their username, email address, and birthdate. It allows the user to update their information and change their password.</li>

</ul>
<h2>Deployment</h2>
<p>This app is deployed using Netlify for the front-end and Heroku for the back-end. The front-end code is automatically deployed to Netlify when changes are pushed to the main branch on GitHub. The back-end code is deployed to Heroku manually using the Heroku CLI.</p>
<h2 id="license">License</h2>
<p>This project is licensed under the MIT License.</p>
