# AWS Cognito

> With Amazon Cognito, you can focus on creating great app experiences instead of worrying about building, securing, and scaling a solution to handle user management, authentication, and sync across devices.
>
> *Fuente:  [Documentación de AWS Cognito](http://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html)

## Costo

| Tier                   | Precio por MAU |
| ---------------------- | -------------- |
| Primeros 50.000 MAUs   | Gratis         |
| Siguientes 50.000 MAUs | $0,00550       |

Un MAU corresponde a un usuario que haya interactuado con los servicios de Cognito en el mes.

## Crear un User-Pool a traves de la CLI

```
aws cognito-idp create-user-pool \
	--pool-name [String]<nombre del pool> \
	--policies [Structure]<politicas asociadas> \
	--lambda-config [Structure]<configuración de triggers lambda> \
	--auto-verified-attributes [List]<atributos para verificar>   \
	--alias-attributes [List]<atributos alias soportados> \
	--sms-verification-message [String]<mensaje de verificación por SMS> \
	--email-verification-message [String]<mensaje de verificación por email> \
	--email-verification-subject [String]<asunto de email de verificación> \
	--sms-authentication-message <value>
	--mfa-configuration <value>	
	--device-configuration <value>
	--email-configuration <value>
	--sms-configuration <value>
	--user-pool-tags <value>
	--admin-create-user-config <value>
	--schema <value>
	--cli-input-json <value>
	--generate-cli-skeleton <value>
	
```

OBS: Los comandos tipo structure puedes pasarse como "shorthand" o "json":

```
# Shorthand
PasswordPolicy={MinimumLength=integer,RequireUppercase=boolean,RequireLowercase=boolean,RequireNumbers=boolean,RequireSymbols=boolean}

#JSON
{
  "PasswordPolicy": {
    "MinimumLength": integer,
    "RequireUppercase": true|false,
    "RequireLowercase": true|false,
    "RequireNumbers": true|false,
    "RequireSymbols": true|false
  }
}
```

## Configurar AWS Cognito Identity SDK para JavaScript para trabajar con User Pools

Primero es necesario configurar el SDK para funcionar en el explorador. Este SDK depende del servicio `CognitoIdentityServiceProvider` del AWS SDK para JavaScript. Este servicio:

- Se puede agregar como una dependencia dentro del HTML de la página.
- Se puede instalar a través de `npm` e integrar con la aplicación utilizando `webpack`.

### Instalar AWS Cognito Identity SDK usando `npm` y `webpack`

```
npm install --save-dev webpack json-loader
npm install --save amazon-cognito-identity-js
```

Luego de instalara las dependencias hay que incluir dentro del archivo de configuración de webpack `webpack.config.js` lo siguiente:

```javascript
module.exports = {
  entry: './src/entry',
  output: {
    path: 'dist',
    filename: 'app.js',
  },
  module: {
    loaders: [{
      test: /\.json$/,
      loader: 'json-loader',
    }]
  }
}
```

Al correr el comando `webpack` se incluira el servicio en el bundle final.

Para acceder al User Pool se necesitan dos valores de la cuenta en AWS:

1. User pool id: `us-east-1_aB12cD343`.
2. User pool App Client Id: `7ghr5379orhbo88d52vphda6s9`.

OBS: Las aplicaciones de JavaScript no soportan la configuración de secretos en la configuración de los App Clients.

Para un ejemplo de como configurar esto junto con `babel` y `react` veríficar este link: [Babel webpack example](https://github.com/aws/amazon-cognito-identity-js/tree/master/examples/babel-webpack).

## Como utilizar los tokens creados por User Pools

Una vez que un usuario es autenticado por Cognito, se le asignan tres tokens:

1. ID token.
2. Access token.
3. Refresh token.

### ID token

- Formato: JWT.
- Contiene los claims sobre la identidad de el usuario.
- Se puede utilizar este token para validar acciones contra el servidor de la aplicación.
- En este caso se debe validar el token para poder confiar en el.
- Este token expira tras una hora. No se deben procesar tokens expirados.

### Access Token

- Formato: JWT.
- Contiene "claims" del usuario autenticado pero no toda su información personal.
- Su proposito general es el de validar acciones en el contexto del usuario dentro de el user pool. Por ejemplo, para modificar sus atributos.
- También puede usarse para validar acciones contra el servidor o los servicios de la aplicación. Es importante validar este token antes de confiar en el.
- Este token expira tras una hora. No se deben procesar tokens expirados.

### Refresh Token

- Formato: texto.
- Solo debe utilizarse para pedir un nuevo access o ID token de Cognito.
- Por defecto, este token expira luego de 30 días. Se puede cambiar este tiempo desde Cognito.
- Para utilizar el token es necesario utilizar la API "AdminInitiateAuth", pasando `REFRESH_TOKEN_AUTH` como parámetro `AuthFlow`, y el refresh token para el `Auth Parameters` usando la clave `REFRESH_TOKEN`.

### Estructura de los Tokens

Los tokens tipo JWT cuentan con tres partes: header, payload, y la firma.

#### Header

Los headers contienen dos piezas de información:

- `kid`: Valor utilizado para obtener la clave pública que verífica la firma del ID token.
- `alg`: representa el algoritmo utilizado para asegurar el token.

```json
{
  "alg": "RS256",
  "kid": "samplekid..."
}
```

#### Payload

El payload contiene los "claims" correspondientes al usuario. Para más información sobre los que es un claim referise a la especifiación [RFC7519](https://tools.ietf.org/html/rfc7519).

Estos "claims" se incluyen por defecto en todos los tokens:

- `iss`: identifica quien entrego el token.
- `sub`: el UUID del usuario autenticado. **No es lo mismo que el `username`**.
- `aud`: contiene el `client_id` utilizado por el usuario para autenticarse.
- `token_use`: define el proposito del token. Su valor debería ser siempre `id` o `access`, dependiendo del token.

Además, en los `idTokens` se incluyen todos los atributos de el usuario, aún los creados por el usuario identificados con el prefijo: `custom:`.

#### Signature

String de texto que valida el token.

### Utilización de los Tokens en una API web

Los siguientes pasos describen los pasos a seguir para procesar los `id` y `access` tokens en una API web:

1. Descargar y almacenar los JSON Web Token Set para su "user pool". Los mismos se pueden encontrar en la dirección: `https://cognito-idp.{region}.amazonaws.com/{userPoolId}/.well-known/jwks.json`. Este paso es realizado una única vez. 
2. Decodificar los JWT de `base64` a JSON.
3. Confirmar que el "claim" `iss` del header,  coincida con el "user pool" de la aplicación. Por ejemplo: `https://cognito-idp.us-east-1.amazonaws.com/{userPoolId}`.
4. Confirmar el `token_use` "claim":
   1. Si solo se aceptan tokens de tipo `access` su valor debe ser `access`.
   2. Si solo se aceptan tokens de tipo `id` su valor debe ser `id`.
   3. Si se aceptan los dos, su valor debe ser `id` o `access`
5. Tomar el `kid` de el header y obtener su correspondiente JSON Web Key, almacenado en el paso 1.
6. Veríficar la firma de el token decodificado.
7. Veridicar el valor de el "claim" `exp` para veríficar que el token no haya expirado.

Una vez completado este proceso se puede continuar o cancelar la acción de el usuario.

