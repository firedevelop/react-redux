# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

# **Módulo 1: La Fundación - Sintiendo el Dolor que Redux Resuelve (2 horas)**


### **Módulo 1: La Fundación (Versión TypeScript)**

**Objetivo:** El mismo, sentir el "prop drilling", pero ahora con la seguridad y claridad de los tipos.

#### **Parte 1: El Problema del "Prop Drilling" con Tipos (1.5 horas)**

**Paso 1: Prepara tu Lienzo en Blanco (10 mins)**

1. Abre tu proyecto en VS Code.
2. Ve al archivo `src/App.tsx` (fíjate en la extensión `.tsx`, que es para TypeScript con JSX). Bórralo y déjalo así:

   ```tsx
   function App() {
     return (
       <div>
         <h1>Mi Aplicación con TypeScript</h1>
       </div>
     )
   }

   export default App
   ```
3. Borra el archivo `src/App.css`.

**Paso 2: Crea el Árbol de Componentes con Tipos (40 mins)**
Aquí es donde TypeScript empieza a brillar. Vamos a definir explícitamente qué `props` espera cada componente.

1. Crea la carpeta `src/components`.
2. Dentro, crea `ComponenteA.tsx`, `ComponenteB.tsx`, y `ComponenteC.tsx`.
3. **Rellena `ComponenteA.tsx`:**

   ```tsx
   // src/components/ComponenteA.tsx
   import React from 'react';
   import ComponenteB from './ComponenteB';

   // Definimos los tipos de las props que este componente espera recibir
   interface ComponenteAProps {
     theme: string;
     setTheme: React.Dispatch<React.SetStateAction<string>>;
   }

   const ComponenteA: React.FC<ComponenteAProps> = ({ theme, setTheme }) => {
     return (
       <div style={{ padding: '20px', border: '1px solid #ccc' }}>
         <h2>Soy el Componente A</h2>
         <ComponenteB theme={theme} setTheme={setTheme} />
       </div>
     );
   };

   export default ComponenteA;
   ```

   * **Novedad (TypeScript):** Hemos creado una `interface` para definir la "forma" de las props. `React.FC` significa "React Functional Component" y le decimos que sus props serán de tipo `ComponenteAProps`. El tipo `React.Dispatch<...>` es la forma correcta de tipar la función `set` de un `useState`.
4. **Rellena `ComponenteB.tsx`:**

   ```tsx
   // src/components/ComponenteB.tsx
   import React from 'react';
   import ComponenteC from './ComponenteC';

   // ¡Podemos reutilizar los tipos! Aunque lo definiremos aquí para claridad
   interface ComponenteBProps {
     theme: string;
     setTheme: React.Dispatch<React.SetStateAction<string>>;
   }

   const ComponenteB: React.FC<ComponenteBProps> = ({ theme, setTheme }) => {
     return (
       <div style={{ padding: '20px', border: '1px solid #999' }}>
         <h3>Soy el Componente B</h3>
         <p>Yo no uso el tema, solo lo paso hacia abajo.</p>
         <ComponenteC theme={theme} setTheme={setTheme} />
       </div>
     );
   };

   export default ComponenteB;
   ```

**Paso 3: Conecta todo en App.tsx (20 mins)**
El archivo principal no cambia mucho, pero TypeScript nos da seguridad.

```tsx
// src/App.tsx
import { useState } from 'react';
import ComponenteA from './components/ComponenteA';

function App() {
  // TypeScript infiere el tipo de 'theme' como 'string' gracias al valor inicial
  const [theme, setTheme] = useState('light'); 

  return (
    <div style={{ padding: '20px', border: '2px solid black', backgroundColor: theme === 'light' ? '#FFF' : '#333', color: theme === 'light' ? '#000' : '#FFF' }}>
      <h1>Soy App (El Ancestro)</h1>
      <p>El tema actual es: <strong>{theme}</strong></p>
      <ComponenteA theme={theme} setTheme={setTheme} />
    </div>
  )
}

export default App
```

* **Nota:** Si pasas el ratón por encima de la variable `theme`, verás que VS Code ya sabe que es de tipo `string`. ¡Esa es la magia de la inferencia de tipos!

**Paso 4: El Destino Final - ComponenteC.tsx (20 mins)**

```tsx
// src/components/ComponenteC.tsx
import React from 'react';

interface ComponenteCProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const ComponenteC: React.FC<ComponenteCProps> = ({ theme, setTheme }) => {

  const toggleTheme = (): void => { // Especificamos que la función no devuelve nada (void)
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #666' }}>
      <h4>Soy el Componente C</h4>
      <p>¡Yo sí uso el tema! El tema es: {theme}</p>
      <button onClick={toggleTheme}>
        Cambiar Tema
      </button>
    </div>
  );
};

export default ComponenteC;
```

