import { createMachine } from "xstate";
export const machine = createMachine(
    {
        id: "Calendar Generator",
        initial: "Check If the file is differences with the previous one",
        states: {
            "Check If the file is differences with the previous one": {
                entry: {
                    type: "checkingCurrentAndPreviousFileHashes",
                },
                on: {
                    "2 files are different": [
                        {
                            target: "Processing Submitted TKB",
                            actions: [],
                        },
                    ],
                    "2 files are the same": [
                        {
                            target: "Display Generated Calendar Preview",
                            actions: [],
                        },
                    ],
                },
            },
            "Processing Submitted TKB": {
                invoke: {
                    input: {},
                    src: "ProcessSubmittedTKB",
                    onDone: [
                        {
                            target: "Display Generated Calendar Preview",
                            actions: [
                                {
                                    type: "store the generated tkb to localStorage",
                                },
                            ],
                        },
                    ],
                    onError: [
                        {
                            target: "Submit TKB page",
                            actions: [
                                {
                                    type: "DisplayProcessFileFailedToast",
                                },
                            ],
                        },
                    ],
                },
            },
            "Display Generated Calendar Preview": {
                on: {
                    "generate calendar": [
                        {
                            target: "Choose Calendar 's name modal",
                            actions: [],
                        },
                    ],
                },
            },
            "Submit TKB page": {},
            "Choose Calendar 's name modal": {
                exit: {
                    type: "assignCalendarName",
                },
                on: {
                    "name chosen": [
                        {
                            target: "Generating Google Calendar",
                            actions: [],
                        },
                    ],
                },
            },
            "Generating Google Calendar": {
                invoke: {
                    input: {},
                    src: "generateGoogleCalendar",
                    onDone: [
                        {
                            target: "Display Generated Calendar Preview",
                            actions: [
                                {
                                    type: "showGenerateSuccessToast",
                                },
                            ],
                        },
                    ],
                    onError: [
                        {
                            target: "Display Generated Calendar Preview",
                            actions: [
                                {
                                    type: "showGenerateFailToast",
                                },
                            ],
                        },
                    ],
                },
            },
        },
        on: {
            "navigate to Generate Google Calendar": [
                {
                    target: ".Check If the file is differences with the previous one",
                    actions: [],
                },
            ],
        },
    },
    {
        actions: {
            assignCalendarName: ({ context, event }) => {},
            showGenerateFailToast: ({ context, event }) => {},
            showGenerateSuccessToast: ({ context, event }) => {},
            DisplayProcessFileFailedToast: ({ context, event }) => {},
            checkingCurrentAndPreviousFileHashes: ({ context, event }) => {},
            "store the generated tkb to localStorage": ({ context, event }) => {},
        },
        actors: {
            ProcessSubmittedTKB: fromPromise({
                /* ... */
            }),
            generateGoogleCalendar: fromPromise({
                /* ... */
            }),
        },
        guards: {},
        delays: {},
    },
);

