import {createMethod} from "meteor/jam:method";
import {z} from "zod";
import {imageService} from "./imageService";
import {IMAGE_METHOD} from "./enums/method";

export const imageGet = createMethod({
  name: IMAGE_METHOD.GET,
  schema: z.object({
    _id: z.string()
  }),
  async run({_id}) {
    return imageService.get(_id);
  }
});
