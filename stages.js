var stages =
{
    "inicio":
    {
        descricao: "Boas vindas",
        obj: require("./stages/inicio")
    },
    "menu":
    {
        descricao: "menu opções",
        obj: require("./stages/menu")
    }
}

exports.step = stages;