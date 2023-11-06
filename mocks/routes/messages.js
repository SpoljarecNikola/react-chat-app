const ALL_MESSAGES = [
  {
    id: "1",
    author: {
      name: "Ivana Paradzikovic",
      picture: "/public/assets/react.svg",
    },
    text: "Hello there, so I was wondering if you know how much MB is in a GB?",
    timestamp: 1699308901,
    replies: [
      {
        id: "2",
        author: {
          name: "Zmaj Sipovski",
          picture: "/public/assets/react.svg",
        },
        text: "Hey Ivana! Have you tried Googling that?",
        timestamp: 16993083442,
        replies: [],
      },
      {
        id: "3",
        author: {
          name: "Ines Grah",
          picture: "/public/assets/react.svg",
        },
        text: "Zmaj has a point, tho I’d say its about 1000MB in a GB.",
        timestamp: 16995545255,
        replies: [],
      },
    ],
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
