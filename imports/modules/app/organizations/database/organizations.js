import {Mongo} from 'meteor/mongo';
import {COLLECTION_NAME} from "../../../shared/enums/collectionNames.js";

export const Organizations = new Mongo.Collection(COLLECTION_NAME.ORGANIZATIONS);

