if ! sudo docker-compose --file ./dev-docker-compose.yml up; then
	echo "Error: Something wrong with docker compose"
	exit 0
fi
