import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("goals.db");

// Initialize db with a goals table and a steps table (one goal to many steps relationship)
export const init = () => {
  db.exec([{ sql: "PRAGMA foreign_keys = ON;", args: [] }], false, () =>
    console.log("Foreign keys turned on")
  );
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS goals (id INTEGER PRIMARY KEY NOT NULL, goal TEXT NOT NULL, description TEXT NOT NULL DEFAULT '');",
        [],
        // Success
        () => {
          resolve();
        },
        // Failure
        (_, err) => {
          reject();
        }
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS steps (id INTEGER PRIMARY KEY NOT NULL, step TEXT NOT NULL, completed INTEGER NOT NULL DEFAULT 0, goal_id INTEGER REFERENCES goals(id) ON DELETE CASCADE);",
        [],
        // Success
        () => {
          resolve();
        },
        // Failure
        (_, err) => {
          reject();
        }
      );
    });
  });
  return promise;
};
// Create a new goal in the database
export const insertGoal = (goal) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO goals (goal) VALUES (?)",
        [goal],
        // Success
        (_, result) => {
          resolve(result);
        },
        // Failure
        (_, err) => {
          reject();
          console.log(err);
        }
      );
    });
  });
  return promise;
};
// Update a goal's description
export const updateGoalDescription = (description, goal_id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE goals SET description = ? WHERE id = ?",
        [description, goal_id],
        // Success
        (_, result) => {
          resolve(result);
        },
        // Failure
        (_, err) => {
          reject();
          console.log(err);
        }
      );
    });
  });
  return promise;
};

// Create a new step for a goal
export const insertStep = (step, goal_id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO steps (step, goal_id) VALUES (?, ?)",
        [step, goal_id],
        // Success
        (_, result) => {
          resolve(result);
        },
        // Failure
        (_, err) => {
          reject();
          console.log(err);
        }
      );
    });
  });
  return promise;
};

// Create a new step for a goal
export const toggleStepCompleted = (step_id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE steps SET completed = ((completed | 1) - (completed & 1)) WHERE id = ?",
        [step_id],
        // Success
        (_, result) => {
          resolve(result);
        },
        // Failure
        (_, err) => {
          reject();
          console.log(err);
        }
      );
    });
  });
  return promise;
};

// Get all goals in database
export const fetchGoals = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM goals",
        [],
        // Success
        (_, result) => {
          resolve(result);
        },
        // Failure
        (_, err) => {
          reject();
        }
      );
    });
  });
  return promise;
};
// Gets all steps for a goal
export const fetchSteps = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM steps WHERE goal_id = ?",
        [id],
        // Success
        (_, result) => {
          resolve(result);
        },
        // Failure
        (_, err) => {
          reject();
        }
      );
    });
  });
  return promise;
};

// export const fetchSteps = () => {
//   const promise = new Promise((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         "SELECT * FROM steps",
//         [],
//         // Success
//         (_, result) => {
//           resolve(result);
//         },
//         // Failure
//         (_, err) => {
//           reject();
//         }
//       );
//     });
//   });
//   return promise;
// };
// Deletes all goals
export const deleteGoals = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM goals",
        [],
        // Success
        (_, result) => {
          resolve(result);
        },
        // Failure
        (_, err) => {
          reject();
          console.log(err);
        }
      );
    });
  });

  return promise;
};
// Deletes a single goal and it's associated steps
export const deleteGoal = (goalId) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM goals WHERE id = ?",
        [goalId],
        // Success
        (_, result) => {
          resolve(result);
        },
        // Failure
        (_, err) => {
          reject();
          console.log(err);
        }
      );
    });
  });
  return promise;
};
