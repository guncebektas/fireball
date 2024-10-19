import {Mongo} from 'meteor/mongo';
import {COLLECTION_NAME} from "../../../../shared/enums/collectionNames";

export const UserProfiles = new Mongo.Collection(COLLECTION_NAME.USER_PROFILES);
