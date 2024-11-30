import database from "infra/database.js";

async function status(request, response) {
  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const databaseOpenedConnectionsValeu =
    databaseOpenedConnectionsResult.rows[0].count;
  console.log(databaseOpenedConnectionsValeu);

  const databaseMaxConnectionsResult = await database.query(
    `SHOW max_connections;`,
  );
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult.rows[0].max_connections;

  const databaseVersionResult = await database.query(` SHOW server_version`);
  const databaseVersionValeu = databaseVersionResult.rows[0].server_version;

  const updateAt = new Date().toISOString();
  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        opened_connections: databaseOpenedConnectionsValeu,
        max_connections: parseInt(databaseMaxConnectionsValue),
        version: databaseVersionValeu,
      },
    },
  });
}

export default status;
