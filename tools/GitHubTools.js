class Extension {
    getInfo() {
        return {
            id: 'githubExtension',
            name: 'GitHub Tools',
            blocks: [
                {
                    opcode: 'getFileContent',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'contenu du fichier GitHub [URL]',
                    arguments: {
                        URL: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'https://raw.githubusercontent.com/utilisateur/depot/main/fichier.txt'
                        }
                    }
                },
                {
                    opcode: 'redirectToURL',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'rediriger vers [URL]',
                    arguments: {
                        URL: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'https://example.com'
                        }
                    }
                }
            ]
        };
    }

    getFileContent(args) {
        // Convertir l'URL GitHub en URL raw si nécessaire
        let fileUrl = args.URL;
        
        // Si c'est une URL GitHub normale, la convertir en URL raw
        if (fileUrl.includes('github.com') && !fileUrl.includes('raw.githubusercontent.com')) {
            fileUrl = fileUrl
                .replace('github.com', 'raw.githubusercontent.com')
                .replace('/blob/', '/');
        }
        
        // Faire la requête pour récupérer le contenu du fichier
        return fetch(fileUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error('Erreur lors de la récupération du fichier:', error);
                return `Erreur: ${error.message}`;
            });
    }

    redirectToURL(args) {
        // Rediriger vers l'URL spécifiée
        window.location.href = args.URL;
    }
}

Scratch.extensions.register(new Extension());
