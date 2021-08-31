${DOCKER_IMAGE_NAME} = 'rest-desafio'

docker.exe build -t ${DOCKER_IMAGE_NAME} .

docker-compose.exe up -d