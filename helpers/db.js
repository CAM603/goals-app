import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('goals.db');

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS goals (id INTEGER PRIMARY KEY NOT NULL, goal TEXT NOT NULL);', 
        [],
        // Success
        () => {
          resolve()
        },
        // Failure
        (_, err) => {
          reject()
        }
      )
    });
  })
  return promise;
};

export const insertGoal = (goal) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO goals (goal) VALUES (?)', 
        [goal],
        // Success
        (_, result) => {
          resolve(result)
        },
        // Failure
        (_, err) => {
          reject()
        }
      )
    });
  })
  return promise;
}

export const fetchGoals = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM goals', 
        [],
        // Success
        (_, result) => {
          resolve(result)
        },
        // Failure
        (_, err) => {
          reject()
        }
      )
    });
  })
  return promise;
}

export const deleteGoals = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM goals', 
        [],
        // Success
        (_, result) => {
          resolve(result)
        },
        // Failure
        (_, err) => {
          reject()
          console.log(err)
        }
      )
    });
  })
  return promise;
}