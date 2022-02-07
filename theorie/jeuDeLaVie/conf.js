export default{ //pas accès a ctx
    automaton : {
        tileSize: 5,
        colorAlive: "black",
        colorDead: "green",
        isAliveProb: 0.2,
        birthRule : new Set([3]),
        survivalRule : new Set([2,3]),

    }
}