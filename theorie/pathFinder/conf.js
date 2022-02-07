export default{ //pas accès a ctx
    automaton : {
        tileSize: 30,
        colorAlive: "white",
        colorDead: "black",
        isAliveProb: 0.6,
        birthRule : new Set([6,7,8]),
        survivalRule : new Set([3,4,4,5,6,7,8]),

    }
}