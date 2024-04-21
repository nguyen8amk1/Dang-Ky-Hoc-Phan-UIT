#!/bin/bash

# Initialize variables
update_flag=false
commit_flag=false
push_flag=false

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# echo $script_dir

# Set the script to exit immediately if any command exits with a non-zero status
set -e

# Parse command line options
while [[ $# -gt 0 ]]; do
	case "$1" in
	-u | --update)
		update_flag=true
		shift
		;;
	-c | --commit)
		commit_flag=true
		shift
		;;
	-p | --push)
		push_flag=true
		shift
		;;
	*)
		echo "Invalid option: $1"
		exit 1
		;;
	esac
done

image_tag_name="nguyen8a/dev-nalendar-app:latest"

build_docker_image() {
	if ! sudo docker build --tag $image_tag_name --file "$script_dir/Dev-Dockerfile" $script_dir; then
		echo "Error: Something wrong with docker build process"
		exit 1
	fi
}

run_and_link_docker_image() {
	if ! sudo docker run --name dev_nalendar_app_container -p 3000:3000 --rm \
		-v "$script_dir/src":"/app/src" \
		-v "/app/node_modules" \
		$image_tag_name; then
		echo "Error: Something wrong with docker run process"
		exit 1
	fi
}

push_docker_image() {
	if ! sudo docker push $image_tag_name; then
		echo "Error: Something wrong with docker push process"
		exit 1
	fi
}

# Perform default action if no flags provided
if ! $update_flag && ! $commit_flag && ! $push_flag; then
	echo "Run the client Docker Image"
	echo "Connect the src volume to the Docker Container"
	run_and_link_docker_image
fi

# Perform actions based on flags
if [ "$update_flag" = true ]; then
	echo "Rebuild the Image"
	build_docker_image

	echo "Run the New Docker Image"
	echo "Connect the src volume to the Docker Container"
	run_and_link_docker_image
fi

if [ "$commit_flag" = true ]; then
	echo "Rebuild the Image"
	build_docker_image
fi

if [ "$push_flag" = true ]; then
	echo "Push the image to Docker Hub"
	push_docker_image
fi
