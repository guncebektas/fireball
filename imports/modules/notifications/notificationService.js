import {BaseService} from "../shared/service/baseService.js";
import {notificationRepository} from "./notificationRepository";

class NotificationService extends BaseService {
  constructor({repository}) {
    super({repository});
  }
}

export const notificationService = new NotificationService({
  repository: notificationRepository
});
