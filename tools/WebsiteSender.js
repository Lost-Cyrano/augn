class WebsiteSender {
    constructor() {
        this.message = "";
    }

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
        
        // Trouver l'iframe dans la page
        const iframes = document.querySelectorAll('iframe');
        let targetIframe = null;
        
        // Chercher l'iframe qui contient le bouton "Send!"
        for (const iframe of iframes) {
            try {
                // Vérifier si cet iframe a le bon contenu
                const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                const sendButton = iframeDoc.querySelector('.send');
                if (sendButton) {
                    targetIframe = iframe;
                    break;
                }
            } catch (e) {
                // Ignorer les erreurs CORS
                continue;
            }
        }
        
        if (targetIframe) {
            try {
                const iframeWindow = targetIframe.contentWindow;
                // Simuler le comportement du bouton "Send!"
                const iframeDoc = targetIframe.contentDocument || iframeWindow.document;
                const input = iframeDoc.querySelector('.input');
                const sendButton = iframeDoc.querySelector('.send');
                
                if (input && sendButton) {
                    // Définir la valeur de l'input
                    input.value = message;
                    // Déclencher le clic sur le bouton Send
                    sendButton.click();
                }
            } catch (error) {
                console.error('Erreur lors de l\'envoi du message:', error);
            }
        } else {
            console.warn('Aucun iframe cible trouvé');
        }
        
        return Promise.resolve();
    }
}

Scratch.extensions.register(new WebsiteSender());
