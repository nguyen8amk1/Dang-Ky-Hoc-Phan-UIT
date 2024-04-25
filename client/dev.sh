#!/bin/bash

# Initialize variables
install_flag=false

install_deps=false

commit_flag=false
push_flag=false

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# echo $script_dir

# Set the script to exit immediately if any command exits with a non-zero status
set -e

# Parse command line options
while [[ $# -gt 0 ]]; do
	case "$1" in
	-i | --install)
		install_flag=true
		install_deps=true
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
		# 1. Input all the dependencies -> ./dev.sh --install express react ...
		if $install_deps; then
			dependencies+=("$1")
		else
			echo "Invalid option: $1"
			exit 1
		fi
		shift
		;;

		# echo "Invalid option: $1"
		# exit 1
		# ;;
	esac
done

image_tag_name="nguyen8a/dev-nalendar-app:latest"
container_name="dev_nalendar_app_container"

build_docker_image() {
	if ! sudo docker build --tag $image_tag_name --file "$script_dir/Dev-Dockerfile" $script_dir; then
		echo "Error: Something wrong with docker build process"
		exit 1
	fi
}

run_and_link_docker_image() {
	if ! sudo docker run --name $container_name -p 3000:3000 --rm \
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

generate_docker_file_content() {
	# 2. Generate the docker file content
	echo "FROM $image_tag_name AS build"
	for dep in "${dependencies[@]}"; do
		echo "RUN npm install $dep"
	done
}

dependencies_processing() {
	local output=""
	for dep in "${dependencies[@]}"; do
		local dep_format_regex="^([a-zA-Z0-9._-]+)@([0-9]+(\.[0-9]+)*(\.[0-9]+)*)$"
		if [[ $dep =~ $dep_format_regex ]]; then
			# echo "Dependency format is correct: $dep"
			local package="${BASH_REMATCH[1]}"
			local version="${BASH_REMATCH[2]}"
			output+="\"$package\": \"^$version\",\n"
		else
			# echo "Dependency format is incorrect: $dep"
			local version=$(curl -s https://registry.npmjs.org/$dep/latest | grep -oP '(?<="version":")[^"]+')
			output+="\"$dep\": \"^$version\",\n"
		fi
	done
	echo -e "$output"
}

# Example usage
install_new_dependencies() {
	# NOTE:
	#   Install these 2 steps in a loop rather (for each of the dep)

	# TODO:
	# 1. Parse version from the dep args [X]
	#   -> input: package arg string
	#   -> output: package name, version
	# if the install don't specify version, get the version yourself
	#   -> npm show <package> version | awk 'NR==1{print $1}'
	#   or
	#   -> curl -s https://registry.npmjs.org/<package>/latest | grep -oP '(?<="version":")[^"]+'
	# else
	#   parse the version out of the dep args
	#
	# TODO:
	# 2. put the dependencies json to the package.json file, in the right place :)) @Current
	# put to the top of the dependencies { <dependencies>, the old ones }

	echo "Installing new dependencies:"

	echo $(dependencies_processing)

	# 3. push the content to this file $script_dir/Temp-Install_New_Dependencies-Dockerfile
	generate_docker_file_content >$script_dir/Temp-Install_New_Dependencies-Dockerfile

	if ! sudo docker build --tag $image_tag_name --file $script_dir/Temp-Install_New_Dependencies-Dockerfile $script_dir; then
		echo "Error: Something wrong with installing new dependencies process"
		rm $script_dir/Temp-Install_New_Dependencies-Dockerfile
		exit 0
	fi

	rm $script_dir/Temp-Install_New_Dependencies-Dockerfile
}

# Perform default action if no flags provided
if ! $install_flag && ! $commit_flag && ! $push_flag; then
	echo "Run the client Docker Image"
	echo "Connect the src volume to the Docker Container"
	run_and_link_docker_image
fi

container_running() {
	local container_name="$1"
	local container_status=$(sudo docker inspect -f '{{.State.Running}}' "$container_name" 2>/dev/null)

	if [ "$container_status" == "true" ]; then
		echo "Container '$container_name' is running."
		return 0 # Container is running
	else
		echo "Container '$container_name' is not running."
		return 1 # Container is not running
	fi
}

# Perform actions based on flags
if [ "$install_flag" = true ]; then
	if container_running "$container_name"; then
		echo "Docker Kill the old $container_name container"
		sudo docker rm -f $container_name
	fi

	echo "Install New Dependencies"
	install_new_dependencies

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
