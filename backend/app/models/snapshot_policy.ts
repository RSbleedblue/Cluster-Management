import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class SnapshotPolicy extends BaseModel {
    @column({ isPrimary: true })
    public id: string | undefined;

    @column()
    public policy: string | undefined; 

    @column()
    public applyToDirectory: string | undefined;

    @column()
    public scheduleType: string | undefined; 

    @column()
    public snapshotTime: string | undefined; 

    @column()
    public selectedDays: {
        everyday: boolean;
        mon: boolean;
        tue: boolean;
        wed: boolean;
        thu: boolean;
        fri: boolean;
        sat: boolean;
        sun: boolean;
    } | undefined;

    @column()
    public deletionPolicy: string | undefined; 

    @column()
    public daysAfter: number | undefined; 

    @column()
    public schedule: string | undefined; 
    
    @column()
    public lock: boolean | undefined;
}
