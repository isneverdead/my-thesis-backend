const express = require('express');
const chalk = require('chalk');

const log = console.log;
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
    // console.log(err);
    if (err != null) {
      log(chalk.white.bgRed.bold(err));
    }
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

///////////////////////////////////// Add Timetable API /////////////////////////////////////////////

app.post('/api/timetable', authenticateToken, async (req, res) => {
  try {
    const result = await db.TimeTable.create(req.body);
    log(chalk.green(JSON.stringify(result, null, 2)));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
///////////////////////////////////// Get all Timetables API /////////////////////////////////////////////

app.get('/api/timetables', authenticateToken, async (req, res) => {
  try {
    const result = await db.TimeTable.findAll({
      include: ['todos', 'ratings', 'savedBy', 'usedBy'],
    });
    log(chalk.green(JSON.stringify(result, null, 2)));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

///////////////////////////////////// Get one Timetable API /////////////////////////////////////////////

app.get('/api/timetable', authenticateToken, async (req, res) => {
  try {
    const result = await db.TimeTable.findOne({
      include: ['todos', 'ratings', 'savedBy', 'usedBy'],
      where: {
        id: req.query.id,
      },
    });
    if (result == null) {
      res.status(404).json({ message: 'Timetable not found' });
    } else {
      log(chalk.green(JSON.stringify(result, null, 2)));
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

///////////////////////////////////// Edit Timetable API /////////////////////////////////////////////

app.post('/api/timetable-edit', authenticateToken, async (req, res) => {
  try {
    const result = await db.TimeTable.update(
      {
        userId: req.body.userId,
        title: req.body.title,
        published: req.body.published,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    if (result[0] === 1) {
      const editedResult = await db.TimeTable.findOne({
        include: ['todos', 'ratings', 'savedBy', 'usedBy'],
        where: {
          id: req.body.id,
        },
      });
      log(chalk.green(JSON.stringify(editedResult, null, 2)));
      res.status(200).json(editedResult);
    } else {
      res.status(500).json({ message: 'No Timetable found' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
///////////////////////////////////// Delete Timetable API /////////////////////////////////////////////

app.post('/api/timetable-delete', authenticateToken, async (req, res) => {
  try {
    const result = await db.TimeTable.destroy({
      where: {
        id: req.body.id,
      },
    });
    if (result === 1) {
      res.status(200).json({ message: 'Timetable deleted' });
    } else {
      res.status(500).json({ message: 'No Timetable found' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

////////////////////////////////////////// Add Todo API /////////////////////////////////////////////
app.post('/api/todo', authenticateToken, async (req, res) => {
  try {
    const result = await db.Todo.create(req.body);
    log(chalk.green(JSON.stringify(result, null, 2)));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// //////////////////////////////////////// Get all Todos by TimeTable id API /////////////////////////////////////////////
app.get('/api/todos', authenticateToken, async (req, res) => {
  try {
    const result = await db.TimeTable_todo.findAll({
      order: [['startAt', 'ASC']],
      where: {
        timetableId: req.query.timetableId,
      },
    });
    log(chalk.green(JSON.stringify(result, null, 2)));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

////////////////////////////////////////// Edit Todo API /////////////////////////////////////////////
app.post('/api/todo-edit', authenticateToken, async (req, res) => {
  try {
    const result = await db.TimeTable_todo.update(
      {
        timetableId: req.body.timetableId,
        activity: req.body.activity,
        startAt: req.body.startAt,
        endAt: req.body.endAt,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    if (result[0] === 1) {
      const editedResult = await db.TimeTable_todo.findOne({
        where: {
          id: req.body.id,
        },
      });
      log(chalk.green(JSON.stringify(editedResult, null, 2)));
      res.status(200).json({ message: 'Todo updated', result: editedResult });
    } else {
      res.status(500).json({ message: 'No Todo found' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

////////////////////////////////////////// Delete Todo API /////////////////////////////////////////////

app.post('/api/todo-delete', authenticateToken, async (req, res) => {
  try {
    const result = await db.TimeTable_todo.destroy({
      where: {
        id: req.body.id,
      },
    });
    if (result === 1) {
      res.status(200).json({ message: 'Todo deleted' });
    } else {
      res.status(500).json({ message: 'No Todo found' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

////////////////////////////////////////// Add Rating API /////////////////////////////////////////////
app.post('/api/rating', authenticateToken, async (req, res) => {
  try {
    const result = await db.TimeTable_rating.create(req.body);
    log(chalk.green(JSON.stringify(result, null, 2)));
    res.status(200).json({ message: 'created succesfully', result });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

////////////////////////////////////////// Get all Ratings by TimeTable id API /////////////////////////////////////////////
// TODO: THIS API IS NOT WORKING
app.get('/api/ratings', authenticateToken, async (req, res) => {
  try {
    const result = await db.TimeTable_rating.findAll({
      where: {
        timetableId: req.query.timetableId,
      },
    });
    log(chalk.green(JSON.stringify(result, null, 2)));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

////////////////////////////////////////// Edit Rating API /////////////////////////////////////////////
app.post('/api/rating-edit', authenticateToken, async (req, res) => {
  try {
    const result = await db.TimeTable_rating.update(
      {
        timetableId: req.body.timetableId,
        userId: req.body.userId,
        rate: req.body.rate,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    if (result[0] === 1) {
      const editedResult = await db.TimeTable_rating.findOne({
        where: {
          id: req.body.id,
        },
      });
      log(chalk.green(JSON.stringify(editedResult, null, 2)));
      res.status(200).json({ message: 'Rating updated', result: editedResult });
    } else {
      res.status(500).json({ message: 'No Rating found' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

////////////////////////////////////////// Delete Rating API /////////////////////////////////////////////
app.post('/api/rating-delete', authenticateToken, async (req, res) => {
  try {
    const result = await db.TimeTable_rating.destroy({
      where: {
        id: req.body.id,
      },
    });
    if (result === 1) {
      res.status(200).json({ message: 'Rating deleted' });
    } else {
      res.status(500).json({ message: 'No Rating found' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

////////////////////////////////////////// Add Used By API /////////////////////////////////////////////
app.post('/api/usedby', authenticateToken, async (req, res) => {
  try {
    const result = await db.TimeTable_used.create(req.body);
    log(chalk.green(JSON.stringify(result, null, 2)));
    res.status(200).json({ message: 'created succesfully', result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

////////////////////////////////////////// Get all Used By by TimeTable id API /////////////////////////////////////////////
app.get('/api/usedby', authenticateToken, async (req, res) => {
  try {
    const result = await db.TimeTable_used.findAll({
      where: {
        timetableId: req.query.timetableId,
      },
    });
    log(chalk.green(JSON.stringify(result, null, 2)));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

////////////////////////////////////////// Delete Used By API /////////////////////////////////////////////
app.post('/api/usedby-delete', authenticateToken, async (req, res) => {
  try {
    const result = await db.TimeTable_used.destroy({
      where: {
        id: req.body.id,
      },
    });
    if (result === 1) {
      res.status(200).json({ message: 'Used By succesfully deleted' });
    } else {
      res.status(500).json({ message: 'No Used By found' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

////////////////////////////////////////// Add Saved By API /////////////////////////////////////////////
app.post('/api/savedby', authenticateToken, async (req, res) => {
  try {
    const result = await db.TimeTable_saved.create(req.body);
    log(chalk.green(JSON.stringify(result, null, 2)));
    res.status(200).json({ message: 'created succesfully', result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

////////////////////////////////////////// Get all Saved By by TimeTable id API /////////////////////////////////////////////
app.get('/api/savedby', authenticateToken, async (req, res) => {
  try {
    const result = await db.TimeTable_saved.findAll({
      where: {
        timetableId: req.query.timetableId,
      },
    });
    log(chalk.green(JSON.stringify(result, null, 2)));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

////////////////////////////////////////// Delete Saved By API /////////////////////////////////////////////
app.post('/api/savedby-delete', authenticateToken, async (req, res) => {
  try {
    const result = await db.TimeTable_saved.destroy({
      where: {
        id: req.body.id,
      },
    });
    if (result === 1) {
      res.status(200).json({ message: 'Saved By succesfully deleted' });
    } else {
      res.status(500).json({ message: 'No Saved By found' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.listen(port, () => {
  log(chalk.gray.bgYellow.bold(` App listening on port ${port} `));
});
