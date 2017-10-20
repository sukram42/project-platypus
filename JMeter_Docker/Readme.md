##How to set up JMeter/Docker/Grafana

-Do '__docker-compose up -d__' on Server
-Scale up clients with : __docker-compose scale jmserver={number of Servernodes}__

-Find out of Container Ids of clients and master=> 
    - __docker-compose ps__
    - __docker-compose ps -q__ 
    
-Find IP addresses of the nodes
    - __docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' {Id of container}__

-Start script with clients
    - __docker exec -ti master 'jmeter -n -t etc/tests/{testname}.jmx -R192.168.1.1,192.168.1.2__



#New Test

- Create *.yml file through jmeter GUI
- At file to the docker-compose.yml 
- Replacte docker-compose file on the server
- Add yml file to the server under etc/tests/

- start docker-compose
