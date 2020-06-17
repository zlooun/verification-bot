#!/bin/bash

echo "start build container"
./buildContainer.sh


echo "starting services"
./startServices.sh
