SRC_FILES:="$(ls src)"

${SRC_FILES}:
	sudo docker build -t rest-desafio .

all: ${SRC_FILES}
	docker-compose up -d