# Grupo Alista — Estrategia SEO, Analytics y Crecimiento Digital

**Fecha:** 7 de abril 2026
**Sitio:** grupoalista.com
**Autor:** Claude (asistente de Alvaro Garcia)

---

## 1. Resumen de Cambios Implementados

### Archivos Nuevos Creados
| Archivo | Propósito |
|---|---|
| `robots.txt` | Controla crawling de bots, apunta al sitemap |
| `sitemap.xml` | 23 URLs con prioridades, hreflang para pares de idioma |

### Cambios Aplicados a las 23 Páginas HTML

| Cambio | Páginas afectadas |
|---|---|
| Google Tag Manager (GTM-PT2C42WD) | 23/23 |
| Canonical URL (`<link rel="canonical">`) | 23/23 |
| Open Graph meta tags | 23/23 |
| Twitter Card meta tags | 23/23 |
| Hreflang tags (es/en/x-default) | 6 páginas (consulting, hotels, imports pares) |
| JSON-LD Structured Data | 6 páginas (index + 5 divisiones) |
| Meta descriptions faltantes | 2 páginas (hotels/privacidad, hotels/terminos) |

### Fixes Específicos en index.html
- H2 duplicado del H1 cambiado a "Quiénes Somos" / "Who We Are"
- Link roto de Consulting en footer: `#` -> `consulting.html`
- `loading="lazy"` en 7 imágenes below-fold

### JSON-LD Schemas Implementados
- **index.html:** Organization (con 5 subOrganizations + sameAs social), WebSite, LocalBusiness
- **consulting.html:** ProfessionalService
- **consulting-en.html:** ProfessionalService (EN)
- **marketing.html:** ProfessionalService
- **salud.html:** MedicalBusiness
- **hotels.html:** ProfessionalService
- **imports.html:** ProfessionalService

---

## 2. Configuración de Google Analytics (GA4)

### Paso a Paso — Lo que falta hacer en la consola web

#### 2.1 Verificar GA4 Property
- La propiedad ya existe: Measurement ID `G-3XCKYS0EWB`, Stream ID `14326787506`
- Verificar en analytics.google.com que la zona horaria sea `America/Mexico_City` y moneda `MXN`

