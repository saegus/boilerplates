module.exports = [
  {
    description: 'Says "Module 1, route A"',
    method: 'GET',
    pattern: '/a',
    controller: async (req, res) => {
      const result = await Promise.resolve('Module 1, route A');
      return res.json({ data: result });
    }
  },
  {
    description: 'Sends a 403 status in a middleware',
    method: 'GET',
    pattern: '/b',
    middlewares: [
      req => ({ error: 'Not allowed.', status: 403 })
    ],
    controller: async (req, res) => {
      const result = await Promise.resolve("This shouldn't display");
      return res.json({ data: result });
    }
  }
];
