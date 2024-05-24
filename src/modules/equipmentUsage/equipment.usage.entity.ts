import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ManyToOne } from "typeorm";
import { Operation } from "../operation/operations.entity";
import { Equipment } from "../equipment/equipment.entity";
@Entity()
export class EquipmentUsage {
  @PrimaryGeneratedColumn("uuid")
  _id: string;
  @Column()
  startTime?: Date;

  @ManyToOne(() => Operation, (operation) => operation.equipmentUsages)
  operation: Operation;
  @ManyToOne(() => Equipment, (equipment) => equipment.equipmentUsages)
  equipment: Equipment;

  get uptime(): number {
    if (!this.startTime) {
      return 0;
    }
    const currentTime = new Date();
    const diffInMilliseconds = currentTime.getTime() - this.startTime.getTime();
    return diffInMilliseconds / 1000;
  }
}
