if ! sudo docker build --tag nguyen8a/dev-nalendar-app:latest --file ./Dev-Dockerfile .; then
	echo "Error: Something wrong with docker build process"
	exit 0
fi

if ! sudo docker push nguyen8a/dev-nalendar-app:latest; then
	echo "Error: Something wrong with docker push process"
	exit 0
fi

#api will come later
