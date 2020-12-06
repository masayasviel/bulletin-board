# 掲示板app

# Environment

- Node v14.3.0
- npm v6.14.5
- ts-node v9.1.0
- tsc v4.0.3

# Installation

- @types/node
- express
- @types/express
- sequelize
- mysql2
- @types/validator
- @types/bluebird

# Usage

## Run

```bash
npx ts-node %file path%
```

## build

```bash
tsc
```

# Docker

## dir

```
.
├── docker
│   └── db
│       ├── data
│       ├── my.cnf
│       └── sql
│           ├── 001-create-tables.sql
│           └── init-database.sh
├── docker-compose.yml
└── init-mysql.sh
```

## Usage

- 起動

```bash
docker-compose up -d
```

- 起動確認

```bash
docker-compose ps
```

- DB初期化

```bash
init-mysql.sh
```

## phpMyAdmin
http://localhost:8080/


# 参考

- [TypeScript + Node.js プロジェクトのはじめかた2020](https://qiita.com/notakaos/items/3bbd2293e2ff286d9f49)
- [docker-compose でMySQL環境簡単構築](https://qiita.com/A-Kira/items/f401aea261693c395966)