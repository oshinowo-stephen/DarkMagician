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

chmod +x .bin/scripts/db/perms.sh
chmod +x .bin/scripts/db/tables.sh

./.bin/scripts/db/perms.sh
./.bin/scripts/db/tables.sh