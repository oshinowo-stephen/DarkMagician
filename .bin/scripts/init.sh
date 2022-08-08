#!/bin/bash

# Updating & Installing deps

sudo apt update -y
sudo apt upgrade -y

node --version &> /dev/null
if [ "$?" == "0" ]; then
	echo "An installation of NodeJS is already found, resuming..."
else
	curl -sL https://deb.nodesource.com/setup_16.x -o ./nodesource_setup.sh

	sudo bash ./nodesource_setup

	sudo rm ./nodesource_setup
fi

# Setting up the database...

# ignoring this for now...
# ./.bin/scripts/storage/perms.sh

./.bin/scripts/storage/init.sh
./.bin/scripts/storage/tables/mg_raw.sh
./.bin/scripts/storage/tables/mg_main.sh


