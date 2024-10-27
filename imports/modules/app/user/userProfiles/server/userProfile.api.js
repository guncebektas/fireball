import {WebApp} from "meteor/webapp";
import {userProfileService} from "../userProfileService";
import {api} from "../../../../shared/contracts/apiContract";
import bodyParser from 'body-parser';

WebApp.connectHandlers.use(bodyParser.json());

WebApp.connectHandlers.get("/api/v1/user-profile/otp/:otp", async (req, res) => {
  console.log('/api/v1/user-profile/otp/:otp');

  const otp = req.params.otp;

  const userProfile = await userProfileService.getByOtp(otp);

  if (userProfile) {
    res.json(api.ok(userProfile));
  } else {
    res.json(api.fail());
  }
});

WebApp.connectHandlers.put("/api/v1/user-profile/:userId", async (req, res) => {
  console.log('/api/v1/user-profile/:userId');

  const userId = req.params.userId;
  const payload = req.body;

  const count = await userProfileService.updatePayload(userId, payload);

  if (count > 0) {
    res.json(api.ok());
  } else {
    res.json(api.fail());
  }
});
