# IdealBus API

## URLs de acesso

A api da IdealBus disponibiliza urls de acesso e comunicação seguindo os protocolos HTTP

## Métodos

As requisições para a API devem seguir os seguintes padrões:

| Método | Descrição |
|---|---|
| `GET` | Retorna informações de um ou mais registros. |
| `POST` | Utilizado para criar um novo registro. |
| `PUT` | Atualiza dados de um registro. |
| `DELETE` | Remove dados de um registro. |

## Respostas

| Código | Descrição |
|---|---|
| `200` | Requisição executada com sucesso. |
| `400` | Erros de validação dos dados. |
| `401` | Erros de autenticação. |
| `404` | Registro pesquisado não encontrado. |
| `405` | Não implementado. |
| `500` | Erros internos. |

## Exemplo de requisição

```javascript copy
    fetch('LINK/getinfo', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email: 'exemplo@gmail.com' })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => console.error('Error:', error));
```

> [!NOTE]
> Lembre-se de alterar [LINK] para a url da api.

## Recursos

### Receber informações dos usuários

```javascript copy
    'GET': '/getinfo'
    'BODY': email
```

```json copy
    {
        "nome": "fulano2",
        "email": "novousuario@example.com",
        "layout": 1
        "imagem": "https://"
    }
```

### Alterar dados de um usuário registrado

```javascript copy
    'PUT': '/getinfo/ID'
    'BODY': nome, senha, layout, imagem
```

### Alterar email de um usuário registrado

```javascript copy
    'PUT': '/changeEmail/ID'
    'BODY': email
```

### Alterar senha de um usuário registrado

```javascript copy
    'PUT': '/changePassword/ID'
    'BODY': senha
```

### Receber rotas registradas

```javascript copy
    'GET': '/rotas'
```

```json copy
    [
        {
            "name": "Nome da Rota",
            "stops": [
                {
                    "endereco": "Endereço 1",
                    "latitude": "-19.9106941",
                    "longitude": "-19.9106941",
                    "id": "d7f8dd1a-3aec-435a-9464-18d0beb2332d"
                },
                {
                    "endereco": "Endereço 2",
                    "latitude": "-19.9106942",
                    "longitude": "-19.9106942",
                    "id": "d7f8dd1a-3aec-435a-9464-18d0beb2332e"
                }
            ],
            "alerts": [],
            "id": "69bf89cd-1227-4ee5-b9a7-196762e213c3"
        },
    ]
```

### Receber informações de uma rota registrada

```javascript copy
    'GET': '/rotas/ID'
```

```json copy
    {
        "name": "Nome da Rota",
        "stops": [
            {
                "endereco": "Endereço 1",
                "latitude": "-19.9106941",
                "longitude": "-19.9106941",
                "id": "d7f8dd1a-3aec-435a-9464-18d0beb2332d"
            },
            {
                "endereco": "Endereço 2",
                "latitude": "-19.9106942",
                "longitude": "-19.9106942",
                "id": "d7f8dd1a-3aec-435a-9464-18d0beb2332e"
            }
        ],
        "alerts": [],
        "id": "69bf89cd-1227-4ee5-b9a7-196762e213c3"
    }
```

### Receber paradas registradas

```javascript copy
    'GET': '/paradas'
```

```json copy
    [
        {
            "endereco": "Endereço 1",
            "latitude": "-19.9106941",
            "longitude": "-19.9106941",
            "id": "d7f8dd1a-3aec-435a-9464-18d0beb2332d"
        },
        {
            "endereco": "Endereço 2",
            "latitude": "-19.9106942",
            "longitude": "-19.9106942",
            "id": "d7f8dd1a-3aec-435a-9464-18d0beb2332e"
        },
    ]
```

### Receber informações de uma parada registrada

```javascript copy
    'GET': '/paradas/ID'
```

```json copy
    {
        "endereco": "Endereço 2",
        "latitude": "-19.9106942",
        "longitude": "-19.9106942",
        "id": "d7f8dd1a-3aec-435a-9464-18d0beb2332e"
    }
```

### Receber feedbacks registrados

```javascript copy
    'GET': '/feedbacks'
```

```json copy
    [
        {
            "routeId": "69bf89cd-1227-4ee5-b9a7-196762e213c3",
            "userId": "xxxxx",
            "datetime": "0000000000000",
            "nota": 3,
            "comentario": "Teste de comentário",
            "id": "d7f8dd1a-3aec-435a-9464-18d0beb2332d"
        }
    ]
```

### Receber informações de um feedback registrado

```javascript copy
    'GET': '/feedbacks/ID'
```

```json copy
    {
        "routeId": "69bf89cd-1227-4ee5-b9a7-196762e213c3",
        "userId": "xxxxx",
        "datetime": "0000000000000",
        "nota": 3,
        "comentario": "Teste de comentário",
        "id": "d7f8dd1a-3aec-435a-9464-18d0beb2332d"
    }
```

### Receber endereços registrados

```javascript copy
    'GET': '/enderecos'
```

```json copy
    [
        {
            "userId": "69bf89cd-1227-4ee5-b9a7-196762e213c3",
            "titulo": "Faculdade",
            "rua": "R. Cláudio Manoel",
            "numero": 1162,
            "cep": "30140-100",
            "estado": "Minas Gerais",
            "cidade": "Belo Horizonte",
            "id": "315e17e3-d19a-489c-9648-9e3fb63d9ffe"
        }
    ]
```

### Receber informações de um endereço registrado

```javascript copy
    'GET': '/enderecos/ID'
```

```json copy
    {
        "userId": "69bf89cd-1227-4ee5-b9a7-196762e213c3",
        "titulo": "Faculdade",
        "rua": "R. Cláudio Manoel",
        "numero": 1162,
        "cep": "30140-100",
        "estado": "Minas Gerais",
        "cidade": "Belo Horizonte",
        "id": "315e17e3-d19a-489c-9648-9e3fb63d9ffe"
    }
```