#### 2.2 Configurar GA4 Tag en GTM
1. Ir a [tagmanager.google.com](https://tagmanager.google.com/?authuser=1) -> Container GTM-PT2C42WD
2. **Tags > New > Google Analytics: GA4 Configuration**
3. Measurement ID: `G-3XCKYS0EWB`
4. Trigger: `All Pages`
5. Guardar y publicar el container

#### 2.3 Habilitar Enhanced Measurement
1. En GA4: Admin > Data Streams > grupoalista.com
2. Enhanced measurement: activar TODO:
   - Page views
   - Scrolls (90%)
   - Outbound clicks
   - Site search
   - Form interactions
   - File downloads

#### 2.4 Eventos Custom a Crear en GTM

**Alta prioridad (crear primero):**

| Tag Name | Event Name | Trigger Type | Trigger Config |
|---|---|---|---|
| GA4 - Contact Form | `form_submit_contact` | Form Submission | Form ID contains "contact" OR "cot-form" |
| GA4 - WhatsApp Click | `click_whatsapp` | Click - Just Links | Click URL contains `wa.me` |
| GA4 - Email Click | `click_email` | Click - Just Links | Click URL contains `mailto:` |

**Media prioridad:**

| Tag Name | Event Name | Trigger Type | Trigger Config |
|---|---|---|---|
| GA4 - Phone Click | `click_phone` | Click - Just Links | Click URL contains `tel:` |
| GA4 - Catalog CTA | `click_cta_catalog` | Click - Just Links | Click URL contains `catalogo` |
| GA4 - Division Card | `division_card_click` | Click - All Elements | CSS selector: `.company-card a` (ajustar al selector real) |

**Baja prioridad:**

| Tag Name | Event Name | Trigger Type | Trigger Config |
|---|---|---|---|
| GA4 - Social Click | `click_social` | Click - Just Links | Click URL matches regex `facebook\|instagram\|linkedin\|youtube\|x\.com` |
| GA4 - Language Switch | `language_switch` | Click - All Elements | CSS selector del botón de idioma |

#### 2.5 Marcar Conversiones en GA4
1. Admin > Events > buscar cada evento
2. Marcar como conversión:
   - `form_submit_contact`
   - `click_whatsapp`
   - `click_email`

#### 2.6 Crear Dimensiones Custom
1. Admin > Custom definitions > Create custom dimension
   - `page_language` (Event scope) — valor: `document.documentElement.lang`
   - `division` (Event scope) — derivar de URL path
   - `page_type` (Event scope) — landing/catalog/quote/legal/home
   - `contact_method` (Event scope) — form/whatsapp/email/phone

#### 2.7 Crear Audiencias
1. Admin > Audiences > New Audience:
   - **High-Intent:** visited any landing page AND (form_submit OR click_whatsapp)
   - **Consulting Prospects:** page_location contains "consulting" AND scroll > 50%
   - **Marketing Prospects:** page_location contains "marketing" OR "catalogo"
   - **English Speakers:** page_location contains "-en.html"
   - **Returning Visitors:** session_number > 1
   - **Catalog Browsers:** page_location contains "catalogo" AND engagement_time > 60s

---

## 3. Google Search Console

### Setup
1. Ir a [search.google.com/search-console](https://search.google.com/search-console)
2. **Add property** > URL prefix > `https://grupoalista.com`
3. Verificación: debería ser automática via GTM (ya instalado en todas las páginas)
4. Si no funciona automático, usar método HTML tag

### Después de verificar:
1. **Sitemaps** > Submit: `https://grupoalista.com/sitemap.xml`
2. **Conectar con GA4:** En GA4 Admin > Product Links > Search Console > Link
3. Monitorear semanalmente:
   - Coverage (páginas indexadas vs errores)
   - Performance (clics, impresiones, CTR, posición promedio)
   - Core Web Vitals
   - Mobile Usability

---

## 4. Estrategia SEO

### 4.1 Keywords Objetivo por División

#### Consulting (PRIORIDAD ALTA)
| Keyword | Volumen estimado | Dificultad | Página target |
|---|---|---|---|
| consultoría empresarial guadalajara | Medio | Baja | consulting.html |
| consultoría TI guadalajara | Bajo-Medio | Baja | consulting.html |
| transformación digital empresas méxico | Medio | Media | consulting.html |
| consultoría de negocios jalisco | Bajo | Baja | consulting.html |
| IT consulting guadalajara | Bajo | Baja | consulting-en.html |

#### Marketing (PRIORIDAD ALTA)
| Keyword | Volumen estimado | Dificultad | Página target |
|---|---|---|---|
| productos promocionales guadalajara | Medio | Baja-Media | marketing.html |
| artículos promocionales personalizados | Medio | Media | marketing.html |
| merchandising empresarial méxico | Bajo-Medio | Baja | marketing.html |
| regalos corporativos guadalajara | Medio | Media | marketing.html |
| productos promocionales para empresas | Alto | Media-Alta | marketing/catalogo.html |

#### Salud
| Keyword | Volumen estimado | Dificultad | Página target |
|---|---|---|---|
| insumos médicos guadalajara | Medio | Media | salud.html |
| proveedor médico jalisco | Bajo | Baja | salud.html |
| distribución material hospitalario | Bajo | Baja | salud/catalogo.html |

#### Hotels
| Keyword | Volumen estimado | Dificultad | Página target |
|---|---|---|---|
| suministros hoteleros méxico | Bajo-Medio | Baja | hotels.html |
| amenidades hotel guadalajara | Bajo | Baja | hotels.html |
| hotel supplies mexico | Bajo | Baja | hotels-en.html |

#### Imports
| Keyword | Volumen estimado | Dificultad | Página target |
|---|---|---|---|
| agencia aduanal guadalajara | Medio | Media | imports-es.html |
| importaciones méxico | Alto | Alta | imports-es.html |
| customs broker mexico | Bajo-Medio | Media | imports.html |

### 4.2 Local SEO — Google Business Profile

**Acción inmediata:** Crear y verificar Google Business Profile
- Nombre: Grupo Alista
- Dirección: Lázaro Cárdenas Pte. 2953, Col. Chapalita, Guadalajara, Jalisco 44500
- Teléfono: +52 333 128 8999
- Sitio web: https://grupoalista.com
- Categoría primaria: Consultoría empresarial
- Categorías secundarias: Productos promocionales, Distribuidor de suministros médicos

**Perfiles adicionales recomendados:**
- Alista Consulting (misma dirección, categoría: Consultoría de TI)
- Alista Marketing Services (categoría: Empresa de productos promocionales)

**Directorios locales para registrarse:**
- Sección Amarilla
- Google Maps (via GBP)
- Bing Places
- Apple Maps Connect
- Directorio Empresarial de Jalisco
- Cámara de Comercio de Guadalajara

### 4.3 Mejoras de Contenido Recomendadas (Futuras)

1. **Blog/Insights** — 2-4 artículos mensuales:
   - "Cómo elegir una consultoría de TI para tu PyME"
   - "Guía de productos promocionales para eventos corporativos 2026"
   - "Requisitos para importar a México: guía actualizada"
   - "Insumos médicos esenciales para clínicas pequeñas"

2. **Landing pages por categoría de marketing:**
   - /marketing/textiles.html
   - /marketing/tecnologia.html
   - /marketing/bebidas.html

3. **Homepage en inglés** (index-en.html) — el toggle JS actual no es indexable

4. **Case studies** para Consulting — páginas dedicadas con resultados medibles

---

## 5. Estrategia de Redes Sociales

### 5.1 Plataformas y Roles

| Plataforma | Rol principal | División target | Frecuencia |
|---|---|---|---|
| **LinkedIn** | B2B thought leadership, networking | Consulting + Imports | 3-4 posts/semana |
| **Instagram** | Showcase visual, marca | Marketing + Hotels | 4-5 posts/semana |
| **Facebook** | Comunidad local, engagement | General + Marketing | 3 posts/semana |
| **YouTube** | Contenido largo, tutoriales | Consulting | 2-4 videos/mes |
| **WhatsApp Business** | Atención directa, ventas | Todas | Continuo |

### 5.2 Estrategia UTM para Tracking

**Formato estándar para TODOS los links compartidos en redes:**
```
https://grupoalista.com/{pagina}?utm_source={plataforma}&utm_medium=social&utm_campaign={division}-{tema}-{YYYYMM}&utm_content={variante}
```

**Valores de utm_source:** `linkedin`, `instagram`, `facebook`, `youtube`, `whatsapp`, `tiktok`

**Ejemplos reales:**
```
# Post de LinkedIn sobre transformación digital
https://grupoalista.com/consulting.html?utm_source=linkedin&utm_medium=social&utm_campaign=consulting-transformacion-digital-202604&utm_content=article-v1

# Story de Instagram mostrando productos
https://grupoalista.com/marketing/catalogo.html?utm_source=instagram&utm_medium=social&utm_campaign=marketing-productos-verano-202604&utm_content=story-swipe

# Broadcast de WhatsApp para catálogo de hotels
https://grupoalista.com/hotels/catalogo.html?utm_source=whatsapp&utm_medium=social&utm_campaign=hotels-catalogo-launch-202604
```

### 5.3 Calendario Semanal de Contenido

| Día | Plataforma | Tipo de contenido | División | Ejemplo |
|---|---|---|---|---|
| **Lunes** | LinkedIn | Artículo/insight de industria | Consulting | "5 señales de que tu empresa necesita transformación digital" |
| **Martes** | Instagram | Reel/carousel de productos | Marketing | Top 5 productos para regalo corporativo |
| **Miércoles** | Facebook + LinkedIn | Case study o testimonio | Rotativo | "Cómo ayudamos a [Cliente] a reducir costos 30%" |
| **Jueves** | Instagram | Behind-the-scenes / equipo | Brand general | Tour de oficina, presentación de equipo |
| **Viernes** | LinkedIn + Facebook | Spotlight de división + CTA | Rotativo | "Conoce Alista Hotels: tu proveedor hotelero" |
| **Sábado** | Instagram Stories | Producto del día | Hotels/Salud | Showcase de amenidades o insumos |

### 5.4 Temas Mensuales

| Semana | Enfoque |
|---|---|
| Semana 1 | Consulting — thought leadership, insights de industria |
| Semana 2 | Marketing — productos destacados, casos de uso |
| Semana 3 | Sinergia entre divisiones — cómo trabajamos juntos |
| Semana 4 | Historias de clientes, testimonios, equipo |

### 5.5 Cross-Promotion entre Divisiones
- **Hashtags unificados:** `#GrupoAlista` `#AlistaConsulting` `#AlistaMarketing` `#AlistaSalud` `#AlistaHotels` `#AlistaImports`
- **Badge "Parte de Grupo Alista"** en todo contenido de divisiones
- **Ofertas cruzadas:** "Clientes de Consulting obtienen 10% en productos de Marketing"
- **Cases studies multi-división:** mostrar cómo un cliente usa 2+ servicios

---

## 6. Estrategia de Crecimiento de Marca

### 6.1 Alista Consulting (Prioridad #1)

**Posicionamiento:**
> "Estrategia basada en datos para empresas que quieren crecer"

**Target persona:** CFO/CTO/CEO de PyME mexicana (20-200 empleados), zona metropolitana de Guadalajara

**Diferenciador:** Expertise local + metodología data-driven + acceso al ecosistema Grupo Alista

**Plan de acción:**

| Acción | Timeline | Impacto |
|---|---|---|
| Publicar 2-3 case studies en el sitio | Mes 1-2 | Alto |
| LinkedIn thought leadership (CEO publica 2x/semana) | Mes 1 en adelante | Alto |
| Newsletter mensual via email (capturar del formulario de contacto) | Mes 2 | Medio-Alto |
| Ofrecer diagnóstico gratuito de 30 min (landing page dedicada) | Mes 1 | Alto |
| Participar en eventos CANACINTRA/COPARMEX Jalisco | Mes 3-6 | Medio |
| Google Ads: "consultoría empresarial guadalajara" | Mes 2 | Alto |
| LinkedIn Ads: sponsored content para decision-makers GDL | Mes 3 | Medio-Alto |

### 6.2 Alista Marketing Services (Prioridad #2)

**Posicionamiento:**
> "Tu marca, en manos de expertos"

**Target persona:** Marketing managers y compradores en empresas que organizan eventos, campañas o regalos corporativos

**Diferenciador:** +1,400 productos + cotización instantánea online + personalización

**Plan de acción:**

| Acción | Timeline | Impacto |
|---|---|---|
| Instagram showcase: fotos profesionales de top 50 productos | Mes 1-2 | Alto |
| Google Ads: "productos promocionales guadalajara" | Mes 1 | Alto |
| Landing pages estacionales: "Regalos Corporativos Navidad 2026" | Mes 6-8 | Alto |
| Partnerships con event planners en GDL | Mes 2-4 | Medio |
| Sección de testimonios/reviews en marketing.html | Mes 2 | Medio |
| Facebook Ads geotargeted a Guadalajara/Jalisco | Mes 2 | Medio |
| Catálogo de WhatsApp Business con productos top | Mes 1 | Medio |

### 6.3 Presencia Digital Expandida

| Canal | Acción | Prioridad |
|---|---|---|
| Google Business Profile | Crear y optimizar | P0 (inmediato) |
| Google Ads | Campañas branded + division keywords | P1 (mes 1-2) |
| LinkedIn Company Page | Optimizar, publicar consistentemente | P1 (mes 1) |
| Email Marketing | Mailchimp/similar, newsletter mensual | P2 (mes 2-3) |
| Directorios locales | Registrar en 5+ directorios | P2 (mes 2) |
| Reviews | Solicitar reseñas a clientes satisfechos | P2 (ongoing) |

---

## 7. Dashboards y Reportes GA4 Recomendados

### Dashboard Ejecutivo (revisar semanalmente)
- Total usuarios, sesiones, page views (tendencia semanal)
- Top 10 páginas por visitas
- Conversiones por tipo (formularios, WhatsApp, email)
- Fuentes de tráfico (orgánico, social, directo, paid)

### Reporte por División (revisar mensualmente)
- Page views por división
- Tasa de conversión por landing page de división
- Engagement time promedio
- Bounce rate por página

### Reporte de Leads (revisar semanalmente)
- Form submissions por página
- WhatsApp clicks por fuente/medio
- Método de contacto preferido (form vs WhatsApp vs email)
- Funnel: Page View > Scroll 50% > CTA Click > Conversión

### Reporte de Adquisición Social (revisar después de cada campaña)
- Sesiones por utm_source + utm_campaign
- Conversiones por campaña social
- ROI por plataforma
- Mejor contenido por engagement

---

## 8. Checklist de Verificación Post-Deployment

- [ ] Publicar container GTM (tagmanager.google.com > Submit > Publish)
- [ ] Verificar GTM con [Tag Assistant](https://tagassistant.google.com/)
- [ ] Verificar GA4 Real-time: visitar grupoalista.com y confirmar que aparecen usuarios
- [ ] Validar sitemap: submit en Search Console
- [ ] Validar OG tags: [Facebook Debugger](https://developers.facebook.com/tools/debug/) — probar cada landing page
- [ ] Validar JSON-LD: [Rich Results Test](https://search.google.com/test/rich-results) — probar index.html y cada división
- [ ] Crear Google Business Profile
- [ ] Configurar eventos custom en GTM (sección 2.4)
- [ ] Marcar conversiones en GA4 (sección 2.5)
- [ ] Crear audiencias en GA4 (sección 2.7)

---

## 9. Deployment

Después de revisar todos los cambios, ejecutar:

```bash
cd /Users/alvarogarcia/Documents/Repos/grupoalista-website-v2/grupoalista-website-v2

# Subir todos los archivos modificados + nuevos
aws s3 sync . s3://grupoalista.com/ --exclude "node_modules/*" --exclude ".git/*" --exclude "screenshots/*" --exclude "remotion-hero/*" --exclude "brand_assets/*" --exclude "package*.json" --exclude "*.mjs" --exclude ".github/*" --exclude "tests/*" --exclude ".eslintrc*" --exclude ".stylelintrc*" --exclude ".htmlhintrc" --exclude ".prettierrc" --exclude ".editorconfig" --exclude ".coderabbit.yaml" --exclude "vitest.config.js" --exclude "CLAUDE.md"

# Invalidar CloudFront
aws cloudfront create-invalidation --distribution-id E3T7225AX2D04Y --paths "/*"
```

---

*Este documento fue generado como parte de la implementación de analytics y SEO para grupoalista.com. Los cambios técnicos ya están aplicados en el código. Las estrategias de contenido, redes sociales y crecimiento de marca son recomendaciones para ejecución continua.*
