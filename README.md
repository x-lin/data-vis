# About this project
This project is aimed at visualizing relationships between multiple models and thus providing the means to quickly browse through the interconnections between different resources. At present time, the project will focus on providing visualizations on data attained through JIRA and Jama interfaces. This project is currently under development.

# Modules
Currently, the project consists of two modules:
- `data-web`: A Springboot application containing the main logic.
- `jira-rest`: A wrapper REST interface for the JIRA Rest Java Client.

# Starting the application
### Starting the REST Client Wrapper
- Add the URL of the JIRA REST API to the properties file `config.properties` in the `src/main/resources` directory of the `jira-rest` module.
- Run `mvn clean install` on the `jira-rest` module and put the resulting `war` file on an application server (TODO will be replaced with embedded jetty server).

### Fetching the data
- Adjust the properties in the `config.properties` file in the `data-web` module.
- Run `mvn spring-boot:run` in the `data-web` directory.
- In order to fetch data, `localhost:8080/extract/all` can be entered in the browser. This will start the extraction process, assembling data from the REST endpoints and storing them into an embedded Neo4j database. The database folder `app.db` will be created in the main directory of the `data-web` module.

### Installing and starting the client application
- Run `mvn spring-boot:run` in the `data-web` directory, if not done already.
- Open `localhost:8080/src/index.html` in the browser.

### Editing the frontend code
- Assuming `npm` is installed, execute `npm install` in the folder `data-web/src/main/resources/static/`. After that, running `webpack` will update the code.
