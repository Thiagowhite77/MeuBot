const venom = require("venom-bot")
const banco = require("./banco")
const stages = require("./stages")

venom.create().then((client) => start(client));

function start(client) {
    client.onMessage((message) => {

        if (message.isGroupMsg === false) {
            //Verifico qual o stage do usuario e se for stage 4 desativa a interação com o robo 
            const stage = getStage(message.from)

            // Enviar a mensagem que foi retornanda nos stages
            let resp = stages.step[stage].obj.execute(message.from, message.body);

            if (resp[0] == "button") {

                client.sendButtons('5594991680806@c.us', resp[2], resp[1], resp[3])
                    .then((result) => {
                        console.log('Result: ', result); //return object success
                    })
                    .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                    });
            }
            else if (resp[0] == "list") {
                client.sendListMenu('5594991680806@c.us', 'Title', 'subTitle', 'Description', 'menu', resp[1])
            }
        }

    }
    );
}

function getStage(usuario) {
    //Verifica se existir esse ususario no banco de dados
    if (banco.db[usuario]) {
        return banco.db[usuario].stage
    } else {
        //Criar usuario se for a primeia vez
        banco.db[usuario] = {
            stage: "inicio",
        };
        return banco.db[usuario].stage;
    }
}
