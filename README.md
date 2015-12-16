# blueprint-node

Install with:

``` 
npm install 
```

Install kitematic https://www.docker.com/docker-toolbox. Once installed, add elasticsearch and postgres containers. 
You will want to set postgres to run off port 5432 and elastic off 9200 and 9300.

If elasticsearch binds to 127.0.0.1 in the continer, you will want to manually launch that container with the -Des.network.host flag like this:

```
docker run -d --name es -p 9200:9200 elasticsearch:2 -Des.network.host=0.0.0.0
```

Install jasmine-node then run jasmine test specs with:

``` 
jasmine-node specs
```

