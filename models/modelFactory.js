exports.insertData = (tableName, db, data) => {
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO ${tableName} SET ?`, data, (err, result) => {
      if (err) return reject(err);
      resolve(result.insertId);
    });
  });
};

exports.getAllData = (tableName, db) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM ${tableName}`, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

exports.getData = (db, query) => {
  return new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

exports.getSingleData = (db, query) => {
  return new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result[0]);
    });
  });
};

exports.updateSingleData = (db, query, data) => {
  return new Promise((resolve, reject) => {
    db.query(query, data, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

exports.deleteSingleData = (db, query) => {
  return new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
