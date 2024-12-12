db.createUser({
    user: "us_admin",
    pwd: "example123",
    roles: [
      {
        role: "readWrite",
        db: "us_database",
      },
    ],
  });