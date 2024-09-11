/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 */
Meteor.methods({
  'users.get'() {
    return [
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Doe' },
    ];
  },
});
