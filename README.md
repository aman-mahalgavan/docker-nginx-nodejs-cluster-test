# docker-nginx-nodejs-cluster-test

A Docker container with nginx + 4 node processes (2 single processes and 2 clustered processes). So the total number of backends are 6 on 4 TCP ports.

Test run:
```bash
docker build -t test . && docker run -e ENV1=v1 -e ENV2=v2 -d -P --name test test && docker logs -f test
```

To stop:
```bash
docker stop test; docker rm test
```
