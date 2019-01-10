Correcciones Sonia Bravo para Yared Santiago

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

- Due to corrections, in the POST endpoint, you can't put another element but a STRING. Indeed, what I tried, is that "destination" request you only an email like the only one possible option.

- I made a limit for the length of both destination and body. For the destination the limit is 30 characters, and for body, 50, because the first one is a email, and the body is the message.

- If there is another mixtake that isnt in the conditionals statement, we will be able to go putting them into that conditional list, and until that, we notice with a res.status(500) in the catch area.

EXERCISE 3 ------------------------------------------------------------------------------------------->

- in the docker-compose.yml we added a new container "mongo" for the DB connection.

- In app.js I created the app.use route for the GET.

- Then, in ModulePos.js, we have the POST route, and I agree the .SAVE() function, with a conditional inside the catch. With this catch I tried to manage the TIMEOUT and KEEP TRYING(NO answer), and then I made a few test with differents timeouts. A good one is TIMEOUT:3000. With 3 seconds you can test one time and another time and it will show you the 3 options OK, NO, TIMEOUT.

- Two components created. One for saving new messages and other one for the GET route.

* ¿Qué pasa si se envía si la base de datos da un error? 

Pasa que el mensaje se envía, pero no hay confirmación de éxito de la llamada externa. Si por ejemplo tuviesemos un cliente que hace una compra en una web online, y aunque la compra se realiza, a él no le consta con un registro procedente. Así que yo optaría por intentarlo una y otra vez, probaría a dar diferentes TIMEOUTS, hasta haber provocando que ambos procesos se realizaran procedentemente.


* ¿Es igual de importante el error en el envío de un mensaje o en la consulta del registro? Pensar cómo gestionar los errores en cada caso para garantizar la consistencia en los datos de acuerdo al contrato del registro.

Si, pero depende del servicio y la aplicación que se esté usando. Alguna de las medidas a tomar podrían ser las siguientes.

- Notificar correctamente con control de errores, tanto en el then como en los catch. 
- Cada uno con sus respectivos errores, basados en los problemas que surjan, con esto me refiero a no poner un mismo tipo de error para todo, cada uno con errores explicativos y sus res.send("blablabla") debidamente explicados.
- Condicionar, de esta manera acotaremos los márgenes de error.
