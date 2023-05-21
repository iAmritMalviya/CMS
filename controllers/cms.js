// const MongoDB = require("../database/mongo")
const mysql = require('mysql');
const cms = module.exports

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'cms'
})

connection.connect(function (err) {
    if(err)
    throw new Error(err)
    console.log('Database connected successfully');
    const query = 'CREATE DATABASE IF NOT EXISTS CMS'
    connection.query(query, function (err, result) {
        if(err) throw new Error(err)
        console.log("result", result)
    })
})



cms.get = async (req, res) => {

    res.status(200).json({ message: 'working' })
}

cms.create = async (req, res) => {
    const { title, content, url } = req.body;
    console.log("req.body", req.body)
  
    const createTable = `CREATE TABLE IF NOT EXISTS cmsTable 
      (id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255),
      content VARCHAR(255),
      url VARCHAR(255),
      image BLOB,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      createdBy INT,
      type VARCHAR(50) DEFAULT 'cms'
    )`;
  
    connection.query(createTable, function (err, result) {
      if (err) {
        console.error("Error creating table:", err);
        return res.status(500).json('Internal Server Error');
      }
      console.log("Table created successfully");
    });
  
    let imageDocument = {};
    if (req.file) {
      imageDocument = {
        name: new Date() + "--" + req.file.originalname,
        type: req.file.mimetype
      };
    }
  
    const insertQuery = `
      INSERT INTO cmsTable (title, content, url, image)
      VALUES (?, ?, ?, ?)
    `;
  
    connection.query(insertQuery, [title, content, url, JSON.stringify(imageDocument)], function (err, result) {
      if (err) {
        console.error("Error inserting data into cmsTable:", err);
        return res.status(500).json('Internal Server Error');
      }
      console.log("Data inserted successfully");
      return res.status(200).json({ message: 'Working' });
    });
  };
  
