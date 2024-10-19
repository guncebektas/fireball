import {Mongo} from 'meteor/mongo';
import {COLLECTION_NAME} from "../../../shared/enums/collectionNames.js";

export const ContactRequests = new Mongo.Collection(COLLECTION_NAME.CONTACT_REQUESTS);
