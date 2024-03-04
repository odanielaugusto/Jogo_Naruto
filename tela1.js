// Definição da classe Tela1 que herda de Phaser.Scene
export default class Tela1 extends Phaser.Scene {
    constructor() {
        super({
            // Chave para identificar a cena
            key: "tela1"
        });
    }

    preload() {

        // Carrega imagens e spritesheets necessários para a cena
        this.load.image('aldeia', 'assets/battle_naruto.png');
        this.load.spritesheet('rock_lee', 'assets/movimento_lee3.png', { frameWidth: 35, frameHeight: 47 });
        this.load.spritesheet('pulo_lee', 'assets/pulo_lee.png', { frameWidth: 20, frameHeight: 50 });
        this.load.spritesheet('gaara', 'assets/gaara.png', { frameWidth: 35, frameHeight: 70 });
        this.load.image('plataforma', 'assets/areia3.png');
        this.load.image('ground', 'assets/areia4.png');
        this.load.image('shuriken', 'assets/shuriken2.png');
    }

    create() {

        // Definição de dimensões do jogo
        const larguraJogo = 1920;
        const alturaJogo = 1080;

        // Inicialização da pontuação
        this.pontuacoes = [0, 0]

        // Adiciona imagem de fundo
        this.add.image(larguraJogo / 2, alturaJogo / 2, 'aldeia');

        // Criação do personagem principal
        this.personagem = this.physics.add.sprite(200, 900, 'rock_lee');
        this.personagem.setBounce(0.2);
        this.personagem.setCollideWorldBounds(true);
        this.personagem.setScale(3);

        // Criação do inimigo
        this.inimigo = this.physics.add.sprite(1200, 555, 'gaara');
        this.inimigo.setBounce(0.2);
        this.inimigo.setCollideWorldBounds(true);
        this.inimigo.setScale(2);
        this.inimigo.setFlipX(true);

        // Configuração das teclas do teclado
        this.teclado = this.input.keyboard.createCursorKeys();

        // Criação da plataforma
        this.plataforma = this.physics.add.image(600, 800, 'plataforma');
        this.plataforma.setImmovable(true);
        this.plataforma.setScale(0.3);
        this.plataforma.body.allowGravity = false;
        this.physics.add.collider(this.personagem, this.plataforma);

        // Criação do chão estático
        const ground = this.physics.add.staticGroup();
        ground.create(800, 1400, 'ground').setScale(3).refreshBody();
        this.physics.add.collider(this.personagem, ground);
        this.physics.add.collider(this.inimigo, ground);
        this.physics.add.collider(this.inimigo, this.plataforma);

        // Criação da shuriken
        this.shuriken = this.physics.add.sprite(larguraJogo / 2, 0, 'shuriken');
        this.shuriken.setCollideWorldBounds(true);
        this.shuriken.setBounce(0.7);
        this.physics.add.collider(this.shuriken, this.plataforma);

        // Criação do placar
        this.placar = this.add.text(50, 50, 'Shuriken:' + this.pontuacoes[0], { fontSize: '45px', fill: '#ffff' });
        
        //Criação da mensagem que diz o objetivo do jogo
        this.add.text(50, 100, 'Objetivo: coletar 15 shurikens', { fontSize: '18px', fill: '#ffff' });

        // Adição da interação ao coletar a shuriken
        this.physics.add.overlap(this.personagem, this.shuriken, () => {
            this.shuriken.setVisible(false);
            this.posicaoShuriken_Y = Phaser.Math.RND.between(50, 1500);
            this.shuriken.setPosition(this.posicaoShuriken_Y, 100);
            this.pontuacoes[0] += 1;
            this.placar.setText('Shuriken:' + this.pontuacoes[0]);
            this.shuriken.setVisible(true);
        });

        // Criação das animações
        this.anims.create({
            key: 'parado',
            frames: this.anims.generateFrameNumbers('rock_lee', { start: 2, end: 5 }),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'ataque',
            frames: this.anims.generateFrameNumbers('rock_lee', { start: 55, end: 58 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'andando_direita',
            frames: this.anims.generateFrameNumbers('rock_lee', { start: 23, end: 25 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'andando_esquerda',
            frames: this.anims.generateFrameNumbers('rock_lee', { start: 23, end: 25 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'pulo',
            frames: this.anims.generateFrameNumbers('pulo_lee', { start: 0, end: 2 }),
            frameRate: 5,
            repeat: 0
        });


    }

    update() {

        
        if( this.pontuacoes[0] === 15){
            this.scene.start('start')
        }

        // Lógica de movimentação do personagem com base nas teclas pressionadas
        // Movimenta o personagem para a esquerda
        if (this.teclado.left.isDown) {
            this.personagem.setVelocityX(-750);
            this.personagem.anims.play('andando_esquerda', true);
            this.personagem.setFlipX(true);

            // Movimenta o personagem para a direita
        } else if (this.teclado.right.isDown) {
            this.personagem.setVelocityX(750);
            this.personagem.anims.play('andando_direita', true);
            this.personagem.setFlipX(false);

            // Realiza um salto se a tecla para cima estiver pressionada e o personagem estiver no chão
        } else if ((this.teclado.up.isDown) && this.personagem.body.onFloor()) {
            this.personagem.setVelocityY(-800);
            this.personagem.anims.play('pulo', true);
           
        } else {

            // Caso nenhuma tecla de movimentação seja pressionada, o personagem fica parado
            this.personagem.anims.play('parado', true);
            this.personagem.body.setVelocityX(0);
        }

    }
}
