# Etapa de construcción (build)
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install  #incluye dependencias y devDependencies

COPY . .
RUN npm run build  #git genera /dist con JS compilado

# Etapa de producción (runtime)
FROM node:18-alpine

WORKDIR /app

# Solo lo necesario para ejecutar
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm install --only=production

EXPOSE 3000

CMD ["node", "dist/main"]
