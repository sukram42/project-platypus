
docker build -t tw-ucp2.twlon.com/admin/scale_datamining ./datamining/
docker push tw-ucp2.twlon.com/admin/scale_datamining:latest

docker stack deploy -c docker-compose.yml scaleApp