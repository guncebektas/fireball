import {BaseRepository} from "../../shared/repository/baseRepository.js";
import {Notifications} from "./database/notifications";

class NotificationRepository extends BaseRepository {
  constructor() {
    super(Notifications);
  }
}

export const notificationRepository = new NotificationRepository();
