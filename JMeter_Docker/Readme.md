##How to set up JMeter/Docker/Grafana

-Do 'docker-compose up -d' on Server
-Scale up clients with : 'docker-compose scale jmserver={number of Servernodes}
-Find out of Container Ids of clients and master=> 
    - docker-compose ps 
    - docker-compose ps -q 
-Find IP addresses of the nodes
    - docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' {Id of container}

-Start script with clients
    - docker exec -ti master 'jmeter -n -t etc/tests/{testname}.jmx



#New Test

- Create *.yml file through jmeter GUI
- At file to the docker-compose.yml 
- Replacte docker-compose file on the server
- Add yml file to the server under etc/tests/

- start docker-compose
