# About this project
This project is aimed at visualizing relationships between multiple models and thus providing the means to quickly browse through the interconnections between different resources. At present time, the project will focus on providing visualizations on data attained through JIRA and Jama interfaces. This project is currently under development.

# Modules
Currently, the project consists of three modules:
- `data-web`: A Spring Boot application containing the mainly the user-side logic. Comprises a backend, a frontend and an embedded DB.
- `jira-rest`: An extraction service fetching the data from the JIRA REST interface.
- `jama-rest`: An extraction service fetching the data from the Jama REST interface.

# Starting the application
**NOTE: The following instructions are subject to change and will be partially replaced with batch files.**
### Starting the REST extraction services
#### JIRA extraction service
- Add the URL of the JIRA REST API and credentials to the properties file `config.properties` in the `src/main/resources` directory of the `jira-rest` module.
- Run `mvn clean install` in the main directory of the `jira-rest` module and put the resulting `war` file on an application server (TODO will be replaced with embedded jetty server).

#### Jama extraction service
- Add the URL and credentials to `config.properties` of the `jama-rest` module (see JIRA subsection for more detailed instruction).
- Run `mvn spring-boot:run` in the main directory of the `jama-rest` module.

### Fetching the data
- Adjust the properties in the `config.properties` file in the `data-web` module.
- Run `mvn spring-boot:run` in the `data-web` directory.
- In order to fetch and save the data, run `http://TODO` and `http://TODO`. This will start the extraction processes, assembling data from the REST endpoints and storing them into an embedded Neo4j database. The database folder `app.db` will be created in the main directory of the `data-web` module.
- Updates to the data will occur automatically with a scheduler (not implemented yet).

### Starting the client application
- Run `mvn spring-boot:run` in the `data-web` directory, if not done already.
- Open `http://localhost:8081/src/index.html` in the browser.

### Editing the frontend code
- Assuming `npm` is installed, execute `npm install` in the folder `data-web/src/main/resources/static/`. After that, running `webpack` will bundle the code.

# Deploying the application
**TODO**

# Technology stack
RESTful services are used to communicate between the various components and to fetch the data.
### Backend
- Java
- Spring + Spring Boot
- Neo4j with Spring Data
- Maven for build management
- JUnit + Mockito for testing

### Frontend
- JavaScript (incl. ES6 and JSX)
- React with Redux
- npm as package manager
- Webpack as module bundler
- tape for testing
- A bunch of other frameworks including D3, Bootstrap, jQuery, external react + redux libraries, and other utility libraries (check out `package.json` for a complete list).

### JIRA Rest Client
- Java
- Jersey
- Genson
- JIRA Rest Java Client
