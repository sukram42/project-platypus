# Project-Platypus

The project deals with an highly scalable and available Webapplication, which can be used for demonstrational use.

###What is it about?
Basis of the project is a datamining script, which retrieves share information from an online API. These data is shown on a grommet based webpage. The page is deployed by an underlying NodeJS server. The communication between frontend and backend is based on the HTTP2 standard. 
Data is stored in a Vertica Database. 

To demonstrate load on the Server, another Load Testing backend, which is based on JMeter, simulates User requests.
Through a button on the webapplication an test can be easily started.

###The Files and Directories

Following directories are worth a view:

- Webapp
 
    This folder is for every code which isused  for the webapp's backend and frontend.
    
- JMeter_Docker 

    This directory enables JMeter tests as well as controlling these per API requests.(Different port than the webapp)
    
- doc

    Here there are documentaries about the used classes and modules
    
- datamining
    
    This folder is for getting the data from the API and saves it into the Database
    
- config.js

    Some configuration Files. The files are in each folder.

-  requestSimulator

    Deprecated Folder: Ment to simulate load. But it was easier to deploy a JMeter environment.
    
-  docker-compose.yml  

    Docker compose file for the Loadtesting part
    
    
## Load Testing

Combination of Tools to enable loadtesting.
  
  ####The stack
  
  On top of the Loadtesting stack is JMeter, which is a tool by Apache. It was ment to do Load tests.
  The information of the tests, like response times etc, are streamed into an infux database. From there a Grafana dashboard visualises the given data.
  
  To increase load performance, JMeter can be clustered over multiple nodes.
  
##Datamining

The datamining script found in the ./datamining folder. To run the script just run `node data` in the datamining folder. 
Just be sure to have the database started before. Within the config.js it is possible to define the location of the database as well as the initialisation process of the script.


##Database

For development purposes it was used a docker image for the Vertica-Database. (colemantw/vertica) 
In production mode the use of a vertica in a virtual machine seems to be more stable.

##Webapp
###Frontend

The Frontend of the webapplication is written with grommet in combination with an simple FLUX-architecture.
To have an higher performance, some of the Grommet components are replaced by third-party-components. 
Text-Content can be modified in the texts.js file in the src folder of the webapp's directory.

The component in src/js/views/index-component.js is the root component and contains all of the webpage.

When modifying the Frontend it is mandatory to follow the FLUX rules. Trigger of initialisation actions, must placed in the init-Method of the store. 

###Backend
The Backend is a simple NodeJS HTTP2 webserver. It caches the names of the companies to reach an higher performance in querying informations.
In Case of an database-swap, just the model.js file has to be changed. 

The database.js file is deprecated, because it was made for the mongodb use. 

#Docker Swarm deployment

Due to the coming collaboration of Docker Swarm and Kubernetes, the application is deployed on Docker Swarm. This enables new possibilities like load-scaling and distributed Container deployment.

The UCP dashboard is deployed on :

- https://tw-ucp1.twlon.com/manage/dashboard

The Docker Repository can be found on:

- https://tw-ucp2.twlon.com/repositories


To deploy the application type:

`docker stack deploy -c <docker compose file>`

Following services will be created:

| Name          | Http-outputport | Description         |
| ------------- |-----------------| --------------------|
| webapp        | 3000            | React-Webapp        |
| datamining    | ----            | Datamining-script   |
| jmmaster      | 3007            | JMeter master node  |
| jmserver      | ----            | JMeter slave node   |
| grafana       | 3005            | Grafana Dashboard   |
| influx        | 8086            | Database for JMeter |
                
Every service of this bundle can be reached by its service name.
For example:

When the grafana dashboard needs to reach the influx database, you can just use `http://influx:8086`.


In case components are being updated it is possible to use the `update_<service name>.sh` script in the root folder.
To reach the docker swarm plattform, it is necessary to update the environment variables. On the UCP Plattform  it is possible to download Client Bundles. (https://tw-ucp1.twlon.com/manage/profile/clientbundle/) 

In these there is an `env.sh` script which will set the env for you.

Further important commands to use when working with docker swarm are:

`docker stack --help` : options about the running compose file

`docker service --help` : options on the running services 

