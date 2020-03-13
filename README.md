# COVID19-PY

> Sistema que extrae del sitio web del MSPBS la cantidad de personas confirmadas con COVID19.

### Demo

[Api COVID19-PY](https://covid19-py.herokuapp.com/)

### Como se instala ?

```bash
git clone https://github.com/cabupy/covid19-py.git
cd covid19-py
npm install
touch .env
nodemon server
```
### DOTENV

Utilizamos un archivo .env para configurar las variables de entorno process.env.IP y process.env.PORT

```env
IP=localhost
PORT=45500
```

### If you Fork repo covid19-py.git

En caso de que hagan un `Fork` del repositorio, con estos pasos lo pueden
mantener actualizado. Y así tambien colaborar con el proyecto y enviar sus `PRs`. 

```bash
git remote add upstream https://github.com/cabupy/covid19-py.git
git fetch upstream
git checkout master
git merge upstream/master
git push
```
### Autor:

- `Cabu Vallejos`

### Licencia MIT: [Licencia](https://github.com/cabupy/covid19-py/blob/master/LICENSE)