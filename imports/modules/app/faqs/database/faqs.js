import { Mongo } from 'meteor/mongo';
import {COLLECTION_NAME} from "../../../shared/enums/collectionNames.js";

export const Faqs = new Mongo.Collection(COLLECTION_NAME.FAQS);
