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
  
  #### Docker-compose File
  
  The deployment of the load test environment is done by the Dockercomposefile "docker-compose.yml" in the root directory.
  
 With `Docker-compose up -d` the setup is started. Through `docker-compose ps` or `docker ps`, the running container can be watched. To start a test manually from the jmaster container it is possible to use the following command.
 
 `docker exec -ti <ContainerID> jmeter -n -t -c 'etc/tests/<testfile>' -R<names of jmserver container>` 
 
 The jmserver container are shown at the docker ps command. To increase the amount of server nodes just write: 
 
 `docker-compose scale jmserver=<AmountOfContainer>`

After the start of the docker-compose file, the Grafana-Dashboard should be reachable on port 3005. The default password is 'admin' as well as the password. 
When adding a new data source, it is possible to reach the influxdb with the hostname `influxdb`. The used table is called `jmeter`.

If there are problems with the docker images, it is possible to build new ones with the Dockerfiles under JMeter_Docker/MASTER/Dockerfile or JMeter_Docker/SERVER/Dockerfile. The docker-compose file could be in need of an update concerning the image name.

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




