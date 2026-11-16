import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("cantina.db");

export function criarBanco() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT,
      categoria TEXT NOT NULL,
      imagem TEXT,
      disponivel INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS pedidos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      status TEXT NOT NULL DEFAULT 'pendente',
      criado_em TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS itens_pedido (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pedido_id INTEGER NOT NULL,
      produto_id INTEGER NOT NULL,
      quantidade INTEGER NOT NULL
    );
  `);

  console.log("Banco de dados da Cantina Digital criado!");
}

criarBanco();
