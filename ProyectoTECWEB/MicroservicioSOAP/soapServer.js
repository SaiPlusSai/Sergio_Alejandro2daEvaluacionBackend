import express from 'express';
import soap from 'soap';
import axios from 'axios';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import js2xmlparser from 'js2xmlparser'; // 🧠 NUEVO

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const servicio = {
  BusquedaServicio: {
    BusquedaPort: {
      async buscarFraseGoogle(args, callback) {
        const { frase } = args;

        try {
          const response = await axios.get('http://localhost:3000/api/historial-busqueda/google-like', {
            params: { frase }
          });

          // 🔁 Convertir array de resultados a XML bonito
          const xml = js2xmlparser.parse("documentos", { documento: response.data });

          callback({ resultado: xml });
        } catch (err) {
          callback({ resultado: js2xmlparser.parse("error", { mensaje: "Error en el microservicio" }) });
        }
      }
    }
  }
};

const server = http.createServer(app);
const wsdlPath = path.join(__dirname, 'wsdl', 'busqueda.wsdl');
const wsdlXml = fs.readFileSync(wsdlPath, 'utf8');

soap.listen(server, '/wsdl', servicio, wsdlXml);

server.listen(8001, () => {
  console.log('🧼 Microservicio SOAP corriendo en http://localhost:8001/wsdl');
});
