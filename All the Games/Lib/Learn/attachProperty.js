/*
    Target:
    -------

    const CSI = '\x1b[';
    const SUCCESS = CSI + '6;30;42m' + 'Success!' + CSI + '0m';

    screen.say = {
        success: () => { return screen.write(SUCCESS) },
    }
*/

const actions = [
    { 'Tidy': 'Action3'},
    { 'Lock': 'Action4'}
]

function actionsFactory(actions) {
    actions.forEach(action => {
        let key = Object.keys(action)[0];
        actionFactory(Home, 'say', key, action[key]);
    });
}

function actionFactory(Obj, area, command, action) {
    if (!Obj[area]) { Obj[area] = {} }
    (Obj[area])[command] = () => { return Obj.write(action); };
}

let Home = {};
actionFactory(Home, 'say', 'Clean', 'Action1')

console.log(Home);
console.log(Home.say.Clean.toString())
console.log()

actionFactory(Home, 'say', 'Empty', 'Action2')

console.log(Home);
console.log(Home.say.Clean.toString())
console.log(Home.say.Empty.toString())
console.log()

actionsFactory(actions);

console.log(Home)
console.log()