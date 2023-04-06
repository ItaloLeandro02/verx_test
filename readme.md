# VERX TEST

Aplicação para a candidatura do cargo de desenvolvedor Node.js.

## Sobre

* Por padrão, à aplicação será executada na porta 3000 
* Utilize o prefixo "/api" nas requisições
* Caso o limit não seja informado nas rotas de consultas será retornado o valor 5 como padrão e com limite para 50 itens

## Instalação

```bash
npm i
```
## Execução

Docker: 

```bash
npm run up
```
Local: 
```bash
npm run build
npm run start
```

## Migrations

Docker: 

```bash
docker exec -it api-container bash
npm run migration:latest:docker
```
Local: 
```bash
npm run migration:latest
```

## Seeds

Docker: 

```bash
docker exec -it api-container bash
npm run seed:run:docker
```
Local: 
```bash
npm run seed:run
```

## Utilização

### Obteção do token

```bash
curl -d '{"email": "verx@mail.com.br", "password": "123345"}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/login
```
### Analisar uma amostra

```bash
curl --header "x-access-token: ${token}" -d '{"codigoAmostra": "02383322","cocaina": "0.678","anfetamina": "0.1","metanfetamina": "0.1","mda": "0.1","mdma": "0","thc": "0.04","morfina": "0.1","codeina": "0.1","heroina": "0.1","benzoilecgonina": " 0","cocaetileno": "0","norcocaina": "0"}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/sample-analysis
```

### Consultar históricos de análises

```bash
curl --header "x-access-token: ${token}" -X GET http://localhost:3000/api/sample-historicals?limit=10&offset=0
```

## Tecnologias utilizadas

* Node.js 
* Knexjs
* Docker
* JWT Token
* Bcrypt
* Faker
* Express
* Validator
* Supertes
* Module Alias