import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("goals.db");
const db2 = SQLite.openDatabase("settings.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS goals (id INTEGER PRIMARY KEY NOT NULL, goal TEXT NOT NULL);",
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

export const init2 = () => {
  const promise = new Promise((resolve, reject) => {
    db2.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY NOT NULL, setting TEXT UNIQUE, active INT);",
        [],
        // Success
        () => {
          resolve();
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
        }
      );
    });
  });
  return promise;
};

export const insertSetting = (setting) => {
  const promise = new Promise((resolve, reject) => {
    db2.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO settings (setting, active) VALUES (?, 0)",
        [setting],
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

export const fetchSettings = () => {
  const promise = new Promise((resolve, reject) => {
    db2.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM settings",
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

export const deleteSettings = () => {
  const promise = new Promise((resolve, reject) => {
    db2.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM settings",
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

// export const updateDarkMode = () => {
//   const promise = new Promise((resolve, reject) => {
//     db2.transaction((tx) => {
//       tx.executeSql(
//         "UPDATE settings SET active = ABS(active - 1) WHERE id = 1",
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
