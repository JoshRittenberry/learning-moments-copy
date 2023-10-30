export const getUserByEmail = (email) => {
  return fetch(`https://learning-moments-api.onrender.com/users?email=${email}`).then((res) =>
    res.json()
  )
}

export const getUserById = (id) => {
  return fetch(`https://learning-moments-api.onrender.com/users?id=${id}&_embed=posts&_embed=postLikes&_embed=comments&_embed=commentLikes`).then((res) =>
    res.json()
  )
}

export const createUser = (user) => {
  return fetch("https://learning-moments-api.onrender.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json())
}

export const editUser = (userObj, userId) => {
  return fetch(`https://learning-moments-api.onrender.com/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      firstName: userObj.firstName,
      lastName: userObj.lastName,
      email: userObj.email,
      cohort: userObj.cohort,
      pictureUrl: userObj.pictureUrl
    }),
  }).then(() => {
    console.log(`user #${userId} Updated`)
  })
}
