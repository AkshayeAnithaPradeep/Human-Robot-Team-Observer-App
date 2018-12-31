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

export function getPrefillValue(missionData) {
    let temp = {
        sessionName: missionData.sessionName,
        sessionDescription: missionData.sessionDescription,
        missionName: missionData.missionName,
        missionDescription: missionData.missionDescription,
        role_1: {},
        role_2: {},
        role_3: {},
        role_4: {},
        role_5: {}
    };
    let anySortieInfo = missionData.sorties[Object.keys(missionData.sorties)[0]];
    for(let i = 1; i<=5; i++){
        let varName = "role_" + i;
        if (anySortieInfo[varName]) {
            temp[varName]["name"] =anySortieInfo[varName].name;
            temp[varName]["title"] =anySortieInfo[varName].title;
            temp[varName]["abbreviation"] =anySortieInfo[varName].abbreviation;
        }
        else
            temp[varName] = null;
    }
    return temp;
}