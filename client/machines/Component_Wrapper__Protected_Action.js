import { createMachine } from "xstate";
export const machine = createMachine(
  {
    context: {
      user: null,
    },
    id: "Component__Protected_Action",
    initial: "WANTING TO DO THIS ACTION",
    states: {
      "WANTING TO DO THIS ACTION": {
        entry: {
          type: "checkIfUserLoggedIn",
        },
        on: {
          "user is logged in": [
            {
              target: "DOING THE PROTECTED ACTION",
              actions: [],
            },
          ],
          "user is logged out": [
            {
              target: "DO THE LOGIN",
              actions: [],
            },
          ],
        },
      },
      "DOING THE PROTECTED ACTION": {
        invoke: {
          src: "do the protected action",
          input: {},
          onDone: [
            {
              target: "PROTECTED ACTION DONE SUCCESS",
              actions: [],
            },
          ],
          onError: [
            {
              target: "PROTECTED ACTION FAIL",
              actions: [],
            },
          ],
        },
      },
      "DO THE LOGIN": {
        invoke: {
          src: "send the login event to the authentication state machine",
          input: {},
          onDone: [
            {
              target: "LOGGED IN",
              actions: [],
            },
          ],
          onError: [
            {
              target: "LOGIN FAIL",
              actions: [],
            },
          ],
        },
      },
      "PROTECTED ACTION DONE SUCCESS": {
        type: "final",
      },
      "PROTECTED ACTION FAIL": {
        on: {
          retry: [
            {
              target: "DOING THE PROTECTED ACTION",
              actions: [],
            },
          ],
        },
      },
      "LOGGED IN": {
        after: {
          "500": [
            {
              target: "#Component__Protected_Action.DOING THE PROTECTED ACTION",
              actions: [
                {
                  type: "show a modal that say you're now logged in",
                },
              ],
            },
          ],
        },
      },
      "LOGIN FAIL": {
        on: {
          retry: [
            {
              target: "DO THE LOGIN",
              actions: [],
            },
          ],
        },
      },
    },
    on: {
      "click the button": [
        {
          target: ".WANTING TO DO THIS ACTION",
          actions: [],
        },
      ],
    },
  },
  {
    actions: {
      checkIfUserLoggedIn: ({ context, event }) => {},
      "show a modal that say you're now logged in": ({ context, event }) => {},
    },
    actors: {
      "do the protected action": fromPromise({
        /* ... */
      }),
      "send the login event to the authentication state machine": fromPromise({
        /* ... */
      }),
    },
    guards: {},
    delays: {},
  },
);
