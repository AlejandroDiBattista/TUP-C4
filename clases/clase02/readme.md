# Demostración de página dinámica

La página muestra como puede ser generado
el contenido mediante JavaScript

En funciones.js se define varias funciones.
- valor: crea el html necesario para mostrar
  un campo. La etiqueta + nombre 
- persona: crea el html para mostrar los datos 
  de la persona. En este caso muestra apellido y nombre 
  usando el componente "valor"
- generarLista: A partir de una lista de personas
  genera el html para mostrar cada una de las personas
  y lo coloca en el div de la página identificado por "lista"

El archivo CSS simplemente hace que la lista se vea 
centrada y las personas en un recuadro

El archivo principal "index.js" tiene al final
el codigo js que permite a partir de una lista de 
personas generar el html para cada una de ellas.