#!/bin/bash

# Navegar al directorio del backend y ejecutar
cd /home/ubuntu/backend
screen -dmS backend npm run dev

# Navegar al directorio del frontend y ejecutar
cd /home/ubuntu/frontend  # Asegúrate de que esta ruta también sea correcta
screen -dmS frontend npm run dev
