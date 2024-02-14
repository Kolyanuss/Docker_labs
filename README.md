# Docker_labs
## LB1 - DONE!

### How to run lb1
inside lb1 folder run:
- `docker build -t node-lb1 .`
- `docker run -p 3000:3000 node-lb1`

### check in url: http://localhost:3000/cars
when you first start, nothing should be

### To add a new data
- `curl -X POST -H "Content-Type: application/json" -d '{"id": 1, "model": "Toyota", "year": 2022, "price": 25000}' http://localhost:3000/cars`

then check again