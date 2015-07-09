# docker-nginx-nodejs-cluster-test

A Docker container with nginx + 4 node processes (2 single processes and 2 clustered processes). So the total number of backends are 6 on 4 TCP ports.

- Docker container
    - Nginx (80)
        - backend1 (8000): 1 single process
        - backend2 (8001): 2 worker processes (+ 1 master)
        - backend3 (8002): 1 single process
        - backend4 (8003): 2 worker processes (+ 1 master)

Test run:
```bash
docker build -t test . && docker run -e ENV1=v1 -e ENV2=v2 -d -P --name test test && docker logs -f test
```

To stop:
```bash
docker stop test; docker rm test
```
