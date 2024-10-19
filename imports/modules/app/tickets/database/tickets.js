import {Mongo} from 'meteor/mongo';
import {COLLECTION_NAME} from "../../../shared/enums/collectionNames.js";

export const Tickets = new Mongo.Collection(COLLECTION_NAME.TICKETS);
