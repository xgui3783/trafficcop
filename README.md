# Traffic Cop

Redirects incoming http requests to a different protocol://host:port, preserving path, query param.

## Repository

https://github.com/xgui3783/trafficcop

## Example

```sh
docker run --name trafficcop \
    --rm \
    -d \
    --env PORT=5001 \
    --env REDIRECT_URL=http://my-other-domain:1256 \
    xgui3783/trafficcop
```

## License

MIT
