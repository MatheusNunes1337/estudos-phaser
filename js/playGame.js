class PlayGame extends Phaser.Scene {

	constructor() 
    {
        super("PlayGame");
        this.personagem 
        this.passos //de quanto o personagem irá andar
		this.premios
		this.inimigos

		this.txtPontos
		this.txtVidas

		this.pontos
		this.vidas
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
		this.physics.world.on("worldbounds", this.saiuDaCena)
		chao.body.allowGravity = false;
        chao.body.setImmovable(true);

		//const estrela = this.physics.add.image(350,50, "star")

		//const rocha = this.physics.add.image(500,50, "rock")

		this.personagem = this.physics.add.image(500, 470, "personagem", 4)

		this.premios = this.physics.add.group({
            key:'star',
            repeat:11,
            collideWorldBounds:true,
            setXY:{x:20, y:0, stepX:60} 
            
        })

		this.inimigos = this.physics.add.group({
            key:'rock',
            repeat:4,
            collideWorldBounds:true,
            setXY:{x:50, y:-100, stepX:130}
            
        });

		//movendo o personagem

		this.input.keyboard.on("keydown_LEFT", () => this.teclado('ESQUERDA'));
        this.input.keyboard.on("keydown_RIGHT", () => this.teclado('DIREITA'));
       	this.input.keyboard.on("keydown_DOWN", () => this.teclado('BAIXO'));


		//colisões
		this.physics.add.collider(this.personagem, chao)
		this.physics.add.overlap(this.personagem, this.premios, this.pegou, null, this)
		this.physics.add.overlap(this.personagem, this.inimigos, this.pegou, null, this)

		this.passos = 150 //velocidade

		//pontos e vidas
		this.add.text(50, chao.y+60, "Pontos:", {fontSize: '16px', fill: 'black'})
		this.add.text(580, chao.y+60, "Vidas:", {fontSize: '16px', fill: 'red'})

		this.pontos = 0
		this.vidas = 2

		this.txtPontos = this.add.text(120, chao.y+60, this.pontos, {fontSize: '16px', fill: 'black'})
		this.txtVidas = this.add.text(650, chao.y+60, this.vidas, {fontSize: '16px', fill: 'red'})

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

	pegou(personagem, item) 
	{
		switch(item.texture.key) {
			case "star":
				this.pontos++
				this.txtPontos.text = this.pontos
				break
			case "rock":
				this.vidas--
				this.txtVidas.text = this.vidas
				break
			default:
				break	

		}
	}

	saiuDaCena(elemento) {
		console.log("saiu")
	}

}