
docker build -t tw-ucp2.twlon.com/admin/scale_jmmaster ./JMeter_Docker/MASTER
docker push tw-ucp2.twlon.com/admin/scale_jmmaster:latest

docker stack deploy -c docker-compose.yml scaleApp