# Resultado Final

## RECUPERACIÓN
> [!NOTE]
> Estos alumnos tienen hasta el lunes 8 para presentar las correcciones
>
58725 - **Garcia Bulacio**, Micaela             
> **Corregir TP3**
>
> *La alta funciona solo algunas veces*
>
> *Agrega el ID antes de agregar el producto*
>

50657 - **Ramirez**, Giselle Evelyn             
> **Corregir TP3**
>
> *No edita en el lugar*
>
> *No incrementa el producto*
>


#### Promocionados
1. 59265 - **Cavanna**, Victoria                   
1. 55505 - **Chazarreta Robles**, María            
1. 50694 - **Ferrari**, Stefano                    
1. 59417 - **Gómez Iturre**, Joaquín               
1. 59093 - **Ledesma**, Facundo Osvaldo            
1. 59200 - **López**, Tiago Gabriel                
1. 55466 - **Medina**, Álvaro Ignacio              
1. 55986 - **Paz**, Octavio Emanuel                
1. 59690 - **Rios**, Yanina Gisele                 

#### Regulares
1. 59097 - **Martin Ibarra**, Patricio             
1. 58798 - **Salazar**, Santiago                   
1. 58800 - **Valdez**, Miguel Angel                

#### Libres
1. 59263 - **Acosta**, Facundo                     
1. 50704 - **Juarez**, Pablo Agustín               
1. 55896 - **Lacroix**, Cristian Josué             
1. 50753 - **Villafañe Assef**, Oscar              
---
## ¿Cómo se rinde el examen final?

Para rendir, debes desarrollar y defender una aplicación que:

> **Implemente una agenda de contactos multiusuario**

La misma debe ser desarrollada en *React*, implementando la funcionalidad usando *Express* y persistiendo los datos con *MongoDB*.

La defensa consistirá en ejecutar la aplicación para mostrar la funcionalidad y, si está correctamente implementada, deberás mostrar el código fuente y explicar cómo funcionan las partes que se te indiquen.

### Funcionalidad requerida
1. En la esquina superior izquierda debe ir el nombre del sitio.
2. En la esquina superior derecha deben haber dos botones: "Registrar" e "Ingresar", cuando no haya ningún usuario identificado.
3. Cuando el usuario haya ingresado, en la esquina izquierda debe estar el nombre del usuario y un botón "Salir".
4. Al pulsar en el nombre del usuario se debera poder editar los datos del mismo.
5. El sitio debe mostrar inicialmente una lista de contactos públicos ordenados por apellido y nombre.
6. El usuario que se registre podrá agregar nuevos contactos.
7. Los usuarios, al identificarse, podrán ver sus propios contactos y los contactos públicos que estén visibles.
8. Los usuarios son propietarios de los contactos que crean, siempre podrán visualizar sus contactos, editarlos o borrarlos. 
9. Los usuarios podrán hacer público o poner privado sus contactos mediante un botón asociado a los mismos.
10. Las altas y la edición, así como la registración y el ingreso, se deben hacer en una página separada y, al completar la misma, debe regresar a la página principal.
11. Debe existir un usuario administrador que pueda visualizar todos los contactos, ya sean públicos o privados, estén visibles o no.
12. El usuario administrador puede ocultar o mostrar los contactos públicos mediante un botón que aparece en cada contacto.
13. Los usuarios se deben guardar como contactos privados con una contraseña asociada. 
14. Los usuarios no deberan aparecer en el listado de contactos.

Los contactos deben tener:
- Nombre y Apellido (obligatorio)
- Empresa     
- Domicilio   
- Teléfonos 
- Email       (obligatorio)
- Propietario (usuario que lo creó)
- Es Público  (definido por el usuario propietario)
- Es Visible  (definido por el administrador)
- Contraseña  (en caso de ser un usuario)