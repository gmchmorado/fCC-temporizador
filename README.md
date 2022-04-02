# Temporizador de trabajo 25+5
---
## Requerimiento
Codificar una aplicación de cuenta atrás para un tiempo de trabajo de 25 minutos y 5 minutos de descanso

---
## Elementos de evaluación

- Debe existir un elemento con `id = 'brake-label'` que contiene una cadena (ejemplo: "Break Length").
- Debe existir un elemento con `id = 'session-label'` que contiene una cadena (ejemplo: "Session Length").
- Deben existir dos elementos suseptibles a acción de clic con identificación única `'break-decrement'` y `'session-decrement'`.
- Deben existir dos elementos suseptibles a acción de clic con identificación única `'break-increment'` y `'session-increment'`.
- Debe existir un elemento con `id = 'break-length'` con valor por defecto de `5`.
- Debe existir un elemento con `id = 'session-length'` con valor por defecto de `25`.
- Debe existir un elemento con `id = 'timer-label'` que contiene una cadena que indica que cuenta regresiva está mostrandose.
- Debe existir un elemento con `id = 'time-left'` que contiene el tiempo restante del temporizador en formato `mm:ss`.
- Debe existir um elemento con `id = 'start_stop'` que sea suseptible de recibir una acción de clic.
- Debe existir um elemento con `id = 'reset'` que sea suseptible de recibir una acción de clic.
- Al hacer clic en el elemento `reset` cualquier temporizador en ejecución deberá detenerse. El valor del elemento `break-length` deberá retomar el valor `5`; el valor de `session-length` debe regresar a 25 y el elemento `time-left` debe reiniciarse a su estado predeterminado.
- Cuando se hace clic en el elemento `break-decrement` el valor de `break-length` se deberá reducir en 1 y actualizar el valor.
- Cuando se hace clic en el elemento `break-increment` el valor de `break-length` se deberá aumentar en 1 y actualizar el valor.
- Cuando se hace clic en el elemento `session-decrement` el valor de `session-length` se deberá reducir en 1 y actualizar el valor.
- Cuando se hace clic en el elemento `session-increment` el valor de `session-length` se deberá aumentar en 1 y actualizar el valor.
- Ningun valor de los temporizadores deberá poder ser menor que 0.
- Ningun valor de los temporizadores deberá ser mayor de 60.
- Cuando se hace clic por primera vez en el elemento `start_stop`, el temporizador deberá iniciar la cuenta atrás de la sesión de trabajo, mostrando en el elemento `time-left` el tiempo restante en el formato `mm:ss`, reduciendo en 1 segundo cada 1000ms.
- Si existe una cuenta atrás, al hacer clic en el elemento `start_stop` deberá pausarse el temporizador.
- Si el temporizador está pausado y se hace clic en elemento `start_stop` deberá reanudarse la cuenta desde el punto en que fue pausado.
- Cuando la cuenta atrás de la sesión llega a cero deberá iniciar la cuenta atrás del tiempo de espera; el elemento `timer-label` deberá mostrar la cadena que indica la pausa ("break") que ha comenzado.
- Cuando la cuenta atrás de la sesión llega a cero deberá iniciar la cuenta atrás del tiempo de espera iniciando con el valor del elemento `break-length`.
- Cuando la cuenta atrás de descanso llega a cero deberá iniciar la cuenta atrás del tiempo de sesión; el elemento `timer-label` deberá mostrar la cadena que indica la sesión ("session") que ha comenzado.
- Cuando la cuenta atrás de descanso llega a cero deberá iniciar la cuenta atrás del tiempo de espera iniciando con el valor del elemento `session-length`.
- Cuando alguno de los temporizadores llegue a cero, deberá reproducirse un sonido que indica que el tiempo ha concluido. Se deberá usar un elemento con etiqueta HTML5 `<audio></audio>` y tener `id = 'beep'`
- El audio seberá ser de 1 segundo o mayor.
- El audio derará de reproducirse y se reiniciará al hacer clic en el elemento `reset`.

---
## Lógica de Diseño

1. El tiempo debe ser aceptado en número entero de 1 a 60 como límites, este valor será considerado en minutos; para conocer el tiempo restante a este tiempo se le restará el tiempo transcurrido.
1. Se contempla que exista un "state" que represente la situación del temporalizador, el estado inicial = `reset`, cuenta atrás = `iniciado`, detenido antes de finalizar = `pausado`.
1. El "state" anterior se actualizará cuando se haga clic en el elemento `start_stop`.
1. El ciclo sería: al cargar la aplicación el temporalizador estaría detenido con estado `reset`; al actival el elemento `start_stop` iniciaría con el temporizador y el estado cambiaría a `iniciado`; si concluyera la cuenta atrás, el estado cambiaría nuevamente a `reset`; si el elemento `start_stop` fuerá activado durante la cuenta atrás esté en desarrollo, detendría la cuenta, manteniendo el tiempo restante detenido y el estado cambiaría a `pausado`; si nuevamente se activara el elemento `start_stop` la cuenta sería reiniciada desde el punto en que se detuvo y el estado regresaría a `iniciado`; al concluir la cuenta atrás el estado regresará a `reset`.
1. El manejo de los temporizadores correspondería a lo siguiente: al iniciar la aplicación los dos temporizadores estarían detenidos, un "state" definiría cual de ellos debería iniciar la cuenta atrás al actuar el elemento `start_stop` (al inicio sería `session` el valor del estado); si concluye un temporizador, se revisará el estado y si es `session` iniciará nuevamente el temporizador cambiando el estado a `break`; al terminar el temporizador con estado `break` no iniciará nuevamente pero el estado cambiará a `session`.
1. De lo anterior se deduce que sólo existirá un componente temporizador mismo que tomará la información de alguna de las caracterisitas definidas para el tiempo de trabajo (`session`) o de descanso (`break`).
1. De forma similar, los métodos para incrementar o decrementar los valores del tiempo de duración serán sólo un componenete que eligira en función de los argumentos (propiedades) o etiquetas.
1. La notificación por sonido aplicará de una forma similar, entendiendo que sólo será un sonido.

---

### Componenetes

Contemplo la elaboración de 7 componentes para la aplicación:
- Para incrementar el tiempo
- Para decrementar el tiempo
- Para mostrar el tiempo programado
- Para mostrar que temporizador esta funcionando
- Para mostrar la cuenta atrás
- Para controlar el inicio y pausa de la cuenta
- Para controlar el reinicio
