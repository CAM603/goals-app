import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("goals.db");

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

export const fetchStep = (id) => {
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

export const fetchSteps = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM steps",
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
