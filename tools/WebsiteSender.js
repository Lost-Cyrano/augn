class Extension {
    getInfo() {
        return {
            id: 'websiteSender',
            name: 'Website Sender',
            blocks: [
                {
                    opcode: 'sendMessage',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'send [MESSAGE] to the site',
                    arguments: {
                        MESSAGE: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'Hello from Scratch!'
                        }
                    }
                }
            ]
        };
    }

    sendMessage(args) {
        const message = args.MESSAGE;
        // Exactement le même comportement que le bouton "Send!"
        window.parent.postMessage(message, "*");
        return Promise.resolve();
    }
}

Scratch.extensions.register(new Extension());
