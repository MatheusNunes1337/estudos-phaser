class PlayGame extends Phaser.Scene {

	constructor() 
    {
        super("PlayGame");
        this.personagem 
        this.passos //de quanto o personagem irá andar
    }

	preload() 
	{
		this.load.image("star", "assets/star.png")
		this.load.image("rock", "assets/rocha.png")
		this.load.spritesheet("personagem", "assets/dude.png", {frameWidth: 32, frameHeight: 48})
	}

	create() 
	{
		const chao = this.add.rectangle(0, 500, 800, 30, 0xFF8C00).setOrigin(0,0)
		this.physics.add.existing(chao)
		chao.body.allowGravity = false;
        chao.body.setImmovable(true);

		const estrela = this.physics.add.image(300,200, "star")

		const rocha = this.physics.add.image(200,400, "rock")

		this.personagem = this.physics.add.image(500, 470, "personagem", 4)

		//movendo o personagem

		this.input.keyboard.on("keydown_LEFT", () => this.teclado('ESQUERDA'));
        this.input.keyboard.on("keydown_RIGHT", () => this.teclado('DIREITA'));
       	this.input.keyboard.on("keydown_DOWN", () => this.teclado('BAIXO'));


		//colisões
		this.physics.add.collider(this.personagem, chao)
		this.physics.add.collider(this.personagem, estrela, this.pegouEstrela, null, this)
		this.physics.add.collider(this.personagem, rocha, this.pegouEstrela, null, this)

		this.passos = 100 //velocidade
	}

	teclado(tecla) 
	{
		console.log('função de movimentar funcionando')
		switch (tecla) {
            case 'ESQUERDA':
                this.personagem.setVelocityX(this.passos*-1);
                //this.personagem.play("esquerda");
                break;
            case 'DIREITA':
                this.personagem.setVelocityX(this.passos);
                //this.personagem.play("direita");
                break;
            case 'BAIXO':
                this.personagem.setVelocityX(0);
                break;
            /*    
            case 'ESPACO':
                if(this.pontos==10 || this.vidas==0){
                this.scene.restart();
                }
                break;
            */    
            default:
                break;
        }
	}

	update() 
	{
		console.log('update')
	}	

	pegouEstrela(personagem, estrela) 
	{
		console.log("Pegou a estrela")
	}

}