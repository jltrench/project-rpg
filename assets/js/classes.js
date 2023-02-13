class Character {

    _life = 1;
    maxLife = 1;
    attack = 0;
    defense = 0;

    constructor(name) {
        this.name = name;
    }

    get life() {
        return this._life;
    }
    set life(newLife) {
        this._life = newLife < 0 ? 0 : newLife;
    }
}

class Knight extends Character {
    constructor(name) {
        super(name);
        this.life = 90;
        this.attack = 12;
        this.defense = 35;
        this.maxLife = this.life;
    }
}

class Sorcerer extends Character {
    constructor(name) {
        super(name);
        this.life = 80;
        this.attack = 28;
        this.defense = 2;
        this.maxLife = this.life;
    }
}

class SeaDragon extends Character {
    constructor(name) {
        super(name);
        this.life = 150;
        this.attack = 4;
        this.defense = 10;
        this.maxLife = this.life;
    }
}

class SkullKnight extends Character {
    constructor(name) {
        super(name);
        this.life = 200;
        this.attack = 16;
        this.defense = 1;
        this.maxLife = this.life;
    }
}

class Stage {
    constructor(fighter1, fighter2, fighter1El, fighter2El, logObj) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
        this.log = logObj;
    }

    start() {
        this.update();

        this.fighter1El.querySelector('.attackBtn').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
    }

    update() {
        // Fighter 1
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`;
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`;

        // Fighter 2
        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP`;
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`;
    }

    doAttack(attacking, attacked) {
        if(attacking.life <= 0 || attacked.life <= 0) {
            this.log.addMessage('A batalha terminou!');
            alert(`(Em produção) Atualize a página para jogar denovo!`);
            return;
        }

        let attackFactor = (Math.random() * 2).toFixed(2);
        let defenseFactor = (Math.random() * 2).toFixed(2);

        let actualAttack = attacking.attack * attackFactor;
        let actualDefense = attacked.defense * defenseFactor;

        if(actualAttack > actualDefense) {
            attacked.life -= actualAttack;
            this.log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} de dano!`);
        }
        else {
            this.log.addMessage(`${attacked.name} defendeu!`);
        }

        this.autoAttack();
        this.animationEnd();
        this.update();
 
        process++;
    }
    autoAttack() {
        if(this.fighter2.life < this.fighter2.maxLife) {
            this.fighter2El.classList.toggle('defense');
        }
        
        if(this.fighter2El.classList.contains('defense')) {
            this.doAttack(this.fighter2, this.fighter1)
        }
    }
    animationEnd() {
        if(this.fighter2.life <= 0) {
            let hero = this.fighter1El.querySelector('.hero');
            hero.classList.add('winner');
            document.querySelector('.show').style.display = 'block';

            let villain =this.fighter2El.querySelector('.villain');
            villain.classList.add('loser');
        }
        else if(this.fighter1.life <= 0){
            let villain = this.fighter2El.querySelector('.villain');
            villain.classList.add('winner');
            document.querySelector('.showVillain').style.display = 'block';

            let hero =this.fighter1El.querySelector('.hero');
            hero.classList.add('loser');
        }
    }
}

class Log {
    list = [];
    
    constructor(listEl) {
        this.listEl = listEl;
    }

    addMessage(msg) {
        this.list.push(msg);
        this.render();
    }

    render() {
        this.listEl.innerHTML ='';

        for(let i in this.list) {
            this.listEl.innerHTML += `<li>${this.list[i]}</li><hr/>`;
        }
    }
}