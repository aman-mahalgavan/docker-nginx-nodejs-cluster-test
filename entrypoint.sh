#!/bin/sh

TERM_F=./termfile

trap "{ service nginx stop; forever stopall; touch ${TERM_F}; }" SIGTERM

LISTEN_PORT=8000 WORKER_COUNT=1 forever --killSignal SIGTERM --minUptime 1000 --spinSleepTime 1000 -a -u backend1 -c "node --harmony" server.js &
LISTEN_PORT=8001 WORKER_COUNT=2 forever --killSignal SIGTERM --minUptime 1000 --spinSleepTime 1000 -a -u backend2 -c "node --harmony" server.js &
LISTEN_PORT=8002 WORKER_COUNT=1 forever --killSignal SIGTERM --minUptime 1000 --spinSleepTime 1000 -a -u backend3 -c "node --harmony" server.js &
LISTEN_PORT=8003 WORKER_COUNT=2 forever --killSignal SIGTERM --minUptime 1000 --spinSleepTime 1000 -a -u backend4 -c "node --harmony" server.js &

service nginx start

while [ ! -e "${TERM_F}" ]; do sleep 1; done
echo "Shutdown complete."
