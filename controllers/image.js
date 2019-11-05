const Clarifai = require('clarifai')

const app = new Clarifai.App({
  apiKey: '8f715aaa8dec48bea9a2cb69e1a8b5e9',
})

const handleApiCall = (req, res) => {
  app.models
    .predict('a403429f2ddf4b49b307e318f00e528b', req.body.input)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json('unale to work with API'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body
  //   let found = false
  //   database.users.forEach((user) => {
  //     if (user.id === id) {
  //       found = true
  //       user.entries++
  //       return res.json(user.entries)
  //     }
  //   })
  //   if (!found) {
  //     res.status(400).json('not found')
  //   }
  // }

  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then((entries) => {
      res.json(entries[0])
    })
    .catch((err) => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage,
  handleApiCall,
}
