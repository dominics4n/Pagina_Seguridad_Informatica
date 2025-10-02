# Pagina_Seguridad_Informatica

## Cómo instalar
Clonar repositorio 
~~~
git clone https://github.com/dominics4n/Pagina_Seguridad_Informatica.git
cd Pagina_Seguridad_Informatica
~~~
Instalar dependencias
~~~
npm install
~~~
Configurar variables de entorno:
- Crear archiv **.env** con los siguientes datos:
~~~
JWT_KEY="ACryptogramRecordingOfThisSongWillBeOurEpitaph"
URI ="mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<DBNAME>?retryWrites=true&w=majority"
DBNAME ="Nombre_de_tu_DB"
COLLECTIONNAME ="Nombre_de_tu_coleccion"
~~~
Ejecutar proyecto (modo desarrollo)
~~~
npm run dev
~~~
O normal
~~~
npm run build
npm run start
~~~
Abrir navegador en 
~~~
http://localhost:3000
~~~

