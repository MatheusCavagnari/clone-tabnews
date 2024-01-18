import database from "infra/database.js";

async function status(request, response) {
  const activeConnections = await database.query(
    `SELECT sum(numbackends) FROM pg_stat_database;`
  );

  const maxConnections = await database.query(
    `SELECT * FROM pg_settings WHERE name = 'max_connections';`
  );

  const version = await database.query(
    ` SELECT split_part(version(), ' ', 2) AS version;`
  );

  console.log(version.rows[0].version);

  const updateAt = new Date().toISOString();
  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        active_connections: Number(activeConnections.rows[0].sum),
        max_connections: maxConnections.rows[0].setting,
        version: version.rows[0].version,
      },
    },
  });
}

export default status;
