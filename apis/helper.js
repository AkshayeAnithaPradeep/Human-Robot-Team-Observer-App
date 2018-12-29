export function getObject(value) {
    let temp = {
        sessionName: value.sessionName,
        sessionDescription: value.sessionDescription,
        missionName: value.missionName,
        missionDescription: value.missionDescription,
        sorties: {}
    };
    temp.sorties[value.sortieName] = {
        role_1: value.role_1,
        role_2: value.role_2,
        role_3: value.role_3,
        role_4: value.role_4,
        role_5: value.role_5,
        timeStamps: [{
            timeStamp: new Date().getTime(),
            step: 'setup',
            event: 0,
            role: 0
        }]
    };
    return temp;
}