**Paso 5: Ejecuta y Reflexiona (10 mins)**

1. En la terminal, `npm run dev`.
2. Abre la URL.
3. **Reflexión (con la ventaja de TypeScript):** El "prop drilling" sigue siendo un problema, pero ahora tienes una ventaja: si en `ComponenteB` te hubieras equivocado y hubieras intentado pasar `setTheme` con otro nombre (ej: `<ComponenteC theme={theme} setThema={setTheme} />`), **TypeScript te habría avisado con un error antes de que siquiera guardaras el archivo.** Te da seguridad, pero no soluciona el problema de arquitectura.

---

#### **Parte 2: La Reflexión y los 3 Mandamientos de Redux (30 mins)**

Esta parte es puramente conceptual, así que es idéntica a la versión de JavaScript. Ahora que has visto cómo los tipos viajan a través de los componentes, la idea de un **Store global y tipado** te parecerá aún más atractiva.

1. **Fuente Única de Verdad (Store):** Imagina un único objeto global donde el tipo de cada "slice" de estado está perfectamente definido.
2. **Estado de Solo Lectura (Actions):** Las acciones también serán objetos **tipados**, así que sabrás exactamente qué `payload` (datos) puede llevar cada acción.
3. **Cambios con Funciones Puras (Reducers):** Los reducers serán funciones **tipadas** que reciben un `state` y una `action` de tipos conocidos y deben devolver un `state` del mismo tipo. Se acabaron los errores por devolver un dato inesperado.

---

¡Felicidades! Has completado el Módulo 1 en modo TypeScript. Estás construyendo sobre una base mucho más sólida y profesional.

Cuando estés listo, avísame y pasamos al **Módulo 2**, donde instalaremos Redux Toolkit y lo configuraremos todo con TypeScript para reescribir esta app. Verás cómo los tipos hacen que trabajar con Redux sea una experiencia mucho más segura y agradable

**Objetivo:** Entender de forma práctica por qué la gestión de estado de React (`useState`) se queda corta en aplicaciones grandes. Vamos a construir una pequeña app para **sentir el problema** antes de ver la solución.

#### **Parte 1: El Problema del "Prop Drilling" (1.5 horas)**

**Paso 1: Prepara tu Lienzo en Blanco (10 mins)**
Tu proyecto Vite viene con código de ejemplo. Vamos a limpiarlo.

1. Abre tu proyecto en Visual Studio Code.
2. Ve al archivo `src/App.jsx`. Borra todo lo que hay dentro y déjalo así:

   ```jsx
   function App() {
     return (
       <div>
         <h1>Mi Aplicación</h1>
       </div>
     )
   }

   export default App
   ```
3. Borra el archivo `src/App.css` (no lo necesitaremos).

**Paso 2: Crea el Árbol de Componentes (30 mins)**
Vamos a crear una estructura de componentes anidados. Uno dentro de otro.

1. Dentro de la carpeta `src`, crea una nueva carpeta llamada `components`.
2. Dentro de `src/components`, crea 3 archivos: `ComponenteA.jsx`, `ComponenteB.jsx`, y `ComponenteC.jsx`.
3. **Rellena `ComponenteA.jsx`:**

   ```jsx
   // src/components/ComponenteA.jsx
   import ComponenteB from './ComponenteB';

   // Nota: 'props' es un objeto. '{ children }' es desestructurar 'props.children'.
   const ComponenteA = ({ theme, setTheme }) => {
     return (
       <div style={{ padding: '20px', border: '1px solid #ccc' }}>
         <h2>Soy el Componente A</h2>
         <ComponenteB theme={theme} setTheme={setTheme} />
       </div>
     );
   };

   export default ComponenteA;
   ```
4. **Rellena `ComponenteB.jsx`:**

   ```jsx
   // src/components/ComponenteB.jsx
   import ComponenteC from './ComponenteC';

   const ComponenteB = ({ theme, setTheme }) => {
     return (
       <div style={{ padding: '20px', border: '1px solid #999' }}>
         <h3>Soy el Componente B</h3>
         <p>Yo no uso el tema, solo lo paso hacia abajo.</p>
         <ComponenteC theme={theme} setTheme={setTheme} />
       </div>
     );
   };

   export default ComponenteB;
   ```

   *Fíjate en el comentario de `ComponenteB`. Es un simple intermediario, un "cartero".*

**Paso 3: Conecta todo y crea el Estado (30 mins)**
Ahora vamos a `App.jsx` para crear el estado y conectar nuestro árbol.

