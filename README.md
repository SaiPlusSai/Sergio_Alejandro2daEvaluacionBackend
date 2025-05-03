# 🧼 Microservicio SOAP para Búsqueda Estilo Google – Proyecto Integrador MIGA

## 📌 Descripción General

Este microservicio implementa un servidor **SOAP (WSDL)** que consume un endpoint **REST** del sistema **MIGA**.  
El objetivo es permitir **búsquedas estilo Google** a través de una interfaz SOAP, facilitando así la interoperabilidad con sistemas legados o entornos que requieren comunicación basada en XML.

---

## 🚀 Funcionalidades

- Expone un método SOAP llamado `buscarFraseGoogle`.
- Este método consume el endpoint REST:  
  `GET /api/historial-busqueda/google-like?frase=...`
- El microservicio transforma los resultados JSON en una respuesta serializada para SOAP (XML).

---

## ⚙️ Tecnologías Utilizadas

- Node.js  
- Express  
- node-soap  
- Axios (para consumir el endpoint REST)  
- WSDL (archivo manualmente definido)

---

## 🛠 Instalación

```bash
git clone https://github.com/tuusuario/microservicio-busqueda-soap.git
cd .\ProyectoTECWEB\
cd .\MicroservicioSOAP\  
npm install
Librerías necesarias: npm install soap express axios
📁 Estructura esperada del proyecto
/MicroservicioSOAP
├── wsdl/
│   └── busqueda.wsdl
├── soapServer.js
├── package.json
└── README.md
🖥️ Uso
Inicia el Back con:
npm run dev
El servidor estará disponible en:
Servidor corriendo en http://localhost:3000
Swagger en: http://localhost:3000/api-docs
🔥 Servidor corriendo en http://localhost:3000
Inicia el microservicio SOAP con:
npm start
El servidor estará disponible en:
http://localhost:8001/wsdl

🧪 Ejemplo de Prueba en Postman
Método: POST

URL: http://localhost:8001/wsdl

Headers:

Content-Type: text/xml

🔸 Body (raw XML):
xml
Copiar
Editar
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:bus="http://www.ejemplo.org/busqueda">
   <soapenv:Header/>
   <soapenv:Body>
      <bus:buscarFraseGoogle>
         <frase>alimentacion saludable</frase>
      </bus:buscarFraseGoogle>
   </soapenv:Body>
</soapenv:Envelope>
📄 Ejemplo de Respuesta (SOAP)
xml
Copiar
Editar
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <ns1:buscarFraseGoogleResponse xmlns:ns1="http://www.ejemplo.org/busqueda">
      <ns1:resultado>[{...}]</ns1:resultado>
    </ns1:buscarFraseGoogleResponse>
  </soap:Body>
</soap:Envelope>
📌 El contenido del campo resultado es un string JSON con los documentos coincidentes.

📘 Consideraciones
El microservicio actúa como puente entre SOAP y REST.

Ideal para entornos donde REST no es viable directamente.

La búsqueda es solo lectura y no se guarda en el historial.

👨‍💻 Autor
Sergio Alejandro Arias Mayta – Proyecto realizado para la segunda evaluación de Backend, cumpliendo con los criterios de integración de microservicios del Proyecto Integrador MIGA.

