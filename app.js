const express = require('express');
// const router = express.Router();
const bodyParser = require('body-parser');
const app = express();
const port = 4000;
require('dotenv').config();
const jwt = require('jsonwebtoken');

const db = require('./models');

app.use(bodyParser.json());

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

///////////////////////////////////// Get all Users API /////////////////////////////////////////////
app.get('/api/get-users', authenticateToken, async (req, res) => {
  const users = await db.User.findAll();
  res.status(200).json(users);
  // res.send('Hello World!');
});

app.post('/api/delete-user', async (req, res) => {
  try {
    const { id } = req.body;
    const user = await db.User.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({
      message: 'User deleted',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});
///////////////////////////////////// Edit Users API /////////////////////////////////////////////

app.post('/api/edit-user', async (req, res) => {
  try {
    const { id, username, password, email } = req.body;
    const user = await db.User.update(
      {
        username,
        password,
        email,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({
      message: 'User updated',
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});
///////////////////////////////////// Register User API /////////////////////////////////////////////

app.post('/api/register', async (req, res) => {
  try {
    const { name, password, email } = await req.body;
    // console.log(req.body);
    if (!name || !password || !email) {
      res.status(400).send('Form is not valid');
    } else {
      const alreadyExist = await db.User.findOne({
        where: {
          email,
        },
      });
      if (alreadyExist) {
        res.status(400).send('User already exist');
      } else {
        const user = await db.User.create({
          name,
          email,
          password,
          job: null,
          target: null,
          gender: null,
          birthday: null,
          profile_url: null,
          role: null,
        });
        res.status(201).json({
          message: 'User created',
          user,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});
///////////////////////////////////// Login API /////////////////////////////////////////////

app.post('/api/login', async (req, res) => {
  try {
    // const { identifier, password } = req.body;
    // let where = {};
    // if (identifier.includes('@')) {
    //   where = {
    //     email: identifier,
    //     password,
    //   };
    // } else {
    //   where = {
    //     name: identifier,
    //     password,
    //   };
    // }
    const { email, password } = req.body;
    const user = await db.User.findOne({
      where: {
        email,
        password,
      },
    });
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
    } else {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      res.status(200).json({
        message: 'Logged in',
        token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});
///////////////////////////////////// Get Criteria API /////////////////////////////////////////////

app.get('/api/criteria', async (req, res) => {
  try {
    const criteria = await db.Criteria.findAll();
    res.status(200).json(criteria);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

///////////////////////////////////// Create Criteria API /////////////////////////////////////////////

app.post('/api/criteria-create', authenticateToken, async (req, res) => {
  try {
    const { name, weight } = req.body;
    const criteria = await db.Criteria.create({
      name,
      weight_value: weight,
    });
    res.status(201).json({
      message: 'Criteria created',
      criteria,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

///////////////////////////////////// Edit Criteria API /////////////////////////////////////////////

app.post('/api/criteria-edit', async (req, res) => {
  try {
    const { id, name, weight } = req.body;
    const criteria = await db.Criteria.update(
      {
        name,
        weight_value: weight,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({
      message: 'Criteria updated',
      criteria,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

///////////////////////////////////// Delete Criteria API /////////////////////////////////////////////

app.post('/api/criteria-delete', authenticateToken, async (req, res) => {
  try {
    const { id } = req.body;
    const criteria = await db.Criteria.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({
      message: 'Criteria deleted',
      criteria,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

///////////////////////////////////// Get sub Criteria API /////////////////////////////////////////////

app.get('/api/sub-criteria', async (req, res) => {
  try {
    // const subCriteria = await db.SubCriteria.findAll({
    //   include: [
    //     {
    //       model: db.Criteria,
    //       as: 'criteria',
    //     },
    //   ],
    // });
    const [results, metadata] = await db.sequelize.query(
      'SELECT subcriteria.name as subCriteriaName, criteria.name as criteriaName, subcriteria.weight_value as weight FROM subcriteria LEFT JOIN criteria ON subcriteria.criteria_id = criteria.id'
    );

    console.log(JSON.stringify(results, null, 2));
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

///////////////////////////////////// Create sub Criteria API /////////////////////////////////////////////

app.post('/api/sub-criteria-create', authenticateToken, async (req, res) => {
  try {
    const { name, weight, criteria_id } = req.body;
    const subCriteria = await db.SubCriteria.create({
      name,
      weight_value: weight,
      criteria_id,
    });
    res.status(201).json({
      message: 'Sub Criteria created',
      subCriteria,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

///////////////////////////////////// Edit sub Criteria API /////////////////////////////////////////////

app.post('/api/sub-criteria-edit', authenticateToken, async (req, res) => {
  try {
    const { id, name, weight, criteria_id } = req.body;
    const subCriteria = await db.SubCriteria.update(
      {
        name,
        weight_value: weight,
        criteria_id,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({
      message: 'Sub Criteria updated',
      subCriteria,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

///////////////////////////////////// Delete sub Criteria API /////////////////////////////////////////////

app.post('/api/sub-criteria-delete', authenticateToken, async (req, res) => {
  try {
    const { id } = req.body;
    const subCriteria = await db.SubCriteria.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({
      message: 'Sub Criteria deleted',
      subCriteria,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

///////////////////////////////////// Get all Timetables API /////////////////////////////////////////////

// app.get('/api/timetables', authenticateToken, async (req, res) => {
//   try {
//     // const timetables = await db.TimeTable.findAll({});
//     const [timeTable, metadata] = await db.sequelize.query(
//       `SELECT
//       timetables.id as timetableId,
//       users.id as userId,
//       users.name as userName,
//       timetables.title as timetableTitle,
//       timetables.published as published

//       FROM timetables
//       LEFT JOIN users
//       ON timetables.user_id = users.id;`
//     );
//     console.log(timeTable);
//     let allTimeTables = [];
//     timeTable.forEach((element) => {
//       const todos = await db.TimeTable_todo.findAll({
//         where: { timetable_id: element.timetableId },
//       });
//       allTimeTables.push({
//         id: element.timetableId,
//         userId: element.userId,
//         userName: element.userName,
//         title: element.timetableTitle,
//         published: element.published,
//         todos,
//       });
//     });

//     res.status(200).json(allTimeTables);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: error });
//   }
// });
app.get('/api/timetables', authenticateToken, async (req, res) => {
  const timetable = await db.sequelize
    .query(
      `SELECT 
    timetables.id as timetableId, 
    users.id as userId, 
    users.name as userName, 
    timetables.title as timetableTitle, 
    timetables.published as published 

    FROM timetables 
    LEFT JOIN users 
    ON timetables.user_id = users.id;`
    )
    .then(async ([results, metadata]) => {
      // console.log(results);
      let allTimeTable = [];
      results.map(async (result) => {
        const ratings = await db.TimeTable_rating.findAll({
          where: {
            timetable_id: result.timetableId,
          },
        });
        console.log(JSON.stringify(ratings, null, 2));
        const saved = await db.TimeTable_saved_by.findAll({
          where: {
            timetable_id: result.timetableId,
          },
        });
        const used = await db.TimeTable_used_by.findAll({
          where: {
            timetable_id: result.timetableId,
          },
        });
        const todos = await db.TimeTable_todo.findAll({
          where: {
            timetable_id: result.timetableId,
          },
        });
        result.todos = todos;
        result.ratings = ratings;
        result.saved = saved;
        result.used = used;
        allTimeTable.push(result);
      });

      // results.map((item) => {
      //   allTimeTable.push({
      //     id: item.id,
      //     userId: item.userId,
      //     userName: item.userName,
      //     title: item.timetableTitle,
      //     published: item.published,
      //     todos,
      //     ratings,
      //     saved,
      //     used,
      //   });
      // });
      console.log(JSON.stringify(allTimeTable, null, 2));
      res.status(200).json(allTimeTable);
      return allTimeTable;
    })
    .catch((error) => {
      console.error(error);
    });
});
// app.get('/api/timetables', authenticateToken, async (req, res) => {
//   const timetable = await db.sequelize
//     .query(
//       `SELECT
//     timetables.id as timetableId,
//     users.id as userId,
//     users.name as userName,
//     timetables.title as timetableTitle,
//     timetables.published as published

//     FROM timetables
//     LEFT JOIN users
//     ON timetables.user_id = users.id;`
//     )
//     .then(([results, metadata]) => {
//       // console.log(results);
//       db.TimeTable_todo.findAll({
//         where: {
//           timetable_id: results[0].timetableId,
//         },
//       })
//         .then((todos) => {
//           let allTimeTableTodos = [];
//           results.forEach((element) => {
//             allTimeTableTodos.push({
//               id: element.timetableId,
//               userId: element.userId,
//               userName: element.userName,
//               title: element.timetableTitle,
//               published: element.published,
//               todos,
//             });
//           });
//           return allTimeTableTodos;
//           // res.status(200).json(allTimeTableTodos);
//         })
//         .then(async (allTimeTableTodos) => {
//           console.log(JSON.stringify(allTimeTableTodos, null, 2));

//           const ratings = await db.TimeTable_rating.findAll({
//             where: {
//               timetable_id: allTimeTableTodos.id,
//             },
//           });
//           console.log(JSON.stringify(ratings, null, 2));
//           const saved = await db.TimeTable_saved_by.findAll({
//             where: {
//               timetable_id: allTimeTableTodos.id,
//             },
//           });
//           const used = await db.TimeTable_used_by.findAll({
//             where: {
//               timetable_id: allTimeTableTodos.id,
//             },
//           });
//           let allTimeTable = [];
//           allTimeTableTodos
//             .map((item) => {
//               allTimeTable.push({
//                 id: item.id,
//                 userId: item.userId,
//                 userName: item.userName,
//                 title: item.timetableTitle,
//                 published: item.published,
//                 todos: item.todos,
//                 ratings,
//                 saved,
//                 used,
//               });
//               return allTimeTable;
//             })
//             .catch((error) => {
//               console.error(error);
//             });
//         });
//     });
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