1. En `App.jsx`, importa `useState` y tu `ComponenteA`.
2. Crea un estado para el tema de nuestra aplicación.
3. Pasa el estado y la función para cambiarlo como `props` a `ComponenteA`.

   **Tu archivo `App.jsx` debería quedar así:**

   ```jsx
   // src/App.jsx
   import { useState } from 'react';
   import ComponenteA from './components/ComponenteA';

   function App() {
     const [theme, setTheme] = useState('light'); // Nuestro estado vive aquí

     return (
       <div style={{ padding: '20px', border: '2px solid black', backgroundColor: theme === 'light' ? '#FFF' : '#333', color: theme === 'light' ? '#000' : '#FFF' }}>
         <h1>Soy App (El Ancestro)</h1>
         <p>El tema actual es: <strong>{theme}</strong></p>
         <ComponenteA theme={theme} setTheme={setTheme} /> {/* Pasamos las props */}
       </div>
     )
   }

   export default App
   ```

**Paso 4: El Destino Final - Usar el Estado (20 mins)**
Finalmente, el `ComponenteC` va a usar el estado que ha viajado a través de toda la aplicación.

1. **Rellena `ComponenteC.jsx`:**
   ```jsx
   // src/components/ComponenteC.jsx

   const ComponenteC = ({ theme, setTheme }) => {

     const toggleTheme = () => {
       setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
     };

     return (
       <div style={{ padding: '20px', border: '1px solid #666' }}>
         <h4>Soy el Componente C</h4>
         <p>¡Yo sí uso el tema! El tema es: {theme}</p>
         <button onClick={toggleTheme}>
           Cambiar Tema
         </button>
       </div>
     );
   };

   export default ComponenteC;
   ```

**Paso 5: Ejecuta y Siente el Dolor (10 mins)**

1. Abre la terminal en VS Code (`Ctrl + ñ` o `View > Terminal`).
2. Escribe `npm run dev`.
3. Abre la URL que te da Vite en tu navegador.
4. Juega con el botón. ¡Funciona! Pero ahora, reflexiona...

---

#### **Parte 2: La Reflexión y los 3 Mandamientos de Redux (30 mins)**

**Reflexión y Conclusión de la Parte 1:**
Fíjate en `ComponenteA` y `ComponenteB`. ¿Usan `theme` o `setTheme` para algo? **No.** Solo actúan como carteros, pasando las props a sus hijos. Ahora imagina que tienes 10 niveles de anidación y 5 estados diferentes. Se convierte en una pesadilla de mantener.

**Esto que acabas de construir es el "Prop Drilling".** Es el problema fundamental que Redux viene a solucionar.

**Los 3 Mandamientos de Redux (Tu Base Teórica):**
Ahora que has sentido el dolor, estás listo para entender la solución. No escribas código, solo lee y asimila estos tres conceptos. Son la base de todo.

1. **Fuente Única de Verdad (Single Source of Truth):**

   * **El Problema:** Nuestro estado (`theme`) está en `App` y viaja por todas partes.
   * **La Solución Redux:** Todo el estado de la aplicación vivirá en un **único objeto global llamado "Store"**. Imagina una gran caja fuerte centralizada donde está toda la información. `ComponenteC` podrá acceder a ella directamente, sin que `A` y `B` tengan que saber nada.
2. **El Estado es de Solo Lectura (State is Read-Only):**

   * **El Problema:** La función `setTheme` se pasa por todas partes. Cualquier componente podría, en teoría, modificar el estado.
   * **La Solución Redux:** No puedes modificar el estado directamente. La única forma de cambiar algo es **"despachando una Acción"**. Una Acción es un simple objeto que describe lo que ha pasado (ej: `{ type: 'theme/toggle' }`). Es como rellenar un formulario de solicitud en un banco para sacar dinero; no coges el dinero tú mismo.
3. **Los Cambios se Hacen con Funciones Puras (Changes are made with Pure Functions):**

   * **El Problema:** ¿Quién recibe ese "formulario" (la Acción) y modifica el estado?
   * **La Solución Redux:** Una función especial llamada **Reducer**. Un reducer es como un contable súper estricto. Recibe el estado actual y la acción que se ha despachado, y **calcula y devuelve el nuevo estado**. Siempre devuelve una copia nueva, nunca modifica el original.

---

**¡Felicidades!** Has completado el Módulo 1. Has entendido el problema y tienes la base teórica de la solución.

Cuando estés listo, dime y pasamos al **Módulo 2**, donde instalaremos **Redux Toolkit** y reescribiremos esta misma aplicación de la forma correcta y moderna.
