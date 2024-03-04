// Definição da classe Start que herda de Phaser.Scene
export default class Start extends Phaser.Scene {
    constructor() {
        super({
            // Chave para identificar a cena
            key: "start"
        });
    }

    preload() {

        // Carrega imagens necessárias para a cena
        this.load.image('start_game', './assets/bemvindo2.png');
        this.load.image('botao', './assets/botaog.jpg');
    }

    create() {

        // Definição de dimensões do jogo
        const larguraJogo = 1920;
        const alturaJogo = 1080;

        // Adição e configuração do botão
        this.botao = this.add.image(larguraJogo / 2, 580, 'botao');
        this.botao.setInteractive();

        // Adiciona imagem de boas-vindas no centro da tela
        this.add.image(larguraJogo/2, alturaJogo/2, 'start_game');

        // Adiciona um evento de clique ao botão
        this.botao.on('pointerup', () => this.scene.start('tela1'));
    }

    update() {
        
    }
}
