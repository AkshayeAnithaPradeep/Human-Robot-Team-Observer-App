export const MissionSchema = {
    name: 'Mission',
    primaryKey: 'id',
    properties: {
        id: 'string',
        sessionName:  'string',
        missionName: 'string',
        sessionDescription: 'string?',
        missionDescription: 'string?',
        role_1: {type: 'Role', optional: true},
        role_2: {type: 'Role', optional: true},
        role_3: {type: 'Role', optional: true},
        role_4: {type: 'Role', optional: true},
        role_5: {type: 'Role', optional: true}
    }
};

export const RoleSchema = {
    name: 'Role',
    properties: {
        title: 'string',
        name: 'string',
        abbreviation: 'string'
    }
};

export const TimeStampSchema = {
    name: 'Timestamp',
    properties: {
        timestamp: 'date',
        mission: {type: 'Mission'},
        role: {type: 'Role'}
    }
};

