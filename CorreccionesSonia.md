1) Body payload diferente de destination y body
2) Quitar la , en el body payload

3) Puedes poner números, emoticonos y signos como / ` ´ + * ... en el string, hay que excluir esos caracteres con una regular expression.

4) Puedes poner frases muy largas, hay que limitar número de caracteres.

5) Aunque la ruta esté bien hay veces que entra por el catch, fallo de servidor. 
Cambia de servicio, no es muy bueno :)

6) Al poner comillas simples en body payload peta, aunque envies body: string, destination: string.

7) No puedes poner arrays, objetos, booleanos


----------------------->

CORRECCIONES: 

La app cuenta con dos ENDPOINTS, 

# GET
HOST 'localhost'
PORT 3000
GET '/'
'Content-Type': "Hello world"



# POST 
HOST 'localhost'
PORT 9001
POST '/messages'
'Content-Type': 'application/json'
{
  "destination": "STRING",
  "message": "STRING"
}

- A raíz de las correcciones, en el endpoint POST, ya no se puede insertar otro elemento que no sea un STRING. De hecho, lo que he intentado es que en destination te pida expresamente que insertes un email para darlo por válido.

- Los caracteres están limitados a 30 en los email y 50 en el caso del body que se suponen que son el mensaje. 

- Si por algún casual va surgiendo algún otro tipo de errores o entradas de codigo no permitidas se irán añadiendo a la estructura de condicionales que he ido desarrollando. Para estos de momento entrarán en el catch con un res.status(500)