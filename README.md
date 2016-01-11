# About this project
This project is aimed at visualizing relationships between multiple models and thus providing the means to quickly browse through the interconnections between different resources. At present time, the project will focus on providing visualizations on data attained through JIRA and Jama interfaces. This project is currently under development.

# Modules
Currently, the project consists of two modules:
- `data-web`: A Springboot application containing the main logic.
- `jira-rest`: A wrapper REST interface for the JIRA Rest Java Client.

# Starting the application
- Adjust the properties in the `config.properties` files in the `data-web` and in the `jira-rest` modules.
- Run `mvn clean install` on the `jira-rest` module and put the resulting `war` file on an application server (TODO will be replaced with embedded jetty server).
- Run `mvn spring-boot:run` in the `data-web` directory.
- Open `localhost:8080` in the browser.
