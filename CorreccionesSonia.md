1) Body payload diferente de destination y body
2) Quitar la , en el body payload

3) Puedes poner números, emoticonos y signos como / ` ´ + * ... en el string, hay que excluir esos caracteres con una regular expression.

4) Puedes poner frases muy largas, hay que limitar número de caracteres.

5) Aunque la ruta esté bien hay veces que entra por el catch, fallo de servidor. 
Cambia de servicio, no es muy bueno :)

6) Al poner comillas simples en body payload peta, aunque envies body: string, destination: string.

7) No puedes poner arrays, objetos, booleanos