import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema, Types } from "mongoose";
import { TaskStatus } from "src/common/enums/task-status.enum";
import { TaskPriority } from "src/common/enums/task-priority.enum";

export type TaskDocument = HydratedDocument<Task>;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ trim: true, default: "" })
  description: string;

  @Prop({ type: String, enum: TaskStatus, default: TaskStatus.TODO })
  status: TaskStatus;

  @Prop({ type: String, enum: TaskPriority, default: TaskPriority.MEDIUM })
  priority: TaskPriority;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Project", required: true })
  project: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "User", default: null })
  assignedTo: Types.ObjectId | null;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "User", required: true })
  createdBy: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
