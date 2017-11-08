npm run dist --prefix webapp/

docker build -t tw-ucp2.twlon.com/admin/scale_webapp ./webapp/
docker push tw-ucp2.twlon.com/admin/scale_webapp:latest

docker stack deploy -c docker-compose.yml scaleApp