const ALL_MESSAGES = [
  {
    id: 1,
    author: "Ivana Paradzikovic",
    text: "Hello there, so I was wondering if you know how much MB is in a GB?",
    timestamp: 414514740000,
  },
  {
    id: 2,
    parent_id: 1,
    author: "Zmaj Sipovski",
    text: "Hey Ivana! Have you tried Googling that?",
    timestamp: 414514860000,
  },
  {
    id: 3,
    parent_id: 1,
    author: "Ines Grah",
    text: "Zmaj has a point, tho I’d say its about 1000MB in a GB.",
    timestamp: 414516900000,
  },
  {
    id: 4,
    author: "Pero Pipovski",
    text: "Hey guys, here is a nice web for that comoplicated conversion. www.convertunits.com/from/MB/to/GB",
    timestamp: 1626861080278,
  },
  {
    id: 5,
    parent_id: 2,
    author: "Zmajara Sipovski",
    text: "Reply reply",
    timestamp: 414514860000,
  },
];

module.exports = [
  {
    id: "get-messages", // route id
    url: "/api/messages", // url in express format
    method: "GET", // HTTP method
    variants: [
      {
        id: "success", // variant id
        type: "json", // variant handler id
        options: {
          status: 200, // status to send
          body: ALL_MESSAGES, // body to send
        },
      },
      {
        id: "error", // variant id
        type: "json", // variant handler id
        options: {
          status: 400, // status to send
          // body to send
          body: {
            message: "Error",
          },
        },
      },
    ],
  },
];
