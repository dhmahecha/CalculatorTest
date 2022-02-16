# calculator-test: a simple calculator-test

`calculator-app` Es una calculadora simple que permite realizar operaciones sobre un conjunto de números

## Installación local:

#### Prerrequisitos de intalación:
- npm 8.5
- nodejs 16

#### Descarga del código fuente
Usando `git` usted puede descargar el código fuente de la aplicación almacenado en Github.
	git clone https://github.com/dhmahecha/CalculatorTest.git

Dentro del código fuente descargado de la aplicación ejecute:
	npm install

se instalarán las dependencias que se requieren para la correcta ejecución de la aplicación.	

## Installación docker:

#### Prerrequisitos de intalación:
- Engine v2.2.3

#### Instalación descargando imagen de Docker Hub
Descargue la imagen usando el siguiente comando:
	docker pull dhmahecha/dckappgatetest:97
	
#### Instalación usando el archivo DockerFile
Ubiquese dentro de las fuentes de la aplicación y ejecute el siguiente comando para compilar la imagen:
	docker build -t dckappgatetest .


## Configuración:
#### Local:
La puesta en marcha de la aplicación se hace ubicandose dentro de la carpeta de fuentes, ejecutando el siguiente comando en una terminal:
	npm start

#### Docker:
La puesta en marcha con docker se hace ejecutando el siguiente comando en una terminal:
##### Descarga de imagen de Docker Hub:
	docker run -p 3000:3000 -d dckappgatetest:97
##### Imagen compilada localmente:
	docker run -p 3000:3000 -d dckappgatetest


## Uso:	
La aplicación por defecto corre sobre el puerto `3000`

*Ahora visite la dirección url http://localhost:3000*

![Puesta en marcha puerto 3000](https://user-images.githubusercontent.com/21015154/154171788-680c8c0f-861c-4406-89d2-66dea9a80587.PNG)

### Uso de las API:

#### Operations

| Recurso | HTTP method | URL | Path params | Body | Response |
| ------------- |:-------------:|-------------|-------------|-------------|-------------|
|get_session|GET|http[s]://host:[puerto]/calculator/v1/sessions|id:string(identificador de la sesión)||respuesta:Respuesta(esquema de tipo respuesta)|
|add_operand|POST|http[s]://host:[puerto]/calculator/v1/sessions/{id}/operands||operand:Operand|respuesta:Respuesta(esquema de tipo respuesta)|
|add_operand|POST|http[s]://host:[puerto]/calculator/v1/sessions/{id}/operations||operation:Operation(esquema de tipo calculadora)|respuesta:Respuesta(esquema de tipo respuesta)|

#### Schemes
##### Calculator
|Attribute|Type|Required|Enum|
| ------------- |:-------------:|-------------|-------------|
|operation|String|false|(Addition, Substraction, Multiplication, Division, Power)|
|operands|Array[double]|true||
|result|double|false||

##### Mensaje
|Attribute|Type|Required|Enum|
| ------------- |:-------------:|-------------|-------------|
|tipo|String|true|(INFO, WARNING, ERROR, FATAL)|
|codigo|Integer|true||
|mensaje|String|true||
|descripcion|String|true||

##### Respuesta
|Attribute|Type|Required|Enum|
| ------------- |:-------------:|-------------|-------------|
|resultados|Array[object]|false||
|totalRegistros|Integer|true||
|estampaTiempo|String|true||
|mensajes|Array[Mensaje]|false||

##### Operand
|Attribute|Type|Required|Enum|
| ------------- |:-------------:|-------------|-------------|
|number|double|true||

##### Operation
|Attribute|Type|Required|Enum|
| ------------- |:-------------:|-------------|-------------|
|operation|string|true|(ADDITION, SUBSTRACTION, MULTIPLICATION, DIVISION, POWER)|

##### Session
|Attribute|Type|Required|Enum|
| ------------- |:-------------:|-------------|-------------|
|id|String|true||
|fecha|String|true||

A continuación se adjunta el contrato en especificación OpenApi 3.1:

#### Ejecución
##### Curl
Para ejecutar con curl se debn ejecutar los siguientes comandos en la terminal:

- Generar Sesión Linux y windows
	curl -v http://localhost:3000/calculator/v1/sessions
- Agregar operando Windows
	curl http://localhost:3000/calculator/v1/sessions/66efb3c5-850c-498f-862b-20b5e182b7b5/operands -H "Content-type:application/json" -X POST -d "{""number"" : 1}"
- Realizar Operación Windows
	curl http://localhost:3000/calculator/v1/sessions/66efb3c5-850c-498f-862b-20b5e182b7b5/operations -H "Content-type:application/json" -X POST -d "{""operation"" : ""Addition""}"
- Agregar operando Linux	
	curl -d '{"number" : 1}' -H 'Content-Type: application/json'  http://localhost:3000/calculator/v1/sessions/66efb3c5-850c-498f-862b-20b5e182b7b5/operands
- Agregar operación Linux	
	curl -d '{"operation" : "Substraction" }' -H 'Content-Type: application/json'  http://localhost:3000/calculator/v1/sessions/66efb3c5-850c-498f-862b-20b5e182b7b5/operations

### Diagrama estrategía DevOps:

![Diagrama estrategía DevOps](https://user-images.githubusercontent.com/21015154/153311782-de04a3d5-c959-4b33-9e88-6d6c02f095c0.PNG)

Se hizo la configuración de los pipelines de Integración y despliegue continuo en Azure Devops para dos ambientes:
- Desarrollo
- Producción

![Proyecto de azure DevOps](https://user-images.githubusercontent.com/21015154/154193777-99a33ab7-408b-45ae-934d-fb7d05a53e1d.PNG)

Se configuro un servidor VM Cloud, Self-hosted Agent para resolver las tareas configuradas en los pipeline tipo Linux Ubuntu y se le instalo lo siguiente.
- npm
- NodeJs
- Docker Engine
- Software Agent Azure DevOps para Linux.

Se Configuraron las siguientes tareas para el ambiente de Integración Continua:
- Bash para crear carpeta del proyecto en el Agente
- npm install: Para instalar dependencias
- npm test: Para ejecución de pruebas unitarias con Mocha. Genera un reporte en html.
- npm audit: Busca vulnerabilidades en la aplicación.
- Build and push: Compila la aplicación, crea la imagen de Docker y la sube en el Docker Hub Registry.

![Integración Continua](https://user-images.githubusercontent.com/21015154/154193937-7dc12756-e863-4835-9dae-e4044a9d7756.PNG)

Se configuraron tareas por ambiente(Dev, Prod) para Despliegue Continuo:
- Tarea para despliegue en servidor Web App para containers. Descarga la imagen creada por el pipeline de integración continua y la despliega en un servidor web para containers de Azure. 
- Tarea para reiniciar el servidor.

![Despliegue Continuo](https://user-images.githubusercontent.com/21015154/154193841-5b7a8760-9075-409b-98b4-a33d0e389c60.PNG)


Para cada ambiente se configuro un servidor Web App for containers.
- Desarrollo: https://dockercalculatortestdev.azurewebsites.net/
- Producción: https://dockercalculatortest.azurewebsites.net/



