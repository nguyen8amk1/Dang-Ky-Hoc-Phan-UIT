import { createMachine } from "xstate";
export const machine = createMachine(
  {
    id: "Routing__Protected_Page_Wrapper",
    initial: "WANTING TO GO TO PROTECTED DESITNATION",
    states: {
      "WANTING TO GO TO PROTECTED DESITNATION": {
        entry: {
          type: "checkUserAuthenticationStatus",
        },
        on: {
          "user is logged in": [
            {
              target: "PROTECTED DESTINATION",
              actions: [],
              meta: {},
            },
          ],
          "user is logged out": [
            {
              target: "LOGGED OUT",
              actions: [],
            },
          ],
        },
      },
      "PROTECTED DESTINATION": {
        type: "final",
      },
      "LOGGED OUT": {
        entry: {
          type: 'show modal "Do you want to log in right here"',
        },
        on: {
          "wanting to login": [
            {
              target: "LOGIN DESTINATION",
              actions: [],
            },
          ],
          "close modal": [
            {
              target: "HOMEPAGE DESTINATION",
              actions: [],
            },
          ],
        },
      },
      "LOGIN DESTINATION": {
        on: {
          "logged in": [
            {
              target: "PROTECTED DESTINATION",
              actions: [],
            },
          ],
          "suddenly don't want to anymore": [
            {
              target: "LOGGED OUT",
              actions: [],
            },
          ],
        },
      },
      "HOMEPAGE DESTINATION": {
        type: "final",
      },
    },
  },
  {
    actions: {
      checkUserAuthenticationStatus: ({ context, event }) => {},
      "show modal 'Do you want to log in right here'": ({
        context,
        event,
      }) => {},
    },
    actors: {},
    guards: {},
    delays: {},
  },
);
