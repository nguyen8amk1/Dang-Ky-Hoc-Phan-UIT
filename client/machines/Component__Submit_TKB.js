import { createMachine } from "xstate";
export const machine = createMachine(
    {
        id: "Submit TKB",
        initial: "Haven't submit file",
        states: {
            "Haven't submit file": {
                on: {
                    "click on the box": [
                        {
                            target: "File chooser",
                            actions: [],
                            meta: {},
                        },
                    ],
                },
            },
            "File chooser": {
                on: {
                    "File chosen": [
                        {
                            target: "File is Uploading",
                            actions: [],
                        },
                    ],
                    "Close file chooser": [
                        {
                            target: "Haven't submit file",
                            actions: [],
                        },
                    ],
                },
            },
            "File is Uploading": {
                invoke: {
                    input: {},
                    src: "Uploading file",
                    onDone: [
                        {
                            target: "Have a file submitted",
                            actions: [
                                {
                                    type: "displayUploadSuccessToast",
                                },
                            ],
                        },
                    ],
                    onError: [
                        {
                            target: "Haven't submit file",
                            actions: [
                                {
                                    type: "displayUploadFailToast",
                                },
                            ],
                        },
                    ],
                },
            },
            "Have a file submitted": {},
        },
    },
    {
        actions: {
            displayUploadFailToast: ({ context, event }) => {},
            displayUploadSuccessToast: ({ context, event }) => {},
        },
        actors: {
            "Uploading file": fromPromise({
                /* ... */
            }),
        },
        guards: {},
        delays: {},
    },
);

