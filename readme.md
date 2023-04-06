// Pega o token
curl -d '@login-example.json' -H "Content-Type: application/json" -X POST http://localhost:3000/api/login                                                        

// Analisa a amostra
curl --header "x-access-token: ${token}" -d '@sample-analysis-example.json' -H "Content-Type: application/json" -X POST http://localhost:3000/api/sample-analysis

// Retorna o histórico de consultas
curl --header "x-access-token: ${token}" -X GET http://localhost:3000/api/sample-historicals
