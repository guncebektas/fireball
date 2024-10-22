import {createMethod} from "meteor/jam:method";
import {z} from "zod";
import {imageService} from "./imageService";

export const imageGet = createMethod({
  name: 'image.get',
  schema: z.object({
    _id: z.string()
  }),
  async run({_id}) {
    return imageService.get(_id);
  }
});
