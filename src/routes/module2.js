module.exports = [
  {
    description: 'Says "Module 2, route A"',
    method: 'GET',
    pattern: '/a',
    controller: async (req, res) => {
      const result = await Promise.resolve('Module 2, route A');
      return res.json({ data: result });
    }
  },
  {
    description: 'Sends a 500 status in a middleware',
    method: 'GET',
    pattern: '/b',
    middlewares: [
      req => ({ error: 'Fatal error! (It\'s fake though)', status: 500 })
    ],
    controller: async (req, res) => {
      const result = await Promise.resolve("This shouldn't display");
      return res.json({ data: result });
    }
  }
];
