# Node.jsをベースに使用
FROM node:18-alpine

# 作業ディレクトリを設定
WORKDIR /buntanchan_renew_web

# パッケージファイルをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# プロジェクトのソースコードをコピー
COPY . .

# Tailwind CSSの開発サーバーを起動
CMD ["npm", "run", "dev"]