import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema, Types } from "mongoose";

export type TeamDocument = HydratedDocument<Team>;

@Schema({ timestamps: true })
export class Team {
  @Prop({
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    trim: true,
    default: "",
  })
  description: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: "User",
    required: true,
  })
  owner: Types.ObjectId;

  @Prop([
    {
      type: MongooseSchema.Types.ObjectId,
      ref: "User",
    },
  ])
  members: Types.ObjectId[];
}

export const TeamSchema = SchemaFactory.createForClass(Team);

TeamSchema.index({ owner: 1, name: 1 }, { unique: true });
console.log(TeamSchema.indexes(), 1233424);
