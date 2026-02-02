# Use Node oficial para build
FROM node:20-alpine AS builder

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia package.json e package-lock.json para instalar dependências
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia todo o código
COPY . .

# Build do Next.js
RUN npm run build

# Produção: rodar com Node
FROM node:20-alpine AS runner
WORKDIR /app

# Copia build do estágio anterior
COPY --from=builder /app ./

# Porta padrão do MF (aqui podemos usar 3001, 3002, 3003)
ENV PORT=3001

EXPOSE 3001

# Comando para rodar o Next.js em produção
CMD ["npm", "start"]
