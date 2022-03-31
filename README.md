# Temporizador de trabajo 25+5
---
## Requerimiento
Codificar una aplicación de cuenta atras para un tiempo de trabajo de 25 minutos y 5 minutos de descanso

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
- Cuando se hace clic por primera vez en el elemento `start_stop`, el temporizador deberá iniciar la cuenta atras de la sesión de trabajo, mostrando en el elemento `time-left` el tiempo restante en el formato `mm:ss`, reduciendo en 1 segundo cada 1000ms.
- Si existe una cuenta atras, al hacer clic en el elemento `start_stop` deberá pausarse el temporizador.
- Si el temporizador está pausado y se hace clic en elemento `start_stop` deberá reanudarse la cuenta desde el punto en que fue pausado.
- Cuando la cuenta atras de la sesión llega a cero deberá iniciar la cuenta atras del tiempo de espera; el elemento `timer-label` deberá mostrar la cadena que indica la pausa ("break") que ha comenzado.
- Cuando la cuenta atras de la sesión llega a cero deberá iniciar la cuenta atras del tiempo de espera iniciando con el valor del elemento `break-length`.
- Cuando la cuenta atras de descanso llega a cero deberá iniciar la cuenta atras del tiempo de sesión; el elemento `timer-label` deberá mostrar la cadena que indica la sesión ("session") que ha comenzado.
- Cuando la cuenta atras de descanso llega a cero deberá iniciar la cuenta atras del tiempo de espera iniciando con el valor del elemento `session-length`.
- Cuando alguno de los temporizadores llegue a cero, deberá reproducirse un sonido que indica que el tiempo ha concluido. Se deberá usar un elemento con etiqueta HTML5 `<audio></audio>` y tener `id = 'beep'`
- El audio seberá ser de 1 segundo o mayor.
- El audio derará de reproducirse y se reiniciará al hacer clic en el elemento `reset`.

---
## Lógica de Diseño

