INSTALACION

git clone <repo-url>
cd bindin-test
npm install
npm run android

SETUP PARA ANDROID STUDIO
En caso de que no tengas en entorno de android studio configurado, aca te dejo dos guias que te van a servir
https://reactnative.dev/docs/set-up-your-environment
https://developer.android.com/tools/variables?hl=es-419

NOTAS SOBRE LA APP 
Hice un simple creador de encuestas. En el home hay 2 encuestas que inclui como dummy data para que no este vacio.
Use router.push de expo router, cuando lo correcto es usar router.navigate porque es una app sencilla, y la verdad que con el numero de screens que tengo, respetar el orden del stack no me trae ningun beneficio, y router.push es lo mas rapido.
Tambien se estan creando los uuid de manera aleatoria por simplicidad.
Los estilos son un poco precarios, pero preferi concentrarme en la funcionalidad, hacer lo visual es mas facil.