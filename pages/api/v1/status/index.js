import database from "infra/database.js";

async function status(request, response) {
  const activeConnections = await database.query(
    `SELECT sum(numbackends) FROM pg_stat_database;`
  );

  const maxConnections = await database.query(
    `SELECT * FROM pg_settings WHERE name = 'max_connections';`
  );

  const databaseVersionResult = await database.query(` SHOW server_version`);
  const databaseVersionValeu = databaseVersionResult.rows[0].server_version;

  console.log(Number(activeConnections.rows[0].sum));

  const updateAt = new Date().toISOString();
  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        opend_connections: Number(activeConnections.rows[0].sum),
        max_connections: maxConnections.rows[0].setting,
        version: databaseVersionValeu,
      },
    },
  });
}

export default status;
