import { BaseModel, column } from "@adonisjs/lucid/orm"
import { DateTime } from "luxon"

export default class Cluster extends BaseModel {
  public static table = 'clusters'

  @column({ isPrimary: true })
  public id!: string

  @column()
  public name: string | undefined

  @column()
  public metrics: Array<{
    timestamp: String;
    readIOPS: number;
    writeIOPS: number;
    readThroughput: number;
    writeThroughput: number;
  }> | undefined;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime | undefined

  @column.dateTime({ autoUpdate: true })
  public updatedAt: DateTime | undefined
}
