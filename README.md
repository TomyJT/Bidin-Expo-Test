
## INSTALACION

```bash
  git clone <repo-url>
```
```bash
  cd bindin-test
```
```bash
  npm install
```

```bash
  npm run android
```

## ENTORNO DE ANDROID STUDIO
En caso de que no tengas en entorno de android studio configurado, aca te dejo dos guias que te van a servir
 - [Android enviroment](https://reactnative.dev/docs/set-up-your-environment)
 - [Variables de entorno](https://developer.android.com/tools/variables?hl=es-419)


## NOTAS SOBRE LA APP 
- Hice un simple creador de encuestas.
- En el home hay 2 encuestas que inclui como dummy data para que no este vacio.
- Use router.push de expo router, cuando lo correcto es usar router.navigate porque es una app sencilla, y la verdad que con el numero de screens que tengo, respetar el orden del stack no me trae ningun beneficio, y router.push es lo mas rapido.
- Se estan creando los uuid de manera aleatoria por simplicidad.
- Los estilos son un poco precarios, pero preferi concentrarme en la funcionalidad, hacer lo visual es mas facil.

## IMPORTANTE
Esta app esta construida solo para el entorno mobile, no hice nada para web, asi que solo va a verse bien en emulador de android o dispositivo android (Como no tengo emulador de IOS, si se usa en un dispositivo IOS puede haber algunas diferencias de diseño)