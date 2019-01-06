export function getDataByPhase(value, sortieName) {
    let sortieInfo = value.sorties[sortieName];
    let phases = {};
    phases['premission'] = new Array(7).fill(0);
    phases['mission'] = new Array(7).fill(0);
    phases['postmission'] = new Array(7).fill(0);
    sortieInfo.timeStamps.map((key, index) => {
        let timeStampObj = sortieInfo.timeStamps[index];
        if(timeStampObj.step !== 'setup')
            phases[timeStampObj.step][timeStampObj.event] += 1;
    });
    return phases;
}

export function getDataByRole(value, sortieName) {
    let sortieInfo = value.sorties[sortieName];
    let roles = {};
    for(let i = 1; i<=5; i++) {
        let varName = "role_" + i;
        if (sortieInfo[varName]) {
            roles[varName] = new Array(7).fill(0);
        }
    }
    sortieInfo.timeStamps.map((key, index) => {
        let timeStampObj = sortieInfo.timeStamps[index];
        let roleKey = "role_" + (timeStampObj.role + 1);
        roles[roleKey][timeStampObj.event] += 1;
    });
    roles.role_1[0] -= 1;
    return roles;
}

export function getObject(value, timeStamps) {
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
        role_5: value.role_5
    };
    if(timeStamps)
        temp.sorties[value.sortieName]['timeStamps'] = timeStamps;
    else
        temp.sorties[value.sortieName]['timeStamps'] = [{
            timeStamp: new Date().getTime(),
            step: 'setup',
            event: 0,
            role: 0
        }];
    return temp;
}

export function getPrefillValue(missionData, sortieName, newFlight) {
    let temp = {
        sessionName: missionData.sessionName,
        sessionDescription: missionData.sessionDescription,
        missionName: missionData.missionName,
        missionDescription: missionData.missionDescription,
        sortieName: !newFlight ? sortieName: '',
        role_1: {},
        role_2: {},
        role_3: {},
        role_4: {},
        role_5: {}
    };
    let sortieInfo = !newFlight ? missionData.sorties[sortieName] : missionData.sorties[Object.keys(missionData.sorties)[0]];
    for(let i = 1; i<=5; i++){
        let varName = "role_" + i;
        if (sortieInfo[varName]) {
            temp[varName]["name"] =sortieInfo[varName].name;
            temp[varName]["title"] =sortieInfo[varName].title;
            temp[varName]["abbreviation"] =sortieInfo[varName].abbreviation;
        }
        else
            temp[varName] = null;
    }
    return temp;
}

export function setupGridVals(sortieData, sortieName) {
    return new Promise((resolve, reject) => {
        let timeStamps = sortieData[sortieName].timeStamps.slice();
        let count = 0;
        for(let x in sortieData[sortieName]) {
            if (!sortieData[sortieName].hasOwnProperty(x)) continue;
            if(x.startsWith('role') && sortieData[sortieName][x] != null){
                count++;
            }
        }
        let gridVals = {
            premission: [],
            mission: [],
            postmission: []
        };
        for(let i=0; i<8; i++) {
            let temp = [];
            for(let j=0;j<count;j++){
                temp.push(0);
            }
            gridVals.premission.push(temp.slice());
            gridVals.mission.push(temp.slice());
            gridVals.postmission.push(temp.slice());
        }
        for(let index in timeStamps) {
            let timeStamp = timeStamps[index];
            switch (timeStamp.step) {
                case 'premission':
                    gridVals.premission[timeStamp.event][timeStamp.role] += 1;
                    break;
                case 'mission':
                    gridVals.mission[timeStamp.event][timeStamp.role] += 1;
                    break;
                case 'postmission':
                    gridVals.postmission[timeStamp.event][timeStamp.role] += 1;
                    break;
            }
        }
        resolve(gridVals);
    });
}

export function getSummaryDetails(value, sortieName) {
    let temp = {
        sessionName: value.sessionName,
        sessionDescription: value.sessionDescription,
        missionName: value.missionName,
        missionDescription: value.missionDescription,
        sortieName: sortieName,
        roles: []
    };
    let sortieInfo = value.sorties[sortieName];
    for(let i = 1; i<=5; i++){
        let varName = "role_" + i;
        if (sortieInfo[varName]) {
            let temprole = {};
            temprole["name"] = sortieInfo[varName].name;
            temprole["title"] = sortieInfo[varName].title;
            temprole["abbreviation"] = sortieInfo[varName].abbreviation;
            temp.roles.push(temprole);
        }
    }
    return temp;
}