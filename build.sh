#!/usr/bin/env bash
DOCKER=$(which docker)
DOCKER_COMPOSE=$(which docker-compose)
MAKE=$(which make)

DOCKER_CONTAINER_NAME="rest-desafio"

if [[ -n ${MAKE} && -n ${DOCKER} && -n ${DOCKER_COMPOSE} ]];
	then
		make all
		echo "api disponivel em http://localhost:5000/api/user"
fi

if [[ -z ${MAKE} && -n ${DOCKER} && -n ${DOCKER_COMPOSE} ]];
	then
		docker build -t ${DOCKER_CONTAINER_NAME} .
		docker-compose up -d
		echo "api disponivel em http://localhost:5000/api/user"
fi

if [[ -z ${DOCKER} || -z ${DOCKER_COMPOSE} ]];
	then
	echo "docker ou docker-compose não estão instalados no sistema."
	echo "Fazer a instalação pelos links a seguir:"
	echo "	docker: https://www.docker.com/get-started"
	echo "	docker-compose: https://www.docker.com/get-started"
fi

