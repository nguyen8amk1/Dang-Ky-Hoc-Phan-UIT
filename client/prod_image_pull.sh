if ! sudo docker pull nguyen8a/nalendar-app:latest; then
	echo "Error: Something wrong with docker pull process"
	exit 0
fi

if ! sudo docker run -p 80:80 nguyen8a/nalendar-app:latest -d; then
	echo "Error: Something wrong with docker run process"
	exit 0
fi

#api will come later
