# Apollo.io — Secuencia de 3 Emails Frios

**Objetivo:** Obtener una respuesta y agendar un diagnostico gratuito de 30 min
**Cadencia:** Email 1 (Dia 0), Email 2 (Dia 3), Email 3 (Dia 7)
**Remitente:** Alvaro Garcia <ventas@grupoalista.com>
**Volumen:** Maximo 10-15 emails/dia para cuidar deliverability

---

## Email 1 — Problema + Oferta (Dia 0)

**Asunto:** {nombre}, una pregunta rapida sobre {empresa}

```
Hola {nombre},

Vi que diriges {empresa} en {ciudad}. Trabajo con PyMEs mexicanas ayudandolas a reducir costos operativos y optimizar procesos usando tecnologia — sin disrumpir la operacion diaria.

Te escribo porque muchas empresas de tamaño similar al tuyo estan dejando dinero en la mesa en procesos que podrian ser mas eficientes, pero no tienen visibilidad de donde estan las fugas.

Ofrezco un diagnostico gratuito de 30 minutos donde identifico las 3 areas de mayor impacto en tu operacion. Sin compromiso.

¿Te interesaria agendar una llamada rapida esta semana o la siguiente?

Alvaro Garcia
Alista Consulting | consulting.grupoalista.com
+52 333 128 8999
```

---

## Email 2 — Social proof + Modelo (Dia 3)

**Asunto:** Re: {nombre}, una pregunta rapida sobre {empresa}

```
Hola {nombre},

Te comparto un dato rapido: recientemente ayudamos a una empresa de seguridad privada en Guadalajara (80+ empleados) a reducir sus costos operativos un 30% en menos de 8 meses.

¿Como? Diagnosticamos sus procesos, automatizamos lo que tenia sentido, y les dimos visibilidad en tiempo real de sus KPIs clave.

Lo que hace diferente a nuestro modelo: si no generamos ahorros medibles, no cobramos. Nuestro exito esta ligado al tuyo.

Si te suena interesante, son solo 30 minutos para explorar si hay algo similar que podamos hacer por {empresa}.

¿Que tal el jueves o viernes de esta semana?

Alvaro
```

---

## Email 3 — Breakup suave (Dia 7)

**Asunto:** Re: {nombre}, una pregunta rapida sobre {empresa}

```
Hola {nombre},

Entiendo que esto probablemente no es prioridad ahora, y esta bien.

Solo queria dejarte la puerta abierta: si en algun momento quieres explorar como tu empresa podria operar mas eficientemente — con menos costos y mejores datos — aqui estamos.

Puedes agendar cuando quieras: consulting.grupoalista.com

Te deseo mucho exito con {empresa}.

Alvaro
```

---

## Configuracion en Apollo

1. **Nombre de secuencia:** "Diagnostico Gratuito — PyMEs Mexico"
2. **Steps:** 3 emails con delays de 3 y 4 dias
3. **Filtros de busqueda:**
   - Location: Guadalajara / CDMX / Monterrey / Mexico
   - Company size: 10-100 employees
   - Title: CEO, Director General, CTO, CFO, Director de Operaciones, Gerente General
   - Industry: Any
4. **Excluir:** Empresas de consultoría (competidores)
5. **Tracking:** Activar open tracking y click tracking
6. **Personalizacion:** Usar variables {nombre}, {empresa}, {ciudad}

## Notas importantes

- Usar dominio @grupoalista.com (no Gmail)
- Antes de enviar masivamente, hacer warm-up del dominio (enviar 5-10/dia la primera semana, luego subir)
- Revisar que el dominio tenga SPF, DKIM y DMARC configurados
- Incluir link de unsubscribe (requerido por ley mexicana LFPDPPP)
- Monitorear bounce rate — si supera 5%, pausar y limpiar lista
