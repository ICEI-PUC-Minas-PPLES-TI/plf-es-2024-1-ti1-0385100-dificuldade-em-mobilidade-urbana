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
| `404` | Registro pesquisado não encontrado. |
| `405` | Não implementado. |

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
    'BODY': 'BODY': nome, senha, layout, imagem
```

| Código | Descrição |
|---|---|
| `200` | Requisição executada com sucesso. |
| `400` | Erros de validação dos dados. |
| `404` | Registro pesquisado não encontrado. |
| `405` | Não implementado. |

### Receber rotas registradas

```javascript copy
    'GET': '/rotas'
```

```json copy
    [
        {
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