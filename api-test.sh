#!/bin/bash

# Test GET request
echo "Testing GET request..."
curl -X GET http://localhost:3000/api/v1/user
echo -e "\n"

# Test POST request
echo "Testing POST request..."
curl -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d '{"name":"John Doe", "email":"john@example.com"}'
echo -e "\n"

# Test PUT request
echo "Testing PUT request..."
curl -X PUT http://localhost:3000/api/users/1 -H "Content-Type: application/json" -d '{"name":"Jane Doe", "email":"jane@example.com"}'
echo -e "\n"

# Test DELETE request
echo "Testing DELETE request..."
curl -X DELETE http://localhost:3000/api/users/1
echo -e "\n"

